'use client'

import Navbar from "@/app/component/Navbar";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Footer from "./component/Footer";
import { CartSheet } from "./component/Cart-Sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { API_URL } from "@/env";

export default function Home() {
  const [cartSheetOpen, setCartSheetOpen] = useState(false)
  const { userID } = useContext(GlobalContext)
  const [itemsToShow, setItemsToShow] = useState(4);
  const [getBrands, setGetBrands] = useState([])
  const [getCategory, setGetCategory] = useState([])
  const [getProduct, setGetProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchBrandData()
    fetchCategoryData()
    fetchProduct()
  }, [])

  // fetching Category Data 
  async function fetchCategoryData() {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/category`, {
        headers: {
          'Cache-Control': 'no-store'
        }
      })
      if (response.data.success === true) {
        setGetCategory(response.data.getAllCategory)
      } else {
        setLoading(false)
        console.log(response.data.message)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

    // fetching Brand Data 
  async function fetchBrandData() {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/brand`, {
        headers: {
          'Cache-Control': 'no-store'
        }
      })
      if (response.data.success === true) {
        setGetBrands(response.data.getAllBrand)
      } else {
        setLoading(false)
        console.log(response.data.message)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

    // fetching Product Data 
  async function fetchProduct() {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/api/product`, {
        headers: {
          'Cache-Control': 'no-store'
        }
      })
      if (response.data.success === true) {
        setGetProduct(response.data.getAllProduct)
      } else {
        setLoading(false)
        console.log(response.data.message)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

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

  return (
    <>
      {
        !loading ? (
          <div className="flex flex-col h-screen justify-center items-center space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="border rounded-3xl mx-12 my-4 bg-[#F0F1F0] px-4 py-8">
            <Navbar />
            <CartSheet cartSheetOpen={cartSheetOpen} setCartSheetOpen={setCartSheetOpen} />
            <div className="flex flex-col p-4">
              <div className="my-32">
                <h1 className="text-8xl text-center break-words drop-shadow-xl" style={{ fontFamily: 'Rubik Glitch, sans-serif' }}>BAZZKIT PRO</h1>
                <p className="text-center text-[#D6AB87] font-semibold drop-shadow-xl" style={{ letterSpacing: "0.8rem" }}>SHOPPINGWEB</p>
              </div>

              {/* Banner Section */}
              <div>
                <Carousel className="w-3/4 mx-auto">
                  <CarouselContent>
                    {imageArray.map((image, index) => (
                      <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                        <div className='border-4 rounded-3xl'>
                          <img src={image.src} alt={image.alt} className="object-cover object-center rounded-3xl" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              {/* Category Section */}
              <div className="w-3/4 mx-auto mt-10">
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
                    ) : (
                      <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>

              {/* Product Card */}
              <div className="w-3/4 mx-auto mt-20">
                <h6 className="text-[#D6AB87]" >PRODUCT</h6>
                <div className="hidden sm:flex my-8">
                  <div className="w-4/6">
                    <h2 className="text-6xl font-semibold break-words ">You Can Interested This Product.</h2>
                  </div>
                  <div className="w-2/6">
                    <p className="text-gray-600">This will rotate each image in a 360-degree continuous loop. You can adjust the 2s to make the rotation faster or slower.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {getProduct && getProduct.length > 0 ? (
                    getProduct.slice(0, itemsToShow).map((product, index) => (
                      <div className="flex flex-col sm:flex-row gap-2 border rounded-2xl p-4 sm:gap-4" key={index}>
                        <div className="w-72">
                          <img src={`/product/${product.filename[0].name}`} alt={product.filename[0].name} className="w-full" />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                          <h2 className="my-4 text-lg">{product.productName}</h2>
                          <p className="text-gray-600">{product.brand}</p>
                          <p className="text-gray-600">
                            Price: ${product.price} <span className="text-green-600 italic">{product.discount}% off</span>
                          </p>
                          <p className="text-gray-600">Type: {product.category}</p>
                          <Button onClick={() => handleCart(product)}>Add To Cart</Button>
                          <Button>Buy Now</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  )
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
        )
      }
    </>
  );
}



const imageArray = [
  {
    src: "https://tabler.io/_next/image?url=%2Fillustrations%2Fdark%2Fbicycle.png&w=400&q=75",
    alt: "image 1"
  },
  {
    src: "https://tabler.io/_next/image?url=%2Fillustrations%2Fdark%2Fboy-with-key.png&w=400&q=75",
    alt: "image 2"
  },
  {
    src: "https://tabler.io/_next/image?url=%2Fillustrations%2Fdark%2Fboy-girl.png&w=400&q=75",
    alt: "image 3"
  },
  {
    src: "https://tabler.io/_next/image?url=%2Fillustrations%2Fdark%2Fcalendar.png&w=400&q=75",
    alt: "image 4"
  },
  {
    src: "https://tabler.io/_next/image?url=%2Fillustrations%2Fdark%2Ffolders.png&w=400&q=75",
    alt: "image 5"
  },
]