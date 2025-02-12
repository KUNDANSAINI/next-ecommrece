'use client'

import { AlignRight, CircleUserRound, LogOut, ShoppingBag } from "lucide-react";
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
import { useTheme } from "next-themes"
import { IconTruckDelivery } from "@tabler/icons-react";



function Navbar({ type }) {
    const [openNavbar, setOpenNavbar] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const { user, isLogin, setIsLogin, setUser } = useContext(GlobalContext)
    const { setTheme } = useTheme()

    function handleLogout() {
        setIsLogin(false)
        setUser(null)
        localStorage.removeItem("user")
        Cookies.remove("token")
        router.push('/login')
    }


    return (
        <>
            <nav>
                <div className="w-full flex flex-wrap items-center justify-around">
                    {/* Logo Image */}
                    <span className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')} >
                        <span className="drop-shadow-lg font-bold text-xl">Trendy</span>
                    </span>

                    {/* Navbar items */}
                    <div className="hidden w-full lg:flex md:w-auto items-center justify-center">
                        <ul className="flex flex-col mt-4 p-1 font-medium rounded-full md:flex-row md:space-x-8 md:mt-0 md:border shadow-lg">
                            <Link href="/"><li className={`cursor-pointer block rounded-full px-4 py-1 ${pathname === "/" ? "bg-blue-400" : ""}`}>Home</li></Link>
                            <Link href="/Shop"><li className={`cursor-pointer block rounded-full px-4 py-1 ${type === `Shop` ? "bg-blue-400" : ""}`}>Shop</li></Link>
                            <Link href='/Men'><li className={`cursor-pointer block rounded-full px-4 py-1 ${type === `Men` ? "bg-blue-400" : ""}`}>Men</li></Link>
                            <Link href="/Women"><li className={`cursor-pointer block rounded-full px-4 py-1 ${type === `Women` ? "bg-blue-400" : ""}`}>Women</li></Link>
                            <Link href="/Kids"><li className={`cursor-pointer block rounded-full px-4 py-1 ${type === `Kids` ? "bg-blue-400" : ""}`}>Kids</li></Link>
                        </ul>
                    </div>

                    <div className="flex gap-4 items-center">
                        {
                            isLogin && !user ? (
                                <>
                                    <Link href={'/order'}><Button variant="outline" className="hidden md:flex items-center drop-shadow-lg" size="icon"><IconTruckDelivery /></Button></Link>
                                    <Link href={'/cart'}>
                                        <Button variant="outline" className="drop-shadow-lg relative" size="icon">
                                            <ShoppingBag />
                                            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                            </span>
                                        </Button>
                                    </Link>

                                    <Link href={'/account'}><Button variant="outline" className="hidden md:flex items-center drop-shadow-lg" size="icon"><CircleUserRound /></Button></Link>
                                    <Button variant="outline" size="icon" className="hidden md:flex items-center drop-shadow-lg" onClick={() => { handleLogout() }}><LogOut /></Button>
                                </>
                            ) : null
                        }
                        {
                            !isLogin ? (
                                <Link href={'/login'}><Button variant="outline" className="rounded-full shadow-lg">Login</Button></Link>
                            ) : null
                        }
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="shadow-lg">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </div>
                    <Button variant="outline" size="icon" className=" drop-shadow-lg lg:hidden" onClick={() => { setOpenNavbar(!openNavbar) }} ><AlignRight /></Button>
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
                                !user ? (
                                    <>
                                        <Link href="/" className="w-full"><li className={`cursor-pointer block rounded-lg py-2 ${pathname === "/" ? "bg-blue-400" : ""}`}>Home</li></Link>
                                        <Link href="/shop" className="w-full"><li className={`cursor-pointer block rounded-lg py-2 ${pathname === "/shop" ? "bg-blue-400" : ""}`}>Shop</li></Link>
                                        <Link href="/men" className="w-full"><li className={`cursor-pointer block rounded-lg py-2 ${pathname === "/men" ? "bg-blue-400" : ""}`}>Men</li></Link>
                                        <Link href="/women" className="w-full"><li className={`cursor-pointer block rounded-lg py-2 ${pathname === "/women" ? "bg-blue-400" : ""}`}>Women</li></Link>
                                        <Link href="/kids" className="w-full"><li className={`cursor-pointer block rounded-lg py-2 ${pathname === "/kids" ? "bg-blue-400" : ""}`}>Kids</li></Link>
                                    </>
                                ) : null
                            }

                            {
                                isLogin && !user ? (
                                    <>
                                        <Link href="/account" className="w-full"><li className={`md:hidden cursor-pointer block rounded-lg py-2 ${pathname === "/account" ? "bg-blue-400" : ""}`}>Account</li></Link>
                                        <Link href="/order" className="w-full"><li className={`md:hidden cursor-pointer block rounded-lg py-2 ${pathname === "/order" ? "bg-blue-400" : ""}`}>Order</li></Link>
                                        <li onClick={() => { handleLogout() }} className={`md:hidden cursor-pointer block rounded-lg py-2 w-full`}>Logout</li>
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