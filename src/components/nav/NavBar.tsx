import { useRouter } from "next/router"
import { Accordion } from "../ui/accordion"
import NavItem from "./NavItem";
import { mainMenuItems } from "../side-nav/constants/main-items";
import NavLink from "./NavLink";
import CreateReportButton from "../side-nav/CreateReportButton";
import { Briefcase, Menu } from "lucide-react";
import { Button } from '@/components/ui/button';

interface NavBarProps {
    handleOpenMenu: () => void
    slug: string
    isMenuCollapsed: boolean
}

export default function NavBar({
    handleOpenMenu,
    slug = '/',
    isMenuCollapsed = false,
}: NavBarProps) {

    const valueOfSubMenues: any = []
    const handleChangeValue = (value: any) => { }

    return (
        <>
            <div className="flex flex-col shrink-0">
                <nav className="flex-grow pb-5 flex flex-col justify-between">
                    <Accordion
                        onValueChange={handleChangeValue}
                        value={valueOfSubMenues}
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
                            <li className={`hidden ${isMenuCollapsed ? 'lg:flex items-center justify-center' : ''}`}>
                                <Button
                                    onClick={() => handleOpenMenu()}
                                    className="px-0 w-[36px] h-[33px] m-auto relative hover:text-neutral-500 rounded-[5px] text-neutral-500 hover:bg-transparent focus:bg-primary focus:text-white" variant={'ghost'}>
                                    <Menu size={23} />
                                </Button>
                            </li>
                        </ul>
                    </Accordion>
                </nav>
            </div>
        </>
    )
}
