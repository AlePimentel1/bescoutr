import { fetcher } from "@/lib/fetcher";

export const getPlayerOfTheDay = async () => {
    return await fetcher({
        url: `/api/home/player-of-the-day`,
        requiresToken: true,
        method: 'GET',
    })
};