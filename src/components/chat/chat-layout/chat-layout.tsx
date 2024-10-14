import { useChatStore } from "@/store/chat"
import { MessageCircleDashed, MessageSquareDashed, MessagesSquare } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

const ChatLayout = () => {
    const { currentChat, exitChat } = useChatStore()
    const dict = useTranslations("Chat.ChatLayout")

    useEffect(() => {

        const handleExitChat = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                exitChat()
            }
        }

        window.addEventListener("keydown", handleExitChat)

        return () => {
            window.removeEventListener("keydown", handleExitChat)
        }
    }, [exitChat])
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex-1 overflow-y-auto bg-night-sky-900">
                {currentChat ? (
                    <div className="p-4">
                        <p className="text-white">Messages</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <MessageCircleDashed className="text-secondary" size={140} />
                        <p className="text-white">{dict("noChatSelected")}</p>
                    </div>
                )}
            </div>
        </div >
    )
}

export default ChatLayout