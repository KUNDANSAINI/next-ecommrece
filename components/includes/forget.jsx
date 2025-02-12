'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { changePassword, sendEmailForForgetPassword, verifyOtp } from "@/action";


export function ForgotPasswordForm({ className, ...props }) {
    const [activeStep, setActiveStep] = useState(0)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z]).{6,20}$/;
        return regex.test(password);
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    function handleFormData(e) {
        e.preventDefault();
        if (activeStep === 0) {
            sendOTP()
        } else if (activeStep === 1) {
            verifyOTP()
        } else if (activeStep === 2) {
            forgetPassword()
        }
    }

    async function sendOTP() {
        if (!email) {
            toast.error("Please enter a email!");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Enter a valid email!");
            return;
        }
        try {
            setLoading(true)
            const data = { email }
            const response = await sendEmailForForgetPassword(data)
            if (response.success === true) {
                setActiveStep(1)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log("Forget Password Error:", error);
            toast.error("Something Went Wrong. Please Try Again ?");
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
            toast.error("Please enter a email!");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Enter a valid email!");
            return;
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
        }finally{
            setLoading(false)
        }
    }

    async function forgetPassword() {
        if (!email) {
            toast.error("Please enter a email!");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Enter a valid email!");
            return;
        }
        if (!validatePassword(password)) {
            return toast.warning("Password must be 6-20 characters long and contain at least one uppercase letter.");
        }
        if (password !== confirmPassword) {
            return toast.error("Password Don't Matched!")
        }
        try {
            setLoading(true)
            const data = { email, password }
            const response = await changePassword(data)
            if (response.success === true) {
                toast.success(response.message)
                router.push('/')
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log("forgrt password submission error:", error);
            toast.error("Something Went Wrong. Please try again.");
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6 bg-transparent")} {...props}>
            <Card className="overflow-hidden h-[700px] shadow-xl">
                <CardContent className="flex p-0  h-full">
                    <form className="p-6 md:p-8 w-full md:w-2/5 grid items-center">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    {activeStep === 1 ? "Enter OTP" : activeStep === 2 ? "New Password" : "Oops!"}
                                </h1>
                                <p className={`text-balance text-muted-foreground`}>
                                    Forget Password to your Trendy account
                                </p>
                            </div>
                            {
                                activeStep === 0 && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter Your Email"
                                            required
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                    </div>
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
                                        <Input
                                            type="password"
                                            placeholder="New Password"
                                            value={password}
                                            maxLength={20}
                                            onChange={(e) => { setPassword(e.target.value) }}
                                            required
                                        />
                                        <Input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            maxLength={20}
                                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                                            required
                                        />
                                    </>
                                )
                            }
                            <Button
                                onClick={handleFormData}
                                className="w-full"
                                disabled={loading}
                            >
                                {
                                    loading ? "Processing..." : activeStep === 1 ? "verify" : activeStep === 2 ? "Change Password" : "Send OTP"
                                }
                            </Button>
                            <hr />
                            <div className="text-center text-sm">
                                I have an account?{" "}
                                <Link href="/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="relative w-3/5 hidden bg-muted md:block border-l">
                        <Image
                            fill
                            src="/images/resetpassword.webp"
                            alt="Reset Password Image"
                            className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.5]"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <Link href="/terms-of-service">Terms of Service</Link>{" "}
                and <Link href="/privacy-policy">Privacy Policy</Link>.
            </div>
        </div>
    );
}
