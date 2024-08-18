import { Button } from '@/components/ui/button'
import React from 'react'
import TrendingPlayerCard from './TrendingPlayerCard'
import { trendingPlayers } from '@/helpers/fakeData'
import { useTranslations } from 'next-intl'

export default function TrendingPlayers() {
    const dict = useTranslations('HomePage.TrendingPlayers')
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-between items-center'>
                <p className='text-white'>{dict('title')} 🔥</p>
                <Button variant={'link'} className='text-blue-400' type='button'>{dict('button')}</Button>
            </div>
            <div className='flex flex-col gap-2 overflow-y-auto max-h-[330px]' style={{ scrollbarWidth: 'none' }}>
                {trendingPlayers.map((n) => (
                    <TrendingPlayerCard
                        key={n.id}
                        name={n.name}
                        lastname={n.lastname}
                        countryFlag={n.countryFlag}
                        position={n.position}
                        image={n.image}
                        age={n.age}
                        role={n.role}
                        teamFlag={n.teamFlag}
                        bsIndex={n.bsIndex}
                    />
                ))}
            </div>
        </div>
    )
}
