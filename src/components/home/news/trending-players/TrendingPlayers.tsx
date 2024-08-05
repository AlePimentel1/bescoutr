import { Button } from '@/components/ui/button'
import React from 'react'
import TrendingPlayerCard from './TrendingPlayerCard'

const trendingPlayers = [{
    id: 1,
    name: "Lionel",
    lastname: "Messi",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "LW",
    image: "https://media.api-sports.io/football/players/44.png",
    age: 34,
    role: "Captain",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
}, {
    id: 2,
    name: "Cristiano",
    lastname: "Ronaldo",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "CF",
    image: "https://media.api-sports.io/football/players/39.png",
    age: 36,
    role: "Forward",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
}, {
    id: 3,
    name: "Robert",
    lastname: "Lewandowski",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "CF",
    image: "https://media.api-sports.io/football/players/40.png",
    age: 33,
    role: "Forward",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
}, {
    id: 4,
    name: "Neymar",
    lastname: "Jr",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "LW",
    image: "https://media.api-sports.io/football/players/45.png",
    age: 29,
    role: "Forward",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
}, {
    id: 5,
    name: "Kevin",
    lastname: "De Bruyne",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "CM",
    image: "https://media.api-sports.io/football/players/46.png",
    age: 30,
    role: "Midfielder",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
}, {
    id: 6,
    name: "Kylian",
    lastname: "Mbappe",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "CF",
    image: "https://media.api-sports.io/football/players/47.png",
    age: 23,
    role: "Forward",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
}, {
    id: 7,
    name: "Mohamed",
    lastname: "Salah",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "RW",
    image: "https://media.api-sports.io/football/players/48.png",
    age: 29,
    role: "Forward",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
}, {
    id: 8,
    name: "Sergio",
    lastname: "Ramos",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "CB",
    image: "https://media.api-sports.io/football/players/49.png",
    age: 35,
    role: "Defender",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
}, {
    id: 9,
    name: "Harry",
    lastname: "Kane",
    countryFlag: "https://flagcdn.com/16x12/ar.png",
    position: "CF",
    image: "https://media.api-sports.io/football/players/50.png",
    age: 28,
    role: "Forward",
    teamFlag: "https://flagcdn.com/16x12/ar.png",
    bsIndex: 99.8
},
]

export default function TrendingPlayers() {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-between items-center'>
                <p className='text-white'>Trending <strong>players</strong> 🔥</p>
                <Button variant={'link'} className='text-blue-400' type='button'>See all</Button>
            </div>
            <div className='flex flex-col gap-2 overflow-y-auto max-h-[330px]'>
                {trendingPlayers.map((n) => (
                    <TrendingPlayerCard key={n.id} name={n.name} lastname={n.lastname} countryFlag={n.countryFlag} position={n.position} image={n.image} age={n.age} role={n.role} teamFlag={n.teamFlag} bsIndex={n.bsIndex} />
                ))}
            </div>
        </div>
    )
}
