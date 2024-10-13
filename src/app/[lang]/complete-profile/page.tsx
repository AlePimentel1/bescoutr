'use client'
import CompleteProfileSteps from "@/components/complete-profile/steps";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CompleteProfilePage = () => {
    const router = useRouter();
    const { data, status } = useSession({
        required: true,
        onUnauthenticated: () => {
            router.push('/login');
        }
    });

    useEffect(() => {
        if (data?.user?.isComplete) {
            router.push('/');
        }
    }, [data, router]);

    if (status === 'loading') {
        return <div className="flex h-screen w-screen justify-center items-center">
            <Loader2 size={64} className="text-secondary animate-spin" />
        </div>
    }

    return (
        <CompleteProfileSteps />
    );
};

export default CompleteProfilePage;