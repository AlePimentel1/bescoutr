import RecentNews from "./news/recent-news/RecentNews";
import TrendingPlayers from "./news/trending-players/TrendingPlayers";

export default function News() {
    return (
        <div className="w-[350px] flex flex-col h-full bg-white bg-opacity-5 px-4 py-2 gap-1">
            <RecentNews />
            <TrendingPlayers />
        </div>
    )
}
