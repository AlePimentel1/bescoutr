import { useTranslations } from 'next-intl';
import { CompleteProfileFormType } from '../utils/constants';
import { FormField, FormItem, FormControl, FormDescription, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import countries from '@/data/countries.json'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import SelectLeagues from './select-leagues';

interface Props {
    form: CompleteProfileFormType
    prevStep: () => void
}

export default function Favourites({ form, prevStep }: Props) {
    const dict = useTranslations('CompleteProfile')
    const [favouriteStep, setFavouriteStep] = useState(1)

    const currentText = () => {
        switch (favouriteStep) {
            case 1:
                return {
                    title: dict('Favourites.Leagues.title'),
                    description: dict('Favourites.Leagues.description')
                }
            case 2:
                return {
                    title: dict('Favourites.Teams.title'),
                    description: dict('Favourites.Teams.description')
                }
            case 3:
                return {
                    title: dict('Favourites.Players.title'),
                    description: dict('Favourites.Players.description')
                }
            case 4:
                return {
                    title: dict('Favourites.Positions.title'),
                    description: dict('Favourites.Positions.description')
                }
            default:
                return {
                    title: '',
                    description: ''
                }
        }
    }

    const handleNextStep = () => {
        setFavouriteStep(favouriteStep + 1)
    }

    const handlePrevStep = () => {
        if (favouriteStep === 1) return
        setFavouriteStep(favouriteStep - 1)
    }

    const favouriteSteps = [
        <SelectLeagues />
        // <SelectTeams />,
        // <SelectPlayers />,
        // <SelectScouts />
    ]

    return (
        <div className="grid grid-cols-2 items-start gap-4 lg:gap-8 h-full">
            <div>
                <div className='flex flex-col items-center'>
                    <h1 className="text-white text-xl md:text-3xl lg:text-4xl">
                        {currentText().title}
                    </h1>
                    <h2 className="text-gray-400 text-sm md:text-md lg:text-lg">
                        {currentText().description}
                    </h2>
                </div>
                <div className="relative flex flex-col gap-16 pl-6">
                    <div className="absolute h-full border-l border-dashed border-gray-500 left-2 top-0"></div>

                    {/* Ligas */}
                    <div className="relative flex items-start">
                        {/* Punto del timeline */}
                        <div className="absolute w-4 h-4 flex items-center justify-center bg-primary-900 rounded-full left-[-23px]">
                            <div className='w-1.5 h-1.5 bg-green-500 rounded-full'></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white text-xs md:text-sm lg:text-md">
                                {dict('Favourites.Leagues.tab')}
                            </h3>
                            {/* Tags */}
                            <div className="grid grid-cols-3 flex-wrap gap-2">
                                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center">
                                    {/* Icono */}
                                    <svg className="w-4 h-4 mr-1" fill="currentColor">
                                        <circle cx="10" cy="10" r="10" />
                                    </svg>
                                    Europa League
                                    <button className="ml-2 text-white">&times;</button>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Equipos */}
                    <div className="relative flex items-start">
                        {/* Punto del timeline */}
                        <div className="absolute w-4 h-4 flex items-center justify-center bg-primary-900 rounded-full left-[-23px]">
                            <div className='w-1.5 h-1.5 bg-green-500 rounded-full'></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white text-xs md:text-sm lg:text-md">
                                {dict('Favourites.Teams.tab')}
                            </h3>
                            {/* Tags */}
                            <div className="grid grid-cols-3 flex-wrap gap-2">
                                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center">
                                    {/* Icono */}
                                    <svg className="w-4 h-4 mr-1" fill="currentColor">
                                        <circle cx="10" cy="10" r="10" />
                                    </svg>
                                    Europa League
                                    <button className="ml-2 text-white">&times;</button>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Jugadores */}
                    <div className="relative flex items-start">
                        {/* Punto del timeline */}
                        <div className="absolute w-4 h-4 flex items-center justify-center bg-primary-900 rounded-full left-[-23px]">
                            <div className='w-1.5 h-1.5 bg-green-500 rounded-full'></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white text-xs md:text-sm lg:text-md">
                                {dict('Favourites.Players.tab')}
                            </h3>
                            {/* Tags */}
                            <div className="grid grid-cols-3 flex-wrap gap-2">
                                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center">
                                    {/* Icono */}
                                    <svg className="w-4 h-4 mr-1" fill="currentColor">
                                        <circle cx="10" cy="10" r="10" />
                                    </svg>
                                    Europa League
                                    <button className="ml-2 text-white">&times;</button>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Scouting */}
                    <div className="relative flex items-start">
                        {/* Punto del timeline */}
                        <div className="absolute w-4 h-4 flex items-center justify-center bg-primary-900 rounded-full left-[-23px]">
                            <div className='w-1.5 h-1.5 bg-green-500 rounded-full'></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-white text-xs md:text-sm lg:text-md">
                                {dict('Favourites.Scouts.tab')}
                            </h3>
                            {/* Tags */}
                            <div className="grid grid-cols-3 flex-wrap gap-2">
                                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center">
                                    {/* Icono */}
                                    <svg className="w-4 h-4 mr-1" fill="currentColor">
                                        <circle cx="10" cy="10" r="10" />
                                    </svg>
                                    Europa League
                                    <button className="ml-2 text-white">&times;</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col gap-4 h-full'>
                <div className='flex flex-col items-center'>
                    <h1 className="text-white text-xl md:text-3xl lg:text-4xl">{dict('BasicInfo.title')}</h1>
                    <h1 className="text-gray-400 text-sm md:text-md lg:text-lg">{dict('BasicInfo.description')}</h1>
                </div>
                <div className='flex w-full h-full'>
                    {favouriteSteps[favouriteStep - 1]}
                </div>

                <div className='flex flex-row gap-8 w-full justify-between'>
                    <Button type='button' variant={'outline'} className='w-full' onClick={prevStep}>
                        {dict('prev')}
                    </Button>
                    <Button type='submit' className='w-full'>
                        {dict('submit')}
                    </Button>
                </div>
            </div>

        </div>
    )
}