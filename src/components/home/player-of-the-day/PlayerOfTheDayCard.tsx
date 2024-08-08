
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { playerOfTheDay } from "@/helpers/fakeData";
import { Circle } from "lucide-react";
import { useTranslations } from "next-intl"

export default function PlayerOfTheDayCard() {
    const dict = useTranslations('HomePage.PlayerOfTheDay');
    return (
        <Card className="flex flex-col w-full bg-blue-200 border-blue-200 h-[300px]">
            <CardHeader className="flex flex-row relative">
                <div className="flex flex-row gap-5">
                    <span className="flex items-center justify-center bg-gradient-to-b from-[#243853] to-[#040B15] w-fit py-2 px-4 rounded-lg">
                        <p className="tracking-wide">{dict('title')}</p>
                    </span>
                    <div className="flex flex-row gap-2">
                        <span className="flex items-center justify-center">
                            <img src={playerOfTheDay.countryFlag} alt="Player of the day country flag" className="w-12 h-8 rounded-md border-2 border-white" />
                        </span>
                        <span className=" flex items-center justify-center">
                            <img src={playerOfTheDay.teamFlag} alt="Player of the day team flag" className="w-auto h-10 rounded-full border-2 border-white  bg-white" />
                        </span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <CardTitle className="text-[32px] text-white font-normal">{playerOfTheDay.name} <strong>{playerOfTheDay.lastname}</strong></CardTitle>
                <div className="flex flex-row gap-2">
                    <span className="flex flex-row gap-1 items-center justify-center">
                        <div className="bg-yellow-500 h-2 w-2 rounded-full"></div>
                        <CardDescription className="text-[14px] text-white">{playerOfTheDay.position}</CardDescription>
                    </span>
                    <Circle size={20} className="text-white" />
                    <CardDescription className="text-[14px] text-white">{playerOfTheDay.role}</CardDescription>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>{dict('button')}</Button>
            </CardFooter>
        </Card>
    )
}
