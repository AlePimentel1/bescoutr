import { getLeagues } from "@/actions/complete-profile";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SelectLayout from "./select-layout";
import { CompleteProfileFormType } from "../utils/constants";

interface Props {
    form: CompleteProfileFormType
}

const SelectLeagues = ({ form }: Props) => {
    const [currentLeagues, setCurrentLeagues] = useState<{ id: number, title: string, image: string }[]>([])

    const { data, isLoading, isPending, error } = useQuery({
        queryKey: ['playerOfTheDay'],
        queryFn: getLeagues,

    });

    useEffect(() => {
        if (data) {
            const formattedData = data.leagues.map((league: any) => {
                return {
                    id: league.id,
                    title: league.name,
                    image: league.image_path,
                }
            }).flat()

            setCurrentLeagues([...currentLeagues, ...formattedData])
        }
    }, [data])

    return (
        <SelectLayout
            onSearch={(value) => console.log(value)}
            cards={currentLeagues}
            onSelectCard={(card) => console.log(card)}
            onSelectTab={(tab) => console.log(tab)}
            searchPlaceHolder="Search for a league"
            tabs={[{
                id: 'all',
                title: 'All'
            }, {
                id: 'favourites',
                title: 'Favourites'
            }]}
            isLoading={isLoading || isPending}
            form={form}
            fieldName="favouriteLeagues"
        />
    )
}

export default SelectLeagues;