import { news } from '@/helpers/fakeData'
import RecentNewsCard from './RecentNewCard'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'


export default function RecentNews() {
    const dict = useTranslations('HomePage.RecentNews')
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-between items-center'>
                <p className='text-white'>{dict('title')} 🔥</p>
                <Button variant={'link'} className='text-blue-400' type='button'>{dict('button')}</Button>
            </div>
            <div className='flex flex-col gap-2'>
                {news.map((n) => (
                    <RecentNewsCard key={n.id} title={n.title} image={n.img} date={n.bsonDate} />
                ))}
            </div>
        </div>
    )
}
