
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function ReportsCarousel() {
    return (
        <div className="flex justify-center items-center w-full">
            <Carousel className="w-full">
                <CarouselContent>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <CarouselItem key={index} className="max-w-sm basis-1/2">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
            </Carousel>
        </div>
    )
}
