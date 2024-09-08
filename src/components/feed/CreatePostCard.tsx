'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CalendarClock, Image, ImagePlay, List, MapPin, Smile } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export default function CreatePostCard() {
    const [post, setPost] = useState('')
    const { data } = useSession()
    const { user } = data || {}
    const dict = useTranslations('Feed.CreatePostCard')

    return (
        <div className="w-full mx-auto bg-white/10 rounded-xl px-4 py-6">
            <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                    <AvatarImage className='border' src={user?.image ?? ''} />
                    <AvatarFallback className='bg-secondary text-white'>{user?.username[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder={dict('placeholder')}
                            className="flex-grow bg-white/10 border-none text-white placeholder:text-white/50 "
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                        />
                        <Button variant="ghost" size="icon" className="text-white p-2 hover:bg-white/10 hover:text-blue-500">
                            <Smile size={20} />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                            <Button variant="ghost" type='button' size="icon" className="text-white p-2 hover:bg-white/10 hover:text-blue-500">
                                <Image size={20} />
                            </Button>
                            <Button variant="ghost" type='button' size="icon" className="text-white p-2 hover:bg-white/10 hover:text-blue-500">
                                <ImagePlay size={20} />
                            </Button>
                            <Button variant="ghost" type='button' size="icon" className="text-white p-2 hover:bg-white/10 hover:text-blue-500">
                                <List size={20} />
                            </Button>
                            <Button variant="ghost" type='button' size="icon" className="text-white p-2 hover:bg-white/10 hover:text-blue-500">
                                <CalendarClock size={20} />
                            </Button>
                            <Button variant="ghost" type='button' size="icon" className="text-white p-2 hover:bg-white/10 hover:text-blue-500">
                                <MapPin size={20} />
                            </Button>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white" type='submit'>
                            {dict('submit')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}