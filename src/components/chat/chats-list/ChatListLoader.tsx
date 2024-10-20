import { Skeleton } from "@/components/ui/skeleton"

const ChatListLoader = () => {
    return Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-20 w-full">
            <Skeleton className="w-full h-full opacity-15 bg-white/10" />
        </div>
    ))
}

export default ChatListLoader