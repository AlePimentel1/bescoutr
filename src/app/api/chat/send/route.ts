import { safeApiMiddleware } from '@/app/api/middlewares/safeApi';
import dbConnect from "@/lib/mongoDb";
import { pusherSever } from '@/lib/pusher';
import Chat from '@/models/Chat';
import Message from '@/models/Message';
import { NextResponse } from "next/server";
import { z } from "zod";

const messageValidator = z.object({
    chatId: z.string(),
    text: z.string(),
});

export async function POST(req: SafeNextRequest) {
    await dbConnect();
    const safeAuth = await safeApiMiddleware(req);
    if (safeAuth.status !== 200) return safeAuth;
    try {

        const body = await req.json()
        const zBody = messageValidator.safeParse(req.body);
        if (!zBody.success) return NextResponse.json({ message: zBody.error, success: false }, { status: 400 })

        const { text, chatId } = zBody.data;

        const existingChat = await Chat.findById(chatId);
        if (!existingChat) return NextResponse.json({ message: "CHAT_NOT_FOUND", success: false }, { status: 404 });

        let receiversIds = [];
        if (existingChat.isGroup) {
            receiversIds = existingChat.members.filter(member => member.toString() !== req.user.id.toString());
        } else {
            const receiver = existingChat.members.find(member => member.toString() !== req.user.id.toString());
            if (!receiver) return NextResponse.json({ message: "NOT_A_MEMBER", success: false }, { status: 403 });
            receiversIds.push(receiver);
        }

        const sanitizedText = text.trim();
        if (!sanitizedText) return NextResponse.json({ message: "EMPTY_MESSAGE", success: false }, { status: 400 });

        const message = new Message({
            chatId,
            senderId: req.user.id,
            receiversIds,
            text: sanitizedText,
            status: "sent",
        })

        await message.save();
        await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

        pusherSever.trigger(`chat-${chatId}`, 'incoming-message', message);

        return NextResponse.json({ success: true, message: "Message sent" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "SERVER_ERROR", success: false }, { status: 500 });
    }
}