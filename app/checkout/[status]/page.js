'use client'

import { CreateOrder, FetchCart } from "@/action";
import Footer from "@/components/includes/Footer";
import Navbar from "@/components/includes/Navbar";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { WEB_URL } from "@/utils/API";

function StatusPage() {
    const userID = useSelector((state) => state.auth.user);
    const [cartItems, setCartItems] = useState([])
    const router = useRouter()
    const params = useParams()
    const session = useSearchParams()
    const [isProcessing, setIsProcessing] = useState(true)
    const [orderCreated, setOrderCreated] = useState(false); 

    useEffect(() => {
        if (userID) {
            fetchCartItems(userID)
        }
    }, [userID])

    useEffect(() => {
        if (params.status === "success" && cartItems.length > 0 && !orderCreated) {
            setOrderCreated(true);
            createFinalOrder(cartItems)
        }else{
            setIsProcessing(false)
        }
    }, [params.status, cartItems, orderCreated])
    
    // Order Create Function
    async function createFinalOrder(cartItems) {
        try {
            const session_id = session.get("session_id")
            const { data: stripeSession } = await axios.get(`${WEB_URL}/api/verify-session?session_id=${session_id}`);
            
            if (stripeSession.payment_status === 'paid') {                
                const userId = stripeSession.metadata.userId;

                const getCheckoutData = localStorage.getItem("checkoutData");

                const createFinalCheckoutFormData = {
                    userId: userId,
                    shipping: getCheckoutData,
                    items: cartItems.map(item => ({
                        product: item.productID._id,
                        quantity: item.qty,
                    })),
                    totalPrice: cartItems.reduce((total, item) =>
                        item.price + total, 0
                    ),
                    isProcessing: true
                }

                const response = await CreateOrder(createFinalCheckoutFormData)
                if (response.success === true) {
                    toast.success(response.message)
                } else {
                    toast.error(response.message)
                }
            }
        } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed");
        } finally {
            setIsProcessing(false)
        }
    }

    // Fetch Cart Items Function

    async function fetchCartItems(userID) {
        if (!userID) {
            router.push('/login')
            return toast.error("You are not login. Please login again ?")
        }
        try {
            const response = await FetchCart(userID)
            if (response.success === true) {
                setCartItems(response.getCartProduct)
            } else {
                toast.error(response.message)
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

    if (params.status === "cancel" && !isProcessing) {
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
    }

    return (
        <div className="mx-4 mt-10 flex h-screen flex-col justify-between">
            <Navbar />
            <div className="flex mx-auto gap-4 w-full md:w-1/2 p-2">
                <div className="flex flex-col gap-5 w-full">
                    <h2 className="text-xl text-center font-semibold">Your Payment Is Successful</h2>
                    <Link href='/order'><Button className="w-full">View Your Order</Button></Link>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default StatusPage;