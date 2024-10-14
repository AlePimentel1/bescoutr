import { fetcher } from "@/lib/fetcher";

export const search = async ({ searchValue, type, page }: { searchValue: string, type: "user" | "team" | "player", page: Number }) => {
    return await fetcher<({ results: any, success: boolean, page: number })>({
        url: `/api/header/search?searchValue=${searchValue}&type=${type}&page=${page}`,
        requiresToken: true,
        method: 'GET',
    })
};