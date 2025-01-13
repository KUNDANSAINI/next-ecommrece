'use client'

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { API_URL } from "@/env";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Menubar,
    MenubarContent,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/includes/Navbar";
import Loading from "@/components/Loading";
import Footer from "@/components/includes/Footer";

function Page() {
    const [getBrand, setGetBrand] = useState([])
    const [getProduct, setGetProduct] = useState([])
    const [selectSubCategory, setSelectSubCategory] = useState("");
    const [selectBrand, setSelectBrand] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(false)
    const { userID } = useContext(GlobalContext)
    const router = useRouter()
    const params = useParams()
    const { type, typeName } = params

    useEffect(() => {
        fetchProduct()
        fetchData()
    }, [type])

    async function fetchData() {
        try {
            const response = await axios.get(`${API_URL}/api/brand`);

            if (response.data.success === true) {
                setGetBrand(response.data.getAllBrand);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function fetchProduct() {
        try {
            setLoading(true)
            const response = await axios.get(`${API_URL}/api/product`, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            })
            if (response.data.success === true) {
                const data = response.data.getAllProduct.filter((value) => {
                    return value.category === typeName
                })
                setGetProduct(data)
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

    useEffect(() => {
        filterItems();
    }, [selectBrand, selectSubCategory, getProduct]);

    const filterItems = () => {
        let filtered = getProduct;

        // Filter by Sub Category
        if (selectSubCategory) {
            filtered = filtered.filter(item => item.subCategory.toLowerCase() === selectSubCategory.toLowerCase());
        }

        // Filter by Brand
        if (selectBrand) {
            filtered = filtered.filter(item => item.brand.toLowerCase() === selectBrand.toLowerCase());
        }

        setFiltered(filtered);
    };

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
        <>
            <div className="mx-4 mt-10">
                <Navbar type={type} />

                <div className="my-8 flex flex-col items-center justify-center">
                    <div className="flex w-5/6 items-center justify-between">
                        <h2 className="font-bold text-xl">Filter</h2>
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger>Type</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarRadioGroup
                                        value={selectSubCategory}
                                        onValueChange={(value) => { setSelectSubCategory(value) }}
                                    >
                                        <MenubarRadioItem value="">All</MenubarRadioItem>
                                        <MenubarRadioItem value="Men">Men</MenubarRadioItem>
                                        <MenubarRadioItem value="Women">Women</MenubarRadioItem>
                                        <MenubarRadioItem value="Kids">Kids</MenubarRadioItem>
                                    </MenubarRadioGroup>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Brand</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarRadioGroup
                                        value={selectBrand}
                                        onValueChange={(value) => { setSelectBrand(value) }}
                                    >
                                        <MenubarRadioItem value="">All</MenubarRadioItem>
                                        {
                                            getBrand && getBrand.length > 0 ? (
                                                getBrand.map((item, index) => (
                                                    <MenubarRadioItem value={item.brand} key={index}>{item.brand}</MenubarRadioItem>
                                                ))
                                            ) : null
                                        }
                                    </MenubarRadioGroup>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>


                    {/* Main Content */}
                    <main className="w-5/6 py-4 md:py-0 mt-4">
                        {
                            loading ? (
                                <Loading />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                                    {
                                        filtered && filtered.length > 0 ? (
                                            filtered.map((product, index) => (
                                                <Card key={index} className="flex flex-col gap-2 p-4">
                                                    <div className="flex justify-center items-center">
                                                        <Link href={`/${type}/${typeName}/${product._id}`} className="flex justify-center items-center rounded h-[300px] overflow-hidden">
                                                            <img src={product.filename[0].name} alt={product.filename[0].name} className="object-cover rounded" />
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <Link href={`/${type}/${typeName}/${product._id}`}><h3 className="font-semibold text-lg">{product.productName}</h3></Link>
                                                        <p className="text-gray-500 text-sm mt-2">Type: {product.subCategory}</p>
                                                        <p className="mt-2 flex items-center font-semibold"><IndianRupee size={15} className="mb-0.5" />{product.price}<span className="text-xs italic ml-2 text-green-600">{product.discount}</span></p>
                                                        <Button variant="outline" className=" w-full mt-4" onClick={() => { handleCart(product) }}>Add To Cart</Button>
                                                        <Button variant="outline" className=" w-full mt-2">Buy Now</Button>
                                                    </div>
                                                </Card>
                                            ))
                                        ) : <h2>No Record Found</h2>
                                    }
                                </div>
                            )
                        }
                    </main>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Page;