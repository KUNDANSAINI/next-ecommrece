'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import { sendEmail, Signup, verifyOtp } from "@/action";
import Image from "next/image";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export function SignupForm({ className, ...props }) {
    const router = useRouter()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    const { isLogin, user } = useContext(GlobalContext)
    const [activeStep, setActiveStep] = useState(0)
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z]).{6,20}$/;
        return regex.test(password);
    };

    function handleFormData(e) {
        e.preventDefault()
        if (activeStep === 0) {
            sendOTP()
        } else if (activeStep === 1) {
            verifyOTP()
        } else if (activeStep === 2) {
            createAccount()
        }
    }

    async function sendOTP() {
        if (!email) {
            return toast.error("Email Are Required!")
        }
        if (!validateEmail(email)) {
            return toast.error("Enter a valid email!")
        }
        try {
            setLoading(true)
            const data = { email }
            const response = await sendEmail(data)
            if (response.success === true) {
                setActiveStep(1)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log("Signup Error:", error);
            toast.error("Something Went Wrong. Please Try Again?");
        } finally {
            setLoading(false)
        }
    }

    async function verifyOTP() {
        if (!otp || otp.length < 6) {
            toast.error("Invalid OTP! Please enter a 6-digit code.");
            return;
        }
        if (!email) {
            return toast.error("Email Are Required!")
        }
        if (!validateEmail(email)) {
            return toast.error("Enter a valid email!")
        }
        try {
            setLoading(true)
            const data = { otp, email }
            const response = await verifyOtp(data)
            if (response.success === true) {
                setActiveStep(2)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Invalid OTP. Please try again.");
        } finally {
            setLoading(false)
        }
    }

    async function createAccount() {
        if (!email) {
            toast.error("Email Are Required!")
            return
        }
        if (!validateEmail(email)) {
            toast.error("Enter a valid email!")
            return
        }
        if (!validatePassword(password)) {
            toast.error("Password must be 6-20 characters long and contain at least one uppercase letter.")
            return
        }
        if (password !== confirm_password) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            setLoading(true)
            const data = { email, fullName, password, confirm_password };
            const response = await Signup(data, '/register');
            if (response.success === true) {
                toast.success(response.message);
                router.push('/login');
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="overflow-hidden shadow-xl h-[700px]">
                    <CardContent className="flex p-0 h-full">
                        <form className="p-6 md:p-8 w-full md:w-2/5 grid items-center">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        {activeStep === 0 ? "Welcome" : activeStep === 1 ? "OTP" : "New Password"}
                                    </h1>
                                    <p className={`text-balance text-muted-foreground`}>
                                        Signup to your Trendy account
                                    </p>
                                </div>
                                {
                                    activeStep === 0 && (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Username</Label>
                                                <Input
                                                    id="username"
                                                    type="text"
                                                    placeholder="Name"
                                                    value={fullName}
                                                    onChange={(e) => { setFullName(e.target.value) }}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    required
                                                    value={email}
                                                    onChange={(e) => { setEmail(e.target.value) }}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    activeStep === 1 && (
                                        <div className="grid justify-center">
                                            <InputOTP
                                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                                autoFocus
                                                maxLength={6}
                                                value={otp}
                                                onChange={(value) => setOtp(value)}
                                            >
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    )
                                }
                                {
                                    activeStep === 2 && (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">New Password</Label>
                                                <Input
                                                    type="password"
                                                    placeholder="New Password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => { setPassword(e.target.value) }}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Confirm Password</Label>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    required
                                                    value={confirm_password}
                                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                                <Button
                                    onClick={handleFormData}
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {
                                        loading ? "Processing..." : activeStep === 0 ? "Send OTP" : activeStep === 1 ? "verify" : "Signup"
                                    }
                                </Button>
                                <hr />
                                <div className={`text-center text-sm`}>
                                    I have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <div className="relative hidden w-3/5 bg-muted md:block border-l">
                            {
                                activeStep === 0 && (
                                    <Image
                                        fill
                                        src="/images/signup.webp"
                                        alt="Signup Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
                                    />
                                )
                            }
                            {
                                activeStep === 1 && (
                                    <Image
                                        fill
                                        src="/images/otp.webp"
                                        alt="Signup Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
                                    />
                                )
                            }
                            {
                                activeStep === 2 && (
                                    <Image
                                        fill
                                        src="/images/password.webp"
                                        alt="Password Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
                                    />
                                )
                            }
                        </div>
                    </CardContent>
                </Card >
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                    By clicking continue, you agree to our <Link href="/terms-of-service">Terms of Service</Link>{" "}
                    and <Link href="/privacy-policy">Privacy Policy</Link>.
                </div>
            </div >
        </>
    );
}
