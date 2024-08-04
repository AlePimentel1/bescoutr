import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { SideBarTooltip } from "./NavLink"
import { useRouter } from "next/navigation"
import { TooltipProvider } from "../ui/tooltip"

interface NavItemProps {
    label: string
    children: React.ReactNode
    open: string[]
    isAccordion?: boolean
    value: string
    icon: React.ReactNode
    contentSlug?: string
    href: string
    toolTipContent?: string
    isItemSelected?: boolean
    isCollapsedMenu?: boolean
}

export default function NavItem({
    label,
    children,
    open,
    isAccordion = true,
    value,
    icon,
    href,
    toolTipContent,
    isItemSelected,
    isCollapsedMenu = false,
}: NavItemProps) {
    const router = useRouter()
    // const { handleChangeValue } = useMenu()

    // useEffect(() => {
    //     if (contentSlugs?.includes(slug) && !open.includes(value)) {
    //         const newValue = [...open]
    //         newValue.push(value)
    //         handleChangeValue(newValue)
    //     }
    // }, [isCollapsedMenu, slug, value])

    return <AccordionItem
        value={value}
        className={`border-none m-0 pb-0 w-full ${isCollapsedMenu ? `lg:border-b ${open?.includes(value) && isAccordion ? 'lg:bg-gray-100 lg:rounded-b-[4px] lg:rounded-t-[4px]' : 'duration-500'} ` : ""} `}
    >
        <div className={`flex`}>
            <TooltipProvider>
                <SideBarTooltip content={toolTipContent || label} active={isCollapsedMenu}>
                    <div className={`relative w-full items-center group flex ${isCollapsedMenu ? 'lg:w-[42px] h-[38px]' : 'gap-2'}`}>
                        {
                            isAccordion && <AccordionTrigger className={`absolute ${isCollapsedMenu ? '[&>span>svg]:w-[13px] [&>span>svg]:h-[13px] -left-[13px]' : '-left-[10px] w-4 [&>span>svg]:w-[12px] [&>span>svg]:h-[12px]'}  bottom-0 m-auto top-0 [&>svg]:hidden [&[data-state=open]>span>svg]:rotate-90 text-neutral-600`}>
                                <span>
                                    <ChevronRight className="transition-transform" />
                                </span>
                            </AccordionTrigger>
                        }
                        {
                            !isCollapsedMenu && isItemSelected && <span className={`absolute my-auto -left-[2.5px] h-[65%] w-1 bg-caribbean-green-500 rounded-l-2xl`}></span>
                        }
                        <Link
                            onClick={() => router.push(href)}
                            href={href}
                            className={cn(
                                // base styles
                                `flex items-center border-b-none m-0 w-full duration-200 relative [&[data-state=open]>div>div>div>span>svg]:rotate-90 py-[4px] lg:rounded-2xl [&>svg]:hidden 
                                ${isCollapsedMenu ?
                                    // collapsed styles (not open)
                                    `lg:px-0 lg:justify-center ${isItemSelected ?
                                        // collapsed styles and selected
                                        'lg:bg-primary lg:text-white hover:bg-primary/80' :
                                        // collapsed styles and not selected
                                        'lg:hover:bg-white lg:hover:bg-opacity-5'} flex lg:h-[38px] lg:items-center` :
                                    // not collapsed styles
                                    `hover:bg-white hover:bg-opacity-5 h-[56px] px-6  ${isItemSelected ? 'bg-white bg-opacity-5' : ''}`} 
                                ${isCollapsedMenu ? isItemSelected ?
                                    // collapsed styles and selected
                                    'lg:bg-primary' :
                                    // collapsed styles and not selected
                                    open?.includes(value) && isAccordion ? 'lg:bg-gray-200 lg:hover:bg-gray-200/60 h-[42px] w-full' : '' : ''}`
                            )}>
                            <div className={`flex items-center w-full gap-3 ${!isCollapsedMenu ? '' : 'lg:justify-center lg:h-full'} ${isItemSelected ? 'text-white' : 'text-neutral-500'}`}>
                                <div className={`text-start ${isCollapsedMenu ? 'lg:group-hover:text-white' : ``} flex items-center text-[13px] gap-1 font-medium`}>
                                    <div className={`${!isCollapsedMenu ? 'flex items-center gap-2' : 'lg:hidden'}`}>
                                        {icon}
                                        <span>
                                            {label}
                                        </span>
                                    </div>
                                    <div className={`flex group items-center ${isItemSelected ? 'lg:[&>div>svg]:text-white' : ''} [&>svg]:w-[17px]  [&>svg]:h-[17px] `}>
                                        <div className={`hidden ${isCollapsedMenu ? 'lg:flex' : ''}`}>
                                            {icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </SideBarTooltip >
            </TooltipProvider >
        </div >
        <AccordionContent
            className={`border-none p-0 m-0 ${isAccordion ? ' ' : 'lg:hidden'}`}>
            <div className={`flex-col flex  ${isCollapsedMenu ? 'lg:bg-gray-100 w-[42px] relative lg:rounded-b-[4px]' : ''} gap-[2px]  mt-[2px] `}>
                {children}
            </div>
        </AccordionContent>
    </AccordionItem >
}
