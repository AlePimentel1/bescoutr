import { news } from '@/helpers/fakeData'
import RecentNewsCard from './RecentNewCard'
import { Button } from '@/components/ui/button'


export default function RecentNews() {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-between items-center'>
                <p className='text-white'>Recent <strong>news</strong> 🔥</p>
                <Button variant={'link'} className='text-blue-400' type='button'>See all</Button>
            </div>
            <div className='flex flex-col gap-2'>
                {news.map((n) => (
                    <RecentNewsCard key={n.id} title={n.title} image={n.img} date={n.bsonDate} />
                ))}
            </div>
        </div>
    )
}
