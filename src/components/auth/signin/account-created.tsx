import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const AccountCreated = () => {
    const dict = useTranslations('Auth.Register.success')
    return (
        <Card className="flex flex-col items-center justify-center w-[450px] bg-white/10 border-white/10 p-6 gap-6">
            <CardHeader className="flex flex-col items-center justify-center p-0">
                <CircleCheck size={64} className="text-primary" />
                <CardTitle className="text-primary">{dict('title')}</CardTitle>
                <CardDescription className="text-white/50 text-center">{dict('message')}</CardDescription>
            </CardHeader>
            <CardFooter className="p-0">
                <Link href={'/login'}>
                    <Button>{dict('button')}</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default AccountCreated;