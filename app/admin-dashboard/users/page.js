'use client'

import AdminLeftbar from "@/app/component/Admin-Leftbar";
import Navbar from "@/app/component/Navbar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { Ellipsis, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Users() {

    const [getUsers, setGetUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3000/api/register')
                if (response.data.success === true) {
                    console.log(response.data.getAllUser[0].isAdmin);
                    
                    setGetUsers(response.data.getAllUser)
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error("Something Went Wrong Please Try Again!")
            }
        }

        fetchUsers()
    }, [])

    return (
        <>
            <div>
                <Navbar />
                <div className="flex px-2">
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
                                                    <TableCell><div className="flex gap-2"><Trash2 size={18} className=" cursor-pointer" /> <Ellipsis size={18} className=" cursor-pointer" /></div></TableCell>
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

export default Users;