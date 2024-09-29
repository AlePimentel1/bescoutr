'use client'
import SignUpForm from "@/components/auth/SignUpForm";
import { useState } from "react";


const signUpPage = () => {
    const [accountCreated, setAccountCreated] = useState(false);
    return (
        <>
            {
                accountCreated ?
                    (
                        <div>hola</div>
                    ) :
                    (
                        <SignUpForm setAccountCreated={setAccountCreated} />
                    )
            }
        </>
    );
};

export default signUpPage;