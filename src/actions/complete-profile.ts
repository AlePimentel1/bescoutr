import { fetcher } from "@/lib/fetcher";

export const getLeagues = async () => {
    return await fetcher({
        url: `/api/complete-profile/leagues`,
        requiresToken: true,
        method: 'GET',
    })
};