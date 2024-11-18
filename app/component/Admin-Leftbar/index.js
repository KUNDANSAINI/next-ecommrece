'use client'

import { BadgeCheck, Layers, Layers2, LayoutDashboard, LibraryBig, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { useContext } from "react";
import Cookies from "js-cookie";

function AdminLeftbar() {
    const router = useRouter()
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
            <div className="flex flex-col rounded-lg md:border md:h-full">
                <ul className="my-2 mx-3">
                    <Link href={'/admin-dashboard'}><li className="flex items-center gap-2 py-2 px-4 hover:bg-[#8B8DF6] hover:text-white border-b-2 hover:rounded-full font-semibold"><LayoutDashboard size={18} />Dashboard</li></Link>
                    <Link href={'/admin-dashboard/users'}><li className="flex items-center gap-2 py-2 px-4 hover:bg-[#8B8DF6] hover:text-white border-b-2 hover:rounded-full font-semibold"><UserRound size={18} />Users</li></Link>
                    <Link href={'/admin-dashboard/product'}><li className="flex items-center gap-2 py-2 px-4 hover:bg-[#8B8DF6] hover:text-white border-b-2 hover:rounded-full font-semibold"><LibraryBig size={18} />Product</li></Link>
                    <Link href={'/admin-dashboard/brands'}><li className="flex items-center gap-2 py-2 px-4 hover:bg-[#8B8DF6] hover:text-white border-b-2 hover:rounded-full font-semibold"><BadgeCheck size={18} />Brands</li></Link>
                    <Link href={'/admin-dashboard/category'}><li className="flex items-center gap-2 py-2 px-4 hover:bg-[#8B8DF6] hover:text-white border-b-2 hover:rounded-full font-semibold"><Layers size={18} />Category</li></Link>
                    <Link href={'/admin-dashboard/subcategory'}><li className="flex items-center gap-2 py-2 px-4 hover:bg-[#8B8DF6] hover:text-white border-b-2 hover:rounded-full font-semibold"><Layers2 size={18} />SubCategory</li></Link>
                    <li className="flex items-center gap-2 py-2 px-4 hover:bg-[#8B8DF6] hover:text-white border-b-2 hover:rounded-full font-semibold cursor-pointer"  onClick={() => { handleLogout() }}><LogOut />Logout</li>
                </ul>
            </div>
        </>
    );
}

export default AdminLeftbar;