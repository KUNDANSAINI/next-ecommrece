'use client'

import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { useContext } from "react";
import Cookies from "js-cookie";
import { IconBrandTabler, IconCategory, IconShoppingBagPlus, IconUser } from "@tabler/icons-react";

function AdminLeftbar() {
    const router = useRouter()
    const path = usePathname()
    const { setIsLogin, setUser } = useContext(GlobalContext)

    function handleLogout() {
        setIsLogin(false)
        setUser(null)
        localStorage.removeItem("user")
        Cookies.remove("token")
        router.push('/login')
    }
    return (
        <>
            <div className="flex flex-col rounded-lg md:border h-full">
                <ul className="mt-2 mx-2 grid gap-2 font-semibold">
                    <Link href={'/admin-dashboard'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard" ? "bg-blue-500 rounded-lg" : ""} justify-center md:justify-normal`}><IconBrandTabler stroke={2} className="hidden md:block" />Dashboard</li></Link>
                    <Link href={'/admin-dashboard/users'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/users" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconUser stroke={2} className="hidden md:block" />Users</li></Link>
                    <Link href={'/admin-dashboard/product'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/product" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconShoppingBagPlus stroke={2} className="hidden md:block" />Product</li></Link>
                    <Link href={'/admin-dashboard/brands'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/brands" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><BadgeCheck className="hidden md:block" />Brands</li></Link>
                    <Link href={'/admin-dashboard/category'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/category" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconCategory className="hidden md:block" />Category</li></Link>
                    <li className="md:hidden flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white border-b hover:rounded-lg font-semibold cursor-pointer justify-center md:justify-normal"  onClick={() => { handleLogout() }}>Logout</li>
                </ul>
            </div>
        </>
    );
}

export default AdminLeftbar;