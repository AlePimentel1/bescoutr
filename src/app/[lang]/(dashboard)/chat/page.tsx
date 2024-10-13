'use client'
import ChatLayout from "@/components/chat/chat-layout/chat-layout";
import ChatsList from "@/components/chat/chats-list/chats-list";
import FlexibleLayout from "@/components/ui/customs/flexible-layout";
import { useSearchParams } from "next/navigation";

export default function MessagesPage() {
    const searchParams = useSearchParams()
    const chatId = searchParams.get('id')

    return (
        <FlexibleLayout
            childrenClassName="flex h-full">
            <ChatsList />
            <ChatLayout />
        </FlexibleLayout>
    );
}
