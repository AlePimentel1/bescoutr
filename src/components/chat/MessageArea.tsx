import React from 'react';
import ChatBottomActions from './ChatBottomActions';

interface IMessageArea {
    messages: string[];
}

const MessageArea = ({ messages }: IMessageArea) => {
    return (
        <div className="flex flex-col flex-1 px-5 justify-between overflow-y-auto">
            <div className="flex flex-col mt-5">
                {messages?.map((message, index) => (
                    <div key={index} className="flex items-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                        <div className="ml-3 bg-gray-300 py-3 px-5 rounded-xl">
                            {message}
                        </div>
                    </div>
                ))}
            </div>
            <ChatBottomActions />
        </div>
    );
};

export default MessageArea;
