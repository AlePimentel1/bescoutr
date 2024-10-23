'use client'
import { Bell } from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { SearchDialog } from './search/SearchDialog'
import { SettingsDropdown } from './settings/SettingsDropdown'
import { useSession } from 'next-auth/react'

interface HeaderProps {
    searchRightElement?: React.ReactNode
}

export default function Header({ searchRightElement }: HeaderProps) {
    const [openSearch, setOpenSearch] = useState(false)
    const { data } = useSession()
    const { user } = data || {}
    return (
        <div className='relative flex flex-row justify-between items-center py-4 gap-1' id='mainHeader'>
            <div className='flex-1 flex flex-row items-center justify-center'>
                <SearchDialog />
                {searchRightElement}
            </div>
            <div className='flex flex-row gap-4 items-center w-[350px]'>
                <span className='flex items-center justify-center p-2 h-10 w-10 rounded-full bg-white bg-opacity-5'>
                    <Bell size={20} className='text-white' />
                </span>
                <div className='flex flex-row gap-2 items-center'>
                    <Avatar className='border'>
                        <AvatarImage src={user?.image ?? ''} />
                        <AvatarFallback className='bg-secondary text-white'>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className='flex flex-col'>
                        <p className='text-white'>{user?.firstName} {user?.lastName}</p>
                        <SettingsDropdown />
                    </span>
                </div>
            </div>
        </div>
    )
}
