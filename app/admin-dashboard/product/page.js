'use client'

import AdminLeftbar from "@/components/admin/Admin-Leftbar";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { API_URL } from "@/env";
import { IconPencil } from "@tabler/icons-react";
import Loading from "@/app/Loading";


function Product() {
    const [getProduct, setGetProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPages = 4
    const lastPage = currentPage * recordPerPages
    const firstPage = lastPage - recordPerPages
    const records = getProduct.slice(firstPage, lastPage)
    const totalPages = Math.ceil(getProduct.length / recordPerPages)

    useEffect(() => {
        fetchProduct()
    }, [])

    async function fetchProduct() {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/product`, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            })
            if (response.data.success === true) {
                setGetProduct(response.data.getAllProduct)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleProductDelete(e, id) {
        e.preventDefault()
        try {
            const response = await axios.delete(`/api/product/${id}`)
            if (response.data.success === true) {
                toast.success("Product Successfully Deleted!")
                router.refresh()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    // Next page handler
    const handleNext = (e) => {
        e.preventDefault()
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Previous page handler
    const handlePrevious = (e) => {
        e.preventDefault()
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
                        <div className="grid gap-4">
                            <h1 className="text-center text-3xl font-semibold">Product page</h1>
                            <Link href={"/admin-dashboard/product/add"}><Button className=" float-end mr-2">Add Product</Button></Link>
                        </div>
                        <div className="mt-4">
                            {
                                loading ? (
                                    <Loading />
                                ) : (
                                    <Table>
                                        <TableCaption>All Product Data.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">No.</TableHead>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Product Name</TableHead>
                                                <TableHead>HNS No.</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead>Brand</TableHead>
                                                <TableHead>Edit</TableHead>
                                                <TableHead>Delete</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                records && records.length > 0 ? (
                                                    records.map((product, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                                            <TableCell>
                                                                <div className="w-[100px] h-[100px] grid items-center overflow-hidden">
                                                                    <img src={product.filename[0].name} alt={product.filename[0].name} className="object-cover" />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{product.productName}</TableCell>
                                                            <TableCell>{product.hns}</TableCell>
                                                            <TableCell>{product.category}</TableCell>
                                                            <TableCell>₹ {product.price}</TableCell>
                                                            <TableCell>{product.brand}</TableCell>
                                                            <TableCell>
                                                                <Link href={`/admin-dashboard/product/${product._id}`}>
                                                                    <IconPencil className="cursor-pointer" />
                                                                </Link>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Trash2 size={20} className="cursor-pointer" onClick={(e) => { handleProductDelete(e, product._id) }} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={9} className="text-center">No Product Found</TableCell>
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
                                                : 'hover:bg-blue-500'
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

export default Product;