'use client'

import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context";
import { AlignRight, LogOut, Vegan } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import AdminLeftbar from "../Admin-Leftbar";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import Cookies from "js-cookie";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function AdminHeader() {
    const router = useRouter()
    const [openNavbar, setOpenNavbar] = useState(false)
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
            <header>
                <div className="w-full flex items-center justify-center">
                    <div className="flex justify-between w-3/4">
                        {/* Logo Image */}
                        <span className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/admin-dashboard')} >
                            <Button variant="outline" size="icon" className=" drop-shadow-lg"><Vegan /></Button>
                            <span className="hidden md:block drop-shadow-lg" style={{ fontFamily: 'Rubik Glitch, sans-serif' }}>BAZZKIT PRO</span>
                        </span>

                        <div className="flex gap-4">
                        <Button variant="outline" size="icon" className="hidden md:flex justify-center drop-shadow-lg" onClick={handleLogout}><LogOut /></Button>
                        <Button variant="outline" size="icon" className=" drop-shadow-lg lg:hidden" onClick={() => { setOpenNavbar(!openNavbar) }} ><AlignRight /></Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
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
                        </DropdownMenu>
                        </div>
                    </div>
                </div>

            </header>
            <Sheet
                open={openNavbar}
                onOpenChange={() => {
                    setOpenNavbar(false)
                }}
            >
                <SheetContent>
                    <SheetHeader className={'mt-4'}>
                        {
                            user && isLogin ? (
                                <AdminLeftbar />
                            ) : null
                        }
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default AdminHeader;