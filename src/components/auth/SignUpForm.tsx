'use client';
import { registerUser } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

interface Props {
    setAccountCreated: (value: boolean) => void;
}

const SignUpForm = ({ setAccountCreated }: Props) => {
    const dict = useTranslations('Auth.Register')
    const FormSchema = z.object({
        email: z.string().min(1, dict('errors.email')).email(dict('errors.emailInvalid')),
        password: z
            .string()
            .min(1, dict('errors.password'))
            .min(8, dict('errors.passwordLength')),
        confirmPassword: z.string().min(1, dict('errors.confirmPassword'))
    })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: dict('errors.passwordMatch'),
        });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (
            data: {
                email: string;
                password: string;
            }
        ) => registerUser(data),
        onSuccess: () => {
            setAccountCreated(true);
        },
        onError: (error) => {
            toast.error('Ocurrió un error al registrar el usuario')
        }
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        await mutate({
            email: values.email,
            password: values.password
        })
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
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white font-normal' required>{dict('email')}</FormLabel>
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
                            <FormField
                                control={form.control}
                                name='confirmPassword'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-white font-normal' required>{dict('confirmPassword')}</FormLabel>
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
                        <Button className='w-full mt-6' type='submit' disabled={isPending}>
                            {
                                isPending
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
                {`${dict('alreadyHaveAccount')} `}
                <Link className='text-primary hover:underline' href='/login'>
                    {dict('login')}
                </Link>
            </p>
        </div>
    );
};

export default SignUpForm;