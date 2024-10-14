import { search } from "@/actions/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useQuery } from "@tanstack/react-query"
import { Search, Shield, User } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"

export function SearchDialog() {
    const dict = useTranslations("Header.SearchBar")
    const [searchType, setSearchType] = useState<"user" | "team" | "player">("user")
    const [searchValue, setSearchValue] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const debouncedSearchTerm = useDebounce(searchValue, 500);
    const [results, setResults] = useState<any[]>([])

    const { data: searchResult, isLoading } = useQuery({
        queryKey: ["search", debouncedSearchTerm, page, searchType],
        queryFn: () => search({
            searchValue: debouncedSearchTerm as string,
            type: searchType,
            page: page
        }),
        enabled: typeof debouncedSearchTerm === 'string' && debouncedSearchTerm.length > 0,
    });

    useEffect(() => {
        if (searchResult && searchResult.success) {
            const { page, results } = searchResult

            setResults(results)
            setPage(page)
        }
    }, [searchResult]);

    return (
        <Dialog>
            <DialogTrigger asChild className="flex-1 mx-4">
                <div className='flex flex-row justify-between items-center px-2.5 bg-opacity-5 bg-white border-none rounded-xl h-10 w-full hover:cursor-pointer'>
                    <p className='text-sm text-muted-foreground'>{dict("placeholder")}</p>
                    <Search size={20} className='text-white' />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-4 md:max-w-[50%] bg-night-sky-900 border-night-sky-900 border border-white/20">
                <DialogHeader>
                    <div className="flex flex-row gap-2 items-center relative">
                        <Input placeholder={dict('placeholder')} className="w-full bg-white bg-opacity-10 border-none text-white focus-visible:ring-offset-secondary" onChange={(e) => setSearchValue(e.target.value.trim())} />
                    </div>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    {results.length === 0 ? (
                        <p className="text-white">No hay resultados</p>
                    ) : results.length > 0 ? (
                        results.map((result, index) => (
                            <Link href={(searchType === "user") ? `/profile/${result.id}` : (searchType === "team") ? `/team/${result.id}` : (searchType === "player") ? `/player/${result.id}` : ''} passHref>
                                <div key={index} className="flex flex-row gap-2 items-center hover:bg-white/5 p-2 rounded-lg">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={result.avatar} alt={result.name} />
                                        <AvatarFallback className="bg-secondary text-white">{
                                            (searchType === "user" || searchType === "player") ? <User size={20} /> : searchType === "team" ? <Shield size={20} /> : null
                                        }</AvatarFallback>
                                    </Avatar>
                                    <p className="text-white">{result.name}</p>
                                </div>
                            </Link>
                        ))
                    ) : null}
                </div>
            </DialogContent>
        </Dialog>
    )
}
