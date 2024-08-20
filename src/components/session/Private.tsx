'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateProps {
    children: React.ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
    const { status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login')
    }, [status, router])

    if (status === 'authenticated') return <>{children}</>

    return null
}