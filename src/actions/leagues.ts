import { fetcher } from "@/lib/fetcher";

export const getLeague = async (id: number) => {
    return await fetcher({
        url: `/api/leagues?id=${id}`,
        requiresToken: true,
        method: 'GET',
    })
};

export const getLeaguesGroupedByCountry = async () => {
    return await fetcher({
        url: `/api/leagues/grouped`,
        requiresToken: true,
        method: 'GET',
    })
};