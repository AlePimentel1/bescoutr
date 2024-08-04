'use client'
import usePathnameWithoutIntl from "@/hooks/usePathnameWithoutIntl"
import { cn } from "@/lib/utils"
import { PanelRightOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import NavBar from "../nav/NavBar"
import Header from '@/components/header/Header';

interface SideNavProps {
    isCollapsed?: boolean
    openMenu?: boolean
}

const SideNav = ({ isCollapsed = false, openMenu = false }: SideNavProps) => {
    const [expanded, setExpanded] = useState(true)
    const slug = usePathnameWithoutIntl()

    return (
        <div className="flex flex-col min-h-screen m-auto">
            {/* <header
                className={cn("w-full flex border-b lg:hidden top-0 fixed items-center h-[50px] bg-white justify-between px-5 shrink-0")}
            >
                <PanelRightOpen /> */}
            {/* <ButtonToOpenMenu onClick={() => handleOpenMenu(!openMenu)} /> */}
            {/* </header> */}
            <main className={`bg-night-sky-900 duration-75 flex flex-grow`}
            // style={{
            //     paddingLeft: isMobile ? '0px' : isCollapsed ? !!isSubMenuActive ? !isMobile ? `calc(68px + ${paddingToUse}px)` : '0px' : '68px' : !!isSubMenuActive && !isMobile ? `calc(68px + ${paddingToUse}px)` : '210px'
            // }}
            >
                <div className={`flex w-max lg:left-0 ${openMenu ? "left-0" : "-left-full"} duration-200 ease-in-out bg-white bg-opacity-5 h-[100vh]`}>
                    <div className={`w-full`}>
                        <aside className={`flex flex-col lg:left-0  h-[100vh] overflow-y-auto`}>
                            <div className={`w-[288px] ${isCollapsed ? "lg:w-[68px]" : "lg:w-[288px]"
                                } h-full shrink-0 relative duration-100 bg-transparent ease-out px-4`}>
                                <div className="flex flex-col shrink-0 w-full">
                                    <Link href={'/'}>
                                        <div className="flex h-fit p-4 py-8 justify-center items-center">
                                            {/* <img
                          src="/logo-min.png"
                          alt="Ventia logo minimized"
                          className={`w-7 transition-transform duration-100 ${isCollapsed ? "lg:flex hidden" : "scale-0 hidden"}`}
                        /> */}
                                            <img
                                                src="/imagotipo.webp"
                                                alt="BeScoutr logo"
                                                className={`w-[160px] transition-transform duration-100 ${isCollapsed ? "lg:scale-0 lg:hidden" : ""} flex`}
                                            />
                                        </div>
                                    </Link>
                                    {/* <ButtonToOpenMenu
                      onClick={() => handleCollapsedMenu()}
                      className={`absolute ${isCollapsed ? 'lg:hidden' : 'right-2 top-[19px] lg:flex hidden'} z-[11] `}
                    /> */}
                                </div>
                                <NavBar
                                    slug={slug}
                                    handleOpenMenu={() => console.log('hola')}
                                />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SideNav