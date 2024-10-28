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

function Register() {
    const router = useRouter()
    const [userFormData, setUserFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirm_password: "",
    })
    const { isLogin, user} = useContext(GlobalContext)

    async function handleUserForm() {
        try {
            const { password, confirm_password } = userFormData
            if (password === confirm_password) {
                const response = await axios.post('/api/register', userFormData)
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
                    <h1 className="text-3xl font-semibold text-gray-800 text-center">New Account ?</h1>
                    <form action={handleUserForm}>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={userFormData.fullName}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    fullName: e.target.value
                                })
                            }}
                        />
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={userFormData.email}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    email: e.target.value
                                })
                            }}
                        />
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={userFormData.password}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    password: e.target.value
                                })
                            }}
                        />
                        <div className="text-end">
                            <p className=" italic text-xs mt-1">Minimum 6 Character Include</p>
                        </div>
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            value={userFormData.confirm_password}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    confirm_password: e.target.value
                                })
                            }}
                        />
                        <hr className="my-4" />
                        <Button type="submit" className="w-full" disabled={!userFormData.fullName || !userFormData.email || userFormData.password.length < 6 || userFormData.confirm_password < 6}>Signup</Button>
                    </form>
                    <Link href={"/login"}><Button className="w-full mt-2">Already Have An Account ?</Button></Link>
                </div>
            </div>
        </>
    );
}

export default Register;