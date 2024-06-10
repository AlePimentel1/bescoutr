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
                router.push('/sign-in')
            }
        } catch (e) {
            console.log(e)
            toast.error('Ocurrió un error al registrar el usuario')
        }
    };

    return (
        <div className='flex flex-col items-center justify-center space-y-6'>
            <h1 className='text-white text-4xl'>Bienvenido a Scoutr</h1>
            <div className='flex flex-col border rounded-lg p-6 h-auto w-full md:w-[420px] bg-white space-y-4'>
                <h2 className='text-2xl text-start font-semibold'>Sign up</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder='johndoe' {...field} />
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='mail@example.com' {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='Enter your password'
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
                                        <FormLabel>Re-Enter your password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Re-Enter your password'
                                                type='password'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className='w-full mt-6' type='submit'>
                            Sign up
                        </Button>
                    </form>
                </Form>
            </div>
            <div className=' text-white mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <p className='text-center text-sm text-white mt-2'>
                If you have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/login'>
                    Sign in
                </Link>
            </p>
            {/* <Toaster richColors /> */}
        </div>
    );
};

export default SignUpForm;