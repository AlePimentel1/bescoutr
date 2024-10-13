import { Chat } from "@/models/Chat";
import { create } from "zustand";

interface ChatStore {
    chats: (Chat & { _id: string })[];
    setChats: (chats: (Chat & { _id: string })[]) => void;
    currentChat: string | null;
    setCurrentChat: (chatId: string) => void;
    exitChat: () => void;
}


export const useChatStore = create<ChatStore>((set) => ({
    chats: [],
    setChats: (chats) => set({ chats }),
    currentChat: null,
    setCurrentChat: (chatId) => set({ currentChat: chatId }),
    exitChat: () => set({ currentChat: null }),
}));

