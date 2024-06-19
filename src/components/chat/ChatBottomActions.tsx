import React, { useEffect } from 'react';
import { z } from 'zod';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '@/components/ui/button';
import { sendChatMessage } from '@/actions/chatActions';

export const messageSchema = z.object({
    message: z.string().min(1, "Message is required"),
})

export const messageDefaultValues = {
    message: "",
}

const ChatBottomActions = () => {

    const contextForm = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: messageDefaultValues
    })

    const onSubmit = async (values: z.infer<typeof messageSchema>) => {
        await sendChatMessage(values);
        contextForm.reset()
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            contextForm.handleSubmit(onSubmit)();
        }
    }

    return (
        <div className="py-5">
            <Form {...contextForm}>
                <form onSubmit={contextForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={contextForm.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='relative'>
                                        <Textarea
                                            placeholder="Escribe un mensaje..."
                                            className="resize-none"
                                            onKeyDown={(e) => handleKeyDown(e)}
                                            {...field}
                                        />
                                        <Button type='submit' className='absolute right-2 bottom-2'>
                                            Enviar
                                        </Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};

export default ChatBottomActions;
