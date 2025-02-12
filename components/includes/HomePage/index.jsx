'use client'

import Navbar from "@/components/includes/Navbar";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";
import Footer from "../Footer";

export default function HomePage({ getBrands, getCategory, getProduct }) {
    const [itemsToShow, setItemsToShow] = useState(4);

    const handleMoreClick = () => {
        setItemsToShow((prev) => prev + 4);
    };

    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )

    return (
        <>
            <div className="mx-4 mt-10">
                <Navbar />
                <div className="flex flex-col mt-8">

                    {/* Banner Section */}
                    <div className="h-[200px] md:h-[700px]">
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-full"
                        >
                            <CarouselContent>
                                {imageArray.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div>
                                            <img src={image.src} alt={image.alt} className="w-full h-[200px] md:h-[700px] object-cover object-center" />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="ml-16" />
                            <CarouselNext className="mr-16" />
                        </Carousel>
                    </div>

                    {/* Category Section */}
                    <div className="w-full md:w-3/4 mx-auto mt-10 px-4 md:px-0">
                        <h2 className="font-semibold mb-2">Category</h2>
                        <div className="flex gap-10 overflow-x-scroll md:overflow-hidden">
                            {
                                getCategory && getCategory.length > 0 ? (
                                    getCategory.map((category, index) => (
                                        <div className="flex flex-col items-center gap-2 cursor-pointer" key={index}>
                                            <Link href={`/Shop/${category.category}`} className="w-[100px] h-[100px] border rounded-full overflow-hidden">
                                                <img src={category.filename} alt={category.filename} className="object-cover object-center rounded-full" />
                                            </Link>
                                            <h2>{category.category}</h2>
                                        </div>
                                    ))
                                ) : null
                            }
                        </div>
                    </div>

                    {/* Product Card */}
                    <div className="w-full md:w-3/4 mx-auto mt-10 md:mt-20 px-4 md:px-0">
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
                                        <div className="grid justify-center">
                                            <Link href={`/${product.subCategory}/${product.category}`} className="flex items-center justify-center w-[108px] md:w-[188px] overflow-hidden">
                                                <img src={product.filename[0].name} alt={product.filename[0].name} className="object-cover rounded-lg" />
                                            </Link>
                                        </div>
                                        <div className="flex flex-col w-full gap-2">
                                            <Link href={`/${product.subCategory}/${product.category}`}><h2 className="my-4 text-lg">{product.productName}</h2></Link>
                                            <p className="text-gray-600 font-semibold">{product.brand}</p>
                                            <p className="flex text-lg font-semibold items-center gap-3">
                                                ₹{product.mrp} <span className="text-gray-600 font-normal text-sm line-through">₹{product.price}</span><span className="text-green-600 text-sm">{product.discount}% off</span>
                                            </p>
                                            <p className="text-gray-600">{product.category}</p>
                                            <div className="flex gap-1">
                                                <p className="text-gray-600 font-semibold">Size:</p>
                                            {
                                                product.size.map((value,index) => (
                                                    <p className="text-gray-600" key={index}>{value},</p>
                                                ))
                                            }
                                            </div>
                                            <Link className="w-full" href={`/${product.subCategory}/${product.category}`}><Button className="w-full">See Item</Button></Link>
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
                    <div className="border-t-2 border-b-2 my-10 overflow-hidden ">
                        <ul className="flex justify-center items-center gap-10 animate-scroll">
                            {
                                getBrands && getBrands.length > 0 ? (
                                    [...getBrands, ...getBrands, ...getBrands, ...getBrands, ...getBrands, ...getBrands, ...getBrands, ...getBrands].map((brand, index) => (
                                        <li className="min-w-32 p-8" key={index}>
                                            <img src={brand.filename} alt={brand.filename} className="object-cover" />
                                        </li>
                                    ))
                                ) : null
                            }
                        </ul>
                        <style jsx>{`
                            @keyframes scroll {
                                from {
                                    transform: translateX(100%);
                                }
                                to {
                                    transform: translateX(-100%);
                                }
                            }
                            .animate-scroll {
                                display: flex;
                                animation: scroll 20s linear infinite;
                                will-change: transform;
                            }
                        `}</style>
                    </div>

                </div>
                <Footer />
            </div >
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