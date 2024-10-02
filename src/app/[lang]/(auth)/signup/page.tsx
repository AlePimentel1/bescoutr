'use client'
import AccountCreated from "@/components/auth/signin/account-created";
import SignUpForm from "@/components/auth/signup/sign-up-form";
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