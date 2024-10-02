'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CircleAlert, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

const SignInForm = () => {
    const dict = useTranslations('Auth.Login')
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    const FormSchema = z.object({
        email: z.string().min(1, dict('errors.email')).email(dict('errors.emailInvalid')),
        password: z
            .string()
            .min(1, dict('errors.password'))
    });

    const contextForm = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (
            values: {
                email: string;
                password: string;
            }
        ) => signIn('credentials', {
            email: values.email,
            password: values.password
        })
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => mutate(values)

    return (
        <div className='flex flex-col items-center justify-center space-y-6'>
            <div className='flex flex-col gap-1 items-center'>
                <h1 className='text-white text-[64px] font-semibold'>{dict('title')}</h1>
                <h2 className='text-sm font-normal text-neutral-300'>{dict('description')}</h2>
            </div>
            {error && (
                <Alert className='border-red-500 text-red-500 bg-white bg-opacity-10 w-[420px]'>
                    <CircleAlert className="h-4 w-4" color='red' />
                    <AlertTitle>
                        {dict('errors.title')}
                    </AlertTitle>
                    <AlertDescription>
                        {dict('errors.generic')}
                    </AlertDescription>
                </Alert>
            )}
            <div className='flex flex-col h-auto w-full md:w-[420px] space-y-4'>
                <Form {...contextForm}>
                    <form onSubmit={contextForm.handleSubmit(onSubmit)} className='w-full'>
                        <div className='space-y-4'>
                            <FormField
                                control={contextForm.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white font-normal' required>{dict('email')}</FormLabel>
                                        <FormControl>
                                            <Input type='email'
                                                placeholder='mail@example.com'
                                                className='bg-white border-none bg-opacity-15 text-white'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={contextForm.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white font-normal' required>{dict('password')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='********'
                                                className='bg-white border-none bg-opacity-15 text-white'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className='w-full mt-6' type='submit' disabled={isPending}>
                            {isPending
                                ? <Loader2 className='animate-spin' />
                                : dict('submit')
                            }
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gradient-to-l before:from-stone-400 before:to-transparent after:ml-4 after:block after:h-px after:flex-grow after:bg-gradient-to-r after:from-stone-400 after:to-transparent text-neutral-300'>
                {dict('divider').toLowerCase()}
            </div>
            <p className='text-center text-sm text-neutral-300'>
                {`${dict('noAccount')} `}
                <Link className='text-primary hover:underline' href='/signup'>
                    {dict('register')}
                </Link>
            </p>
        </div >
    );
};

export default SignInForm;