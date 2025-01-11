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


function Men() {
    const [mens, setMens] = useState([])
    const { userID } = useContext(GlobalContext)
    const router = useRouter()
    const [filtered, setFiltered] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function fetchMenData() {
            try {
                setLoading(true)
                const response = await axios.get(`${API_URL}/api/men`)
                if (response.data.success === true) {
                    setMens(response.data.mensData)
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.log("Data Fetching Error", error);
            } finally {
                setLoading(false)
            }
        }

        fetchMenData()
    }, [])

    useEffect(() => {
        filterBlogs();
    }, [selectCategory, mens]);

    const filterBlogs = () => {
        let filtered = mens;

        if (selectCategory) {
            filtered = filtered.filter(blog => blog.category.toLowerCase() === selectCategory.toLowerCase());
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
                <Navbar />

                <div className="flex flex-wrap lg:flex-nowrap my-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/5 px-4 py-6 rounded-lg border">
                        <h2 className="font-semibold text-lg mb-4">Filter By</h2>
                        <ul className="space-y-2">
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
                                        checked={selectCategory === "Jackets"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'Jackets' : '');
                                        }}
                                    />
                                    <span className="ml-2">Jackets</span>
                                </label>
                            </li>
                            <li>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={selectCategory === "Sweatshirt"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'Sweatshirt' : '');
                                        }}
                                    />
                                    <span className="ml-2">Sweatshirt</span>
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
                                        checked={selectCategory === "T-Shirt"}
                                        onCheckedChange={(checked) => {
                                            setSelectCategory(checked ? 'T-Shirt' : '');
                                        }}
                                    />
                                    <span className="ml-2">T-Shirt</span>
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
                                        filtered && filtered.length > 0 ? (
                                            filtered.map((product, index) => (
                                                <Card key={index} className="p-4 flex flex-col gap-2">
                                                    <div className="flex justify-center items-center border rounded-lg ">
                                                        <Link href={`/men/${product._id}`} className="flex justify-center items-center w-[200px] h-[300px] overflow-hidden">
                                                            <img src={product.filename[0].name} alt={product.filename[0].name} className=" object-cover" />
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <Link href={`/men/${product._id}`}><h3 className="font-semibold text-lg">{product.productName}</h3></Link>
                                                        <p className="text-gray-500 text-sm mt-2">Type: {product.subCategory}</p>
                                                        <p className="text-gray-500 text-sm mt-2">Brand: {product.brand}</p>
                                                        <p className="mt-2 flex items-center gap-0.5"><span className="font-bold">Price:</span> <IndianRupee size={15} className="mb-0.5" />{product.price}<span className="text-sm font-semibold italic text-green-600">{product.discount}% off</span></p>
                                                        <Button variant="outline" className=" w-full mt-4" onClick={() => { handleCart(product) }}>Add To Cart</Button>
                                                        <Button variant="outline" className=" w-full mt-2" >Buy Now</Button>
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

export default Men;