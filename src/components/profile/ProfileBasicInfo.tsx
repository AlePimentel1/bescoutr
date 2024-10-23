'use client'
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfileBasicInfo = () => {
    const { data } = useSession();
    const { user } = data || {};
    const dict = useTranslations("Profile");
    return (
        <div className="flex flex-col md:flex-row w-full h-full gap-6">
            <div className="bg-white/5 rounded-lg pt-4 px-6 flex flex-col gap-6">
                <div className="flex flex-row gap-4 items-center">
                    <Avatar className='border h-24 w-24'>
                        <AvatarImage src={user?.image ?? ''} />
                        <AvatarFallback className='bg-secondary text-white'>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="flex flex-col gap-1">
                        <span className="flex flex-col">
                            <p className="text-white text-lg line-clamp-1 font-light">{user?.firstName}</p>
                            <p className="text-white text-2xl line-clamp-1">{user?.lastName}</p>
                        </span>
                        <Badge className="bg-white/10 text-neutral-200 p-1 px-2 w-fit items-center justify-center font-normal text-[10px] hover:bg-white/10">@{user?.username}</Badge>
                    </span>
                </div>
                <div className="flex flex-row gap-2">
                    <Badge className="bg-primary/10 text-primary w-full p-1 items-center justify-center font-normal hover:bg-primary/10">0 {dict("InfoCard.followers")}</Badge>
                    <Badge className="bg-primary/10 text-primary w-full p-1 items-center justify-center font-normal hover:bg-primary/10">0 {dict("InfoCard.following")}</Badge>
                </div>
            </div>
            <div className="flex-1 p-4">
                <p className="text-white"><strong>Username:</strong> <span>JohnDoe</span></p>
            </div>
        </div >
    )
}

export default ProfileBasicInfo;