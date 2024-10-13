import { env } from "@/env";
import rateLimiter from "@/lib/rateLimiter";
import { NextRequest, NextResponse } from "next/server";
import { safeApiMiddleware } from "../middlewares/safeApi";

export async function GET(req: NextRequest) {
    const rateLimit = await rateLimiter(req);
    if (!rateLimit) {
        return NextResponse.json({ message: "RATE_LIMIT_EXCEEDED", success: false }, { status: 429 });
    }

    try {
        const safeAuth = await safeApiMiddleware(req);
        if (safeAuth.status !== 200) return safeAuth;

        const { searchParams } = new URL(req.url)
        const leagueId = searchParams.get('id')

        if (!leagueId) {
            return NextResponse.json({ message: "MISSING_ID", success: false }, { status: 400 });
        }

        const result = await getLeagueFromApi(Number(leagueId));
        if (result?.results === 0) {
            throw new Error('League not found');
        }
        const { league } = result?.response?.[0];

        if (!league) {
            throw new Error('League not found');
        }

        return NextResponse.json({ success: true, league }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}


const getLeagueFromApi = async (id: number) => {
    const result = fetch(`https://v3.football.api-sports.io/standings?league=${id}&season=2024`, {
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

    return result;
}