
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function WeeklyChallengeCard() {
    return (
        <Card className="flex flex-col w-full h-[210px] bg-white bg-opacity-10 border-transparent">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    )
}
