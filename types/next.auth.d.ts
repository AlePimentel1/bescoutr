import nextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        image: string;
        isComplete: boolean;
    }

    interface Session extends DefaultSession {
        user: {
            id: string;
            username: string;
            email: string;
            image: string;
            firstName: string;
            lastName: string;
            isComplete: boolean;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        email: string;
        image: string;
        isComplete: boolean;
    }
}

export type { User, Session } from "next-auth";