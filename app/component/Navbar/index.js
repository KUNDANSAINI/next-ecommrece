'use client'

import { AlignRight, CircleUserRound, LogOut, ShoppingBag } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import AdminLeftbar from "../Admin-Leftbar";



function Navbar() {
    const [openNavbar, setOpenNavbar] = useState(false)
    const router = useRouter()
    const {user,isLogin,setIsLogin,setUser} = useContext(GlobalContext)
    
    function handleLogout(){
        setIsLogin(false)
        setUser(null)
        localStorage.removeItem("user")
        Cookies.remove("token")
        router.push('/login')
    }

    return (
        <>
            <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Logo Image */}
                    <div className="flex items-center cursor-pointer">
                        <span onClick={()=>{router.push('/')}} className="self-center text-2xl font-semibold whitespace-nowrap">
                            E-commrecey
                        </span>
                    </div>

                    <div className="flex md:order-2 gap-4 items-center">
                        {
                            isLogin && !user ? (
                                <>
                                    <ShoppingBag className="text-gray-800 cursor-pointer" />
                                    <CircleUserRound className="text-gray-800 cursor-pointer" />
                                    <LogOut className="text-gray-800 cursor-pointer" onClick={()=>{handleLogout()}} />
                                </>
                            ) : null
                        }
                        {
                            user && isLogin ? (
                                    <LogOut className="text-gray-800 cursor-pointer" onClick={()=>{handleLogout()}} />
                            ) : null
                        }
                        {
                            !isLogin ? (
                                <>
                                    <Link href={'/login'}><Button>Login</Button></Link>
                                    <Link href={"/register"}><Button>Signup</Button></Link>
                                </>
                            ) : null
                        }
                    </div>

                    <AlignRight onClick={() => { setOpenNavbar(!openNavbar) }} className="md:hidden cursor-pointer" />

                    {/* Navbar items */}
                    <div className="hidden w-full md:flex md:w-auto items-center justify-center">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">
                            {
                                !user && isLogin ? (
                                    <>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Home</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Shop</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Men</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Women</li>
                                    </>
                                ) : null
                            }
                            {
                                !isLogin ? (
                                    <>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Home</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Shop</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Men</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Women</li>
                                    </>
                                ) : null
                            }
                        </ul>
                    </div>
                </div>
            </nav>


            {/* Side NavBar */}
            <Sheet
                open={openNavbar}
                onOpenChange={() => {
                    setOpenNavbar(false)
                }}
            >
                <SheetContent>
                    <SheetHeader className={'mt-4'}>
                        <ul className="flex flex-col p-4 mt-4 font-medium bg-white">
                            {
                                user && isLogin ? (
                                    <AdminLeftbar />
                                ) : null
                            }
                            {
                                !user && isLogin ? (
                                    <>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Home</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Shop</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Men</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Women</li>
                                    </>
                                ) : null
                            }
                            {
                                !isLogin ? (
                                    <>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Home</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Shop</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Men</li>
                                        <li className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0">Women</li>
                                    </>
                                ) : null
                            }
                        </ul>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default Navbar;