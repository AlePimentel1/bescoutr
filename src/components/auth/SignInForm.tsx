'use client';


import * as z from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
    const contextForm = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
        })
        console.log(signInData);
    };

    return (
        <div className='flex flex-col items-center justify-center space-y-6'>
            <h1 className='text-white text-4xl'>Bienvenido a Scoutr</h1>

            <div className='flex flex-col border rounded-lg p-6 h-auto w-[420px] bg-white space-y-4'>
                <h2 className='text-2xl text-start font-semibold'>Sign in</h2>
                <Form {...contextForm}>
                    <form onSubmit={contextForm.handleSubmit(onSubmit)} className='w-full'>
                        <div className='space-y-4'>
                            <FormField
                                control={contextForm.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type='email'
                                                placeholder='mail@example.com'
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
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='password'
                                                placeholder='Ingresá tu contraseña'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className='w-full mt-6' type='submit'>
                            Sign in
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-white'>
                or
            </div>
            <p className='text-center text-sm text-white mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/sign-up'>
                    Sign up
                </Link>
            </p>
        </div>

    );
};

export default SignInForm;