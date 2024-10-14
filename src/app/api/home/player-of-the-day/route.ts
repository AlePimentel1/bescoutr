import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { safeApiMiddleware } from "@/app/api/middlewares/safeApi";
import League from "@/models/League";
import Country from "@/models/Country";
import { SafeNextRequest } from "types/api";

export async function GET(req: SafeNextRequest) {
    try {
        const safeAuth = await safeApiMiddleware(req);
        if (safeAuth.status !== 200) return safeAuth;

        const playerOfTheDay = await fetch(`https://v3.football.api-sports.io/players?id=272&season=2024`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": env.SPORTS_API_KEY
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                throw new Error(err);
            });

        const country = await Country.findOne({ name: playerOfTheDay.response[0].player.nationality }).select('flag')

        const formattedResponse = {
            ...playerOfTheDay.response[0].player,
            nationality: country?.flag
        }

        return NextResponse.json({ success: true, playerOfTheDay: formattedResponse }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}