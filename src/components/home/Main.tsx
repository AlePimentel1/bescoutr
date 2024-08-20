'use client'
import { useTranslations } from "next-intl";
import PlayerOfTheDayCard from "./player-of-the-day/PlayerOfTheDayCard";
import WeeklyChallengeCard from "./weekly-challenge/WeeklyChalengeCard";
import { ReportsCarousel } from "./reports-of-the-week/ReportsCarousel";
import { useEffect, useState } from "react";

export default function Main() {
    const dict = useTranslations('HomePage');
    const [totalHeight, setTotalHeight] = useState(0);
    // const headerHeight = document.getElementById('mainHeader')?.clientHeight || 0;
    // const mobileNavHeight = document.getElementById('mobile-nav')?.clientHeight || 0;
    // const totalHeight = headerHeight + mobileNavHeight;

    useEffect(() => {
        const headerHeight = document.getElementById('mainHeader')?.clientHeight || 0;
        const mobileNavHeight = document.getElementById('mobile-nav')?.clientHeight || 0;
        setTotalHeight(headerHeight + mobileNavHeight);
    }, []);

    return (
        <div className={`flex-1 flex flex-col px-4 gap-4 overflow-y-auto w-full`} style={{ height: `calc(100vh - ${totalHeight}px)`, scrollbarWidth: 'none' }}>
            <p className="text-white">{dict('WelcomeText')} Fulanito</p>
            <PlayerOfTheDayCard />
            <WeeklyChallengeCard />
            <ReportsCarousel />
        </div>
    )
}
