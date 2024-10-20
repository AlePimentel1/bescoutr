'use client'
import { pusherClient } from "@/lib/pusher"
import { Message } from "@/models/Message"
import { useChatStore } from "@/store/chat"
import { MessageCircleDashed } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

const ChatLayout = () => {
    const { currentChat, exitChat, messages, addMessage } = useChatStore()
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

    useEffect(() => {
        pusherClient.subscribe(`chat-${currentChat}`)

        const handleMessage = (message: Message) => {
            console.log(message)
            addMessage(message)
        }

        pusherClient.bind("incoming-message", handleMessage)

        return () => {
            pusherClient.unsubscribe(`chat-${currentChat}`)
            pusherClient.unbind("incoming-message", handleMessage)
        }
    }, [])
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex-1 bg-night-sky-900">
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