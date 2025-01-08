'use client'

import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL, PUBLISHABLE_KEY } from "@/env";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";


function Checkout() {
    const { userID } = useContext(GlobalContext)
    const [cartItems, setCartItems] = useState([])
    const [userAddress, setUserAddress] = useState(null)
    const [confirmAddress, setConfirmAddress] = useState(null)
    const router = useRouter()

    const publishable_key = PUBLISHABLE_KEY
    const stripePromise = loadStripe(publishable_key)

    useEffect(() => {
        if (userID) {
            fetchCartItems(userID)
            fetchUserAddress(userID)
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


    async function fetchUserAddress(userID) {
        try {
            const response = await axios.get(`${API_URL}/api/register/${userID}`)
            if (response.status === 200) {
                setUserAddress(response.data.getSingleUser.personalDetails);
            }
        } catch (error) {
            router.push('/')
            toast.error("Something Went Wrong. Please Try Again")
            console.log("Fetching Error:", error);
        }
    }

    function handleAddress() {
        const address = {
            isPaid: false,
            isProcessing: true,
            totalPrice: 0,
            paidAt: new Date(),
            paymentMethod: "",
            ShippingAddress: {
                id: userID,
                userName: userAddress.firstName,
                city: userAddress.city,
                country: userAddress.country,
                pincode: userAddress.pincode,
            }
        }
        setConfirmAddress(address)
    }

    async function handleCheckOut() {
        try {
            const stripe = await stripePromise;
            const createLineItem = cartItems.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.productID.productName
                    },
                    unit_amount: item.productID.price * 100
                },
                quantity: 1
            }))

            const response = await axios.post('/api/stripe', createLineItem)
            if (response.data.success === true) {
                localStorage.setItem("stripe", true)
                localStorage.setItem("checkoutFormData", JSON.stringify(confirmAddress))

                const { error } = await stripe.redirectToCheckout({
                    sessionId: response.data.id
                })

                toast.error(error);
            } else {
                toast.error("Something Went Wrong. Please Try Again!")
            }
        } catch (error) {
            console.log("Checkout Error", error);
        }
    }

    return (
        <>
            {
                cartItems && userAddress ? (
                    <div className="border flex flex-col justify-between rounded-3xl mx-12 my-4 bg-[#F0F1F0] px-4 py-8">
                        <Navbar />
                        <div className="flex mx-auto mt-4 gap-4 w-3/4">
                            <div className="flex flex-col gap-4 w-3/4">
                                {
                                    cartItems && cartItems.length > 0 ? (
                                        cartItems.map((item, index) => (
                                            <Card className="p-4 bg-slate-50 border-none" key={index}>
                                                <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-4">
                                                    <img src={`/product/${item.productID.filename[0].name}`} alt={`${item.productID.filename[0].name}`} className="w-32 rounded" />
                                                    <div className="flex w-full flex-col gap-2">
                                                        <h2 className="my-4 text-lg">{item.productID.productName}</h2>
                                                        <p className="text-gray-600">Brand: {item.productID.brand}</p>
                                                        <p className="text-gray-600 flex items-center"><span className="mr-2">Price:</span> <IndianRupee size={15} className="mb-0.5" />{item.productID.price}</p>
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
                                                        item.productID.price + total, 0
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

                            <Card className="w-1/4 p-4 bg-[#F8FAFC]">
                                <div className="border-b pb-4">
                                    <h4 className="font-semibold text-lg">Shipping Address Details:</h4>
                                    <p className="text-gray-600 text-sm my-2">Complete Your Order By Address. Please Provide A Valid Address</p>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">Name</p>
                                        <p>{userAddress.firstName} {userAddress.lastName}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">City</p>
                                        <p>{userAddress.city}</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="font-semibold">Country</p>
                                        <p>{userAddress.country}</p>
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
                                <Button disabled={confirmAddress !== null} onClick={() => router.push('/account')} className="mt-4 w-full">Edit Details</Button>
                                <Button disabled={cartItems.length === 0 || confirmAddress !== null} onClick={handleAddress} className="mt-2 w-full">Confirm</Button>
                            </Card>

                        </div>
                        <Button disabled={confirmAddress === null || cartItems.length === 0} onClick={handleCheckOut} className="w-3/4 mx-auto mt-4">Checkout</Button>
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

export default Checkout;