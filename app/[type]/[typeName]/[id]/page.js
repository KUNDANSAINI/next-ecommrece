'use client'

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { GlobalContext } from "@/context";
import { API_URL } from "@/env";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CartSheet } from "@/components/includes/Cart-Sheet";
import { Minus, Plus } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from "@/components/Loading";


function Page() {
    const params = useParams()
    const { id, type, typeName } = params
    const router = useRouter()
    const [getProduct, setGetProduct] = useState(null)
    const [cartSheetOpen, setCartSheetOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { userID } = useContext(GlobalContext)
    const [qty, setQty] = useState(1)
    const [selectedSize, setSelectedSize] = useState(null);

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

    function handleDecrement() {
        setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));
    }

    function handleIncrement() {
        setQty((prevQty) => prevQty + 1);
    }

    async function handleCart(product) {
        try {
            const data = { productID: product._id, userID, qty, selectedSize, price: (product.mrp)*qty }            
            if (!userID) {
                router.push('/login')
                return toast.error("You Are Not Login. Please Login Here")
            }
            if (!selectedSize) {
                return toast.error("Please Select A Size.")
            }
            const response = await axios.post('/api/cart', data, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                toast.success("Product Successfully Added In Cart")
                setCartSheetOpen(true)
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
                    <Navbar type={type} />
                    <CartSheet cartSheetOpen={cartSheetOpen} setCartSheetOpen={setCartSheetOpen} />
                    <div className="my-8 p-4">
                        <div className="w-full flex flex-col lg:flex-row">
                            <div className="w-full lg:w-2/5 flex flex-col lg:flex-row lg:justify-evenly gap-4 items-center h-[600px]">
                                <div className="flex lg:flex-col justify-center gap-4">
                                    {
                                        getProduct.filename && getProduct.filename.length > 0 ? (
                                            getProduct.filename.map((image, index) => (
                                                <div key={index}>
                                                    <img src={image.name} alt={image.name} className="w-[80px]" />
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
                                                <div className="flex overflow-hidden h-[500px] w-[350px]">
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
                                <p className="font-bold text-gray-500">{getProduct.brand}</p>
                                <h2 className="text-2xl">{getProduct.productName}</h2>
                                <p className="text-green-600 font-semibold mt-6">Special price</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <p className="text-3xl font-semibold">₹ {(getProduct.mrp)*qty}</p>
                                    <span className="text-gray-600 font-semibold text-sm line-through">₹{getProduct.price}</span>
                                    <p className="text-green-600 text-sm font-semibold">{getProduct.discount}% off</p>
                                </div>

                                <div className="flex flex-col gap-4 mt-8">
                                    <p className="flex items-center gap-4 font-bold">
                                        Size:
                                        {getProduct && getProduct.size.length > 0 ? (
                                            getProduct.size.map((size, index) => (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className={`flex justify-center items-center ${selectedSize === size ? 'bg-black text-white' : ''
                                                        }`}
                                                    key={index}
                                                    onClick={() => { setSelectedSize(size) }} // Handle click to select size
                                                >
                                                    <span>{size}</span>
                                                </Button>
                                            ))
                                        ) : null}
                                    </p>
                                    <p className="flex font-semibold items-center">
                                        <Button variant="outline" size="icon" className="" onClick={handleDecrement}>
                                            <Minus />
                                        </Button>
                                        <p className="mx-3">{qty}</p>
                                        <Button variant="outline" size="icon" onClick={handleIncrement}>
                                            <Plus />
                                        </Button>
                                    </p>
                                    <div className="flex flex-col gap-2">
                                        <p><span className="font-bold">Type: </span> {getProduct.subCategory}</p>
                                        <div className="flex justify-between">
                                            <p><span className="font-bold">Color:</span> {getProduct.color}</p>
                                            <p className="text-sm">Service: {getProduct.service}</p>
                                        </div>
                                        <p className={`${getProduct.stock === "In-stock" ? "font-bold text-green-800" : "font-bold text-red-600"}`}>{getProduct.stock}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-4 mt-6">
                                    <Button className="w-full" onClick={() => { handleCart(getProduct) }} >Add To Cart</Button>
                                    <Button className="w-full">Buy Now</Button>
                                </div>

                                <Table className="mt-6">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Brand</TableCell>
                                            <TableCell>{getProduct.brand}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Type</TableCell>
                                            <TableCell>{getProduct.subCategory}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Category</TableCell>
                                            <TableCell>{getProduct.category}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Color</TableCell>
                                            <TableCell>{getProduct.color}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Pocket</TableCell>
                                            <TableCell>{getProduct.pocket}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Warranty</TableCell>
                                            <TableCell>{getProduct.warranty}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl font-semibold border-b pb-2">Product Details</h2>
                                <div
                                    className="custom-content"
                                    dangerouslySetInnerHTML={{ __html: getProduct.desc }} //Render HTML content
                                ></div>

                                {/* Available offers Details */}
                                <div className="mt-10">
                                    <h3 className="text-xl font-semibold border-b pb-1">Available offers</h3>
                                    <div
                                        className="mt-2 custom-content"
                                        dangerouslySetInnerHTML={{ __html: getProduct.offers }} //Render HTML content
                                    ></div>
                                </div>

                                {/* Warranty Details */}
                                <div className="mt-10">
                                    <h2 className="text-xl font-semibold border-b pb-1">Warranty</h2>
                                    <div
                                        className="mt-2 custom-content"
                                        dangerouslySetInnerHTML={{ __html: getProduct.warranty }} //Render HTML content
                                    ></div>
                                </div>

                                {/* Delivery Details */}
                                <div className="mt-10">
                                    <div
                                        className="custom-content"
                                        dangerouslySetInnerHTML={{ __html: getProduct.delivery }} //Render HTML content
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : (
                <Loading />
            )
        }
        </>
    );
}

export default Page;