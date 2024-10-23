import { search } from "@/actions/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SearchSkeleton from "@/components/ui/customs/search-skeleton"
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useDebounce from "@/hooks/useDebounce"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useQuery } from "@tanstack/react-query"
import { Search, Shield, User } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

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

    const handleSearch = (value: string) => {
        if (value.length === 0) setResults([])
        setSearchValue(value)
    }

    return (
        <Dialog>
            <DialogTrigger asChild className="flex-1 mx-4">
                <div className='flex flex-row justify-between items-center px-2.5 bg-opacity-5 bg-white border-none rounded-xl h-10 w-full hover:cursor-pointer'>
                    <p className='text-sm text-muted-foreground'>{dict("placeholder")}</p>
                    <Search size={20} className='text-white' />
                </div>
            </DialogTrigger>
            <DialogContent className="p-5 lg:max-w-[55%] bg-night-sky-900 border-night-sky-900 rounded-md border border-white/20 top-[40%]" closeButtonClassName="text-white top-1 right-1">
                <DialogHeader>
                    <div className="flex flex-row gap-2 items-center relative">
                        <Input placeholder={dict('placeholder')} className="w-full bg-white bg-opacity-10 border-none text-white " onChange={(e) => handleSearch(e.target.value)} />
                    </div>
                </DialogHeader>
                <div className="flex flex-col gap-2 h-[280px] overflow-y-auto w-full">
                    {isLoading ? (
                        <div className="flex flex-col gap-2">
                            <SearchSkeleton skeletonCount={6} skeletonContainerClassName="h-12" />
                        </div>
                    ) : results.length === 0 ? (
                        <motion.div
                            initial={{ y: "30px", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", duration: 0.4, delay: 0.15 }}
                            className="text-center text-gray-700 text-[15px] items-center h-full"
                        >
                            <p>{dict("noResults")}</p>
                        </motion.div>
                    ) : results.length > 0 ? (
                        results.map((result, index) => (
                            <Link href={(searchType === "user") ? `/profile/${result.id}` : (searchType === "team") ? `/team/${result.id}` : (searchType === "player") ? `/player/${result.id}` : ''} passHref className="w-full h-12">
                                <div key={index} className="flex flex-row gap-2 items-center hover:bg-white/5 p-2 rounded-lg h-full w-full">
                                    <Avatar className="h-8 w-8">
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
