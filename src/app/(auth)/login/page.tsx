import SignInForm from "@/components/auth/SignInForm";


const signInPage = () => {
    return (
        <div className="flex w-full min-h-[100vh]">
            <div className="flex-1 bg-primary flex px-5 bg-gradient-to-r to-[#00254a] from-[#0c1116]
      via-[#00172e] animate-gradient-x items-center justify-center">
                <SignInForm />
            </div>
        </div>
    );
};

export default signInPage;