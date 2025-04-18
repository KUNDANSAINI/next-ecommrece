'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/action";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { loginState } from "@/slices/authSlice";
import toast from "react-hot-toast";
import { IconEye, IconEyeOff, IconLock, IconLockOpen2 } from "@tabler/icons-react";

export function LoginForm({ className, ...props }) {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    })
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z]).{6,20}$/;
        return regex.test(password);
    };

    async function handleLoginForm(e) {
        e.preventDefault();
        if (!loginFormData.email) {
            toast.error("Email Are Required!")
            return
        }
        if (!validateEmail(loginFormData.email)) {
            toast.error("Enter a valid email!")
            return
        }
        if (!validatePassword(loginFormData.password)) {
            toast.error("Password must be 6-20 characters long and contain at least one uppercase letter.")
            return
        }
        try {
            setLoading(true)
            const response = await login(loginFormData, '/login');

            if (response.success === true) {
                dispatch(loginState({ user: response.id }))
                const isAdmin = response.role === true;
                router.push(isAdmin ? '/admin-dashboard' : '/')
                toast.success(response.message)
            } else {
                toast.error(response?.message || "Login failed. Please try again.");
            }
        } catch (error) {
            // Unexpected error
            console.error("Login Error:", error);
            toast.error("Something went wrong. Please try again!");
        } finally {
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
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your Trendy account
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={loginFormData.email}
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginFormData,
                                            email: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        href={'/forget-password'}
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="6+ Charaters, 1 Capital Charater"
                                        value={loginFormData.password}
                                        onChange={(e) => {
                                            setLoginFormData({
                                                ...loginFormData,
                                                password: e.target.value
                                            })
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => { setShowPassword(!showPassword) }}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    >
                                        {
                                            showPassword
                                                ?
                                                <IconEyeOff stroke={2} className="text-gray-400" width={20} height={20} />
                                                :
                                                <IconEye stroke={2} width={20} className="text-gray-600" height={20} />

                                        }
                                    </button>
                                </div>
                            </div>
                            <Button onClick={handleLoginForm} className="w-full" disabled={loading}>
                                {loading ? "Processing..." : "Login"}
                            </Button>
                            <hr />
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="relative w-3/5 hidden bg-muted md:block border-l">
                        <Image
                            fill
                            src="/images/login.webp"
                            alt="Login Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
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
