'use client'
import { useTranslations } from "next-intl";
import PlayerOfTheDayCard from "./player-of-the-day/player-of-the-day-card";
import WeeklyChallengeCard from "./weekly-challenge/WeeklyChalengeCard";
import { ReportsCarousel } from "./reports-of-the-week/ReportsCarousel";
import { useEffect, useState } from "react";

export default function Main() {
    const dict = useTranslations('HomePage');

    return (
        <div className="flex flex-col gap-4 pb-6">
            <p className="text-white">{dict('WelcomeText')} Fulanito</p>
            <PlayerOfTheDayCard />
            <WeeklyChallengeCard />
            <ReportsCarousel />
        </div>
    )
}
