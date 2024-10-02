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

    // { "id": 51385, "name": "W. Aguerre", "firstname": "Washington Omar", "lastname": "Aguerre Lima", "age": 31, "birth": { "date": "1993-04-23", "place": "Artigas", "country": "Uruguay" }, "nationality": "Uruguay", "height": "187 cm", "weight": "93 kg", "injured": false, "photo": "https://media.api-sports.io/football/players/51385.png" }
    return (
        <>
            {isLoading ? (
                <div>
                    <PlayerOfTheDaySkeleton />
                </div>
            ) : (
                <Card className="relative flex flex-col w-full border-none bg-night-sky-900/80 h-[300px] bg-[url('/textures/hexagons.svg')] bg-center bg-contain">
                    {/* <CardHeader className="flex flex-row relative">
                        <div className="flex flex-row gap-5">
                            <span className="flex items-center justify-center bg-gradient-to-b from-[#243853] to-[#040B15] w-fit py-2 px-4 rounded-lg">
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
                    </CardHeader > */}
                    {/* <CardContent className="flex-grow grid grid-cols-2">
                        <div className="flex flex-col">
                            <CardTitle className="text-[32px] text-white font-normal">{playerOfTheDay.firstname.split(' ')[0]} <strong>{playerOfTheDay.lastname}</strong></CardTitle>
                            <div className="flex flex-row gap-2">
                                <span className="flex flex-row gap-1 items-center justify-center">
                                    <div className="bg-yellow-500 h-2 w-2 rounded-full"></div>
                                    <CardDescription className="text-[14px] text-white">{playerOfTheDay.position}</CardDescription>
                                </span>
                                <Circle size={20} className="text-white" />
                                <CardDescription className="text-[14px] text-white">{playerOfTheDay.role}</CardDescription>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 justify-center ">
                            <span className=" flex items-center justify-center w-full">
                                <img src={playerOfTheDay.photo} alt="Player photo" className="w-auto h-16 bg-transparent" />
                            </span>
                        </div>

                    </CardContent> */}
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
                            {/* <span className=" flex items-center justify-center w-full rounded-full"> */}
                            <img src={playerOfTheDay.photo} alt="Player photo" className="w-auto h-36 border-2 border-primary shadow-sm rounded-full" />
                            {/* </span> */}
                        </div>

                    </CardContent>
                    {/* <CardFooter className="flex justify-between">
                        <Button>{dict('button')}</Button>
                    </CardFooter> */}
                </Card >
            )
            }
        </>

    )
}
