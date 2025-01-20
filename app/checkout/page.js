'use client'

import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { API_URL, PUBLISHABLE_KEY } from "@/env";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import Loading from "@/components/Loading";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


function Checkout() {
    const { userID } = useContext(GlobalContext)
    const [cartItems, setCartItems] = useState([])
    const [userAddress, setUserAddress] = useState(null)
    const [confirmAddress, setConfirmAddress] = useState(null)
    const [orderSuccess, setOrderSuccess] = useState(false)
    const [isOrderProcessing, setIsOrderProcessing] = useState(false)
    // const [orderDialog, setOrderDialog] = useState(false)
    const router = useRouter()
    const params = useSearchParams()    

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

    useEffect(() => {

        async function createFinalOrder() {
            const isStripe = JSON.parse(localStorage.getItem("stripe"))

            if (isStripe && params.get('status') === 'success' && cartItems && cartItems.length > 0) {
                setIsOrderProcessing(true)
                const getCheckoutFormData = JSON.parse(localStorage.getItem("checkoutFormData"));

                const createFinalCheckoutFormData = {
                    userId: userID,
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
                    setIsOrderProcessing(false)
                    setOrderSuccess(true)
                    toast.success(response.data.message)
                } else {
                    setIsOrderProcessing(false)
                    setOrderSuccess(false)
                    toast.success(response.data.message)
                }
            }
        }

        createFinalOrder()

    }, [params.get("status"), cartItems])

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
            shippingAddress: {
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
            if(!userID){
                router.push('/login')
                toast.error("You Are Not Login. Please Login Here ?")
                return
            }
            const stripe = await stripePromise;
            const createLineItem = cartItems.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.productID.productName
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.qty
            }))

            const response = await axios.post('/api/stripe', createLineItem)
            if (response.data.success === true) {
                setIsOrderProcessing(true)
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

    if (isOrderProcessing) {
        return (
            <div className="h-screen">
                <Loading />
            </div>
        )
    }

    if (orderSuccess) {

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

    return (
        <>
            {
                cartItems && userAddress ? (
                    <div className="mx-4 mt-10 flex flex-col justify-between">
                        <Navbar />
                        <div className="flex mx-auto mt-8 gap-4 w-3/4">
                            <div className="flex flex-col gap-4 w-3/4">
                                {
                                    cartItems && cartItems.length > 0 ? (
                                        cartItems.map((item, index) => (
                                            <Card className="p-4 border" key={index}>
                                                <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-4">
                                                    <img src={item.productID.filename[0].name} alt={item.productID.filename[0].name} className="w-32 rounded" />
                                                    <div className="flex w-full flex-col gap-2">
                                                        <h2 className="my-4 text-lg">{item.productID.productName}</h2>
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

                            <Card className="w-1/4 p-4 border">
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
                        <Button disabled={confirmAddress === null || cartItems.length === 0} onClick={handleCheckOut} className="w-3/4 mx-auto mt-4 mb-8">Order Now</Button>
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

export default Checkout;