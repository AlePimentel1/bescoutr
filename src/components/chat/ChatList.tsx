'use client'
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';


const ChatList = () => {
    return (
        <div className="flex flex-col w-2/6 border-r-2 overflow-y-auto h-full">
            <div className="border-b-2 py-4 px-2 flex flex-row items-center justify-end">
                <Button type='button' variant={'default'}>
                    <Plus size={16} strokeWidth={3} />
                </Button>
            </div>
        </div>
    );
};

export default ChatList;