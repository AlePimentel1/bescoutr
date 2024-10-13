import { useChatStore } from "@/store/chat"
import { useEffect } from "react"

const ChatLayout = () => {
    const { currentChat, exitChat } = useChatStore()

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
                    <div className="flex items-center justify-center h-full">
                        <p className="text-white">Select a chat</p>
                    </div>
                )}
            </div>
        </div >
    )
}

export default ChatLayout