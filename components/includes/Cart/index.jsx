'use client'

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import CartLoader from "@/components/Loader/CartLoader";
import Image from "next/image";
import { useSelector } from "react-redux";
import { DeleteCart, FetchCart, UpdateCart } from "@/action";


function Cart() {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const router = useRouter()
    const userID = useSelector((state) => state.auth.user)

    useEffect(() => {
        if (userID) {
            fetchCartItems(userID)
        }
    }, [userID])

    async function fetchCartItems(userID) {
        try {
            setIsLoader(true)
            const response = await FetchCart(userID)
            if (response.success === true) {
                setCartItems(response.getCartProduct)
            }else{
                toast.error(response?.message || "Something Went Wrong. Please Try Again");
            }
        } catch (error) {
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
            const response = await DeleteCart(id)
            if (response.success === true) {
                fetchCartItems(userID)
                toast.success(response.message)
            }else{
                toast.error(response?.message || "Something Went Wrong. Please Try Again");
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

    async function handleCheckout() {
        try {
            setIsLoading(true)
            const response = await UpdateCart(cartItems)
            if (response.success === true) {
                router.push('/checkout')
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log("Checkout Error:", error);
        } finally {
            setIsLoading(false)
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
                                                            <div className="w-[30px] rounded" key={index}>
                                                                <Image width={30} height={30} src={image.name} alt={image.name} className="rounded" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className="grid justify-center">
                                                    <Link href={`/${item.productID.subCategory}/${item.productID.category}/${item.productID._id}`} className="flex items-center justify-center w-40">
                                                        <Image width={160} height={160} src={item.productID.filename[0].name} alt={item.productID.filename[0].name} className="object-cover rounded" />
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
                                        <Image width={500} height={500} src="/images/empty.webp" alt="Empaty Cart" className="rounded-lg dark:brightness-[0.5]" />
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
                                        <Button onClick={handleCheckout} disabled={isLoading} className="w-full md:w-1/2">{isLoading ? "Processing..." : "Checkout"}</Button>
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