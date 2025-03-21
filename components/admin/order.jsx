'use client'

import { FetchOrder } from "@/action";
import AdminLeftbar from "@/components/admin/Admin-Leftbar";
import AdminHeader from "@/components/admin/AdminHeader";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-hot-toast";
import { Badge } from "../ui/badge";

function Order() {
    const [getOrders, setGetOrders] = useState([])
    const [filteredOrder, setFilteredOrder] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPages = 10
    const lastPage = currentPage * recordPerPages
    const firstPage = lastPage - recordPerPages
    const records = filteredOrder.slice(firstPage, lastPage)
    const totalPages = Math.ceil(filteredOrder.length / recordPerPages)
    const [searchOrderID, setSearchOrderID] = useState('')
    const [searchUserID, setSearchUserID] = useState('')
    const [searchStatus, setSearchStatus] = useState('')
    const [searchDate, setSearchDate] = useState({
        startDate: null,
        endDate: null
    });

    useEffect(() => {

        async function fetchOrderData() {
            try {
                setLoading(true)
                const response = await FetchOrder()
                if (response.success === true) {
                    const data = response.getOrders.filter((value) => {
                        return value.status !== "Delivered"
                    })
                    setGetOrders(data)
                } else {
                    toast.error(response.message)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchOrderData()
    }, [])

    async function handleOrder(id) {
        try {
            if (!id) {
                return toast.error("Invalid ID!")
            }
            const response = await axios.put(`/api/order/${id}`)
            if (response.data.success === true) {
                const data = getOrders.filter((value) => {
                    return value._id !== id
                })
                setGetOrders(data)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        filterOrderData()
    }, [getOrders, searchDate, searchOrderID, searchStatus, searchUserID])

    function filterOrderData() {
        let filtered = getOrders;

        // Search By Order ID
        if (searchOrderID) {
            filtered = filtered.filter(item => item.order_id.toLowerCase().includes(searchOrderID.trim().toLowerCase()));
        }

        // Search By User ID
        if (searchUserID) {
            filtered = filtered.filter(item => item.customer.toLowerCase().includes(searchUserID.trim().toLowerCase()));
        }

        // Search By Status
        if (searchStatus) {
            filtered = filtered.filter(item => item.status.toLowerCase() === searchStatus.toLowerCase());
        }

        // Search By Date Range
        if (searchDate && searchDate.startDate && searchDate.endDate) {
            const { startDate, endDate } = searchDate;

            filtered = filtered.filter(item => {
                const itemDate = new Date(item.createdAt); // Convert item.createdAt to Date object
                return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
            });
        }

        setFilteredOrder(filtered)
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
                    <div className="hidden md:block md:w-[450px]">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full px-1 md:px-4 mt-4">
                        <div className="space-y-4">
                            <h1 className="text-center text-3xl font-semibold">Orders</h1>
                            <div className="p-4 rounded-lg shadow-md space-y-1">
                                <h4 className="text-lg font-semibold">Filter</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        type="text"
                                        placeholder="Search By Order ID"
                                        value={searchOrderID}
                                        onChange={(e) => { setSearchOrderID(e.target.value) }}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Search By User ID"
                                        value={searchUserID}
                                        onChange={(e) => { setSearchUserID(e.target.value) }}
                                    />
                                    <select
                                        value={searchStatus}
                                        onChange={(e) => { setSearchStatus(e.target.value) }}
                                        className="border h-10 px-2 rounded-lg text-sm"
                                    >
                                        <option value="">Search By Status</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Out Of Delivery">Out Of Delivery</option>
                                    </select>
                                    <div className="border rounded-lg">
                                        <Datepicker
                                            value={searchDate}
                                            onChange={newValue => setSearchDate(newValue)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            {
                                loading ? (
                                    <Loading />
                                ) : (
                                    <Table className=" overflow-x-scroll">
                                        <TableCaption>Only Pending Ordered Are Included.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">No.</TableHead>
                                                <TableHead>Order ID</TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead className="w-[800px] border">Product</TableHead>
                                                <TableHead>Total Price</TableHead>
                                                <TableHead>Payment</TableHead>
                                                <TableHead>Order Date</TableHead>
                                                <TableHead>Details</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                records && records.length > 0 ? (
                                                    records.map((order, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                                            <TableCell>
                                                                {order.order_id}
                                                            </TableCell>
                                                            <TableCell>{order.customer}</TableCell>
                                                            <TableCell>
                                                                {
                                                                    order && order.product.length > 0 ? (
                                                                        order.product.map((value, index) => (
                                                                            <li key={index}>{value.productName}</li>
                                                                        ))
                                                                    ) : (
                                                                        <p>No Product</p>
                                                                    )
                                                                }
                                                            </TableCell>
                                                            <TableCell>{order.customer}</TableCell>
                                                            <TableCell>₹ {order.amount}</TableCell>
                                                            <TableCell>
                                                                {
                                                                    order.payment === "Pending" ? (
                                                                        <Badge variant="destructive">{order.payment}</Badge>
                                                                    ) : (
                                                                        <span>{order.payment}</span>
                                                                    )
                                                                }
                                                            </TableCell>
                                                            <TableCell>₹ {order.isProcessing}</TableCell>
                                                            <TableCell>
                                                                {
                                                                    order.status === "Processing" ? (
                                                                        <Button onClick={() => { handleOrder(order._id) }}>{order.status}</Button>
                                                                    ) : (
                                                                        <Button variant="destructive" >{order.status}</Button>
                                                                    )
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button>Get Details</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={9} className="text-center">No Record Found!</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                )
                            }
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

export default Order;