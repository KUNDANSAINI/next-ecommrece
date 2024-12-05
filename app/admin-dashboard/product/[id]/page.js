'use client'

import AdminLeftbar from "@/app/component/Admin-Leftbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminHeader from "@/app/component/AdminHeader";
import { Skeleton } from "@/components/ui/skeleton";
import ProductDialog from "@/app/component/Product";
import { API_URL } from "@/env";

function ProductDetails() {
    const params = useParams()
    const id = params.id
    const [openEditProductDialog, setOpenEditProductDialog] = useState(false)
    const [sideImage, setSideImage] = useState(null)
    const [getSingleProduct, setGetSingleProduct] = useState(null)

    useEffect(() => {
        if (id) {
            fetchSingleProduct(id)
        }
    }, [id])

    async function fetchSingleProduct(id) {
        try {
            const response = await axios.get(`${API_URL}/api/product/${id}`, {
                headers: {
                    'Cache-Control': 'no-store',
                }
            })
            if (response.data.success === true) {
                setGetSingleProduct(response.data.fetchSingleRecord)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                getSingleProduct !== null ? (
                    <>
                        <div className="border rounded-3xl mx-12 my-4 h-screen bg-[#F0F1F0] p-4">
                            <AdminHeader />
                            <div className="flex mt-4">
                                <div className="hidden md:block md:w-1/4 lg:w-1/6">
                                    <AdminLeftbar />
                                </div>
                                <div className="flex flex-col w-full mx-4 mt-4">
                                    <h1 className="text-center text-3xl font-semibold">Product Details</h1>
                                    <div className="text-end mt-2">
                                        <Button onClick={() => { setOpenEditProductDialog(true) }}>Edit Product</Button>
                                    </div>
                                    <div className="border w-full rounded-lg mt-6 p-4">
                                        <div className="w-full flex flex-col lg:flex-row">
                                            <div className="w-full lg:w-2/5 flex flex-col gap-4">
                                                <div className="flex flex-col lg:flex-row items-center lg:justify-evenly gap-4">
                                                    <div>
                                                        <img src={`/product/${getSingleProduct.filename[0].name}`} alt={getSingleProduct.filename[0].name} className="h-[300px] lg:h-[500px]" />
                                                    </div>
                                                    <div className="flex lg:flex-col gap-4">
                                                        {
                                                            getSingleProduct.filename && getSingleProduct.filename.length > 0 ? (
                                                                getSingleProduct.filename.map((image, index) => (
                                                                    <div key={index}>
                                                                        <img src={`/product/${image.name}`} alt={image.name} className="w-[100px]" onClick={() => { setSideImage(image.name) }} />
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                null
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-3/5">
                                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                                    <h2 className="text-2xl">{getSingleProduct.productName}</h2>
                                                    <p className="text-gray-600">Product Code: {getSingleProduct.hns}</p>
                                                </div>

                                                <p className="text-green-600 font-semibold">Special price</p>
                                                <div className="flex items-center gap-4">
                                                    <p className="text-3xl font-semibold">₹{getSingleProduct.price}</p>
                                                    <p className="text-green-600 font-semibold">{getSingleProduct.discount}% off</p>
                                                </div>
                                                <p className="font-semibold text-xl">Total Stock: {getSingleProduct.qty}</p>

                                                <div className="flex flex-col gap-4 mt-6">
                                                    <p className="flex items-center gap-4">Size:
                                                        {
                                                            getSingleProduct && getSingleProduct.size.length > 0 ? (
                                                                getSingleProduct.size.map((size, index) => (
                                                                    <div className="flex border hover:bg-black hover:text-white rounded text-lg w-10 h-10 justify-center items-center" key={index}>
                                                                        <span>{size}</span>
                                                                    </div>
                                                                ))

                                                            ) : null
                                                        }
                                                    </p>
                                                    <div className="flex flex-col lg:flex-row justify-between">
                                                        <p><span className="text-lg">Brand:</span> {getSingleProduct.brand}</p>
                                                        <p><span className="text-lg">Category:</span> {getSingleProduct.category}</p>
                                                        <p><span className="text-lg">SubCategory:</span> {getSingleProduct.subCategory}</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-semibold">Available offers</h3>
                                                        <p><span className="font-semibold text-lg">Bank Offer</span> {getSingleProduct.offers}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10 mt-2 border-b-2 border-black pb-4">
                                                    <div>
                                                        <span className="text-lg">Service:</span>
                                                        <span className="ml-2">{getSingleProduct.delivery}</span>
                                                    </div>
                                                    <div >
                                                        <span className="text-lg">Warranty:</span>
                                                        <span className="ml-2">{getSingleProduct.warranty}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2 mt-2">
                                                    <h2 className="text-3xl font-semibold border-b-2 pb-4 border-black">Product Details</h2>
                                                    <p>{getSingleProduct.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ProductDialog openEditProductDialog={openEditProductDialog} setOpenEditProductDialog={setOpenEditProductDialog} data={getSingleProduct} />
                    </>
                ) : (
                    <div className="flex flex-col h-screen justify-center items-center space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default ProductDetails;