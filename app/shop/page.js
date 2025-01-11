'use client'

import { useContext, useEffect, useState } from "react";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { API_URL } from "@/env";
import { Checkbox } from "@/components/ui/checkbox";
import { IndianRupee } from "lucide-react";
import Loading from "../Loading";
import Link from "next/link";


function Shop() {
    const [getProduct, setGetProduct] = useState([])
    const { userID } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [filteredBlog, setFilteredBlog] = useState([]);
    const [selectSubCategory, setSelectSubCategory] = useState("");
    const [selectCategory, setSelectCategory] = useState("");

    useEffect(() => {

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
                    toast.error("Something Went Wrong. Please Try Again.")
                }
            } catch (error) {
                console.log("Product Fetching Error:", error);
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [])

    useEffect(() => {
        filterBlogs();
    }, [selectSubCategory, selectCategory, getProduct]);

    const filterBlogs = () => {
        let filtered = getProduct;

        // Filter by Sub Category
        if (selectSubCategory) {
            filtered = filtered.filter(blog => blog.subCategory.toLowerCase() === selectSubCategory.toLowerCase());
        }
        // Filter by category
        if (selectCategory) {
            filtered = filtered.filter(blog => blog.category.toLowerCase() === selectCategory.toLowerCase());
        }

        setFilteredBlog(filtered);
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
                <Navbar />

                <div className="flex flex-wrap lg:flex-nowrap my-8">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/5 px-4 py-6 rounded-lg border">
                        <h2 className="font-semibold text-lg mb-4">Filter By</h2>
                        <ul className="space-y-4">
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectSubCategory === "Men"}
                                        onCheckedChange={(checked) => {
                                            setSelectSubCategory(checked ? 'Men' : '');
                                        }}
                                    />
                                    <span className="ml-2">Men</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectSubCategory === "Women"}
                                        onCheckedChange={(checked) => {
                                            setSelectSubCategory(checked ? 'Women' : '');
                                        }}
                                    />
                                    <span className="ml-2">Women</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectSubCategory === "Kids"}
                                        onCheckedChange={(checked) => {
                                            setSelectSubCategory(checked ? 'Kids' : '');
                                        }}
                                    />
                                    <span className="ml-2">Kids</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectCategory === "Shirt"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'Shirt' : '');
                                        }}
                                    />
                                    <span className="ml-2">Shirt</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectCategory === "T-Shirt"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'T-Shirt' : '');
                                        }}
                                    />
                                    <span className="ml-2">T-Shirt</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectCategory === "Jeans"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'Jeans' : '');
                                        }}
                                    />
                                    <span className="ml-2">Jeans</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectCategory === "Shorts"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'Shorts' : '');
                                        }}
                                    />
                                    <span className="ml-2">Shorts</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectCategory === "SweatShirt"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'SweatShirt' : '');
                                        }}
                                    />
                                    <span className="ml-2">SweatShirt</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectCategory === "Kurti"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'Kurti' : '');
                                        }}
                                    />
                                    <span className="ml-2">Kurti</span>
                                </label>
                            </li>
                        </ul>
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-3/4 md:px-4 py-4 md:py-0">
                        {
                            loading ? (
                                <Loading />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {
                                        filteredBlog && filteredBlog.length > 0 ? (
                                            filteredBlog.map((product, index) => (
                                                <Card key={index} className="p-4 flex flex-col gap-2">
                                                    <div className="flex justify-center items-center border rounded-lg ">
                                                        <Link href={`/shop/${product._id}`} className="flex justify-center items-center w-[200px] h-[300px] overflow-hidden">
                                                            <img src={product.filename[0].name} alt={product.filename[0].name} className="object-cover" />
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <Link href={`/shop/${product._id}`}><h3 className="font-semibold text-lg">{product.productName}</h3></Link>
                                                        <p className="text-gray-500 text-sm mt-2">Type: {product.subCategory}</p>
                                                        <p className="text-gray-500 text-sm mt-2">Brand: {product.brand}</p>
                                                        <p className="mt-2 flex items-center gap-0.5"><span className="font-bold">Price:</span> <IndianRupee size={15} className="mb-0.5" />{product.price}<span className="text-sm font-semibold italic text-green-600">{product.discount}% off</span></p>
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

export default Shop;