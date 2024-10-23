import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils"

interface Props {
    skeletonContainerClassName?: string;
    skeletonClassName?: string;
    skeletonCount: number;
}

const SearchSkeleton = ({ skeletonContainerClassName, skeletonClassName, skeletonCount }: Props) => {
    return Array.from({ length: skeletonCount }).map((_, index) => (
        <div className={cn("w-full h-4", skeletonContainerClassName)} key={index}>
            <Skeleton className={cn("w-full h-full opacity-10", skeletonClassName)} />
        </div>
    ))
}

export default SearchSkeleton;