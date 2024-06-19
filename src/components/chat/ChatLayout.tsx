import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import MessageArea from './MessageArea';

const ChatLayout = () => {
    const [messages, setMessages] = useState([])
    return (
        <div className="flex h-screen">
            <ChatList />
            <div className="flex flex-col flex-1">
                <ChatHeader />
                <MessageArea messages={messages} />
            </div>
        </div>
    );
};

export default ChatLayout;
