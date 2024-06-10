import User from "@/models/User";
import VerificationToken from "@/models/VerificationToken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { token: string } }) {
    const { token } = params

    try {

        const verifyToken = await VerificationToken.findOne({
            token: token,
            createdAt: { $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) }
        }).populate('user');

        if (!verifyToken) return NextResponse.json({ message: "Invalid token", success: false }, { status: 400 });

        await User.findByIdAndUpdate(verifyToken.user._id as mongoose.Types.ObjectId, { active: true });
        await VerificationToken.findByIdAndUpdate(verifyToken._id as mongoose.Types.ObjectId, { activatedAt: new Date() });

        const host = req.headers.get("host");
        const url = new URL(`http://${host}/sign-in`);

        return NextResponse.redirect(url, { status: 302 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}