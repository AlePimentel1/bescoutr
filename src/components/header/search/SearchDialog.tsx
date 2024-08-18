import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"


export function SearchDialog() {
    const dict = useTranslations("Header.SearchBar")
    return (
        <Dialog>
            <DialogTrigger asChild className="flex-1 mx-4">
                <div className='flex flex-row justify-between items-center px-2.5 bg-opacity-5 bg-white border-none rounded-xl h-10 w-full hover:cursor-pointer'>
                    <p className='text-sm text-muted-foreground'>{dict("placeholder")}</p>
                    <Search size={20} className='text-white' />
                </div>
            </DialogTrigger>
            <DialogContent withoutCloseIcon className="sm:max-w-[425px] p-4 md:max-w-[50%] bg-night-sky-900 border-night-sky-900 border border-white/20">
                <DialogHeader>
                    <div className="flex flex-row gap-2 items-center relative">
                        <Input placeholder={dict('placeholder')} className="w-full bg-white bg-opacity-10 border-none text-white focus-visible:ring-offset-secondary" />
                    </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    Hola
                </div>
            </DialogContent>
        </Dialog>
    )
}
