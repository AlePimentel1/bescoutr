'use client'
import RecentNews from "./news/recent-news/RecentNews";
import TrendingPlayers from "./news/trending-players/TrendingPlayers";

export default function News() {
    return (
        <div className="flex flex-col gap-1">
            <RecentNews />
            <TrendingPlayers />
        </div>
    )
}
