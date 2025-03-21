'use client'

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CartSheet } from "@/components/includes/Cart-Sheet";
import { Minus, Plus, Star } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { SingleProduct } from "@/action";
import DetailsLoader from "@/components/Loader/DetailsLoader";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useSelector } from "react-redux";

function ProductID({ id, type }) {
    const router = useRouter()
    const [getProduct, setGetProduct] = useState("")
    const [cartSheetOpen, setCartSheetOpen] = useState(false)
    const userID = useSelector((state) => state.auth.user)
    const [qty, setQty] = useState(1)
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        if (id) {
            fetchProduct(id)
        }
    }, [id])

    async function fetchProduct(id) {
        try {
            const response = await SingleProduct(id)
            if (response.success === true) {
                setGetProduct(response.data)
            } else {
                toast.error("Something Went Wrong. Please Try Again.")
            }
        } catch (error) {
            console.log("Product Fetching Error:", error);
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
            const data = { productID: product._id, userID, qty, selectedSize, price: (product.mrp) * qty }
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
        <>
            <div className="mx-4 mt-10">
                <Navbar type={type} />
                <CartSheet cartSheetOpen={cartSheetOpen} setCartSheetOpen={setCartSheetOpen} />
                {
                    !getProduct ? (
                        <DetailsLoader />
                    ) : (
                        <div className="my-8 p-4">
                            <div className="w-full flex flex-col lg:flex-row">
                                <div className="w-full lg:w-2/5 flex flex-col lg:flex-row lg:justify-evenly gap-4 items-center h-[600px]">
                                    <div className="flex lg:flex-col justify-center gap-4">
                                        {
                                            getProduct && getProduct.filename.length > 0 ? (
                                                getProduct.filename.map((image, index) => (
                                                    <div key={index}>
                                                        <Image width={80} height={80} src={image.name} alt={image.name} />
                                                    </div>
                                                ))
                                            ) : (
                                                null
                                            )
                                        }
                                    </div>
                                    <Carousel className="w-[350px] h-[500px]">
                                        <CarouselContent>
                                            {
                                                getProduct && getProduct.filename.length > 0 ? (
                                                    getProduct.filename.map((image, index) => (
                                                        <CarouselItem key={index}>
                                                            <div className="flex overflow-hidden h-[500px] w-[350px]">
                                                                <Image width={350} height={500} src={image.name} alt={image.name} className="object-cover" />
                                                            </div>
                                                        </CarouselItem>
                                                    ))
                                                ) : null
                                            }
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
                                        <p className="text-3xl font-semibold">₹ {(getProduct.mrp) * qty}</p>
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
                                                <TableCell>
                                                    <div
                                                        className="custom-content"
                                                        dangerouslySetInnerHTML={{ __html: getProduct.warranty }} //Render HTML content
                                                    ></div>
                                                </TableCell>
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

                            <div className="w-full pt-6">
                                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="text-xl font-semibold">Total Reviews</p>
                                        <p className="text-2xl font-bold">2.0</p>
                                    </div>
                                    <div>
                                        <p className="text-xl font-semibold">Average Rating</p>
                                        <p className="text-2xl font-bold flex items-center">
                                            4.0 <Star className="text-yellow-500 ml-2" size={20} />
                                        </p>
                                    </div>
                                </div>
                                {reviews.map((review, index) => (
                                    <Card key={index} className="mb-4 p-4">
                                        <CardContent className="flex space-x-4">
                                            <div className="w-[100px] h-[100px] border rounded-full overflow-hidden">
                                                <Image
                                                    width={300}
                                                    height={300}
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    className="w-full h-full object-cover object-center"
                                                    unoptimized
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold">{review.name}</p>
                                                <div className="flex items-center mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                                                            size={16}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                                <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )
                }
                <Footer />
            </div>
        </>
    );
}

export default ProductID;


const reviews = [
    {
        name: "Anurag",
        rating: 5,
        date: "24-10-2022",
        comment:
            "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation. The fun and genuine joy.",
        avatar: "/profile/1739290679505.jpg",
    },
];