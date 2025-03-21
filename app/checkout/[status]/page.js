'use client'

import Footer from "@/components/includes/Footer";
import Navbar from "@/components/includes/Navbar";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Status() {
    const userID = useSelector((state) => state.auth.user);
    const [cartItems, setCartItems] = useState([])
    const router = useRouter()
    const params = useSearchParams()
    const [orderLoading, setOrderLoading] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const API_URL = process.env.NEXT_PUBLIC_CLIENT_URL

    useEffect(() => {
        if (userID) {
            fetchCartItems(userID)
        }
    }, [userID])


    useEffect(() => {
        if (params.get('session_id') && cartItems && cartItems.length > 0) {
            createFinalOrder(params, cartItems)
        }
    }, [params.get("session_id"), cartItems])

    // Order Create Function
    async function createFinalOrder(params, cartItems) {
        const session_id = params.get("session_id")
        try {
            setIsProcessing(true)
            if (!session_id) {
                setOrderLoading(true)
                setIsProcessing(false)
                return
            }

            const { data: stripeSession } = await axios.get(`${API_URL}/api/verify-session?session_id=${session_id}`);

            if (stripeSession.payment_status === 'paid') {
                const userId = stripeSession.metadata.userId;

                const getCheckoutFormData = JSON.parse(localStorage.getItem("checkoutFormData"));

                const createFinalCheckoutFormData = {
                    userId: userId,
                    shippingAddress: getCheckoutFormData.shippingAddress,
                    orderItems: cartItems.map(item => ({
                        qty: item.qty,
                        product: item.productID
                    })),
                    paymentMethod: "Stripe",
                    totalPrice: cartItems.reduce((total, item) =>
                        item.price + total, 0
                    ),
                    isPaid: true,
                    isProcessing: true,
                    paidAt: new Date()
                }

                const response = await axios.post('/api/order', createFinalCheckoutFormData)
                if (response.data.success === true) {
                    setIsProcessing(false)
                    setOrderLoading(false)
                    toast.success(response.data.message)
                } else {
                    toast.success(response.data.message)
                }
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed");
        }
    }

    // Fetch Cart Items Function

    async function fetchCartItems(userID) {
        if (!userID) {
            router.push('/login')
            return toast.error("You are not login. Please login again ?")
        }
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
            console.log("Fetching Error:", error);
        }
    }

    if (isProcessing) {
        return (
            <div className="h-screen">
                <Loading />
            </div>
        )
    }

    if (orderLoading) {
        return (
            <div className="mx-4 mt-10 flex h-screen flex-col justify-between">
                <Navbar />
                <div className="flex mx-auto gap-4 w-full md:w-1/2 p-2">
                    <div className="flex flex-col gap-5 w-full">
                        <h2 className="text-xl text-center font-semibold">Your Payment Is Cancel</h2>
                        <Link href={'/cart'}><Button className="w-full">Go To Cart</Button></Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    } else {
        return (
            <div className="mx-4 mt-10 flex h-screen flex-col justify-between">
                <Navbar />
                <div className="flex mx-auto gap-4 w-full md:w-1/2 p-2">
                    <div className="flex flex-col gap-5 w-full">
                        <h2 className="text-xl text-center font-semibold">Your Payment Is Successfull</h2>
                        <Link href='/order'><Button className="w-full">View Your Order</Button></Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default Status;