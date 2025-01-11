'use client'

import AdminLeftbar from "@/components/admin/Admin-Leftbar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import axios from "axios";
import { API_URL } from "@/env";
import { IconEye, IconPencil } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/app/Loading";
import { Button } from "@/components/ui/button";


function User() {
    const [getUsers, setGetUsers] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPages = 10
    const lastPage = currentPage * recordPerPages
    const firstPage = lastPage - recordPerPages
    const records = getUsers.slice(firstPage, lastPage)
    const totalPages = Math.ceil(getUsers.length / recordPerPages)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/register`, {
                headers: {
                    'Cache-Control': 'no-store',
                }
            })
            if (response.data.success === true) {
                setGetUsers(response.data.getAllUser)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleUserDelete(id) {
        try {
            const response = await axios.delete(`/api/register/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                toast.success("User SuccessFully Deleted!")
                router.refresh()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    // Next page handler
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Previous page handler
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Page change handler
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="mt-10 mx-4">
                <AdminHeader />
                <div className="flex mt-8">
                    <div className="hidden md:block md:w-1/4 lg:w-1/6">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full mx-4 mt-4">
                        <div>
                            <h1 className="text-center text-3xl font-semibold">Users page</h1>
                        </div>
                        <div className="mt-4">
                            {
                                loading ? (
                                    <Loading />
                                ) : (
                                    <Table>
                                        <TableCaption>Only User Include Not Admin Included.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">No.</TableHead>
                                                <TableHead>Full Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>View</TableHead>
                                                <TableHead>Delete</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                records && records.length > 0 ? (
                                                    records.map((users, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                                            <TableCell>{users.fullName}</TableCell>
                                                            <TableCell>{users.email}</TableCell>
                                                            <TableCell>
                                                                <Link href={`/admin-dashboard/users/${users._id}`}><IconEye className="cursor-pointer" /></Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Trash2 size={18} className=" cursor-pointer" onClick={() => { handleUserDelete(users._id) }} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="text-center">No Record Found!</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                )
                            }
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-6 mr-2">
                            <div></div>
                            <div className="flex items-center space-x-4">
                                <Button
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>

                                {/* Display page numbers */}
                                <span className="flex space-x-2">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <span
                                            key={index + 1}
                                            className={`px-2 py-1 rounded-md cursor-pointer text-sm ${currentPage === index + 1
                                                ? 'bg-blue-500 font-bold'
                                                : ' hover:bg-blue-500'
                                                } transition duration-200 ease-in-out`}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </span>
                                    ))}
                                </span>

                                <Button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;