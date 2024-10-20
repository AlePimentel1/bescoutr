import { Chat } from "@/models/Chat";

interface Props {
    currentChat: string | null
    chat: Chat & { _id: string }
}
const ChatListItem = ({ chat, currentChat }: Props) => {

    // const router = useRouter();
    // const { data: messages } = useMessages(chat.id);
    // const lastMessage = messages?.[0];

    const handleClick = () => {
        console.log("clicked");
    }

    return (
        <div onClick={handleClick} className="p-4 border-b border-gray-200 flex items-center">
            <p className="text-white">{chat._id}</p>
        </div>
    );
}

export default ChatListItem;