'use client'

import AdminLeftbar from "@/app/component/Admin-Leftbar";
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
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import axios from "axios";
import { toast } from "react-toastify";
import { Ellipsis, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import AdminHeader from "@/app/component/AdminHeader";
import ProductDialog from "@/app/component/Product";
import { API_URL } from "@/env";


function Product() {
    const [openProductDialog, setOpenProductDialog] = useState(false)
    const [getProduct,setGetProduct] = useState([])
    const router = useRouter()

    useEffect(()=>{
        fetchProduct()
    },[])

    async function fetchProduct() {
        try {
            const response = await axios.get(`${API_URL}/api/product`, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            })        
            if(response.data.success === true){
                setGetProduct(response.data.getAllProduct)
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

    async function handleProductDelete(id) {
        try {
            const response = await axios.delete(`/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
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
                            <h1 className="text-center text-3xl font-semibold">Product page</h1>
                            <Button className=" float-end" onClick={() => { setOpenProductDialog(true) }} >Add Product</Button>
                        </div>
                        <div className="mt-4">
                            <Table>
                                <TableCaption>All Product Data.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No.</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Product Name</TableHead>
                                        <TableHead>HNS No.</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Brand</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        getProduct && getProduct.length > 0 ? (
                                            getProduct.map((product, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell><img src={`/product/${product.filename[0].name}`} alt={product.filename[0].name} className="w-[100px]" /></TableCell>
                                                    <TableCell>{product._id}</TableCell>
                                                    <TableCell>{product.productName}</TableCell>
                                                    <TableCell>{product.hns}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell>₹ {product.price}</TableCell>
                                                    <TableCell>{product.brand}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Trash2 size={18} className="cursor-pointer" onClick={() => { handleProductDelete(product._id) }} />
                                                            <HoverCard>
                                                                <HoverCardTrigger asChild>
                                                                    <Ellipsis size={18} className="cursor-pointer" />
                                                                </HoverCardTrigger>
                                                                <HoverCardContent className="flex flex-col w-56 mr-20 gap-2">
                                                                    <Link href={`/admin-dashboard/product/${product._id}`}><h3 className="text-center cursor-pointer">Show Details</h3></Link>
                                                                    <h3 className="text-center cursor-pointer" onClick={() => { copyToClipboard(product._id) }} >Copy Product ID</h3>
                                                                </HoverCardContent>
                                                            </HoverCard>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6}>No Product Found</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <ProductDialog openProductDialog={openProductDialog} setOpenProductDialog={setOpenProductDialog}  />
        </>
    );
}

export default Product;