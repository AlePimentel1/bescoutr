import ChatLayout from "@/components/chat/chat-layout/ChatLayout";
import ChatsList from "@/components/chat/chats-list/ChatsList";
import FlexibleLayout from "@/components/ui/customs/flexible-layout";

export default function MessagesPage() {
    return (
        <FlexibleLayout
            childrenClassName="flex h-full"
            withoutHeader
        >
            <ChatsList />
            <ChatLayout />
        </FlexibleLayout>
    );
}
