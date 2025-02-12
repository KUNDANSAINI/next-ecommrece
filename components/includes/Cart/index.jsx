'use client'

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import CartLoader from "@/components/Loader/CartLoader";


function Cart() {
    const { userID } = useContext(GlobalContext)
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const router = useRouter()

    const API_URL = process.env.NEXT_PUBLIC_CLIENT_URL

    useEffect(() => {
        if (userID) {
            fetchCartItems(userID)
        }
    }, [userID])

    async function fetchCartItems(userID) {
        try {
            setIsLoader(true)
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
        } finally {
            setIsLoader(false)
        }
    }

    async function handleRemoveItem(id) {
        if (!id) {
            return toast.error("Invalid ID")
        }
        try {
            setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    const handleDecrement = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id && item.qty > 1
                    ? {
                        ...item,
                        qty: item.qty - 1,
                        price: (item.qty - 1) * item.productID.mrp,
                    }
                    : item
            )
        );
    };

    // Increment Function
    const handleIncrement = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        qty: item.qty + 1,
                        price: (item.qty + 1) * item.productID.mrp,
                    }
                    : item
            )
        );
    };

    async function handleCheckout(e) {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await axios.put('/api/cart', cartItems)
            if (response.data.success === true) {
                router.push('/checkout')
                setIsLoading(false)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("Checkout Error:", error);
        }
    }

    return (
        <>
            <div className="mx-4 mt-10 flex flex-col justify-between h-full">
                <Navbar />
                {
                    isLoader ? (
                        <CartLoader />
                    ) : (
                        <div className="flex flex-col items-center gap-4 my-8">
                            {
                                cartItems && cartItems.length > 0 ? (
                                    cartItems.map((item, index) => (
                                        <Card className="w-full md:w-1/2 p-4 mt-4 border" key={index}>
                                            <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-4">
                                                <div className="flex md:flex-col gap-4 justify-center">
                                                    {
                                                        item.productID.filename.map((image, index) => (
                                                            <div className="w-[40px] rounded" key={index}>
                                                                <img src={image.name} alt={image.name} className="w-10 rounded" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="grid justify-center">
                                                    <Link href={`/${item.productID.subCategory}/${item.productID.category}/${item.productID._id}`} className="flex items-center justify-center w-40">
                                                        <img src={item.productID.filename[0].name} alt={item.productID.filename[0].name} className="object-cover rounded" />
                                                    </Link>
                                                </div>
                                                <div className="flex w-full flex-col gap-2">
                                                    <h2 className="my-2 text-lg">{item.productID.productName}</h2>
                                                    <p className="text-gray-600">Brand: {item.productID.brand}</p>
                                                    <p className="text-gray-600">Color: {item.productID.color}</p>
                                                    <p className="text-gray-600 flex items-center"><span className="mr-2">Price:</span>₹ {item.price}</p>
                                                    <p className="text-gray-600 flex items-center">Quentity: <Button variant="outline" size="icon" className="mx-4" onClick={() => { handleDecrement(item._id) }}><Minus /></Button>{item.qty}<Button variant="outline" size="icon" className="ml-4" onClick={() => { handleIncrement(item._id) }}><Plus /></Button></p>
                                                    <div className="flex w-full gap-4 mt-2">
                                                        <Button variant="destructive" className="w-1/2" disabled={loading} onClick={() => { handleRemoveItem(item._id) }}>{loading ? "Removing..." : "Remove Item"}</Button>
                                                        <Button className="w-1/2">Buy Now</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <>
                                        <img src="/images/empty.webp" alt="Empaty Cart" className="w-full md:w-1/4 rounded-lg dark:brightness-[0.5]" />
                                        <Button onClick={() => router.push('/')}>Go To Home</Button>
                                    </>
                                )
                            }

                            {
                                cartItems && cartItems.length > 0 ? (
                                    <>
                                        <div className="w-full md:w-1/2 flex justify-between px-4">
                                            <p className="font-semibold text-lg">Total Amount</p>
                                            <p>₹
                                                {
                                                    cartItems && cartItems.length > 0 ? (
                                                        cartItems.reduce((total, item) =>
                                                            item.price + total, 0
                                                        )
                                                    ) : "0"
                                                }
                                            </p>
                                        </div>
                                        <Button onClick={handleCheckout} disabled={isLoading} className="w-full md:w-1/2">{isLoading ? "Processing" : "Checkout"}</Button>
                                    </>
                                ) : null
                            }
                        </div>
                    )
                }
                <Footer />
            </div>
        </>
    );
}

export default Cart;