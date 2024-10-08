import { NextRequest } from "next/server";
import { User } from "./next.auth";

export interface SafeNextRequest extends NextRequest {
    user: User
}

export interface signUpData {
    email: string;
    password: string;
}

export interface ChatMessage {
    message: string;
}

