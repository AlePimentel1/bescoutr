import { Award, GalleryVerticalEnd, Home, MessageCircle, Trophy, User } from "lucide-react";

interface MainMenuChildrens {
    label: string;
    href: string;
    className?: string;
    target?: string;
    onAction?: any;
    isSelected?: boolean;
    slug: string;
}

interface MainMenuItems {
    label: string;
    href: string;
    icon: React.ReactNode;
    isAccordion: boolean;
    open: string[];
    value: string;
    slug: string;
    childrens: MainMenuChildrens[];
}

export const mainMenuItems: MainMenuItems[] = [
    {
        label: "Home",
        href: "/",
        icon: <Home size={24} />,
        isAccordion: false,
        open: [],
        value: "home",
        slug: "/",
        childrens: []
    },
    {
        label: "Timeline",
        href: "/timeline",
        icon: <GalleryVerticalEnd size={24} />,
        isAccordion: false,
        open: [],
        value: "timeline",
        slug: "/timeline",
        childrens: []
    },
    {
        label: "Chat",
        href: "/chat",
        icon: <MessageCircle size={24} />,
        isAccordion: false,
        open: [],
        value: "chat",
        slug: "/chat",
        childrens: []
    },
    {
        label: "Rankings",
        href: "/rankings",
        icon: <Award size={24} />,
        isAccordion: false,
        open: [],
        value: "rankings",
        slug: "/rankings",
        childrens: []
    },
    {
        label: "Leagues",
        href: "/leagues",
        icon: <Trophy size={24} />,
        isAccordion: false,
        open: [],
        value: "leagues",
        slug: "/leagues",
        childrens: []
    },
    {
        label: "My Profile",
        href: "/profile",
        icon: <User size={24} />,
        isAccordion: true,
        open: [],
        value: "profile",
        slug: "/profile",
        childrens: [
            {
                label: "My reports",
                href: "/my-reports",
                slug: "/my-reports",
            },
            {
                label: "My rankings",
                href: "/my-rankings",
                slug: "/my-rankings",
            },
            {
                label: "Scouting map",
                href: "/scouting-map",
                slug: "/scouting-map",
            },
            {
                label: "Watchlist",
                href: "/watchlist",
                slug: "/watchlist",
            }
        ]
    }
]