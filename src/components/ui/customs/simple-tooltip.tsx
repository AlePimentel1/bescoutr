import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

interface Props {
    children: React.ReactNode;
    content: React.ReactNode;
}

export function SimpleToolTip({
    children,
    content,
}: Props) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className="bg-neutral-200 border-neutral-400">
                {content}
            </TooltipContent>
        </Tooltip>
    )
}
