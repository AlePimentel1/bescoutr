'use client'
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { TooltipProvider } from "@/components/ui/tooltip"
import { SideBarTooltip } from "../nav/NavLink";
import { useTranslations } from "next-intl";

interface CreateReportButtonProps {
    isMenuCollapsed: boolean
}

export default function CreateReportButton({ isMenuCollapsed = false }: CreateReportButtonProps) {
    const dict = useTranslations('Navigation')
    return (
        <TooltipProvider>
            <SideBarTooltip content={dict('CreateReport')} active={isMenuCollapsed}>
                <Button className={`${isMenuCollapsed ? 'p-0' : ''} w-full`} onClick={() => console.log('holaa')}>
                    {!isMenuCollapsed ? 'Create new report' : <Plus size={18} strokeWidth={3} className="text-neutral-500" />}
                </Button>
            </SideBarTooltip>
        </TooltipProvider>
    )
}
