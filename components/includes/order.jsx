'use client'

import React from "react";
import Footer from "@/components/includes/Footer";
import Navbar from "@/components/includes/Navbar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";
import Link from "next/link";
import { IconProgressAlert, IconProgressCheck, IconTruck, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { CreateReview, GetOrderByID } from "@/action";
import { useSelector } from "react-redux";
import OrderCancel from "./orderCancel";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";


function OrderPage() {
    const userID = useSelector((state) => state.auth.user);
    const [getOrder, setGetOrder] = useState([])
    const [order, setOrder] = useState({})
    const [getDeliveredOrder, setGetDeliveredOrder] = useState([])
    const [cancelOrder, setCancelOrder] = useState(false)
    const [loading, setLoading] = useState(false)
    const [visibleIndex, setVisibleIndex] = useState(0); // Default visible item index
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [showAllItems, setShowAllItems] = useState(false);

    useEffect(() => {
        if (userID) {
            fetchOrderData(userID)
        }
    }, [userID])

    function handleOrder(order) {
        setCancelOrder(true)
        setOrder(order)
    }

    async function fetchOrderData(userID) {
        try {
            setLoading(true)
            const response = await GetOrderByID(userID)
            if (response.success === true) {
                const data = response.getAllOrder.filter((value) => {
                    return value.status !== "Delivered"
                })
                const deliveredData = response.getAllOrder.filter((value) => {
                    return value.status === "Delivered"
                })
                setGetOrder(data)
                setGetDeliveredOrder(deliveredData)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.log("order fetching error:",error);
        } finally {
            setLoading(false)
        }
    }

    async function handleFeedBack(order) {
        if(!rating){
            return toast.error("Please Give a rate")
        }
        try{
            const createReviewData = order.items.map(item => ({
                user_id: order.userId,
                product_id: item._id,
                rating: rating,
                review_text: feedback
            }));

            const response = await CreateReview(createReviewData)
            if(response.success === true){
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
        }catch(error){
            console.log("review giveing error:", error);
            toast.error("Bad Request")
        }
    }


    return (
        /* eslint-disable react/no-unescaped-entities */
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
                                                        {order.items.map((item, itemIndex) => (
                                                            <React.Fragment key={itemIndex}>
                                                                {(showAllItems || visibleIndex === itemIndex) && (
                                                                    <Card>
                                                                        <CardHeader>
                                                                            <CardTitle className="truncate">{item.product.productName}</CardTitle>
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
                                                                                                <Image width={400} height={400} src={image.name} alt="Product Image" className="rounded" />
                                                                                            </div>
                                                                                        </CarouselItem>
                                                                                    ))}
                                                                                </CarouselContent>
                                                                                <CarouselPrevious />
                                                                                <CarouselNext />
                                                                            </Carousel>
                                                                        </div>
                                                                        <CardDescription className="mt-4 mx-6">
                                                                            Quantity: {item.quantity}
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
                                                        {order.items.length > 1 && !showAllItems && (
                                                            <Button onClick={() => setShowAllItems(true)}>Show</Button>
                                                        )}
                                                        {order.items.length > 1 && showAllItems && (
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
                                                                <CardDescription>{order.shipping.firstName}</CardDescription>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <h2>Address:</h2>
                                                                <CardDescription>{order.shipping.address}</CardDescription>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <h2>Pincode:</h2>
                                                                <CardDescription>{order.shipping.pincode}</CardDescription>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <h2>TotalPrice:</h2>
                                                                <CardDescription>₹ {order.totalPrice}</CardDescription>
                                                            </div>

                                                            {/* Status Stap */}
                                                            <div className="flex items-center justify-between w-full px-3">
                                                                {/* If order is canceled, show only "Pending" and "Canceled" */}
                                                                {order.status === "Canceled" ? (
                                                                    <>
                                                                        {/* Pending Step */}
                                                                        <div className="flex flex-col items-center gap-1">
                                                                            <Button className="relative rounded-full w-8 h-8 bg-sky-500">
                                                                                {order.status === "Pending" && (
                                                                                    <span className="absolute inset-0 animate-ping bg-sky-400 rounded-full opacity-75"></span>
                                                                                )}
                                                                                <span className="relative z-10 text-lg font-semibold"><IconProgressAlert stroke={2} /></span>
                                                                            </Button>
                                                                        </div>

                                                                        {/* Horizontal Line */}
                                                                        <div className="flex-grow border-t border-gray-300"></div>

                                                                        {/* Canceled Step */}
                                                                        <div className="flex flex-col items-center gap-1">
                                                                            <Button className="relative rounded-full w-8 h-8 bg-red-500">
                                                                                {order.status === "Canceled" && (
                                                                                    <span className="absolute inset-0 animate-ping bg-red-400 rounded-full opacity-75"></span>
                                                                                )}
                                                                                <span className="relative z-10 text-lg font-semibold"><IconX stroke={2} /></span>
                                                                            </Button>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    // Show all steps for non-canceled orders
                                                                    <>
                                                                        {/* Pending Step */}
                                                                        <div className="flex flex-col items-center gap-1">
                                                                            <Button className="relative rounded-full w-8 h-8 bg-sky-500">
                                                                                {order.status === "Pending" && (
                                                                                    <span className="absolute inset-0 animate-ping bg-sky-400 rounded-full opacity-75"></span>
                                                                                )}
                                                                                <span className="relative z-10 text-lg font-semibold"><IconProgressAlert stroke={2} /></span>
                                                                            </Button>
                                                                        </div>

                                                                        {/* Horizontal Line */}
                                                                        <div className="flex-grow border-t border-gray-300"></div>

                                                                        {/* Out Of Delivery Step */}
                                                                        <div className="flex flex-col items-center gap-1">
                                                                            <Button className="relative rounded-full w-8 h-8 bg-sky-500">
                                                                                {order.status === "Out Of Delivery" && (
                                                                                    <span className="absolute inset-0 animate-ping bg-sky-400 rounded-full opacity-75"></span>
                                                                                )}
                                                                                <span className="relative z-10 text-lg font-semibold"><IconTruck stroke={2} /></span>
                                                                            </Button>
                                                                        </div>

                                                                        {/* Horizontal Line */}
                                                                        <div className="flex-grow border-t border-gray-300"></div>

                                                                        {/* Delivered Step */}
                                                                        <div className="flex flex-col items-center gap-1">
                                                                            <Button className="relative rounded-full w-8 h-8 bg-sky-500">
                                                                                {order.status === "Delivered" && (
                                                                                    <span className="absolute inset-0 animate-ping bg-sky-400 rounded-full opacity-75"></span>
                                                                                )}
                                                                                <span className="relative z-10 text-lg font-semibold"><IconProgressCheck stroke={2} /></span>
                                                                            </Button>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>

                                                            {/* Labels */}
                                                            <div className="flex justify-between">
                                                                {order.status === "Canceled" ? (
                                                                    <>
                                                                        <p>Pending</p>
                                                                        <p>Canceled</p>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p>Pending</p>
                                                                        <p>Out Of Delivery</p>
                                                                        <p>Delivered</p>
                                                                    </>
                                                                )}
                                                            </div>


                                                        </CardContent>
                                                        <CardFooter>
                                                            <Button variant="destructive" className='w-full' onClick={() => { handleOrder(order) }}>Order Cancel</Button>
                                                            <OrderCancel cancelOrder={cancelOrder} setCancelOrder={setCancelOrder} order={order} />
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
                            <div className="grid grid-cols-2 gap-4">
                                {getDeliveredOrder && getDeliveredOrder.length > 0 ? (
                                    getDeliveredOrder.map((order, orderIndex) => (
                                        <React.Fragment key={orderIndex}>
                                            <div className="grid grid-cols-1 gap-4">
                                                <Card className="p-6 space-y-2">
                                                    {order.items.map((item, itemIndex) => (
                                                        <React.Fragment key={itemIndex}>
                                                            {(showAllItems || visibleIndex === itemIndex) && (
                                                                <Card className="border-none shadow-none p-0 space-y-4">
                                                                    <h2 className="text-2xl font-bold ">{item.product.productName}</h2>
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
                                                                                            <Image width={400} height={400} src={image.name} alt="Product Image" className="rounded" />
                                                                                        </div>
                                                                                    </CarouselItem>
                                                                                ))}
                                                                            </CarouselContent>
                                                                            <CarouselPrevious />
                                                                            <CarouselNext />
                                                                        </Carousel>
                                                                    </div>
                                                                    <p className="mt-6">
                                                                        Quantity: {item.quantity}
                                                                    </p>
                                                                    <div className="flex justify-between">
                                                                        <p>₹ {item.product.mrp}</p>
                                                                        <Link
                                                                            href={`/${item.product.subCategory}/${item.product.category}/${item.product._id}`}
                                                                        >
                                                                            <Button>Details</Button>
                                                                        </Link>
                                                                    </div>
                                                                </Card>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                    <p>Status: {order.status}</p>
                                                    {/* Show/Hide Buttons */}
                                                    {order.items.length > 1 && !showAllItems && (
                                                        <Button onClick={() => setShowAllItems(true)}>Show</Button>
                                                    )}
                                                    {order.items.length > 1 && showAllItems && (
                                                        <Button onClick={() => setShowAllItems(false)}>Hide</Button>
                                                    )}
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <button
                                                                    key={star}
                                                                    onClick={() => setRating(star)}
                                                                    className={`text-2xl transition-colors ${star <= rating ? "text-yellow-500" : "text-gray-400"
                                                                        }`}
                                                                >
                                                                    <Star fill={star <= rating ? "currentColor" : "none"} stroke="currentColor" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                        <Textarea
                                                            placeholder="Give a product feedback"
                                                            value={feedback}
                                                            onChange={(e) => { setFeedback(e.target.value) }}
                                                        />
                                                        <span className="flex justify-center">
                                                            <Button type="button" onClick={() => { handleFeedBack(order) }}>Submit</Button>
                                                        </span>
                                                    </div>
                                                </Card>
                                            </div>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <p>No orders found.</p>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
                <Footer />
            </div>
        </>
        /* eslint-disable react/no-unescaped-entities */
    );
}

export default OrderPage;