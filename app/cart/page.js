'use client'

import { Card } from "@/components/ui/card";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IndianRupee, Minus, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/env";


function Cart() {
    const { userID } = useContext(GlobalContext)
    const [cartItems, setCartItems] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (userID) {
            fetchCartItems(userID)
        }
    }, [userID])

    async function fetchCartItems(userID) {
        try {
            const response = await axios.get(`${API_URL}/api/cart?userID=${userID}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.status === 200) {
                setCartItems(response.data.getCartProduct)
            }
        } catch (error) {
            router.push('/')
            toast.error("Something Went Wrong. Please Try Again")
            console.log("Fetching Error:", error);
        }
    }

    async function handleRemoveItem(id) {
        try {
            if (!id) {
                toast.error("Invalid ID")
            }
            const response = await axios.delete(`/api/cart/${id}`)
            if (response.data.success === true) {
                const filterData = cartItems.filter((value)=>{
                    return value._id !== id
                })
                setCartItems(filterData)
                toast.success("Item Successfully Remove")
            }
        } catch (error) {
            console.error("deleteing Error", error);
            toast.error("Bad Request!")
        }
    }

    function handleDercrment(qty) {
        alert(qty - 1)
    }

    function handleIncrement(qty) {
        alert(qty + 1)
    }

    return (
        <>
            {
                cartItems ? (
                    <div className="border flex flex-col justify-between rounded-3xl h-full mx-12 my-4 bg-[#F0F1F0] px-4 py-8">
                        <Navbar />
                        <div className="flex flex-col items-center gap-4">
                            {
                                cartItems && cartItems.length > 0 ? (
                                    cartItems.map((item, index) => (
                                        <Card className="w-1/2 p-4 bg-slate-50 mt-4 border-none" key={index}>
                                            <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-4">
                                                <div className="flex flex-col gap-4 justify-center">
                                                    {
                                                        item.productID.filename.map((image, index) => (
                                                            <img src={`/product/${image.name}`} alt={`${image.name}`} className="w-10 rounded cursor-pointer" key={index} />
                                                        ))
                                                    }
                                                </div>
                                                <img src={`/product/${item.productID.filename[0].name}`} alt={`${item.productID.filename[0].name}`} className="w-40 rounded" />
                                                <div className="flex w-full flex-col gap-2">
                                                    <h2 className="my-4 text-lg">{item.productID.productName}</h2>
                                                    <p className="text-gray-600">Brand: {item.productID.brand}</p>
                                                    <p className="text-gray-600 flex items-center"><span className="mr-2">Price:</span> <IndianRupee size={15} className="mb-0.5" />{item.productID.price}</p>
                                                    <p className="text-gray-600 flex items-center">Quentity: <Button variant="outline" size="icon" className="mx-4" onClick={() => { handleDercrment(item.qty) }}><Minus /></Button>{item.qty}<Button variant="outline" size="icon" className="ml-4" onClick={() => { handleIncrement(item.qty) }}><Plus /></Button></p>
                                                    <div className="flex w-full gap-4 mt-2">
                                                        <Button variant="destructive" className="w-1/2" onClick={() => { handleRemoveItem(item._id) }}>Remove Item</Button>
                                                        <Button className="w-1/2">Buy Now</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <>
                                        <img src="https://cdn-icons-png.flaticon.com/512/15814/15814884.png " alt="empaty cart" className="w-1/4" />
                                        <Button onClick={() => router.push('/')}>Go To Home</Button>
                                    </>
                                )
                            }

                            {
                                cartItems && cartItems.length > 0 ? (
                                    <>
                                        <div className="w-1/2 flex justify-between px-4">
                                            <p className="font-semibold text-lg">Total Amount</p>
                                            <p className="flex items-center gap-0.5"><IndianRupee size={15} className="mb-0.5" />
                                                {
                                                    cartItems && cartItems.length > 0 ? (
                                                        cartItems.reduce((total, item) =>
                                                            item.productID.price + total, 0
                                                        )
                                                    ) : "0"
                                                }
                                            </p>
                                        </div>
                                        <Button onClick={()=>{router.push('/checkout')}} className="w-1/2">Checkout</Button>
                                    </>
                                ) : null
                            }
                        </div>

                        <Footer />
                    </div>
                ) : (
                    <div className="flex flex-col space-y-3">
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

export default Cart;