'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import Loading from "@/components/Loading";
import { FetchCart, fetchProfile } from "@/action";
import { useSelector } from "react-redux";
import Image from "next/image";


function CheckoutPage({ userAddress, cartItems}) {
    const userID = useSelector((state) => state.auth.user);
    // const [cartItems, setCartItems] = useState([])
    // const [userAddress, setUserAddress] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const publishable_key = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY
    const stripePromise = loadStripe(publishable_key)

    // useEffect(() => {
    //     if (userID) {
    //         fetchCartItems(userID)
    //         fetchUserAddress(userID)
    //     }
    // }, [userID])

    // async function fetchCartItems(userID) {
    //     try {
    //         const response = await FetchCart(userID)
    //         if (response.success === true) {
    //             setCartItems(response.getCartProduct)
    //         }
    //     } catch (error) {
    //         toast.error("Something Went Wrong. Please Try Again")
    //         console.log("Fetching Error:", error);
    //     }
    // }

    // async function fetchUserAddress(userID) {
    //     try {
    //         const response = await fetchProfile(userID)
    //         if (response.success === true) {
    //             setUserAddress(response.data);
    //         }
    //     } catch (error) {
    //         toast.error("Something Went Wrong. Please Try Again")
    //         console.log("Fetching Error:", error);
    //     }
    // }

    async function handleCheckOut() {
        if (!userID) {
            router.push('/login')
            toast.error("You Are Not Logged In. Please Login!")
            return
        }
        if (
            !userAddress._id || 
            !userAddress.firstName || 
            !userAddress.address || 
            !userAddress.pincode || 
            !userAddress.phone || 
            !userAddress.bankName || 
            !userAddress.ifse || 
            !userAddress.branch || 
            !userAddress.accountNo
        ) {
            toast.error("Please complete your profile & and after checkout ?")
            return
        }
        try {
            setLoading(true)
            const stripe = await stripePromise;

            const lineItems = cartItems.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.productID.productName,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.qty,
            }));

            const payload = {
                lineItems,
                userId: userID
            };

            const { data } = await axios.post('/api/stripe', payload);

            if (data.success === true) {
                localStorage.setItem("stripe", "true");
                localStorage.setItem("checkoutData", userAddress._id);
                const { error } = await stripe.redirectToCheckout({
                    sessionId: data.id
                });

                if (error) {
                    toast.error(error.message);
                }
            }
        } catch (error) {
            console.error("Checkout Error:", error);
            toast.error("Payment processing failed");
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            {
                cartItems && userAddress ? (
                    <div className="mx-4 mt-10 flex flex-col justify-between">
                        <Navbar />
                        <div className="flex flex-col-reverse lg:flex-row mx-auto mt-8 gap-4 w-3/4">
                            <div className="flex flex-col gap-4 w-full lg:w-3/5">
                                {
                                    cartItems && cartItems.length > 0 ? (
                                        cartItems.map((item, index) => (
                                            <Card className="p-4 border" key={index}>
                                                <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-4">
                                                    <div className="flex sm:block justify-center">
                                                        <Image src={item.productID.filename[0].name} width={144} height={144} alt={item.productID.filename[0].name} className="rounded" />
                                                    </div>
                                                    <div className="flex w-full flex-col justify-around gap-2">
                                                        <h2 className="text-lg">{item.productID.productName}</h2>
                                                        <p className="text-gray-600">Brand: {item.productID.brand}</p>
                                                        <p className="text-gray-600 flex items-center"><span className="mr-2">Price:</span> <IndianRupee size={15} className="mb-0.5" />{item.price}</p>
                                                        <p className="text-gray-600">Quentity: {item.qty}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))
                                    ) : <h2>No Product Found</h2>
                                }

                                <div className={`${cartItems.length === 0 ? "hidden" : ""}`}>
                                    <div className="flex justify-between px-4">
                                        <p className="font-semibold text-lg">Total Amount</p>
                                        <p className="flex items-center gap-0.5"><IndianRupee size={15} className="mb-0.5" />
                                            {
                                                cartItems && cartItems.length > 0 ? (
                                                    cartItems.reduce((total, item) =>
                                                        item.price + total, 0
                                                    )
                                                ) : "0"
                                            }
                                        </p>
                                    </div>

                                    <div className="flex justify-between px-4">
                                        <p className="font-semibold text-lg">Shipping Fee</p>
                                        <p>Free</p>
                                    </div>
                                </div>
                            </div>

                            <Card className="w-full lg:w-2/5 p-4 border">
                                <div className="border-b pb-4">
                                    <h4 className="font-semibold text-lg">Shipping Address Details:</h4>
                                    <p className="text-gray-600 text-sm my-2">Complete Your Order By Address. Please Provide A Valid Address</p>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">Name</p>
                                        <p>{userAddress.firstName} {userAddress.lastName}</p>
                                    </div>
                                    <div className="flex justify-between gap-4 mt-2">
                                        <p className="font-semibold">Addess</p>
                                        <p>{userAddress.address}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">Postal Code</p>
                                        <p>{userAddress.pincode}</p>
                                    </div>
                                </div>

                                <div className="border-b pb-4 mt-4">
                                    <h4 className="font-semibold text-lg">Account Details:</h4>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">Bank Name</p>
                                        <p>{userAddress.bankName}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">Account No.</p>
                                        <p>{userAddress.accountNo}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">Branch</p>
                                        <p>{userAddress.branch}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">IFSE</p>
                                        <p>{userAddress.ifse}</p>
                                    </div>
                                </div>
                                <Button onClick={() => router.push('/account')} className="mt-4 w-full">Edit Details</Button>
                            </Card>

                        </div>
                        <Button disabled={!userAddress._id || cartItems.length === 0 || loading} onClick={handleCheckOut} className="w-3/4 mx-auto mt-4 mb-8">{loading ? "Processing..." : "Order Now"}</Button>
                        <Footer />
                    </div>
                ) : (
                    <div className="h-screen">
                        <Loading />
                    </div>
                )
            }
        </>
    );
}

export default CheckoutPage;