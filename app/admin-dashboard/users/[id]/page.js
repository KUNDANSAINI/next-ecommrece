'use client'
import AdminLeftbar from "@/components/admin/Admin-Leftbar";
import AdminHeader from "@/components/admin/AdminHeader";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { API_URL } from "@/env";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function UsersDetails() {
    const router = useRouter()
    const params = useParams()
    const id = params.id
    const [getSingleUser, setGetSingleUser] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (id) {
            fetchSingleUser(id)
        }
    }, [id])

    async function fetchSingleUser(id) {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/register/${id}`, {
                headers: {
                    'Cache-Control': 'no-store',
                }
            })
            if (response.data.success === true) {
                setGetSingleUser(response.data.getSingleUser)
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
                router.push('/admin-dashboard/users')
                toast.success("User SuccessFully Deleted!")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    return (
        <>
            <div className="my-10 mx-4">
                <AdminHeader />
                <div className="flex mt-8">
                    <div className="hidden md:block md:w-[450px]">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full mx-4 mt-4 gap-4">
                        <h1 className="text-center text-3xl font-semibold">User Details</h1>
                        <div className="text-end">
                            <Button variant="destructive" onClick={() => { handleUserDelete(getSingleUser._id) }}>Delete This User</Button>
                        </div>
                        <div>
                            {
                                loading ? (
                                    <Loading />
                                ) : (
                                    <Table>
                                        <TableBody>
                                            <TableRow className="text-center">
                                                <TableCell>ID</TableCell>
                                                <TableCell>{getSingleUser._id}</TableCell>
                                            </TableRow>
                                            <TableRow className="text-center">
                                                <TableCell>Name</TableCell>
                                                <TableCell>{getSingleUser.fullName}</TableCell>
                                            </TableRow>
                                            <TableRow className="text-center">
                                                <TableCell>Email</TableCell>
                                                <TableCell>{getSingleUser.email}</TableCell>
                                            </TableRow>
                                            {/* <TableRow className="text-center">
                                                <TableCell>DOB</TableCell>
                                                <TableCell>{getSingleUser.personalDetails.dob}</TableCell>
                                            </TableRow>
                                            <TableRow className="text-center">
                                                <TableCell>Phone</TableCell>
                                                <TableCell>{getSingleUser.personalDetails.phone}</TableCell>
                                            </TableRow>
                                            <TableRow className="text-center">
                                                <TableCell>Country</TableCell>
                                                <TableCell>{getSingleUser.personalDetails.country}</TableCell>
                                            </TableRow>
                                            <TableRow className="text-center">
                                                <TableCell>City</TableCell>
                                                <TableCell>{getSingleUser.personalDetails.city}</TableCell>
                                            </TableRow>
                                            <TableRow className="text-center">
                                                <TableCell>PinCode</TableCell>
                                                <TableCell>{getSingleUser.personalDetails.pincode}</TableCell>
                                            </TableRow>
                                            <TableRow className="text-center">
                                                <TableCell>Account No.</TableCell>
                                                <TableCell>{getSingleUser.personalDetails.accountNo}</TableCell>
                                            </TableRow> */}
                                        </TableBody>
                                    </Table>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersDetails;