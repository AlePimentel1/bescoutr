import { useTranslations } from 'next-intl';
import { CompleteProfileFormType } from '../utils/constants';
import { FormField, FormItem, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import AccountTypeCard from './account-type-card';
import { Button } from '@/components/ui/button';

interface Props {
    form: CompleteProfileFormType
    nextStep: () => void
}

export default function Welcome({ form, nextStep }: Props) {
    const dict = useTranslations('CompleteProfile')
    return (
        <div>
            <div className="flex flex-col items-center gap-4 lg:gap-16">
                <div className='flex flex-col items-center'>
                    <h1 className="text-white text-lg md:text-xl lg:text-2xl">{dict('Welcome.title')}</h1>
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl">{dict('Welcome.subtitle')}</h2>
                </div>
                <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex flex-col md:flex-row gap-8'>
                                    <AccountTypeCard accountType="fan" selected={field.value === 'fan'} onClick={() => field.onChange('fan')} />
                                    <AccountTypeCard accountType="scout" selected={field.value === 'scout'} onClick={() => field.onChange('scout')} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='button' className='w-[50%]' onClick={nextStep}>
                    {dict('next')}
                </Button>
            </div>
        </div>
    )
}