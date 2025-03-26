'use client'

import { Button } from "@/components/ui/button";
import { AlignRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminLeftbar from "../Admin-Leftbar";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutUser } from "@/action";
import { useDispatch } from "react-redux";
import { logoutState } from "@/slices/authSlice";
import toast from "react-hot-toast";

function AdminHeader() {
    const router = useRouter()
    const [openNavbar, setOpenNavbar] = useState(false)
    const { setTheme } = useTheme()
    const dispatch = useDispatch()

    async function handleLogout() {
        try{
            const response = await logoutUser()
            if(response.success === true){
                dispatch(logoutState())
                router.push('/login')
                toast.success(response.message)
            }
        }catch(error){
            console.log("logout error:", error);
        }
    }

    return (
        <>
            <header>
                <div className="w-full flex items-center justify-center">
                    <div className="flex justify-between w-4/5">
                        {/* Logo Image */}
                        <span className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/admin-dashboard')} >
                            <span className="drop-shadow-lg font-bold text-xl">Trendy</span>
                        </span>

                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" className="hidden md:flex justify-center drop-shadow-lg" onClick={handleLogout}><LogOut /></Button>
                            <Button variant="outline" size="icon" className=" drop-shadow-lg lg:hidden" onClick={() => { setOpenNavbar(!openNavbar) }} ><AlignRight /></Button>
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
                        <AdminLeftbar />
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default AdminHeader;