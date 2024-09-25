import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

interface Props {
    league: any;
    isLoading: boolean;
};

const LeagueInfo = ({ league, isLoading }: Props) => {
    const dict = useTranslations('Leagues.InfoCard')
    return (
        <>
            {isLoading ? (
                <div className="flex opacity-10">
                    <Skeleton className="w-full h-[195px]" />
                </div>
            ) : league ? (
                <div className="flex  w-full justify-between items-center bg-white/10 rounded-xl h-[195px] bg-[url('/textures/waves.png')] bg-cover bg-center">
                    <div className='flex flex-row h-full items-center'>
                        <div
                            className="flex items-center h-full w-[250px] rounded-l-xl"
                            style={{
                                backgroundColor: '#fff',
                                clipPath: 'polygon(60% 50%, 80% 50%, 55% 100%, 0% 100%, 0 0, 85% 0)',
                            }}
                        >
                            <img src={league.logo} alt={league.name} className="w-auto h-28 ml-8" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className="text-4xl font-semibold">{league.name}</p>
                            <div className="flex flex-row items-center gap-2">
                                <p className='text-md'>{dict('country')}:</p>
                                <img src={league.flag} alt={league.name} className="w-auto h-4 rounded-sm border" />
                            </div>
                            <Button className="bg-secondary text-white hover:bg-secondary-400 w-fit px-6 rounded-lg">
                                {dict('button')}
                            </Button>
                        </div>
                    </div>
                </div >
            ) : null}
        </>
    )
}

export default LeagueInfo;