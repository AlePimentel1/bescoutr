import { useTranslations } from "next-intl";
import PlayerOfTheDayCard from "./player-of-the-day/PlayerOfTheDayCard";
import WeeklyChallengeCard from "./weekly-challenge/WeeklyChalengeCard";

export default function Main() {
    const dict = useTranslations('HomePage');
    return (
        <div className="flex-1 flex flex-col h-full px-4 gap-4">
            Bienvenido Fulanito
            <PlayerOfTheDayCard />
            <WeeklyChallengeCard />
        </div>
    )
}
