import SignUpForm from "@/components/auth/SignUpForm";


const signUpPage = () => {
    return (
        <div className="flex w-full min-h-[100vh]">
            <div className="flex-1 bg-primary md:flex hidden px-5 bg-gradient-to-r to-[#00254a] from-[#0c1116]
      via-[#00172e] animate-gradient-x items-center justify-center">
                <SignUpForm />
            </div>
        </div>
    );
};

export default signUpPage;