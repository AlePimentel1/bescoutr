import dbConnect from "@/lib/mongoDb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function safeApiMiddleware(req: NextRequest) {
    try {
        await dbConnect();
    } catch (error) {
        return NextResponse.json(
            { message: "DB_CONNECTION_ERROR", success: false },
            { status: 500 }
        );
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        return NextResponse.json(
            { message: "UNAUTHORIZED", success: false },
            { status: 401 }
        );
    }

    return NextResponse.next();
}