'use client'
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateProps {
    children: React.ReactNode;
}

export const Private = ({ children }: PrivateProps) => {
    const { status, data } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        } else if (status === 'authenticated' && data?.user && !data.user?.isComplete) {
            router.push('/complete-profile')
        }
    }, [status, router])

    if (status === 'authenticated' && data?.user.isComplete) return <>{children}</>

    return <div className="flex h-screen w-screen justify-center items-center">
        <Loader2 size={64} className="text-secondary animate-spin" />
    </div>
}