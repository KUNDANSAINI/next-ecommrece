'use client'

import { LoginForm } from "@/components/includes/login";
import Navbar from "@/components/includes/Navbar";

function Login() {

    return (
        <>
            <div className="mt-10">
            <Navbar />
            <div className="flex flex-col h-[880px] items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-6xl">
                    <LoginForm />
                </div>
            </div>
            </div>
        </>
    );
}

export default Login;