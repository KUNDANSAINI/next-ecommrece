'use client'

import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IconBrandTabler, IconCategory, IconShoppingBagPlus, IconTruckDelivery, IconTruckLoading, IconTruckReturn, IconUser } from "@tabler/icons-react";
import { logoutUser } from "@/action";
import { useDispatch } from "react-redux";
import { logoutState } from "@/slices/authSlice";
import toast from "react-hot-toast";

function AdminLeftbar() {
    const router = useRouter()
    const path = usePathname()
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
            <div className="flex flex-col rounded-lg md:border h-full">
                <ul className="mt-2 mx-2 grid gap-2 font-semibold">
                    <Link href={'/admin-dashboard'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard" ? "bg-blue-500 rounded-lg" : ""} justify-center md:justify-normal`}><IconBrandTabler stroke={2} className="hidden md:block" />Dashboard</li></Link>
                    <Link href={'/admin-dashboard/users'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/users" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconUser stroke={2} className="hidden md:block" />Users</li></Link>
                    <Link href={'/admin-dashboard/product'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/product" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconShoppingBagPlus stroke={2} className="hidden md:block" />Product</li></Link>
                    <Link href={'/admin-dashboard/brands'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/brands" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><BadgeCheck className="hidden md:block" />Brands</li></Link>
                    <Link href={'/admin-dashboard/category'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/category" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconCategory className="hidden md:block" />Category</li></Link>
                    <Link href={'/admin-dashboard/orders'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/orders" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconTruckLoading className="hidden md:block" />Orders</li></Link>
                    <Link href={'/admin-dashboard/out-of-delivery'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/out-of-delivery" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconTruckDelivery className="hidden md:block" />Out Of Delivery</li></Link>
                    <Link href={'/admin-dashboard/delivered'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/delivered" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconTruckReturn className="hidden md:block" />Delivered</li></Link>
                    <Link href={'/admin-dashboard/customer-review'} className="border-b pb-2"><li className={`flex items-center gap-2 p-4 ${path === "/admin-dashboard/customer-review" ? "bg-blue-500 text-white rounded-lg" : ""} justify-center md:justify-normal`}><IconTruckReturn className="hidden md:block" />Customer Review</li></Link>
                    <li className="md:hidden flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white border-b hover:rounded-lg font-semibold cursor-pointer justify-center md:justify-normal" onClick={handleLogout}>Logout</li>
                </ul>
            </div>
        </>
    );
}

export default AdminLeftbar;