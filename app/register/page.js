'use client'

import { SignupForm } from "@/components/includes/signup";
import Navbar from "../component/Navbar";

function Register() {

    return (
        <>
            <div className="mt-10">
            <Navbar />
            <div className="flex h-[880px] flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <SignupForm />
                </div>
            </div>
            </div>
        </>
    );
}

export default Register;