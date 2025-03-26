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
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import { IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FetchReview } from "@/action";

function CustomerReviewPage() {
    const [reviews, setReviews] = useState([])
    const [filteredUser, setFilteredUser] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPages = 10
    const lastPage = currentPage * recordPerPages
    const firstPage = lastPage - recordPerPages
    const records = filteredUser.slice(firstPage, lastPage)
    const totalPages = Math.ceil(filteredUser.length / recordPerPages)
    const [searchEmail, setSearchEmail] = useState('')
    const [searchUser, setSearchUser] = useState('')

    // async function handleUserDelete(e, id) {
    //     e.preventDefault()
    //     try {
    //         if (!id) {
    //             toast.error("User ID is required to delete a user.");
    //             return;
    //         }
    //         const response = await DeleteUser(id, '/users')
    //         if (response.success === true) {
    //             toast.success(response.message)
    //         } else {
    //             toast.error(response.message)
    //         }
    //     } catch (error) {
    //         toast.error("Something Went Wrong. Please Try Again!")
    //     }
    // }

    useEffect(() => {
        fetchReviewData()
    }, [])

    async function fetchReviewData() {
        try {
            const response = await FetchReview()
            if(response.success === true){
                setReviews(response.getReview)
            }
        } catch (error) {
            console.log("fetching error for customer review ?");
        }
    }

    useEffect(() => {

        function filterUserData() {
            let filtered = reviews;
    
            // Search By Username
            // if (searchUser) {
            //     filtered = filtered.filter(item => item.fullName.toLowerCase().includes(searchUser.trim().toLowerCase()));
            // }
    
            // Search By email
            // if (searchEmail) {
            //     filtered = filtered.filter(item => item.email.toLowerCase().includes(searchEmail.trim().toLowerCase()));
            // }
    
            setFilteredUser(filtered)
        }

        filterUserData()
    }, [reviews, searchUser, searchEmail])

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

    console.log(reviews);
    

    return (
        <>
            <div className="my-10 mx-4">
                <AdminHeader />
                <div className="flex mt-8">
                    <div className="hidden md:block md:w-[450px]">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full px-1 md:px-4 mt-4">
                        <div className="space-y-4">
                            <h1 className="text-center text-3xl font-semibold">Customer Reviews</h1>
                            <div className="p-4 rounded-lg shadow-md space-y-1">
                                <h4 className="text-lg font-semibold">Filter</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        type="text"
                                        placeholder="Search By Username"
                                        value={searchUser}
                                        onChange={(e) => { setSearchUser(e.target.value) }}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Search By Email"
                                        value={searchEmail}
                                        onChange={(e) => { setSearchEmail(e.target.value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <Table>
                                <TableCaption>Customer Review Data Show</TableCaption>
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
                                                    {/* <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>{users.fullName}</TableCell>
                                                    <TableCell>{users.email}</TableCell>
                                                    <TableCell>
                                                        <Link href={`/admin-dashboard/users/${users._id}`}><IconEye className="cursor-pointer" /></Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Trash2 size={18} className=" cursor-pointer" onClick={(e) => { handleUserDelete(e, users._id) }} />
                                                    </TableCell> */}
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
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-6">
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

export default CustomerReviewPage;