import React from 'react';

const ChatList = () => {
    return (
        <div className="flex flex-col w-2/6 border-r-2 overflow-y-auto h-full">
            <div className="border-b-2 py-4 px-2">
                <input
                    type="text"
                    placeholder="search chatting"
                    className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
            </div>
        </div>
    );
};

export default ChatList;
