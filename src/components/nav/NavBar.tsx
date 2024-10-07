import { useRouter } from "next/router"
import { Accordion } from "../ui/accordion"
import NavItem from "./NavItem";
import { mainMenuItems } from "../side-nav/constants/main-items";
import NavLink from "./NavLink";
import CreateReportButton from "../side-nav/CreateReportButton";
import { Briefcase, Menu } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useEffect } from "react";
import { useMenuStore } from "@/store/menu";

interface NavBarProps {
    slug: string
    isMenuCollapsed: boolean
}

export default function NavBar({
    slug = '/',
    isMenuCollapsed = false,
}: NavBarProps) {
    const { isCollapsed, openItems, toggleCollapse, toggleItem } = useMenuStore();

    // Cargar el estado inicial del localStorage
    useEffect(() => {
        const item = localStorage.getItem('MENU_CONTROL');
        const storedMenu = item ? JSON.parse(item) : null;
        if (!storedMenu) {
            localStorage.setItem('MENU_CONTROL', JSON.stringify({ collapsed: isCollapsed, openItems: [] }));
        } else {
            // Reestablecer el estado del menú desde el localStorage
            toggleCollapse();
            storedMenu.openItems.forEach((item: any) => toggleItem(item));
        }
    }, []);

    // Manejar el cambio en el estado de los submenús
    const handleChangeValue = (itemValues: string[]) => {
        itemValues.forEach(itemValue => toggleItem(itemValue)); // Alternar el estado de cada item
        const newOpenItems = [...openItems]; // Convertir el Set en array para almacenarlo
        localStorage.setItem('MENU_CONTROL', JSON.stringify({ collapsed: isCollapsed, openItems: newOpenItems }));
    };


    return (
        <>
            <div className="flex flex-col shrink-0">
                <nav className="flex-grow pb-5 flex flex-col justify-between">
                    <Accordion
                        onValueChange={handleChangeValue}
                        value={Array.from(openItems)}
                        type="multiple"
                    >
                        <ul className={`mt-[2px] mb-2 ${isMenuCollapsed ? " " : "mt-2"} flex justify-between flex-col flex-grow space-y-2`}>
                            {mainMenuItems.map((item) => (
                                <NavItem
                                    key={item.label}
                                    href={item.href}
                                    label={item.label}
                                    icon={item.icon}
                                    isAccordion={item.isAccordion}
                                    open={item.open}
                                    value={item.value}
                                    isItemSelected={slug === item.slug}
                                    isMenuCollapsed={isMenuCollapsed}
                                >
                                    {item.childrens && item.childrens.map((child) => (
                                        <NavLink
                                            key={child.label}
                                            href={child.href}
                                            label={child.label}
                                            slug={child.slug}
                                            isCollapsedMenu={isMenuCollapsed}
                                            currentSlug={slug}
                                            icon={child.icon}
                                        />
                                    ))}
                                </NavItem>
                            ))}
                            <li>
                                <CreateReportButton isMenuCollapsed={isMenuCollapsed} />
                            </li>
                            <NavItem
                                key={'job-board'}
                                href="/job-board"
                                icon={<Briefcase size={24} />}
                                label="Job Board"
                                open={[]}
                                value="job-board"
                                isAccordion={false}
                                isMenuCollapsed={isMenuCollapsed}
                                isItemSelected={slug === "/job-board"}
                                children={null}
                            />
                            {/* <li className={`hidden ${isMenuCollapsed ? 'lg:flex items-center justify-center' : ''}`}>
                                <Button
                                    onClick={() => handleOpenMenu()}
                                    className="px-0 w-[36px] h-[33px] m-auto relative hover:text-neutral-500 rounded-[5px] text-neutral-500 hover:bg-transparent focus:bg-primary focus:text-white" variant={'ghost'}>
                                    <Menu size={23} />
                                </Button>
                            </li> */}
                        </ul>
                    </Accordion>
                </nav>
            </div>
        </>
    )
}
