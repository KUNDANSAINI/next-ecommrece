'use client'

import { Input } from "@/components/ui/input";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";

function Login() {
    const [loginFormData,setLoginFormData] = useState({
        email:"",
        password:"",
    })
    const router = useRouter()
    const { isLogin, setIsLogin, user, setUser} = useContext(GlobalContext)

    async function handleLoginForm(){
        try{
            const response = await axios.post('/api/login',loginFormData)            
            if(response.data.success === true){
                setIsLogin(true)
                setUser(response.data.user.role)
                Cookies.set("token",response.data.token)
                localStorage.setItem("user",JSON.stringify(response.data.user))
            }else{
                setIsLogin(false)
                toast.error(response.data.message)
            }
        }catch(error){
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    useEffect(()=>{
        if(isLogin && !user){
            router.push('/')
        }else if(isLogin && user){
            router.push('/admin-dashboard')
        }
    },[isLogin,user])

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center h-[80vh]">
                <Navbar />
                <div className="border w-11/12 sm:w-4/5 md:w-1/2 lg:w-1/4 p-6 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-semibold text-gray-800 text-center">Login</h1>
                    <form action={handleLoginForm}>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={loginFormData.email}
                            onChange={(e)=>{setLoginFormData({
                                ...loginFormData,
                                email : e.target.value
                            })}}
                        />
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={loginFormData.password}
                            onChange={(e)=>{setLoginFormData({
                                ...loginFormData,
                                password : e.target.value
                            })}}
                        />
                        <div className="text-end my-2">
                            <Link className="text-blue-500 hover:underline" href={"/"}>Forgot Password</Link>
                        </div>
                        <hr className="my-4" />
                        <Button type="submit" className="w-full" disabled={!loginFormData.email || loginFormData.password < 6 }>Login</Button>
                    </form>
                    <Link href={"/register"}><Button className="w-full mt-2">Create a new account ?</Button></Link>
                </div>
            </div>
        </>
    );
}

export default Login;