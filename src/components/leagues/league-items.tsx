import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { LeaguesDropdown } from './leagues-dropdown';
import { useTranslations } from 'next-intl';

interface Props {
    season: string;
    isLoading: boolean;
    selectedLeague: number;
};

const LeagueInfo = ({ season, isLoading, selectedLeague }: Props) => {
    const dict = useTranslations('Leagues.InfoCard')
    return (
        <>
            {isLoading ? (
                <div className="flex opacity-10 flex-row items-center justify-between w-full py-4">
                    <Skeleton className="w-[20%] h-10" />
                    <Skeleton className="w-[20%] h-10" />
                    <Skeleton className="w-[20%] h-10" />
                </div>
            ) : season ? (
                <div className="flex flex-row justify-between items-center w-full py-4 bg-gradient-to-r from-transparent via-[#356061] to-transparent">
                    <LeaguesDropdown currentLeague={selectedLeague} />
                    <p className='text-xl font-medium'>{dict('table')}</p>
                    <p>{`Temporada ${season}`}</p>
                </div>
            ) : null}
        </>
    )
}

export default LeagueInfo;