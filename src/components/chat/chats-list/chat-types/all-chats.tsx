import { Chat } from "@/models/Chat";
import ChatListItem from "../chat-list-item";
import ChatListLoader from "../chat-list-loader";

interface Props {
    currentChat: string | null;
    chats: (Chat & { _id: string })[];
    isLoading: boolean;
}
const AllChats = ({ currentChat, chats, isLoading }: Props) => {
    return (
        <div className="flex flex-col items-center h-full gap-2">
            {isLoading ? (
                <ChatListLoader />
            ) : chats.length > 0 ? (
                chats.map((chat) => (
                    <ChatListItem key={chat._id} currentChat={currentChat} chat={chat} />
                ))
            ) : (
                <p>No chats</p>
            )}
        </div>
    )

}

export default AllChats;