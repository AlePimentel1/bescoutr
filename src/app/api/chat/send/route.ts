import { env } from "@/env";
import dbConnect from "@/lib/mongoDb";
import Interaction, { ChatMessage } from "@/models/Interaction";
import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const chatMessageSchema = z.object({
    message: z.string().min(1).max(1000),
});

export async function POST(req: NextRequest) {
    await dbConnect();
    try {

        const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });
        console.log("JSON Web Token", token)

        const body = await req.json()

        const zBody = chatMessageSchema.safeParse(body);
        if (!zBody.success) return NextResponse.json({ message: zBody.error, success: false }, { status: 400 })

        const { message } = zBody.data;

        console.log('User data:', zBody.data);

        return NextResponse.json({ message: "OK", success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}