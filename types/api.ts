import { NextRequest } from "next/server";
import { IUser } from "@/models/User";

export interface SafeNextRequest extends NextRequest {
    user: IUser
}

export interface signUpData {
    email: string;
    password: string;
}

export interface ChatMessage {
    message: string;
}

