import { env } from "@/env";
import dbConnect from "@/lib/mongoDb";
import Country from "@/models/Country";
import League from "@/models/League";
import Player from "@/models/Player";
import Team from "@/models/Team";
import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextApiRequest) {
    await dbConnect();

    const { searchParams } = new URL(req.url!, `http://${req.headers.host}`);

    const download = searchParams.get('download');
    if (!download) return NextResponse.json({ message: "Invalid download type", success: false }, { status: 400 });

    switch (download) {
        case "countries":
            return getAllCountries();
        case "leagues":
            return getAllLeagues();
        case "teams":
            return getAllTeams();
        case "players":
            return getAllPlayers();
        default:
            return NextResponse.json({ message: "Invalid download type", success: false }, { status: 400 });
    }
}

const callApi = async (page: number, url: string) => {
    const options = {
        method: 'GET',
        headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            'x-rapidapi-key': 'e98e984dc97367bc20f7894473738f00'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error en la página ${page}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error: any) {
        return { success: false, message: error.message };
    }
};

const getAllCountries = async () => {
    const url = "https://v3.football.api-sports.io/countries";
    let allCountries: any[] = [];
    let totalPages: number = 1;
    try {
        for (let page = 1; page <= totalPages; page++) {
            const data = await callApi(page, url);
            if (typeof data === "object" && data.success === false) return NextResponse.json({ message: data.message, success: false }, { status: 500 });

            if (data && data.response) {
                allCountries = allCountries.concat(data.response);
                totalPages = data.paging.total;
                console.log(`Página ${page} de ${totalPages}`);
            } else {
                break;
            }

            // Esperar un pequeño retraso antes de la siguiente llamada para evitar superar el límite de solicitudes
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        await Country.insertMany(allCountries.filter((country: any) => country.code && country.name && country.flag));

        return NextResponse.json({
            message: "OK",
            success: true,
            data: {
                length: allCountries.length,
                countries: allCountries
            }
        }, { status: 200 });

    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
};

const getAllLeagues = async () => {
    const url = "https://v3.football.api-sports.io/leagues";
    let allLeagues: any[] = [];
    let totalPages: number = 1;
    try {
        for (let page = 1; page <= totalPages; page++) {
            const data = await callApi(page, url);
            if (typeof data === "object" && data.success === false) return NextResponse.json({ message: data.message, success: false }, { status: 500 });

            if (data && data.response) {
                allLeagues = allLeagues.concat(data.response);
                totalPages = data.paging.total;
                console.log(`Página ${page} de ${totalPages}`);
            } else {
                break;
            }

            // Esperar un pequeño retraso antes de la siguiente llamada para evitar superar el límite de solicitudes
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const getCountries = await Country.find();

        const formattedLeagues = allLeagues.map(({ league, country, seasons }) => {
            if (!league.name || !league.id) return null

            return {
                apiId: league.id,
                name: league.name,
                type: league.type,
                logo: league.logo,
                country: getCountries.find((country: any) => country?.code === country?.code)?._id,
                seasons
            }
        }).filter((league: any) => league);

        const result = await League.insertMany(formattedLeagues);

        const response = NextResponse.json({
            message: "OK",
            success: true,
            data: {
                length: formattedLeagues.length,
                leagues: result
            }
        }, { status: 200 });

        response.headers.set('Cache-Control', 'no-store');

        return response;

    } catch (error) {
        console.log("Error", error);
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
};

const getAllTeams = async () => {
    // Obtener todas las ligas de la base de datos
    const allLeagues = await League.find().select('apiId');
    const allCountries = await Country.find().select('name');
    const allLeaguesIds = allLeagues.map(league => league.apiId);

    let allTeams: any[] = [];

    for (let leagueId of allLeaguesIds) {
        console.log(leagueId)
        const url = `https://v3.football.api-sports.io/teams?league=${leagueId}&season=2024`;

        let totalPages: number = 1;  // Reiniciar totalPages para cada liga

        try {
            // Iterar a través de las páginas de resultados
            for (let page = 1; page <= totalPages; page++) {
                const data = await callApi(page, url);

                // Verificar si la respuesta tiene un error
                if (typeof data === "object" && data.success === false) {
                    return NextResponse.json({ message: data.message, success: false }, { status: 500 });
                }

                // Verificar si la respuesta tiene datos válidos
                if (data && data.response) {
                    allTeams = allTeams.concat(data.response);
                    totalPages = data.paging.total;  // Actualizar el total de páginas basado en la respuesta
                    console.log('Descargando:', data.results, 'datos')
                } else {
                    break;  // Salir del bucle si no hay más respuestas
                }

                // Esperar un pequeño retraso antes de la siguiente llamada para evitar superar el límite de solicitudes
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.log("Error", error);
            return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
        }
    }

    try {

        let formattedTeams = allTeams.map(({ team }) => {
            if (!team.id || !team.name || !team.country) return null;

            return {
                apiId: team.id,
                name: team.name,
                code: team.code,
                country: allCountries.find((country: any) => country.name === team.country)?._id,
                national: team.national,
                logo: team.logo
            }
        }).filter((team: any) => team);

        // Insertar los equipos en la base de datos

        const batchSize = 1000;

        for (let i = 0; i < formattedTeams.length; i += batchSize) {
            const batch = formattedTeams.slice(i, i + batchSize);
            await Team.insertMany(batch);
        }

        return NextResponse.json({ message: "OK", success: true, allTeams }, { status: 200 });
    } catch (e) {
        console.log("Error", e);
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
};

const getAllPlayers = async () => {

    const allLeagues = await League.find().select('apiId');
    const allLeaguesIds = allLeagues.map(league => league.apiId);
    const allCountries = await Country.find().select('name');

    let allPlayers: any[] = [];

    for (let leagueId of allLeaguesIds) {
        const url = `https://v3.football.api-sports.io/players?league=${leagueId}&season=2024`;

        let totalPages: number = 1;

        try {
            for (let page = 1; page <= totalPages; page++) {
                const data = await callApi(page, url);

                if (typeof data === "object" && data.success === false) {
                    return NextResponse.json({ message: data.message, success: false }, { status: 500 });
                }

                if (data && data.response) {
                    allPlayers = allPlayers.concat(data.response);
                    totalPages = data.paging.total;
                    console.log('Descargando:', data.results, 'datos')
                } else {
                    break;
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (error) {
            console.log("Error", error);
            return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
        }
    }

    try {
        let formattedPlayers = allPlayers.map(({ player }) => {
            if (!player.id || !player.name || !player.firstname || !player.lastname) return null;

            return {
                apiId: player.id,
                name: player.name,
                firstName: player.firstname,
                lastName: player.lastname,
                age: player.age,
                birth: {
                    date: player.birth.date ? new Date(player.birth.date) : null,
                    place: player.birth.place || null,
                    country: allCountries.find((country: any) => country.name === player.birth.country)?._id
                },
                nationality: allCountries.find((country: any) => country.name === player.national)?._id,
                height: player.height,
                weight: player.weight,
                injured: player.injured,
                photo: player.photo
            }
        }).filter((player: any) => player)

        const batchSize = 1000;

        for (let i = 0; i < formattedPlayers.length; i += batchSize) {
            const batch = formattedPlayers.slice(i, i + batchSize);
            await Player.insertMany(batch);
        }

        return NextResponse.json({ message: "OK", success: true, allPlayers }, { status: 200 });

    } catch (e) {
        console.log("Error", e);
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}
