import {
    Card,
    CardContent,
    CardDescription,
    CardTitle
} from "@/components/ui/card"
import { RectangleVertical } from "lucide-react"

interface TrendingPlayerCardProps {
    name: string
    lastname: string
    countryFlag: string
    position: string
    image: string
    age: number
    role: string
    teamFlag: string
    bsIndex: number
}

export default function TrendingPlayerCard({ name, lastname, countryFlag, position, image, age, role, teamFlag, bsIndex }: TrendingPlayerCardProps) {
    return (
        <Card className="bg-night-sky-400 border-none rounded-2xl">
            <CardContent className="flex flex-row gap-2 p-3 items-center h-[140px]">
                <div className="relative flex flex-col items-center gap-0 w-20 h-24">
                    <img src={image} alt={`${name} photo`} className="w-auto h-full object-cover rounded-xl" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-row items-start">
                        <RectangleVertical size={50} />
                        <div className="flex flex-col">
                            <span className="flex flex-row gap-2 items-center">
                                <span>
                                    <img src={countryFlag} alt={`${name} country flag`} className="w-auto h-3" />
                                </span>
                                <span>
                                    <CardDescription className="text-[12px] text-white">{position}</CardDescription>
                                </span>
                            </span>
                            <CardTitle className="text-[14px] text-white font-normal flex flex-col">{name} <strong className="text-[15px]">{lastname}</strong></CardTitle>
                        </div>
                    </div>
                    <div className="flex flex-row items-baseline gap-1">
                        <div className="">
                            <div className="flex flex-col items-center justify-between rounded-sm bg-white bg-opacity-10 text-white px-2 w-fit h-[45px]">
                                <p className="text-[12px]">Age</p>
                                <p className="font-medium text-[18px]">{age}</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col justify-between rounded-sm bg-white bg-opacity-10 text-white px-2 h-[45px]">
                                <p className="text-[12px]">Role</p>
                                <p className="font-medium text-[14px]">{role}</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-col justify-between items-center rounded-sm bg-white bg-opacity-10 text-white px-2 w-fit h-[45px]">
                                <p className="text-[12px]">BS Index</p>
                                <p className="font-medium text-[18px]">{bsIndex}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
