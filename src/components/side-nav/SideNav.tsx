'use client'
import usePathnameWithoutIntl from "@/hooks/usePathnameWithoutIntl"
import { cn } from "@/lib/utils"
import { Menu, PanelRightOpen } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import NavBar from "../nav/NavBar"
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';

interface SideNavProps {
    isCollapsed?: boolean
    openMenu?: boolean
}

const SideNav = ({ openMenu = false }: SideNavProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const slug = usePathnameWithoutIntl()

    const handleMenuToggle = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('sideNavOpen', newState.toString()); // Guardar el nuevo estado en localStorage
    };

    useEffect(() => {
        const savedState = localStorage.getItem('sideNavOpen');
        setIsCollapsed(savedState ? savedState === 'true' : false);
    }, []);


    return (
        <div className="flex flex-col">
            {/* THIS IS THE HEADER ON MOBILE */}
            <header id="mobile-nav"
                className={cn("w-full flex lg:hidden items-center h-[50px] text-white bg-white bg-opacity-5 justify-between px-5 shrink-0")}
            >
                <Menu />
            </header>
            {/* THIS IS THE HEADER ON LAPTOP */}
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
                <div className={`flex w-max lg:left-0 ${openMenu ? "left-0" : "-left-full"} duration-300 ease-in-out bg-white bg-opacity-5 h-[100vh]`}>
                    <div className={`w-full`}>
                        <aside className={`flex flex-col lg:left-0  h-[100vh] overflow-y-auto`}>
                            <div className={`w-[260px] ${isCollapsed ? "lg:w-[68px] flex flex-col items-center" : "lg:w-[260px] px-4"
                                } h-full shrink-0 relative duration-300 bg-transparent ease-out items-center`}>
                                <div className="flex flex-col shrink-0 w-full">
                                    <Link href={'/'} className="my-8">
                                        <div className="flex h-fit justify-center items-center">
                                            <img
                                                src="/isotipo.webp"
                                                alt="BeScoutr logo minimized"
                                                className={`w-8 h-auto transition-transform duration-300 ${isCollapsed ? "lg:flex hidden" : "scale-0 hidden"}`}
                                            />
                                            <img
                                                src="/imagotipo.webp"
                                                alt="BeScoutr logo"
                                                className={`w-[160px] transition-transform duration-300 ${isCollapsed ? "lg:scale-0 lg:hidden" : ""} flex`}
                                            />
                                        </div>
                                    </Link>
                                </div>
                                {/* BUTTON TO CLOSE THE MENU */}
                                <Button
                                    onClick={() => handleMenuToggle()}
                                    variant={'ghost'}
                                    className={`absolute ${isCollapsed ? 'lg:hidden' : 'right-2 top-2 lg:flex hidden '} z-[11] hover:bg-transparent p-0 h-fit w-fit`}>
                                    <PanelRightOpen size={20} className="text-neutral-500" />
                                </Button>
                                {/* NAVIGATION BAR */}
                                <NavBar
                                    slug={slug}
                                    handleOpenMenu={handleMenuToggle}
                                    isMenuCollapsed={isCollapsed}
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