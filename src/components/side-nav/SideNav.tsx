'use client'
import usePathnameWithoutIntl from "@/hooks/usePathnameWithoutIntl"
import { cn } from "@/lib/utils"
import { Menu, PanelRightOpen } from "lucide-react"
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
        <div className="flex flex-col">
            {/* THIS IS THE HEADER ON MOBILE */}
            <header id="mobile-nav"
                className={cn("w-full flex lg:hidden items-center h-[50px] text-white bg-white bg-opacity-5 justify-between px-5 shrink-0")}
            >
                <Menu />
                {/* <ButtonToOpenMenu onClick={() => handleOpenMenu(!openMenu)} /> */}
            </header>
            <main className={`duration-75 hidden lg:flex lg:flex-grow lg:overflow-y-auto relative`}
            // style={{
            //     paddingLeft: isMobile ? '0px' : isCollapsed ? !!isSubMenuActive ? !isMobile ? `calc(68px + ${paddingToUse}px)` : '0px' : '68px' : !!isSubMenuActive && !isMobile ? `calc(68px + ${paddingToUse}px)` : '210px'
            // }}
            >
                <span
                    className="w-[75%] h-10 -top-[30px] bg-caribbean-green-500"
                    style={{
                        position: 'absolute',
                        left: '50%',
                        background: 'radial-gradient(circle, rgba(98,231,138,0.5) 20%, rgba(98,231,138,0.4) 70%)',
                        borderRadius: '0 0 80px 80px',
                        boxShadow: '0 0 80px 30px rgba(98,231,138,0.4)',
                        transform: 'translate(-50%, -50%)',
                        zIndex: -999,
                    }}
                />

                <div className={`flex w-max lg:left-0 ${openMenu ? "left-0" : "-left-full"} duration-200 ease-in-out bg-white bg-opacity-5 h-[100vh]`}>
                    <div className={`w-full`}>
                        <aside className={`flex flex-col lg:left-0  h-[100vh] overflow-y-auto`}>
                            <div className={`w-[260px] ${isCollapsed ? "lg:w-[68px]" : "lg:w-[260px]"
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