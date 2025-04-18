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
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { IconPencil } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { DeleteProduct } from "@/action";
import Image from "next/image";


function ProductPage({ getProduct, brand, category }) {
    const [filteredProduct, setFilteredProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPages = 5
    const lastPage = currentPage * recordPerPages
    const firstPage = lastPage - recordPerPages
    const records = filteredProduct.slice(firstPage, lastPage)
    const totalPages = Math.ceil(filteredProduct.length / recordPerPages)
    const [searchName, setSearchName] = useState("")
    const [searchHns, setSearchHns] = useState("")
    const [searchCategory, setSearchCategory] = useState("")
    const [searchStock, setSearchStock] = useState('')
    const [searchType, setSearchType] = useState("")
    const [searchBrand, setSearchBrand] = useState("")

    async function handleProductDelete(e, id) {
        e.preventDefault()
        try {
            const response = await DeleteProduct(id, "/admin-dashboard/product")
            if (response.success === true) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log("Product Deleteing Error:", error);
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    useEffect(() => {

        function filterProductData() {
            let filtered = getProduct;
    
            // Search By Name
            if (searchName) {
                filtered = filtered.filter(item => item.productName.toLowerCase().includes(searchName.trim().toLowerCase()));
            }
    
            // Search By Hns Code
            if (searchHns) {
                filtered = filtered.filter(item => item.hns.toLowerCase().includes(searchHns.trim().toLowerCase()));
            }
    
            // Search By Category
            if (searchCategory) {
                filtered = filtered.filter(item => item.category.toLowerCase() === searchCategory.toLowerCase());
            }
    
            // Search By Type
            if (searchType) {
                filtered = filtered.filter(item => item.subCategory.toLowerCase() === searchType.toLowerCase());
            }
    
            // Search By Brand
            if (searchBrand) {
                filtered = filtered.filter(item => item.brand.toLowerCase() === searchBrand.toLowerCase());
            }
    
            // Search By Stock
            if (searchStock) {
                filtered = filtered.filter(item => item.stock.toLowerCase() === searchStock.toLowerCase());
            }
    
            setFilteredProduct(filtered)
        }

        filterProductData()
    }, [getProduct, searchHns, searchCategory, searchType, searchBrand, searchStock, searchName])

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
            <div className="my-10 mx-4">
                <AdminHeader />
                <div className="flex mt-8">
                    <div className="hidden md:block md:w-[450px]">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full px-1 md:px-4 mt-4">
                        <div className="grid gap-4">
                            <h1 className="text-center text-3xl font-semibold">Product page</h1>
                            <div className="text-end">
                                <Link href={"/admin-dashboard/product/add"}><Button>Add Product</Button></Link>
                            </div>
                            <div className="p-4 rounded-lg shadow-md space-y-1">
                                <h4 className="text-lg font-semibold">Filter</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        type="text"
                                        placeholder="Search By Product Name"
                                        value={searchName}
                                        onChange={(e) => { setSearchName(e.target.value) }}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Search By HNS Code"
                                        value={searchHns}
                                        onChange={(e) => { setSearchHns(e.target.value) }}
                                    />
                                    <select
                                        value={searchCategory}
                                        onChange={(e) => { setSearchCategory(e.target.value) }}
                                        className="border h-10 px-2 rounded-lg text-sm"
                                    >
                                        <option value="">Search By Category</option>
                                        {
                                            category && category.length > 0 ? (
                                                category.map((item, index) => (
                                                    <option value={item.category} key={index}>{item.category}</option>
                                                ))
                                            ) : null
                                        }
                                    </select>
                                    <select
                                        value={searchType}
                                        onChange={(e) => { setSearchType(e.target.value) }}
                                        className="border h-10 px-2 rounded-lg text-sm"
                                    >
                                        <option value="">Search By Category</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                    <select
                                        value={searchBrand}
                                        onChange={(e) => { setSearchBrand(e.target.value) }}
                                        className="border h-10 px-2 rounded-lg text-sm"
                                    >
                                        <option value="">Search By Brand</option>
                                        {
                                            brand && brand.length > 0 ? (
                                                brand.map((item, index) => (
                                                    <option value={item.brand} key={index}>{item.brand}</option>
                                                ))
                                            ) : null
                                        }
                                    </select>
                                    <select
                                        value={searchStock}
                                        onChange={(e) => { setSearchStock(e.target.value) }}
                                        className="border h-10 px-2 rounded-lg text-sm"
                                    >
                                        <option value="">Search By Stock</option>
                                        <option value={"In-stock"}>In Stock</option>
                                        <option value={"Out-stock"}>Out Stock</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
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
                                                            <Image width={100} height={100} src={product.filename[0].name} alt={product.filename[0].name} className="object-cover" />
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

export default ProductPage;