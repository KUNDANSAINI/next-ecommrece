'use client'

import { Card } from "@/components/ui/card";
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
import Link from "next/link";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import Loading from "@/components/Loading";


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
                const filterData = cartItems.filter((value) => {
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
                    <div className="mx-4 mt-10 flex flex-col justify-between h-full">
                        <Navbar />
                        <div className="flex flex-col items-center gap-4 my-8">
                            {
                                cartItems && cartItems.length > 0 ? (
                                    cartItems.map((item, index) => (
                                        <Card className="w-full md:w-1/2 p-4 mt-4 border" key={index}>
                                            <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-4">
                                                <div className="flex md:flex-col gap-4 justify-center">
                                                    {
                                                        item.productID.filename.map((image, index) => (
                                                            <div className="w-[40px] rounded cursor-pointer" key={index}>
                                                                <img src={image.name} alt={image.name} className="w-10 rounded cursor-pointer" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="grid justify-center">
                                                <Link href={`/shop/${item.productID._id}`} className="flex items-center justify-center w-40">
                                                    <img src={item.productID.filename[0].name} alt={item.productID.filename[0].name} className="object-cover rounded" />
                                                </Link>
                                                </div>
                                                <div className="flex w-full flex-col gap-2">
                                                    <h2 className="my-4 text-lg">{item.productID.productName}</h2>
                                                    <p className="text-gray-600">Brand: {item.productID.brand}</p>
                                                    <p className="text-gray-600 flex items-center"><span className="mr-2">Price:</span> <IndianRupee size={15} className="mb-0.5" />{item.productID.price}</p>
                                                    <p className="text-gray-600 flex items-center">Quentity: <Button variant="outline" size="icon" className="mx-4" onClick={() => { handleDercrment(item.qty) }}><Minus /></Button>{item.qty}<Button variant="outline" size="icon" className="ml-4" onClick={() => { handleIncrement(item.qty) }}><Plus /></Button></p>
                                                    <div className="flex w-full gap-4 mt-2">
                                                        <Button variant="destructive" className="w-1/2" onClick={() => { handleRemoveItem(item._id) }}>Remove Item</Button>
                                                        <Button variant="outline" className="w-1/2">Buy Now</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <>
                                        <img src="https://img.freepik.com/free-vector/questions-concept-illustration_114360-1513.jpg?t=st=1736797388~exp=1736800988~hmac=aa4fe1b3aa013f3a609d5f0e670f75bc93ecbe2fd14118a1aaf32c7cabb873ea&w=826" alt="empaty cart" className="w-full md:w-1/4 rounded-lg dark:brightness-[0.5]" />
                                        <Button variant="outline" onClick={() => router.push('/')}>Go To Home</Button>
                                    </>
                                )
                            }

                            {
                                cartItems && cartItems.length > 0 ? (
                                    <>
                                        <div className="w-full md:w-1/2 flex justify-between px-4">
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
                                        <Link href={'/checkout'} className="w-full md:w-1/2" ><Button variant="secondary" className="w-full">Checkout</Button></Link>
                                    </>
                                ) : null
                            }
                        </div>

                        <Footer />
                    </div>
                ) : (
                    <Loading />
                )
            }
        </>
    );
}

export default Cart;