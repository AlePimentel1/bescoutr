import RecentNewsCard from './RecentNewCard'
import { Button } from '@/components/ui/button'

const news = [{
    id: 1,
    title: "The Best Players of 2023",
    bsonDate: "2023-12-31T00:00:00.000Z",
    img: 'https://i.guim.co.uk/img/media/c1aefba93cded59ac25c4eb4b4ae580519c86837/0_255_7644_4586/master/7644.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fbae841a6af3eefd5f32c6ef02a32f3d'
},
{
    id: 2,
    title: "The Best Players of 2022",
    bsonDate: "2022-12-31T00:00:00.000Z",
    img: 'https://i.guim.co.uk/img/media/c1aefba93cded59ac25c4eb4b4ae580519c86837/0_255_7644_4586/master/7644.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fbae841a6af3eefd5f32c6ef02a32f3d'
},
{
    id: 3,
    title: "The Best Players of 2021",
    bsonDate: "2021-12-31T00:00:00.000Z",
    img: 'https://i.guim.co.uk/img/media/c1aefba93cded59ac25c4eb4b4ae580519c86837/0_255_7644_4586/master/7644.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fbae841a6af3eefd5f32c6ef02a32f3d'
}]

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
