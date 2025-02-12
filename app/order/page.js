'use client'

import React from "react";
import Footer from "@/components/includes/Footer";
import Navbar from "@/components/includes/Navbar";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import Link from "next/link";
import { IconProgressAlert, IconProgressCheck, IconTruck } from "@tabler/icons-react";


function Order() {
    const { userID } = useContext(GlobalContext)
    const [getOrder, setGetOrder] = useState([])
    const [loading, setLoading] = useState(false)
    const [visibleIndex, setVisibleIndex] = useState(0); // Default visible item index
    const [showAllItems, setShowAllItems] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_CLIENT_URL

    useEffect(() => {
        if (userID) {
            fetchOrderData(userID)
        }
    }, [userID])

    async function fetchOrderData(userID) {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/order/${userID}`)
            if (response.data.success === true) {
                const data = response.data.getAllOrder.filter((value) => {
                    return value.status !== "Delivered"
                })
                setGetOrder(data)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <div className="mx-4 mt-10">
                <Navbar />
                <div className="flex p-4 border-b mt-8">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 gap-4">
                            <TabsTrigger className="border h-10 rounded-full" value="account">Ordered</TabsTrigger>
                            <TabsTrigger className="border h-10 rounded-full" value="password">Delivered</TabsTrigger>
                        </TabsList>
                        {
                            loading ? (
                                <div className="my-8">
                                    <Loading />
                                </div>
                            ) : (
                                <TabsContent value="account" className="mx-1 mt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        {getOrder && getOrder.length > 0 ? (
                                            getOrder.map((order, orderIndex) => (
                                                <React.Fragment key={orderIndex}>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        {order.orderItems.map((item, itemIndex) => (
                                                            <React.Fragment key={itemIndex}>
                                                                {(showAllItems || visibleIndex === itemIndex) && (
                                                                    <Card>
                                                                        <CardHeader>
                                                                            <CardTitle className="truncate">{item.product.productName}</CardTitle>
                                                                            <CardDescription>{item.product._id}</CardDescription>
                                                                        </CardHeader>
                                                                        <div className="w-full grid justify-center">
                                                                            <Carousel
                                                                                opts={{
                                                                                    align: "start",
                                                                                }}
                                                                                className="w-full max-w-sm"
                                                                            >
                                                                                <CarouselContent>
                                                                                    {item.product.filename.map((image, imageIndex) => (
                                                                                        <CarouselItem
                                                                                            key={imageIndex}
                                                                                            className="md:basis-1/2 lg:basis-1/3"
                                                                                        >
                                                                                            <div>
                                                                                                <img src={image.name} alt="Product Image" className="rounded" />
                                                                                            </div>
                                                                                        </CarouselItem>
                                                                                    ))}
                                                                                </CarouselContent>
                                                                                <CarouselPrevious />
                                                                                <CarouselNext />
                                                                            </Carousel>
                                                                        </div>
                                                                        <CardDescription className="mt-4 mx-6">
                                                                            Quantity: {item.qty}
                                                                        </CardDescription>
                                                                        <CardFooter className="flex justify-between">
                                                                            <p>₹ {item.product.mrp}</p>
                                                                            <Link
                                                                                href={`/${item.product.subCategory}/${item.product.category}/${item.product._id}`}
                                                                            >
                                                                                <Button>Details</Button>
                                                                            </Link>
                                                                        </CardFooter>
                                                                    </Card>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                        {/* Show/Hide Buttons */}
                                                        {order.orderItems.length > 1 && !showAllItems && (
                                                            <Button onClick={() => setShowAllItems(true)}>Show</Button>
                                                        )}
                                                        {order.orderItems.length > 1 && showAllItems && (
                                                            <Button onClick={() => setShowAllItems(false)}>Hide</Button>
                                                        )}
                                                    </div>

                                                    {/* Shipping Address Card */}
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Shipping Address</CardTitle>
                                                        </CardHeader>
                                                        <CardContent className="space-y-1">
                                                            <div className="flex justify-between">
                                                                <h2>Name:</h2>
                                                                <CardDescription>{order.shippingAddress.userName}</CardDescription>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <h2>Address:</h2>
                                                                <CardDescription>{order.shippingAddress.address}</CardDescription>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <h2>Pincode:</h2>
                                                                <CardDescription>{order.shippingAddress.pincode}</CardDescription>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <h2>Payment:</h2>
                                                                <CardDescription>
                                                                    {order.isPaid ? "Paid" : "Pending"}
                                                                </CardDescription>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <h2>Payment Method:</h2>
                                                                <CardDescription>{order.paymentMethod}</CardDescription>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <h2>TotalPrice:</h2>
                                                                <CardDescription>₹ {order.totalPrice}</CardDescription>
                                                            </div>

                                                            {/* Status Stap */}
                                                            <div className="flex items-center justify-between w-full px-3">
                                                                {/* Pending Step */}
                                                                <div className="flex flex-col items-center gap-1 ">
                                                                    <Button className="relative rounded-full w-8 h-8 bg-sky-500">
                                                                        {/* Ping effect on button background */}
                                                                        {
                                                                            order.status === "Pending" ? (
                                                                                <span className="absolute inset-0 animate-ping bg-sky-400 rounded-full opacity-75"></span>
                                                                            ) : null
                                                                        }
                                                                        <span className="relative z-10 text-lg font-semibold"><IconProgressAlert stroke={2} /></span>
                                                                    </Button>
                                                                </div>

                                                                {/* Horizontal Line */}
                                                                <div className="flex-grow border-t border-gray-300"></div>

                                                                {/* Out Of Delivery Step */}
                                                                <div className="flex flex-col items-center gap-1">
                                                                    <Button className="relative rounded-full w-8 h-8 bg-sky-500">
                                                                        {/* Ping effect on button background */}
                                                                        {
                                                                            order.status === "Out Of Delivery" ? (
                                                                                <span className="absolute inset-0 animate-ping bg-sky-400 rounded-full opacity-75"></span>
                                                                            ) : null
                                                                        }
                                                                        <span className="relative z-10 text-lg font-semibold"><IconTruck stroke={2} /></span>
                                                                    </Button>
                                                                </div>

                                                                {/* Horizontal Line */}
                                                                <div className="flex-grow border-t border-gray-300"></div>

                                                                {/* Delivered Step */}
                                                                <div className="flex flex-col items-center gap-1">
                                                                    <Button className="relative rounded-full w-8 h-8 bg-sky-500">
                                                                        {/* Ping effect on button background */}
                                                                        {
                                                                            order.status === "Delivered" ? (
                                                                                <span className="absolute inset-0 animate-ping bg-sky-400 rounded-full opacity-75"></span>
                                                                            ) : null
                                                                        }
                                                                        <span className="relative z-10 text-lg font-semibold"><IconProgressCheck stroke={2} /></span>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <p>Pending</p>
                                                                <p>Out Of Delivery</p>
                                                                <p>Delivered</p>
                                                            </div>

                                                        </CardContent>
                                                        <CardFooter>
                                                            <Button disabled={order.status !== "Pending"} variant="destructive" className='w-full'>Order Cancel</Button>
                                                        </CardFooter>
                                                    </Card>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <p>No orders found.</p>
                                        )}
                                    </div>

                                </TabsContent>
                            )
                        }
                        <TabsContent value="password" className="mx-1 mt-6">
                            <div className="grid grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Password</CardTitle>
                                        <CardDescription>
                                            Change your password here. After saving, you'll be logged out.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">Current password</Label>
                                            <Input id="current" type="password" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="new">New password</Label>
                                            <Input id="new" type="password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save password</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Order;