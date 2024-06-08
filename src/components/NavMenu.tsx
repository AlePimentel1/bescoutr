'use client'
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
    const { data: session } = useSession();
    if (session) {
        return (
            <button
                onClick={() => signOut()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign out
            </button>
        );
    }
    return (
        <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Sign in
        </button>
    );
}

export default function NavMenu() {
    return (
        <nav className="flex justify-between items-center py-4 px-4">
            <div className="flex items-center">
                <img className="h-8" src="/logo.svg" alt="logo" />
                <h1 className="ml-2 text-xl font-bold">AgendApp</h1>
            </div>
            <AuthButton />
        </nav>
    )
}