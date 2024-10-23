import { env } from "@/env";
import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { SafeNextRequest } from "types/api";

export async function safeApiMiddleware(req: SafeNextRequest) {
    try {
        await dbConnect();
    } catch (error) {
        return NextResponse.json(
            { message: "DB_CONNECTION_ERROR", success: false },
            { status: 500 }
        );
    }

    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.json(
            { message: "UNAUTHORIZED", success: false },
            { status: 401 }
        );
    }

    const user = await User.findById(token.id).lean();

    if (!user) {
        return NextResponse.json(
            { message: "USER_NOT_FOUND", success: false },
            { status: 404 }
        );
    }

    req.user = user;

    return NextResponse.next();
}