'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/actions/auth';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { redirect, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const FormSchema = z
    .object({
        username: z.string().min(1, 'Username is required').max(100),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must have than 8 characters'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Password do not match',
    });


const SignUpForm = () => {
    const dict = useTranslations('Auth.Register')
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {

            const response = await registerUser({
                username: values.username,
                email: values.email,
                password: values.password,
            })

            if (response.success) {
                toast.success(response.message)
                router.push('/login')
            }
        } catch (e) {
            console.log(e)
            toast.error('Ocurrió un error al registrar el usuario')
        }
    };

    return (
        <div className='flex flex-col items-center justify-center space-y-6'>
            <div className='flex flex-col gap-1 items-center'>
                <h1 className='text-white text-[64px] font-semibold'>{dict('title')}</h1>
                <h2 className='text-sm font-normal text-neutral-300'>{dict('description')}</h2>
            </div>
            <div className='flex flex-col h-auto w-full md:w-[420px] space-y-4'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white font-normal'>{dict('username')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder='example_'
                                                className='bg-white border-none bg-opacity-15 text-white'
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white font-normal'>{dict('email')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder='mail@example.com'
                                                className='bg-white border-none bg-opacity-15 text-white'
                                                {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white font-normal'>{dict('password')}</FormLabel>
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
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white font-normal'>{dict('confirmPassword')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='********'
                                                type='password'
                                                className='bg-white border-none bg-opacity-15 text-white'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className='w-full mt-6' type='submit'>
                            {dict('submit')}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gradient-to-l before:from-stone-400 before:to-transparent after:ml-4 after:block after:h-px after:flex-grow after:bg-gradient-to-r after:from-stone-400 after:to-transparent text-neutral-300'>
                {dict('divider').toLowerCase()}
            </div>
            <p className='text-center text-sm text-neutral-300'>
                {`${dict('alreadyHaveAccount')} `}
                <Link className='text-primary hover:underline' href='/login'>
                    {dict('login')}
                </Link>
            </p>
        </div>
    );
};

export default SignUpForm;