import { env } from "@/env";
import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";
import { hash } from "bcrypt";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type ResponseData = {
    message: string | Object;
    success: boolean;
};

const userSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have than 8 characters'),
});

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json()

        const zBody = userSchema.safeParse(body);
        if (!zBody.success) return NextResponse.json({ message: zBody.error, success: false }, { status: 400 })

        const { email, password } = zBody.data;

        const existingUserByEmail = await User.findOne({ email: email })
        if (existingUserByEmail) {
            return NextResponse.json({ message: `User with this email: ${email} already exists`, success: false }, { status: 400 })
        }

        const hashPassword = await hash(password, 10)

        const newUser = await new User({
            email,
            password: hashPassword,
            accountType: 'fan'
        }).save()

        const token = await new VerificationToken({
            token: `${randomUUID()}-${randomUUID()}`.replace(/-/g, ''),
            user: newUser._id
        }).save()

        return NextResponse.json({ message: "User created successfully", success: true }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}