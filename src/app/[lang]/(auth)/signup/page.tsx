'use client'
import AccountCreated from "@/components/auth/signin/AccountCreated";
import SignUpForm from "@/components/auth/signup/SignUpForm";
import { useState } from "react";


const signUpPage = () => {
    const [accountCreated, setAccountCreated] = useState(false);
    return (
        <>
            {
                accountCreated ?
                    (
                        <AccountCreated />
                    ) :
                    (
                        <SignUpForm setAccountCreated={setAccountCreated} />
                    )
            }
        </>
    );
};

export default signUpPage;