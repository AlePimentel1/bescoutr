'use client'

import usePathnameWithoutIntl from "@/hooks/usePathnameWithoutIntl"
import { cn } from "@/lib/utils"
import { Menu, PanelLeftOpen, PanelRightOpen } from "lucide-react"
import Link from "next/link"
import NavBar from "../nav/NavBar"
import Header from '@/components/header/Header';
import { Button } from '@/components/ui/button';
import { useMenuStore } from "@/store/menu"

const SideNav = () => {
    const { isCollapsed, isOpen, toggleCollapse, toggleOpen } = useMenuStore();
    // const isOpen = useMenuStore(state => state.isOpen);
    // const toggleOpen = useMenuStore(state => state.toggleOpen);
    // const isCollapsed = useMenuStore(state => state.isCollapsed);
    // const toggleCollapse = useMenuStore(state => state.toggleCollapse);
    const slug = usePathnameWithoutIntl();

    return (
        <div className="flex flex-col">
            {/* HEADER ON MOBILE */}
            <header id="mobile-nav"
                className={cn("w-full flex lg:hidden items-center h-[50px] text-white bg-white bg-opacity-5 justify-between px-5 shrink-0")}
            >
                <Menu onClick={toggleOpen} />
            </header>

            {/* HEADER ON LAPTOP */}
            <main className={`duration-75 hidden lg:flex lg:flex-grow lg:overflow-y-auto relative`}>
                {/* Radial Gradient */}
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

                {/* SIDEBAR */}
                <div className={`flex w-max lg:left-0 ${isOpen ? "left-0" : "-left-full"} duration-200 ease-in-out bg-white bg-opacity-5 h-[100vh]`}>
                    <div className={`w-full`}>
                        <aside className={`flex flex-col lg:left-0 h-[100vh] overflow-y-auto`}>
                            <div className={`w-[260px] ${isCollapsed ? "lg:w-[68px] flex flex-col items-center" : "lg:w-[260px] px-4"} h-full shrink-0 relative duration-200 bg-transparent ease-out items-center`}>

                                {/* LOGO */}
                                <div className="flex flex-col shrink-0 w-full">
                                    <Link href={'/'} className="my-8">
                                        <div className="flex h-fit justify-center items-center">
                                            <img
                                                src="/isotipo.webp"
                                                alt="BeScoutr logo minimized"
                                                className={`w-8 h-auto transition-transform duration-200 ${isCollapsed ? "lg:flex hidden" : "scale-0 hidden"}`}
                                            />
                                            <img
                                                src="/imagotipo.webp"
                                                alt="BeScoutr logo"
                                                className={`w-[160px] transition-transform duration-200 ${isCollapsed ? "lg:scale-0 lg:hidden" : ""} flex`}
                                            />
                                        </div>
                                    </Link>
                                </div>

                                {/* BUTTON TO COLLAPSE/EXPAND THE MENU */}
                                <Button
                                    onClick={toggleCollapse}
                                    variant={'ghost'}
                                    className={`absolute right-1 top-2 lg:flex hidden z-[11] hover:bg-transparent p-0 h-fit w-fit`}>
                                    {isCollapsed ?
                                        <PanelLeftOpen size={20} className="text-neutral-500 hover:text-neutral-300" />
                                        : <PanelRightOpen size={20} className="text-neutral-500 hover:text-neutral-300" />
                                    }
                                </Button>

                                {/* NAVIGATION BAR */}
                                <NavBar
                                    slug={slug}
                                    isMenuCollapsed={isCollapsed}
                                />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default SideNav;
