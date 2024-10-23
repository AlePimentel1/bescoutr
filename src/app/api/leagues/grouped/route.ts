import { safeApiMiddleware } from "@/app/api/middlewares/safeApi";
import Country from "@/models/Country";
import { NextResponse } from "next/server";
import { SafeNextRequest } from "types/api";

export async function GET(req: SafeNextRequest) {
    try {
        const safeAuth = await safeApiMiddleware(req);
        if (safeAuth.status !== 200) return safeAuth;

        const allLeaguesGroupedByCountry = await Country.aggregate([
            {
                $match: {
                    apiId: { $ne: null }
                }
            },
            {
                $lookup: {
                    from: "leagues",
                    localField: "_id",
                    foreignField: "country",
                    as: "leagues"
                }
            },
            {
                $unwind: {
                    path: "$leagues",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    country: "$name",
                    leagues: {
                        leagueName: "$leagues.name",
                        leagueApiId: "$leagues.apiId"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    country: 1,
                    leagues: 1
                }
            }
        ]);

        console.log(allLeaguesGroupedByCountry);



        return NextResponse.json({ success: true, allLeaguesGroupedByCountry }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}