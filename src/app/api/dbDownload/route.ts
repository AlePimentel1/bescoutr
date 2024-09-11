import { env } from "@/env";
import dbConnect from "@/lib/mongoDb";
import Country from "@/models/Country";
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
        case "teams-and-players":
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
