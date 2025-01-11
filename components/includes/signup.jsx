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
import axios from "axios";
import { toast } from "react-toastify";

export function SignupForm({ className, ...props }) {
    const router = useRouter()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [emailID, setEmailID] = useState("")
    const [password, setPassword] = useState("")
    const [confirm_password, setConfirmPassword] = useState("")
    const { isLogin, user } = useContext(GlobalContext)

    function handleEmail(e) {
        e.preventDefault()
        if (!email) {
            return toast.error("Email Are Required!")
        }
        setEmailID(email)
    }

    async function handleUserForm(e) {
        e.preventDefault()
        try {
            const data = {email, fullName, password, confirm_password }
            if (password === confirm_password) {
                const response = await axios.post('/api/register', data)
                if (response.data.success === true) {
                    router.push('/login')
                    toast.success("Your Account Is Successfully Created. Please Login !")
                } else {
                    toast.error(response.data.message)
                }
            } else {
                toast.error("Confirm Password Don't Matched!")
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    useEffect(() => {
        if (isLogin && !user) {
            router.push('/')
        } else if (isLogin && user) {
            router.push('/admin-dashboard')
        }
    }, [isLogin, user])


    return (
        <>
            <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card className="overflow-hidden h-[530px]">
                    <CardContent className="grid p-0 md:grid-cols-2 h-full">
                        <form className="p-6 md:p-8 grid items-center">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        {
                                            emailID ? "New Password" : "Welcome"
                                        }
                                    </h1>
                                    <p className={`text-balance text-muted-foreground`}>
                                        Signup to your BAZZKIT account
                                    </p>
                                </div>
                                {
                                    emailID ? (
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
                                    ) : (
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
                                <Button
                                    onClick={emailID ? handleUserForm : handleEmail}
                                    className="w-full"
                                >
                                    {
                                        emailID ? "Create Account" : "Signup"
                                    }
                                </Button>
                                <hr/>
                                <div className={`text-center text-sm`}>
                                    I have an account?{" "}
                                    <Link href="/login" className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <div className="relative hidden bg-muted md:block">
                            <img
                                src="https://images.pexels.com/photos/8490072/pexels-photo-8490072.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </CardContent>
                </Card >
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                    By clicking continue, you agree to our <Link href="/terms-and-conditions">Terms of Service</Link>{" "}
                    and <Link href="/privacy-policy">Privacy Policy</Link>.
                </div>
            </div >
        </>
    );
}
