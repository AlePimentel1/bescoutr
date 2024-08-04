import { Bell, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Header() {
    return (
        <div className='flex flex-row justify-between p-4 gap-4'>
            <div className='relative flex-1'>
                <Input placeholder='Search' className='bg-opacity-5 bg-white border-none rounded-xl' />
                <Search size={20} className='absolute top-1/2 transform -translate-y-1/2 right-3 text-white' />
            </div>
            <div className='flex flex-row gap-4 items-center'>
                <span className='flex items-center justify-center p-2 h-10 w-10 rounded-full bg-white bg-opacity-5'>
                    <Bell size={20} className='text-white' />
                </span>
                <div className='flex flex-row gap-2 items-center'>
                    <Avatar color='gray'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='flex flex-col'>
                        <p className='text-white'>Ignacio Portela</p>
                        <p className='text-white text-[13px]'>Profile setttings</p>
                    </span>
                </div>
            </div>
        </div>

    )
}
