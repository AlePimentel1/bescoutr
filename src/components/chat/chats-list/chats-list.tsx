import { useChatStore } from "@/store/chat";
import ChatListItem from "./chat-list-item";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ChatsList = () => {
    const { chats, setChats, currentChat } = useChatStore();

    const { data, isLoading, isPending } = useQuery({
        queryKey: ["get-chats"],
        queryFn: () => fetch("/api/chats").then((res) => res.json()),
    })

    useEffect(() => {
        if (data) {
            setChats(data);
        }
    }, [data])




    return (
        <div className="flex flex-col bg-white/10 w-full md:w-[450px] items-center">
            {isLoading || isPending ? (
                <p>Loading...</p>
            ) : chats.length > 0 ? (
                chats.map((chat) => (
                    <ChatListItem key={chat._id} currentChat={currentChat} chat={chat} />
                ))
            ) : (
                <p>No chats</p>
            )}
        </div>
    );
}

export default ChatsList;