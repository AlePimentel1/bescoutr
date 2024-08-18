import { useRouter } from "next/router"
import { Accordion } from "../ui/accordion"
import NavItem from "./NavItem";
import { mainMenuItems } from "../side-nav/constants/main-items";
import NavLink from "./NavLink";
import CreateReportButton from "../side-nav/CreateReportButton";
import { Briefcase } from "lucide-react";

interface NavBarProps {
    handleOpenMenu: () => void
    slug: string
}

export default function NavBar({
    handleOpenMenu,
    slug = '/',
}: NavBarProps) {

    const { valueOfSubMenues = [], handleChangeValue = () => { }, isCollapsedMenu = false } = {}

    return (
        <>
            <div className="flex flex-col shrink-0">
                <nav className="flex-grow pb-5 flex flex-col justify-between">
                    <Accordion
                        onValueChange={handleChangeValue}
                        value={valueOfSubMenues}
                        type="multiple"
                    >
                        <ul className={`mt-[2px] mb-2 ${isCollapsedMenu ? "px-[13px] " : "mt-2"} flex justify-between flex-col flex-grow space-y-2`}>
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
                                    isCollapsedMenu={isCollapsedMenu}
                                >
                                    {item.childrens && item.childrens.map((child) => (
                                        <NavLink
                                            key={child.label}
                                            href={child.href}
                                            label={child.label}
                                            slug={child.slug}
                                            isCollapsedMenu={isCollapsedMenu}
                                            currentSlug={slug}
                                        />
                                    ))}
                                </NavItem>
                            ))}
                            <CreateReportButton />
                            <NavItem
                                key={'job-board'}
                                href="/job-board"
                                icon={<Briefcase size={24} />}
                                label="Job Board"
                                open={[]}
                                value="job-board"
                                isAccordion={false}
                                isCollapsedMenu={isCollapsedMenu}
                                isItemSelected={slug === "/job-board"}
                                children={null}
                            />
                        </ul>
                    </Accordion>
                </nav>
            </div>
        </>
    )
}
