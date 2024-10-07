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

interface Props {
    form: CompleteProfileFormType
    nextStep: () => void
    prevStep: () => void
}

export default function BasicInfo({ form, nextStep, prevStep }: Props) {
    const dict = useTranslations('CompleteProfile')
    return (
        <div className="flex flex-col items-center gap-4 lg:gap-8">
            <div className='flex flex-col items-center'>
                <h1 className="text-white text-xl md:text-3xl lg:text-4xl">{dict('BasicInfo.title')}</h1>
                <h2 className="text-gray-400 text-sm md:text-md lg:text-lg">{dict('BasicInfo.description')}</h2>
            </div>
            <div className='grid grid-cols-2 w-full gap-4'>
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel className='text-white'>{dict('BasicInfo.firstName')}</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder={dict('BasicInfo.firstNamePlaceholder')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel className='text-white'>{dict('BasicInfo.lastName')}</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder={dict('BasicInfo.lastNamePlaceholder')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel className='text-white'>{dict('BasicInfo.username')}</FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    placeholder={dict('BasicInfo.usernamePlaceholder')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className='w-full flex flex-col justify-end'>
                            <FormLabel className='text-white'>{dict('BasicInfo.country')}</FormLabel>
                            {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={dict('BasicInfo.countryPlaceholder')} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {countries.map((country) => (
                                        <SelectItem key={country.code} value={country.code}>
                                            {country.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> */}
                            {/* <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-full justify-between rounded-md",
                                                !field.value && "text-gray-400"
                                            )}
                                        >
                                            {field.value
                                                ? countries.find(
                                                    (country) => country.name_en === field.value
                                                )?.name_en
                                                : dict('BasicInfo.countryPlaceholder')}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search language..." />
                                        <CommandList>
                                            <CommandEmpty>No language found.</CommandEmpty>
                                            <CommandGroup>
                                                {countries.map((country) => (
                                                    <CommandItem
                                                        value={country.code}
                                                        key={country.code}
                                                        onSelect={() => {
                                                            form.setValue("country", country.code)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                country.code === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {country.name_en}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='flex flex-row gap-8 w-full justify-between'>
                <Button type='button' variant={'outline'} className='w-full' onClick={prevStep}>
                    {dict('prev')}
                </Button>
                <Button type='button' className='w-full' onClick={nextStep}>
                    {dict('next')}
                </Button>
            </div>
        </div>
    )
}