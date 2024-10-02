'use client'
import { useState } from "react"
import Welcome from "./welcome-step"
import { useForm } from "react-hook-form"
import { completeProfileDefaultValues, completeProfileSchema } from "./utils/constants"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form"

const CompleteProfileSteps = () => {
    const [step, setStep] = useState(0)

    const form = useForm<z.infer<typeof completeProfileSchema>>({
        resolver: zodResolver(completeProfileSchema),
        defaultValues: completeProfileDefaultValues
    })

    const onSubmit = (values: z.infer<typeof completeProfileSchema>) => {
        console.log(values)
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {step === 0 && (
                    <Welcome form={form} />
                )}
            </form>

        </Form>
    )
}

export default CompleteProfileSteps