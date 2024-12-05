'use client'

import AdminLeftbar from "@/app/component/Admin-Leftbar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Ellipsis, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AdminHeader from "@/app/component/AdminHeader";
import axios from "axios";
import { API_URL } from "@/env";


function User() {
    const [getUsers,setGetUsers] = useState([])

    useEffect(()=>{
        fetchUsers()
    },[])

    async function fetchUsers() {
        try {
            const response = await axios.get(`${API_URL}/api/register`, {
                headers: {
                    'Cache-Control': 'no-store',
                }
            })        
            if(response.data.success === true){
                setGetUsers(response.data.getAllUser)
            }else{
                console.log(response.data.message)
            }        
        } catch (error) {
            console.log(error)
        }
    }    

    const copyToClipboard = (id) => {
        navigator.clipboard.writeText(id).then(() => {
            toast.success('Product ID copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    async function handleUserDelete(id){
        try{
            const response = await axios.delete(`/api/register/${id}`,{
                headers:{
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if(response.data.success === true){
                toast.success("User SuccessFully Deleted!")
                router.refresh()
            }else{
                toast.error(response.data.message)
            }
        }catch(error){
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    return (
        <>
            <div className="border rounded-3xl mx-12 my-4 h-screen bg-[#F0F1F0] p-4">
            <AdminHeader />
                <div className="flex mt-4">
                    <div className="hidden md:block md:w-1/4 lg:w-1/6">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full mx-4 mt-4">
                        <div>
                            <h1 className="text-center text-3xl font-semibold">Users page</h1>
                        </div>
                        <div className="mt-4">
                            <Table>
                                <TableCaption>Only User Include Not Admin Included.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No.</TableHead>
                                        <TableHead>User ID</TableHead>
                                        <TableHead>Full Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        getUsers && getUsers.length > 0 ? (
                                            getUsers.map((users,index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>{users._id}</TableCell>
                                                    <TableCell>{users.fullName}</TableCell>
                                                    <TableCell>{users.email}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Trash2 size={18} className=" cursor-pointer" onClick={()=>{handleUserDelete(users._id)}} /> 
                                                            <HoverCard>
                                                                <HoverCardTrigger asChild>
                                                                    <Ellipsis size={18} className="cursor-pointer" />
                                                                </HoverCardTrigger>
                                                                <HoverCardContent className="flex flex-col w-56 mr-20 gap-2">
                                                                    <Link href={`/admin-dashboard/users/${users._id}`}><h3 className="text-center cursor-pointer">Show User Details</h3></Link>
                                                                    <h3 className="text-center cursor-pointer" onClick={() => { copyToClipboard(users._id) }} >Copy User ID</h3>
                                                                </HoverCardContent>
                                                            </HoverCard>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4}>No Record Found!</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;