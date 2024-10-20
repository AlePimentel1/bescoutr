import { NextRequest } from "next/server";
import { User } from "./next.auth";

declare global {
    interface SafeNextRequest extends NextRequest {
        user: User
    }

    interface signUpData {
        email: string;
        password: string;
    }

    interface ChatMessage {
        message: string;
    }
}

