'use client'

import Navbar from "@/app/component/Navbar";
import Head from 'next/head'
import { GlobalContext } from "@/context";
import { useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IndianRupee } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Footer from "../Footer";
import { CartSheet } from "../Cart-Sheet";

export default function HomePage({ getBrands, getCategory, getProduct }) {
    const [cartSheetOpen, setCartSheetOpen] = useState(false)
    const { userID } = useContext(GlobalContext)
    const [itemsToShow, setItemsToShow] = useState(4);
    const router = useRouter()

    const handleMoreClick = () => {
        setItemsToShow((prev) => prev + 4);
    };

    // Cart Item Function Data 
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
                setCartSheetOpen(true)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Add To Cart Error", error)
        }
    }

    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )

    return (
        <>
            <Head>
                <title>Home Page - Bazzar Pro</title>
                <meta name="description" content="This is the home page of Bazzar Pro." />
                <meta name="keywords" content="home, website, SEO" />
            </Head>

            <div className="rounded-3xl mx-4 md:mx-12 my-4 bg-[#F0F1F0] py-8">
                <Navbar />
                <CartSheet cartSheetOpen={cartSheetOpen} setCartSheetOpen={setCartSheetOpen} />
                <div className="flex flex-col mt-8">
                    <div className="hidden md:block h-[700px]">
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full"
                        >
                            <CarouselContent>
                                {imageArray.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div>
                                            <img src={image.src} alt={image.alt} className="w-full h-[700px] object-cover object-center" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="ml-16" />
                            <CarouselNext className="mr-16" />
                        </Carousel>
                    </div>

                    {/* Category Section */}
                    <div className="w-full md:w-3/4 mx-auto mt-10">
                        <h2 className="font-semibold mb-2">Category</h2>
                        <div className="flex gap-10 overflow-x-scroll">
                            {
                                getCategory && getCategory.length > 0 ? (
                                    getCategory.map((category, index) => (
                                        <div className="flex flex-col items-center gap-2 cursor-pointer" key={index}>
                                            <div className="w-14 border rounded-full p-3">
                                                <img src={`/category/${category.filename}`} alt={category.filename} />
                                            </div>
                                            <h2>{category.category}</h2>
                                        </div>
                                    ))
                                ) : null
                            }
                        </div>
                    </div>

                    {/* Product Card */}
                    <div className="w-full md:w-3/4 mx-auto mt-10 md:mt-20">
                        <h6 className="text-[#D6AB87]" >PRODUCT</h6>
                        <div className="hidden sm:flex my-8">
                            <div className="w-4/6">
                                <h2 className="text-6xl font-semibold break-words ">You Can Interested This Product.</h2>
                            </div>
                            <div className="w-2/6">
                                <p className="text-gray-600">This will rotate each image in a 360-degree continuous loop. You can adjust the 2s to make the rotation faster or slower.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 md:mt-0">
                            {getProduct && getProduct.length > 0 ? (
                                getProduct.slice(0, itemsToShow).map((product, index) => (
                                    <div className="flex flex-col sm:flex-row gap-2 border rounded-2xl p-4 sm:gap-4" key={index}>
                                        <div className="flex items-center justify-center">
                                            <img src={`/product/${product.filename[0].name}`} alt={product.filename[0].name} className="w-52 md:w-72" />
                                        </div>
                                        <div className="flex flex-col w-full gap-2">
                                            <h2 className="my-4 text-lg">{product.productName}</h2>
                                            <p className="text-gray-600">{product.brand}</p>
                                            <p className="text-gray-600 flex items-center gap-0.5">
                                                Price: <IndianRupee size={15} className="mb-0.5" />{product.price} <span className="text-green-600 text-sm italic">{product.discount}% off</span>
                                            </p>
                                            <p className="text-gray-600">Type: {product.category}</p>
                                            <Button onClick={() => handleCart(product)}>Add To Cart</Button>
                                            <Button>Buy Now</Button>
                                        </div>
                                    </div>
                                ))
                            ) : null
                            }
                        </div>

                        {getProduct && itemsToShow < getProduct.length && (
                            <div className="text-center mt-4">
                                <Button onClick={handleMoreClick}>More</Button>
                            </div>
                        )}
                    </div>

                    {/* Brand Section */}
                    <div className="border-t-2 border-b-2 my-10 overflow-hidden">
                        <ul className="flex justify-center items-center gap-10">
                            {
                                getBrands && getBrands.length > 0 ? (
                                    getBrands.map((brand, index) => (
                                        <li className="min-w-40 animate-scroll" key={index}>
                                            <img src={`/brand/${brand.filename}`} alt={brand.filename} className="w-40 p-8" />
                                        </li>
                                    ))
                                ) : null
                            }
                        </ul>
                        <style jsx>{`
                @keyframes scroll {
                  0% {
                    transform: translateX(1000%);
                  }
                  100% {
                    transform: translateX(-100%);
                  }
                }
              .animate-scroll {
                animation: scroll 10s linear infinite;
              }
            `}</style>
                    </div>

                </div>
                <Footer />
            </div>
        </>
    );
}



const imageArray = [
    {
        src: "https://img.freepik.com/free-vector/fashion-template-design_23-2150368863.jpg?t=st=1734287246~exp=1734290846~hmac=0f1de2bf7953ec949190de4a67ca2503be6324977fded0a58dc17e6cb80c7b1c&w=1380",
        alt: "image 1"
    },
    {
        src: "https://img.freepik.com/free-vector/hand-drawn-fashion-trends-twitter-header_23-2150368853.jpg?t=st=1734288334~exp=1734291934~hmac=31ff376f21ea1df6f671d039969caa3801a688eb64e8fac4981ff17bbf0087d7&w=1380",
        alt: "image 2"
    },
    {
        src: "https://img.freepik.com/free-vector/flat-social-media-cover-template-autumn-celebration_23-2149521871.jpg?t=st=1734287426~exp=1734291026~hmac=fa7d493f748c70dfc32056ba360196e90ced3bd9246ebc2b5b64b30098527754&w=1380",
        alt: "image 3"
    },
]