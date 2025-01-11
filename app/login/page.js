'use client'

import { LoginForm } from "@/components/includes/login";
import Navbar from "../component/Navbar";

function Login() {

    return (
        <>
            <div className="mt-10">
            <Navbar />
            <div className="flex flex-col h-[880px] items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <LoginForm />
                </div>
            </div>
            </div>
        </>
    );
}

export default Login;