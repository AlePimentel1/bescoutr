import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"
import { format } from 'date-fns'

interface RecentNewsCardProps {
    title: string
    date: string
    image: string
}

export default function RecentNewsCard({ title, date, image }: RecentNewsCardProps) {
    return (
        <Card className="bg-white bg-opacity-5 border-none rounded-2xl">
            <CardContent className="flex flex-row gap-2 h-full p-3 items-center">
                <img src={image} alt={title} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-[14px] text-white">{title}</CardTitle>
                    <span className="flex flex-row gap-1 items-center">
                        <Calendar size={16} className="text-neutral-500" />
                        <CardDescription className="text-[12px] text-neutral-500">{format(date, 'MMM dd, yyy')}</CardDescription>
                    </span>
                    <span className="flex flex-row gap-1 items-center">
                        <Clock size={16} className="text-neutral-500" />
                        <CardDescription className="text-[12px] text-neutral-500">{format(date, 'hh:mm a')}</CardDescription>
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
