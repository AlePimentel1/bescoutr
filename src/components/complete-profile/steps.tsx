'use client'
import { useState } from "react"
import Welcome from "./welcome/welcome-step"
import { useForm } from "react-hook-form"
import { completeProfileDefaultValues, completeProfileSchema } from "./utils/constants"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../ui/form"
import BasicInfo from "./basic-info/BasicInfoStep"
import Favourites from "./favourites/favourites-step"
import { AnimatePresence, motion } from 'framer-motion';

const CompleteProfileSteps = () => {
    const [step, setStep] = useState(0)
    const [direction, setDirection] = useState(1)

    const form = useForm<z.infer<typeof completeProfileSchema>>({
        resolver: zodResolver(completeProfileSchema),
        defaultValues: completeProfileDefaultValues
    })

    const onSubmit = (values: z.infer<typeof completeProfileSchema>) => {
        console.log(values)
    }

    const handleNextStep = () => {
        setDirection(1)
        setStep(step + 1)
    }

    const handlePrevStep = () => {
        if (step === 0) return
        setDirection(-1)
        setStep(step - 1)
    }

    console.log(form.watch())

    const steps = [
        <Welcome form={form} nextStep={handleNextStep} />,
        <BasicInfo form={form} nextStep={handleNextStep} prevStep={handlePrevStep} />,
        <Favourites form={form} prevStep={handlePrevStep} />
    ]

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen flex items-center justify-center p-6">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={step}
                        initial={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: 'tween', duration: 0.5 }}
                    >
                        {steps[step]}
                    </motion.div>
                </AnimatePresence>
            </form>

        </Form>
    )
}

export default CompleteProfileSteps