'use client'

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { GlobalContext } from "@/context";
import { API_URL } from "@/env";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


function KidsProduct() {
    const params = useParams()
    const id = params.id
    const router = useRouter()
    const [getProduct, setGetProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const { userID } = useContext(GlobalContext)

    useEffect(() => {
        if (id) {
            fetchProduct(id)
        }
    }, [id])

    async function fetchProduct(id) {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/product/${id}`, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            })
            if (response.data.success === true) {
                setGetProduct(response.data.fetchSingleRecord)
            } else {
                setLoading(false)
                toast.error("Something Went Wrong. Please Try Again.")
            }
        } catch (error) {
            console.log("Product Fetching Error:", error);
        } finally {
            setLoading(false)
        }
    }

    async function handleCart(product) {
        try {
            const data = { productID: product._id, userID }
            if (!userID) {
                router.push('/login')
                return toast.error("You Are Not Login. Please Login Here")
            }
            const response = await axios.post('/api/cart', data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                toast.success("Product Successfully Added In Cart")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Add To Cart Error:", error)
        }
    }

    return (
        <>{
            getProduct !== null ? (
                <div className="mx-4 mt-10">
                    <Navbar />
                    <Card className="mt-8 p-4">
                        <div className="w-full flex flex-col lg:flex-row">
                            <div className="w-full lg:w-2/5 flex flex-col lg:flex-row items-center lg:justify-evenly gap-4">
                                <div className="flex lg:flex-col gap-4">
                                    {
                                        getProduct.filename && getProduct.filename.length > 0 ? (
                                            getProduct.filename.map((image, index) => (
                                                <div key={index}>
                                                    <img src={`/product/${image.name}`} alt={image.name} className="w-[70px]" onClick={() => { setSideImage(image.name) }} />
                                                </div>
                                            ))
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                                <Carousel className="w-[350px] h-[500px]">
                                    <CarouselContent>
                                        {getProduct.filename.map((image, index) => (
                                            <CarouselItem key={index}>
                                                <div className="flex justify-center items-center overflow-hidden h-[500px] w-[350px]">
                                                    <img src={image.name} alt={image.name} className="object-cover" />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </div>
                            <div className="w-full lg:w-3/5">
                                <h2 className="text-2xl">{getProduct.productName}</h2>
                                <p className="text-green-600 font-semibold mt-14">Special price</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <p className="text-3xl font-semibold">₹{getProduct.price}</p>
                                    <p className="text-green-600 font-semibold">{getProduct.discount}% off</p>
                                </div>

                                <div className="flex flex-col gap-4 mt-14">
                                    <p className="flex items-center gap-4">Size:
                                        {
                                            getProduct && getProduct.size.length > 0 ? (
                                                getProduct.size.map((size, index) => (
                                                    <div className="flex border hover:bg-black hover:text-white rounded text-lg w-10 h-10 justify-center items-center" key={index}>
                                                        <span>{size}</span>
                                                    </div>
                                                ))

                                            ) : null
                                        }
                                    </p>
                                    <div className="flex flex-col gap-6">
                                        <p><span className="text-lg">Brand:</span> {getProduct.brand}</p>
                                        <p><span className="text-lg">Category:</span> {getProduct.category}</p>
                                        <p><span className="text-lg">SubCategory:</span> {getProduct.subCategory}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4 mt-6">
                                    <Button className="w-full" onClick={() => { handleCart(getProduct) }} >Add To Cart</Button>
                                    <Button className="w-full">Buy Now</Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl font-semibold border-b pb-2">Product Details</h2>
                                <p>{getProduct.desc}</p>
                            </div>

                            <p className="text-lg font-semibold mt-10 border-b pb-2">Delivery: <span className="ml-2 text-sm font-normal">{getProduct.delivery}</span></p>
                            <p className="text-lg font-semibold mt-10 border-b pb-2">Warranty: <span className="ml-2 text-sm font-normal">{getProduct.warranty}</span></p>

                            <div className="mt-10">
                                <h3 className="text-xl font-semibold border-b pb-2">Available offers</h3>
                                <p className="mt-2">{getProduct.offers}</p>
                            </div>
                        </div>
                    </Card>
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

export default KidsProduct;