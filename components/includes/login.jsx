'use client'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export function LoginForm({ className, ...props }) {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    })
    const router = useRouter()
    const { isLogin, setIsLogin, user, setUser } = useContext(GlobalContext)

    async function handleLoginForm(e) {
        e.preventDefault()
        try {
            const response = await axios.post('/api/login', loginFormData)
            if (response.data.success === true) {
                setIsLogin(true)
                setUser(response.data.user.role)
                Cookies.set("token", response.data.token, { expires: 1 / 24 })
                localStorage.setItem("user", JSON.stringify(response.data.user))
                if (response.data.user.role === true) {
                    router.push('/admin-dashboard')
                } else {
                    router.push("/")
                }
            } else {
                setIsLogin(false)
                toast.error(response.data.message)
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
        <div className={cn("flex flex-col gap-6 bg-transparent")} {...props}>
            <Card className="overflow-hidden h-[700px] shadow-xl">
                <CardContent className="flex p-0  h-full">
                    <form className="p-6 md:p-8 w-full md:w-2/5 grid items-center">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your BAZZKIT account
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
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
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
                            </div>
                            <Button onClick={handleLoginForm} className="w-full">
                                Login
                            </Button>
                            <hr/>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </form>
                    <div className="relative w-3/5 hidden bg-muted md:block border-l">
                        <img
                            src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?t=st=1736753045~exp=1736756645~hmac=2ba194e6395c343d1009c20e81933a0647c938a119168c4cb60a5dc0d992124a&w=826"
                            alt="Image"
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
