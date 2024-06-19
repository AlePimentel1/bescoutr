'use client'
import ChatLayout from '@/components/chat/ChatLayout';
import { env } from '@/env';
import useSocket from '@/hooks/useSocket';
import { useSession } from 'next-auth/react';
import React from 'react'

function ChatPage() {
    const { sendMessage } = useSocket();
    const { data: session, status } = useSession({ required: true, })

    return (
        <div className="h-screen" >
            <ChatLayout />
        </div>
    )
}

export default ChatPage
