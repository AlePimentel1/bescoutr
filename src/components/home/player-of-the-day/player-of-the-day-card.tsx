'use client'
import { getPlayerOfTheDay } from "@/actions/home";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query";
// import { playerOfTheDay } from "@/helpers/fakeData";
import { Circle } from "lucide-react";
import { useTranslations } from "next-intl"
import { PlayerOfTheDaySkeleton } from "./player-of-th-day-skeleton";

export default function PlayerOfTheDayCard() {
    const dict = useTranslations('HomePage.PlayerOfTheDay');

    const { data, isLoading, error } = useQuery({
        queryKey: ['playerOfTheDay'],
        queryFn: getPlayerOfTheDay,
    });

    const { playerOfTheDay } = data || {};

    return (
        <>
            {isLoading ? (
                <div>
                    <PlayerOfTheDaySkeleton />
                </div>
            ) : error ? (
                <div>
                    <p>{error.message}</p>
                </div>
            ) : (
                <Card className="relative flex flex-col w-full border-none bg-night-sky-900/80 h-[300px] bg-[url('/textures/hexagons.svg')] bg-center bg-contain">
                    <CardContent className="flex-grow flex flex-row justify-between p-6">
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-5">
                                <span className="flex items-center justify-center bg-gradient-to-b from-secondary to-secondary-900 w-fit py-2 px-4 rounded-lg">
                                    <p className="tracking-wide text-white">{dict('title')}</p>
                                </span>
                                <div className="flex flex-row gap-2">
                                    <span className="flex items-center justify-center">
                                        <img src={playerOfTheDay.nationality} alt="Player of the day country flag" className="w-auto h-8 rounded-md border-2 border-white" />
                                    </span>
                                    <span className=" flex items-center justify-center">
                                        <img src={playerOfTheDay.teamFlag} alt="Player of the day team flag" className="w-auto h-10 rounded-full border-2 border-white  bg-white" />
                                    </span>
                                </div>
                            </div>
                            <CardTitle className="text-[32px] text-white font-normal">{playerOfTheDay.firstname.split(' ')[0]} <strong>{playerOfTheDay.lastname}</strong></CardTitle>
                            <div className="flex flex-row gap-2">
                                <span className="flex flex-row gap-1 items-center justify-center">
                                    <div className="bg-yellow-500 h-2 w-2 rounded-full"></div>
                                    <CardDescription className="text-[14px] text-white">{playerOfTheDay.position}</CardDescription>
                                </span>
                                <Circle size={20} className="text-white" />
                                <CardDescription className="text-[14px] text-white">{playerOfTheDay.role}</CardDescription>
                            </div>
                            <Button>{dict('button')}</Button>
                        </div>
                        <div className="flex flex-row gap-2 justify-center">
                            <img src={playerOfTheDay.photo} alt="Player photo" className="w-auto h-36 border-2 border-primary shadow-sm rounded-full" />
                        </div>
                    </CardContent>
                </Card >
            )
            }
        </>

    )
}
