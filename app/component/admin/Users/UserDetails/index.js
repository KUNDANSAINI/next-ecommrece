'use client'
import AdminLeftbar from "@/app/component/Admin-Leftbar";
import AdminHeader from "@/app/component/AdminHeader";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


function UsersDetailsPage({getSingleUser}) {
    const router = useRouter()
    
    async function handleUserDelete(id){
        try{
            const response = await axios.delete(`/api/register/${id}`,{
                headers:{
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if(response.data.success === true){
                router.push('/admin-dashboard/users')
                router.refresh()
                toast.success("User SuccessFully Deleted!")
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
                        <h1 className="text-center text-3xl font-semibold">User Details</h1>
                        <div className="text-end my-2">
                        <Button variant="destructive" onClick={()=>{handleUserDelete(getSingleUser._id)}}>Delete This User</Button>
                        </div>
                        <div>
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
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersDetailsPage;