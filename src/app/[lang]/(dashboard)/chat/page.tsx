'use client'
import FlexibleLayout from "@/components/ui/customs/flexible-layout";
import { useSearchParams } from "next/navigation";

export default function MessagesPage() {
    const searchParams = useSearchParams()
    const chatId = searchParams.get('id')

    return (
        <FlexibleLayout
            childrenClassName="flex h-full gap-8">
            <h1 className="text-white w-fit">Messages</h1>
            <h2 className="text-white w-full">{chatId ?? 'NO HAY CHAY ABIERTO'}</h2>
        </FlexibleLayout>
    );
}
