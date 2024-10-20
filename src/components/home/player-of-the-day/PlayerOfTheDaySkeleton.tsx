import { Skeleton } from "@/components/ui/skeleton"

export const PlayerOfTheDaySkeleton = () => {
    return (
        <div className="flex flex-col w-full h-[300px]">
            <Skeleton className="w-full h-full opacity-10" />
        </div>
    )
}