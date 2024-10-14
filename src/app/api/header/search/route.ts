import { safeApiMiddleware } from "@/app/api/middlewares/safeApi";
import { env } from "@/env";
import Country from "@/models/Country";
import Player from "@/models/Player";
import Team from "@/models/Team";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { SafeNextRequest } from "types/api";

export async function GET(req: SafeNextRequest) {
    try {
        const safeAuth = await safeApiMiddleware(req);
        if (safeAuth.status !== 200) return safeAuth;

        const page = req.nextUrl.searchParams.get('page');
        const searchValue = req.nextUrl.searchParams.get('searchValue');
        const type = req.nextUrl.searchParams.get('type');

        let results: any[] = [];

        if (!searchValue || !type || !page) {
            return NextResponse.json({ message: "INVALID_PARAMS", success: false }, { status: 400 });
        }

        if (typeof searchValue !== "string" || typeof type !== "string" || typeof page !== "string") {
            return NextResponse.json({ message: "INVALID_PARAMS", success: false }, { status: 400 });
        }

        if (!["user", "team", "player"].includes(type)) {
            return NextResponse.json({ message: "INVALID_TYPE", success: false }, { status: 400 });
        }

        const limit = 10;
        const currentPage = parseInt(page) || 1;

        const offset = (currentPage - 1) * limit;

        switch (type) {
            case "user":
                const users = await User.find({
                    $or: [
                        { firstName: { $regex: searchValue, $options: "i" } },
                        { lastName: { $regex: searchValue, $options: "i" } },
                        { username: { $regex: searchValue, $options: "i" } }
                    ],
                    _id: { $ne: req.user.id }
                }).limit(limit).skip(offset).select('firstName lastName username profilePicture');
                const formattedResults = users.map(user => {
                    return {
                        id: user._id,
                        name: `${user.firstName} ${user.lastName}`,
                        image: user.profilePicture,
                    }
                })
                results = formattedResults;
                break;
            case "team":
                const teams = await Team.find({
                    name: { $regex: searchValue, $options: "i" }
                }).limit(limit).skip(offset).select('name logo');
                const formattedTeams = teams.map(team => {
                    return {
                        id: team._id,
                        name: team.name,
                        image: team.logo,
                    }
                })
                results = formattedTeams;
                break;
            case "player":
                const players = await Player.find({
                    name: { $regex: searchValue, $options: "i" }
                }).limit(limit).skip(offset);

            default:
                return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
        }

        return NextResponse.json({ success: true, results: results, page: currentPage }, { status: 200 });



    } catch (error) {
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}