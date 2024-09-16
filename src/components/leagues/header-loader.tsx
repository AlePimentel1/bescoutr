import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

export default function TableHeaderLoader() {
    return (
        <div className="flex flex-row w-full justify-between items-center opacity-10">
            <Skeleton className="w-[10%] h-4" />
            <span className="flex gap-2 items-center w-[20%]">
                <Skeleton className="w-12 h-12" />
                <Skeleton className="w-28 h-6" />
            </span>
            <Skeleton className="w-[10%] h-4" />

        </div>
    )
}
