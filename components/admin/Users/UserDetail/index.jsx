'use client'

import AdminLeftbar from "@/components/admin/Admin-Leftbar";
import AdminHeader from "@/components/admin/AdminHeader";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

function UsersDetails({ getSingleUser }) {

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

export default UsersDetails;