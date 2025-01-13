'use client'

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { API_URL } from "@/env";
import { IconX } from "@tabler/icons-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLeftbar from "@/components/admin/Admin-Leftbar";
import Tiptap from "../Tiptap/Tiptap";

function Product({ data, id }) {
    const [productFormData, setProductFormData] = useState({
        productName: data?.productName || "",
        hns: data?.hns || "",
        category: data?.category || "",
        subCategory: data?.subCategory || "",
        brand: data?.brand || "",
        price: data?.price || null,
        discount: data?.discount || '',
        qty: data?.qty || null,
    })
    const [desc, setDesc] = useState(data?.desc || "")
    const [addSize, setAddSize] = useState("")
    const [size, setSize] = useState(data?.size || [])
    const [offers, setOffers] = useState(data?.offers || "")
    const [warranty, setWarranty] = useState(data?.warranty || "")
    const [delivery, setDelivery] = useState(data?.delivery || "")
    const [image, setImage] = useState(data?.filename || [])
    const [images, setImages] = useState([])
    const [filename, setFilename] = useState(data?.filename || [])
    const [getCategory, setGetCategory] = useState([])
    const [getBrands, setGetBrands] = useState([])
    const router = useRouter()

    function handleAddClick(e) {
        e.preventDefault()
        if (addSize.trim() !== '') {
            setSize([...size, addSize]);
            setAddSize('');
        }
    }    

    function handleRemoveSize(value) {
        const removeSize = size.filter((size) => size !== value)
        setSize(removeSize)
    }

    async function upload(e) {
        e.preventDefault()
        try {
            if (!images.length) {
                toast.error("Pelase Select A Image")
            }
            const fdata = new FormData()
            for (let i = 0; i < images.length; i++) {
                fdata.append('images', images[i]);
            }

            const response = await axios.post('/api/upload-product-image', fdata)
            if (response.data.success === true) {
                const filesArray = response.data.imageData
                for(let file of filesArray){
                    filename.push(file)
                }
                setImage([])
                setImages([])
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemovePreview = (index) => {
        setImage((prev) => prev.filter((_, i) => i !== index));
        setFilename((prev) => prev.filter((_, i) => i !== index));
    };

    const uploadImages = (e) => {
        const filesArray = e.target.files
        if (filesArray) {
            setImages(filesArray)
            const files = Array.from(filesArray);
            const imageUrls = files.map((file) => URL.createObjectURL(file));
            setImage((prev) => [...prev, ...imageUrls]);
        }
    };

    useEffect(() => {
        fetchCategoryData()
        fetchBrandData()
    }, [])

    async function handleProductFrom(e) {
        e.preventDefault()
        try {
            const { productName, hns, category, subCategory, brand, price, discount, qty } = productFormData
            const data = { productName, hns, category, subCategory, brand, price, discount, qty, filename, desc, offers, warranty, delivery, size }
            const response = id ? await axios.put(`/api/product/${id}`, data)
                : await axios.post('/api/product', data)

            if (response.data.success === true) {
                router.push('/admin-dashboard/product')
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log("Product Submit Error:", error);
            toast.error("Something Went Wrong. Please try Again!")
        }
    }

    async function fetchCategoryData() {
        try {
            const response = await axios.get(`${API_URL}/api/category`, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            })
            if (response.data.success === true) {
                setGetCategory(response.data.getAllCategory)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchBrandData() {
        try {
            const response = await axios.get(`${API_URL}/api/brand`, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            })
            if (response.data.success === true) {
                setGetBrands(response.data.getAllBrand)
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="my-10 mx-4">
                <AdminHeader />
                <div className="flex mt-8">
                    <div className="hidden md:block md:w-[450px]">
                        <AdminLeftbar />
                    </div>
                    <div className="w-full px-4">
                        <h1 className="text-center text-2xl font-bold">
                            {
                                id ? "EDIT PRODUCT" : "ADD PRODUCT"
                            }
                        </h1>
                        <form className="mt-4">
                            {/* Product And HNS Code Input  */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Enter Product Name"
                                        value={productFormData.productName}
                                        onChange={(e) => {
                                            setProductFormData({
                                                ...productFormData,
                                                productName: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Enter HNS Code"
                                        value={productFormData.hns}
                                        onChange={(e) => {
                                            setProductFormData({
                                                ...productFormData,
                                                hns: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>

                            {/* category and subCategory Input */}
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <select
                                        value={productFormData.category}
                                        onChange={(e) => {
                                            setProductFormData((prevData) => ({
                                                ...prevData,
                                                category: e.target.value,
                                            }));
                                        }}
                                        className="border h-10 rounded-md w-full px-2 text-sm"
                                    >
                                        <option value="">Select Category</option>
                                        {
                                            getCategory && getCategory.length > 0 ? (
                                                getCategory.map((category, index) => (
                                                    <option value={category.category} key={index}>{category.category}</option>
                                                ))
                                            ) : null
                                        }
                                    </select>
                                </div>
                                <div>
                                    <select
                                        value={productFormData.subCategory}
                                        onChange={(e) => {
                                            setProductFormData((prevData) => ({
                                                ...prevData,
                                                subCategory: e.target.value,
                                            }));
                                        }}
                                        className="border h-10 rounded-md w-full px-2 text-sm"
                                    >
                                        <option value="">Select SubCategory</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>
                            </div>

                            {/* Price And brand Input */}
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <Input
                                        type="number"
                                        placeholder="Enter Price"
                                        value={productFormData.price}
                                        onChange={(e) => {
                                            setProductFormData({
                                                ...productFormData,
                                                price: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div>
                                    <select
                                        value={productFormData.brand}
                                        onChange={(e) => {
                                            setProductFormData((prevData) => ({
                                                ...prevData,
                                                brand: e.target.value,
                                            }));
                                        }}
                                        className="border h-10 rounded-md w-full px-2 text-sm"
                                    >
                                        <option value="">Select Brand</option>
                                        {
                                            getBrands && getBrands.length > 0 ? (
                                                getBrands.map((brand, index) => (
                                                    <option value={brand.brand} key={index}>{brand.brand}</option>
                                                ))
                                            ) : null
                                        }
                                    </select>
                                </div>
                            </div>

                            {/* Discount and stocks Input  */}
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <Input
                                        type="text"
                                        placeholder="Enter Discount"
                                        value={productFormData.discount}
                                        onChange={(e) => {
                                            setProductFormData({
                                                ...productFormData,
                                                discount: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="number"
                                        placeholder="Stocks"
                                        value={productFormData.qty}
                                        onChange={(e) => {
                                            setProductFormData({
                                                ...productFormData,
                                                qty: e.target.value
                                            })
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Warranty And Delivery Editor */}
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <h2 className="font-semibold">Warranty Details</h2>
                                    <Tiptap
                                        content={warranty}
                                        onChange={(newContent) => { setWarranty(newContent) }}
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Delivery Details</h2>
                                    <Tiptap
                                        content={delivery}
                                        onChange={(newContent) => setDelivery(newContent)}
                                    />
                                </div>
                            </div>

                            {/* Offers and Product Details */}
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <h2 className="font-semibold">Offers Details</h2>
                                    <Tiptap
                                        content={offers}
                                        onChange={(newContent) => { setOffers(newContent) }}
                                        immediatelyRender={false}
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Product Details</h2>
                                    <Tiptap
                                        content={desc}
                                        onChange={(newContent) => { setDesc(newContent) }}
                                    />
                                </div>
                            </div>

                            {/* Product Images and Size Input */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="space-y-2">
                                    <div className="flex gap-4">
                                        <Input
                                            type="text"
                                            placeholder="Enter Size"
                                            value={addSize}
                                            onChange={(e) => { setAddSize(e.target.value) }}
                                        />
                                        <Button onClick={handleAddClick}>ADD</Button>
                                    </div>
                                    <div className="border w-full h-[175px] rounded-lg space-y-1 p-4">
                                        {
                                            size && size.length > 0 ? (
                                                size.map((value, index) => (
                                                    <div className="flex justify-between items-center" key={index}>
                                                        <p>{value}</p>
                                                        <p className="text-sm text-red-600 cursor-pointer hover:underline" onClick={() => { handleRemoveSize(value) }}>Remove</p>
                                                    </div>
                                                ))
                                            ) : null
                                        }
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-4">
                                        <Input
                                            type="file"
                                            multiple
                                            onChange={uploadImages}
                                        />
                                        <Button onClick={upload}>Upload</Button>
                                    </div>
                                    <p className=" italic text-xs text-end mt-2">(Multiple Files Uploads)</p>
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {
                                            image && image.length > 0 ? (
                                                image.map((preview, index) => (
                                                    <div key={index} className="relative w-[140px] h-[140px] p-2 border rounded-lg grid items-center overflow-hidden ">
                                                        <img
                                                            src={typeof preview === 'string' ? preview : preview.name}
                                                            alt={typeof preview === 'string' ? preview : preview.name}
                                                            className="object-cover rounded-lg"
                                                        />
                                                        <span
                                                            className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex justify-center items-center cursor-pointer p-1"
                                                            onClick={() => handleRemovePreview(index)}
                                                        >
                                                            <IconX stroke={2} />
                                                        </span>
                                                    </div>
                                                ))
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>

                            <Button className='mt-2' onClick={handleProductFrom}>
                                {
                                    id ? "Update" : "Add"
                                }
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;