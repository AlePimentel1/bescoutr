import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function TableCellLoader({ headers, elements = 12 }: { headers: Array<any>, elements?: number }) {
    return <>
        {
            new Array(elements).fill(null).map((_, inx) => {
                return <TableRow className={`h-6 border-none max-h-6 w-full opacity-10`}
                    key={inx * 30}>
                    {
                        headers.map((_, inx) => {
                            return <TableCell
                                key={inx}
                                className={cn('h-[45px] min-h-[45px] relative p-0 px-3 py-1')}>
                                <div className="max-h-[45px]  justify-start text-[13px]  text-gray-500 font-medium flex items-center max-w-10 h-full truncate">
                                    <Skeleton className="w-[100%] h-[50%]" />
                                </div>
                            </TableCell>
                        })
                    }
                </TableRow>
            })
        }
    </>
}