import { useChatStore } from "@/store/chat";
import ChatListItem from "./chat-list-item";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CustomTabs from "@/components/ui/customs/custom-tabs";
import { useTranslations } from "next-intl";
import AllChats from "./chat-types/all-chats";
import { Input } from "@/components/ui/input";
import { PlusSquare, Search } from "lucide-react";

const ChatsList = () => {
    const { chats, setChats, currentChat } = useChatStore();
    const dict = useTranslations("Chat.ChatList");

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
        <div className="flex flex-col bg-white/10 h-full w-full md:w-[450px] items-center">
            <CustomTabs
                defaultValue="all"
                tabsListClassName="justify-between gap-0"
                tabClassName="flex flex-col gap-3 pt-4 h-full"
                tabsTriggerClassName="w-full"
                tabsContentClassName="flex-1 px-2 h-full"
                tabs={[
                    {
                        value: "all",
                        label: dict("tab.all"),
                        content: <AllChats isLoading={isLoading || isPending} chats={chats} currentChat={currentChat} />,
                    },
                    {
                        value: "personal",
                        label: dict("tab.personal"),
                        content: <AllChats isLoading={isLoading || isPending} chats={chats} currentChat={currentChat} />
                    },
                    {
                        value: "groups",
                        label: dict("tab.groups"),
                        content: <AllChats isLoading={isLoading || isPending} chats={chats} currentChat={currentChat} />
                    },
                ]}
                childrenBeforeContent={
                    <div className="px-2 flex gap-2">
                        <Input
                            placeholder={dict("search")}
                            className="w-full border-0"
                        />
                    </div>
                }
            />
        </div>
    );
}

export default ChatsList;