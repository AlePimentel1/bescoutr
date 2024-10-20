import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"
import { CompleteProfileFieldNames, CompleteProfileFormType } from "../utils/constants"
import { useFieldArray } from "react-hook-form"

interface Props {
    searchPlaceHolder: string
    onSearch: (search: string) => void
    cards: { id: number, title: string, image: string }[]
    onSelectCard: (id: number) => void
    tabs: { id: string, title: string }[]
    onSelectTab: (tabId: string) => void
    isLoading: boolean
    form: CompleteProfileFormType
    fieldName: CompleteProfileFieldNames
}

const SelectLayout = ({
    searchPlaceHolder,
    onSearch,
    cards,
    onSelectCard,
    tabs,
    onSelectTab,
    isLoading,
    form,
    fieldName
}: Props) => {

    const toggleSelection = (id: number) => {
        const field = form.getValues()[fieldName]
        const set = new Set(field)
        if (set.has(String(id))) {
            set.delete(String(id))
        } else {
            set.add(String(id))
        }
        form.setValue(fieldName, Array.from(set))
    }
    return (
        <>
            {isLoading ? (
                <div className="flex flex-col gap-4 w-full h-full">
                    <div>
                        <Skeleton className="opacity-10 rounded-md h-8 w-full" />
                    </div>
                    <div className="flex flex-row gap-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton className="opacity-10 rounded-full h-6 w-full" />
                        ))}
                    </div>
                    <div className="grid grid-cols-4 gap-4 w-full h-full">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div className="w-full h-full">
                                <Skeleton key={index} className="w-full h-full opacity-10" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (

                <div className="flex flex-col gap-4 w-full h-full">
                    <div className="relative">
                        <Input placeholder={searchPlaceHolder} onChange={(e) => onSearch(e.target.value)} />
                        <Search className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white" />
                    </div>
                    <div className="flex flex-row gap-4">
                        {tabs.map((tab, index) => (
                            <Button className="text-white rounded-full" variant={'outline'} type="button" key={index} onClick={() => onSelectTab(tab.id)}>{tab.title}</Button>
                        ))}
                    </div>
                    <FormField
                        key={fieldName}
                        control={form.control}
                        name={fieldName}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="grid grid-cols-4 gap-4 w-full">
                                        {cards.map((card, index) => (
                                            <div
                                                key={card.id + index}
                                                className={`flex flex-col gap-2 p-1 items-center justify-center rounded-lg w-full h-full cursor-pointer border-2 ${field.value.find(field => String(field) === String(card.id)) ? 'border-primary bg-primary/50' : 'bg-white/40'}`}
                                                onClick={() => toggleSelection(card.id)}
                                            >
                                                <img src={card.image} alt={card.title} className="h-14 w-auto" />
                                                <p className="text-white text-sm text-center break-words max-w-full">{card.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div >
            )}
        </>
    )
}

export default SelectLayout