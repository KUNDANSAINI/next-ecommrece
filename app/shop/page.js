'use client'

import { useContext, useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/env";


function Shop() {
    const [getProduct, setGetProduct] = useState([])
    const { userID } = useContext(GlobalContext)
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {

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
                    setLoading(false)
                    toast.error("Something Went Wrong. Please Try Again.")
                }
            } catch (error) {
                setLoading(false)
                console.log("Product Fetching Error:", error);
            }
        }

        fetchProduct()
    }, [])

    async function handleCart(product) {
        try {
            const data = { productID: product._id, userID }
            if(!userID){
                router.push('/login')
                return toast.error("You Are Not Login. Please Login Here")
            }
            const response = await axios.post('/api/cart', data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                toast.success("Product Successfully Added In Cart")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Add To Cart Error:", error)
        }
    }

    return (
        <>
            {
                loading ? (
                    <div className="border rounded-3xl mx-12 my-4 bg-[#F0F1F0] px-4 py-8">
                        <Navbar />

                        <div className="flex flex-wrap lg:flex-nowrap mt-4">

                            {/* Sidebar */}
                            <aside className="w-full lg:w-1/5 px-4 py-6 rounded-lg bg-gray-50">
                                <h2 className="font-semibold text-lg mb-4">Filter By</h2>
                                <ul className="space-y-2">
                                    <li>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox cursor-pointer" />
                                            <span className="ml-2">Men</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox cursor-pointer" />
                                            <span className="ml-2">Women</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox cursor-pointer" />
                                            <span className="ml-2">Shirt</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox cursor-pointer" />
                                            <span className="ml-2">T-Shirt</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox cursor-pointer" />
                                            <span className="ml-2">Jeans</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox cursor-pointer" />
                                            <span className="ml-2">Shorts</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="form-checkbox cursor-pointer" />
                                            <span className="ml-2">Kurti</span>
                                        </label>
                                    </li>
                                </ul>
                            </aside>

                            {/* Main Content */}
                            <main className="w-full lg:w-3/4 px-4 py-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        getProduct && getProduct.length > 0 ? (
                                            getProduct.map((product, index) => (
                                                <Card key={index} className="p-4 flex flex-col gap-2">
                                                    <div className="flex justify-center items-center border rounded-lg p-2 w-full">
                                                        <img src={`/product/${product.filename[0].name}`} alt={product.filename[0].name} className="w-1/2" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg truncate ...">{product.productName}</h3>
                                                        <p className="text-gray-500 text-sm mt-2">Type: {product.subCategory}</p>
                                                        <p className="text-gray-500 text-sm mt-2">Brand: {product.brand}</p>
                                                        <p className="font-bold mt-2">Price: ₹{product.price}<span className="ml-2 text-sm font-semibold italic text-green-600">{product.discount}% off</span></p>
                                                        <Button className=" w-full mt-4" onClick={() => { handleCart(product) }}>Add To Cart</Button>
                                                        <Button className=" w-full mt-2" onClick={() => router.push(`/shop/${product._id}`)}>See Item</Button>
                                                    </div>
                                                </Card>
                                            ))
                                        ) : <h2>No Record Found</h2>
                                    }
                                </div>
                            </main>
                        </div>

                        <Footer />
                    </div>
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

export default Shop;