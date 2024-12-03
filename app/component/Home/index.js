'use client'

import Navbar from "@/app/component/Navbar";
import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import Footer from "../Footer";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { CartSheet } from "../Cart-Sheet";

export default function HomePage({ getCategory, getBrands, getProduct }) {
  const [cartSheetOpen, setCartSheetOpen] = useState(false)
  const { userID } = useContext(GlobalContext)

  async function handleCart(product) {
    try {
      const data = { productID: product._id, userID }
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
      toast.error("Bad Request")
    }
  }

  return (
    <>
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
                ) : null
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
                getProduct.map((product, index) => (
                  <div className="flex flex-col sm:flex-row gap-2 border rounded-2xl p-4 sm:gap-4" key={index}>
                    <div className="w-72">
                    <img src={`/product/${product.filename[0].name}`} alt={product.filename[0].name} className="w-full" />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <h2 className="my-4 text-lg">{product.productName}</h2>
                      <p className="text-gray-600">{product.brand}</p>
                      <p className="text-gray-600">Price: ${product.price} <span className="text-green-600 italic">{product.discount}%off</span></p>
                      <p className="text-gray-600">Type: {product.category}</p>
                      <Button onClick={() => { handleCart(product) }}>Add To Cart</Button>
                      <Button onClick={() => { handleCart(product) }}>Buy Now</Button>
                    </div>
                  </div>
                ))
              ) : null
              }
            </div>

            <div className="text-center mt-4">
              <Button>More</Button>
            </div>
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


const brandImage = [
  {
    src: "https://imgs.search.brave.com/NijeEWghNWWLKneG63nNPqUEyX4tqV1xL96u0MQvH3c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9mL2ZkL1ph/cmFfTG9nby5zdmcv/MjIwcHgtWmFyYV9M/b2dvLnN2Zy5wbmc",
    alt: "Zara"
  },
  {
    src: "https://redtape.com/cdn/shop/files/logo.png?v=1704870276&width=180",
    alt: "Redtape"
  },
  {
    src: "https://imgs.search.brave.com/69tWXnTkPabrpeskfBwxW7Hm9XqV-HS8oQNnoBhXWI8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8xLzFiL0Fk/aWRhc18yMDIyX2xv/Z28uc3ZnLzIyMHB4/LUFkaWRhc18yMDIy/X2xvZ28uc3ZnLnBu/Zw",
    alt: "Adidas"
  },
  {
    src: "https://imgs.search.brave.com/38cBRri_sEVD1upq2gmK-00A9kOYsofPMqemUj2cSrw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/My8zNy9KdW1wbWFu/X2xvZ28uc3ZnLzY0/MHB4LUp1bXBtYW5f/bG9nby5zdmcucG5n",
    alt: "Jordan"
  },
  {
    src: "https://imgs.search.brave.com/5Zu7t0Ir06eXrv3Ak5xqyk-TQN5jmKV36AobI-bI1ZI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2FlL1B1/bWEtbG9nby0lMjh0/ZXh0JTI5LnN2Zy8y/MjBweC1QdW1hLWxv/Z28tJTI4dGV4dCUy/OS5zdmcucG5n",
    alt: "Puma"
  },
  {
    src: "https://imgs.search.brave.com/3-ko-sAZl0yc5P68lYaizhmLHQxwLddLYBStOf4Yx-4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQxL1dy/YW5nbGVyX0xvZ28u/c3ZnLzIyMHB4LVdy/YW5nbGVyX0xvZ28u/c3ZnLnBuZw",
    alt: "Wrangler"
  },
  {
    src: "https://res.cloudinary.com/dmubfrefi/image/private/s--8fW04AVq--/c_crop,h_2813,w_5000,x_0,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/cf68f541-fc92-4373-91cb-086ae0fe2f88/001-nike-logos-swoosh-black.jpg?_a=BAAAV6Bs",
    alt: "NIKE"
  },
]