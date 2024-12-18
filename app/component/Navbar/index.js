'use client'

import { AlignRight, CircleUserRound, LogOut, ShoppingBag, Vegan } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
} from "@/components/ui/sheet"
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import AdminLeftbar from "../Admin-Leftbar";



function Navbar() {
    const [openNavbar, setOpenNavbar] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { user, isLogin, setIsLogin, setUser } = useContext(GlobalContext)

    function handleLogout() {
        setIsLogin(false)
        setUser(null)
        localStorage.removeItem("user")
        Cookies.remove("token")
        router.push('/login')
    }
    

    return (
        <>
            <nav className=" sticky top-10 z-50">
                <div className="w-full flex flex-wrap items-center justify-around">
                    {/* Logo Image */}
                    <span className="flex items-center gap-2 cursor-pointer" onClick={()=> router.push('/')} >
                        <Vegan className="bg-white rounded-full p-2 shadow-lg" size={40} /><span className="drop-shadow-lg" style={{ fontFamily: 'Rubik Glitch, sans-serif' }}>BAZZKIT PRO</span>
                    </span>

                    {/* Navbar items */}
                    <div className="hidden w-full lg:flex md:w-auto items-center justify-center">
                        <ul className="flex flex-col mt-4 p-1 font-medium rounded-full md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-[#FCFDFC] shadow-lg">
                            <Link href="/"><li className={`cursor-pointer block text-gray-900 rounded-full px-4 py-1 ${pathname === "/" ? "bg-[#F0F1F0]" : ""}`}>Home</li></Link>
                            <Link href="/shop"><li className={`cursor-pointer block text-gray-900 rounded-full px-4 py-1 ${pathname === "/shop" ? "bg-[#F0F1F0]" : ""}`}>Shop</li></Link>
                            <Link href='/men'><li className={`cursor-pointer block text-gray-900 rounded-full px-4 py-1 ${pathname === "/men" ? "bg-[#F0F1F0]" : ""}`}>Men</li></Link>
                            <Link href="/women"><li className={`cursor-pointer block text-gray-900 rounded-full px-4 py-1 ${pathname === "/women" ? "bg-[#F0F1F0]" : ""}`}>Women</li></Link>
                            <Link href="/kids"><li className={`cursor-pointer block text-gray-900 rounded-full px-4 py-1 ${pathname === "/kids" ? "bg-[#F0F1F0]" : ""}`}>Kids</li></Link>
                        </ul>
                    </div>

                    <div className="flex lg:order-2 gap-4 items-center">
                        {
                            isLogin && !user ? (
                                <>
                                    <Link href={'/cart'}><Button variant="outline" className=" drop-shadow-lg" size="icon"><ShoppingBag /></Button></Link>
                                    <Link href={'/account'}><Button variant="outline" className=" drop-shadow-lg" size="icon"><CircleUserRound /></Button></Link>
                                    <Button variant="outline" size="icon" className=" drop-shadow-lg" onClick={() => { handleLogout() }}><LogOut /></Button>
                                </>
                            ) : null
                        }
                        {
                            !isLogin ? (
                                <Link href={'/login'}><Button className="rounded-full bg-white hover:bg-white text-gray-900 shadow-lg">Login</Button></Link>
                            ) : null
                        }
                    </div>

                    <AlignRight onClick={() => { setOpenNavbar(!openNavbar) }} className="lg:hidden cursor-pointer" />
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
                        <ul className="flex flex-col p-1 justify-center items-center gap-4">
                            {
                                user && isLogin ? (
                                    <AdminLeftbar />
                                ) : null
                            }
                            {
                                !user && isLogin ? (
                                    <>
                                        <li className="cursor-pointer block text-gray-900 rounded-full">Home</li>
                                        <li className="cursor-pointer block text-gray-900 rounded-full">Shop</li>
                                        <li className="cursor-pointer block text-gray-900 rounded-full">Men</li>
                                        <li className="cursor-pointer block text-gray-900 rounded-full">Women</li>
                                    </>
                                ) : null
                            }
                            {
                                !isLogin ? (
                                    <>
                                    <li className="cursor-pointer block text-gray-900 rounded-full">Home</li>
                                    <li className="cursor-pointer block text-gray-900 rounded-full">Shop</li>
                                    <li className="cursor-pointer block text-gray-900 rounded-full">Men</li>
                                    <li className="cursor-pointer block text-gray-900 rounded-full">Women</li>
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