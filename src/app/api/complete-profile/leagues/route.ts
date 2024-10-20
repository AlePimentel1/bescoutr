import { safeApiMiddleware } from "@/app/api/middlewares/safeApi";
import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: SafeNextRequest) {
    try {
        const safeAuth = await safeApiMiddleware(req);
        if (safeAuth.status !== 200) return safeAuth;

        if (req.user.isComplete) return NextResponse.json({ message: "PROFILE_ALREADY_COMPLETE", success: false }, { status: 400 });

        const { leagues, pagination } = await getLeaguesFromApi({ page: 1 });

        return NextResponse.json({ success: true, leagues, pagination }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}

const getLeaguesFromApi = async ({ page }: { page: Number }) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", env.SPORTS_MONKS_API_KEY);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
    };

    try {
        const response = await fetch(`https://api.sportmonks.com/v3/football/leagues?page=${page}`, requestOptions);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();

        return {
            leagues: result.data,
            pagination: result.pagination
        };
    } catch (error) {
        console.error('Error fetching leagues:', error);
        throw new Error('Error fetching leagues');
    }
};
