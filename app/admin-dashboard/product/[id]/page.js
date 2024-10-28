'use client'

import AdminLeftbar from "@/app/component/Admin-Leftbar";
import Navbar from "@/app/component/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GlobalContext } from "@/context";

function ProductDetails({ params }) {
    const { id } = params
    const [openEditProductDialog, setOpenEditProductDialog] = useState(false)
    const { getBrands, getCategory, getSubCategory } = useContext(GlobalContext)
    const [singleProductData, setSingleProductData] = useState({
        productName: "",
        hns: "",
        category: "",
        subCategory: "",
        brand: "",
        price: 0,
        discount: 0,
        warranty: "",
        delivery: "",
        offers: "",
        desc: "",
        qty: 0,
        size: []
    })
    const [images, setImages] = useState(null)
    const [sideImage, setSideImage] = useState(null)

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        
        setSingleProductData((prevData) => {
            // If checkbox is checked, add the size; otherwise, remove it
            const updatedSizes = checked
                ? [...prevData.size, value]  // Add size if checked
                : prevData.size.filter((size) => size !== value);  // Remove size if unchecked
            
            return {
                ...prevData,
                size: updatedSizes
            };
        });
    };  

    useEffect(() => {

        async function fetchSinglrProduct() {
            try {
                const response = await axios.get(`http://localhost:3000/api/product/${id}`, {
                    headers: {
                        'Cache-Control': 'no-store',
                    }
                })
                if (response.data.success === true) {
                    const productData = response.data.fetchSingleRecord[0];
                    setSingleProductData({
                        productName: productData.productName,
                        hns: productData.hns,
                        category: productData.category,
                        subCategory: productData.subCategory,
                        brand: productData.brand,
                        price: productData.price,
                        discount: productData.discount,
                        warranty: productData.warranty,
                        delivery: productData.delivery,
                        offers: productData.offers,
                        desc: productData.desc,
                        qty: productData.qty,
                        size: productData.size,
                    });

                    setImages(productData.filename);

                    if (productData.filename && productData.filename.length > 0) {
                        setSideImage(productData.filename[0].name);
                    }
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error("Something Went Wrong. Please Try Again!")
            }
        }

        fetchSinglrProduct()
    }, [])

    async function handleEditProductForm(){
        try{
            const response = await axios.put(`/api/product/${id}`,singleProductData)
            console.log(response.data);
        }catch(error){
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    return (
        <>
            <div>
                <Navbar />
                <div className="flex px-2">
                    <div className="hidden md:block md:w-1/4 lg:w-1/6">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full mx-4 mt-4">
                        <h1 className="text-center text-3xl font-semibold">Product Details</h1>
                        <div className="text-end mt-2">
                            <Button onClick={()=>{setOpenEditProductDialog(true)}}>Edit Product</Button>
                        </div>
                        <div className="border w-full rounded-lg mt-6 p-4">
                            <div className="w-full flex flex-col lg:flex-row">
                                <div className="w-full lg:w-2/5 flex flex-col gap-4">
                                    <div className="flex flex-col lg:flex-row items-center lg:justify-evenly gap-4">
                                        <div>
                                            <img src={`/product/${sideImage}`} alt={sideImage} className="h-[300px] lg:h-[500px]" />
                                        </div>
                                        <div className="flex lg:flex-col gap-4">
                                            {
                                                images && images.length > 0 ? (
                                                    images.map((image, index) => (
                                                        <div key={index}>
                                                            <img src={`/product/${image.name}`} alt={image.name} className="w-[100px]" onClick={() => { setSideImage(image.name) }} />
                                                        </div>
                                                    ))
                                                ) : (
                                                    null
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-3/5">
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                        <h2 className="text-2xl">{singleProductData.productName}</h2>
                                        <p className="text-gray-600">Product Code: {singleProductData.hns}</p>
                                    </div>

                                    <p className="text-green-600 font-semibold">Special price</p>
                                    <div className="flex items-center gap-4">
                                        <p className="text-3xl font-semibold">₹{singleProductData.price}</p>
                                        <p className="text-green-600 font-semibold">{singleProductData.discount}% off</p>
                                    </div>
                                    <p className="font-semibold text-xl">Total Stock: {singleProductData.qty}</p>

                                    <div className="flex flex-col gap-4 mt-6">
                                        <p className="flex items-center gap-4">Size:
                                            {
                                                singleProductData && singleProductData.size.length > 0 ? (
                                                    singleProductData.size.map((size, index) => (
                                                        <div className="flex border hover:bg-black hover:text-white rounded text-lg w-10 h-10 justify-center items-center" key={index}>
                                                            <span>{size}</span>
                                                        </div>
                                                    ))

                                                ) : null
                                            }
                                        </p>
                                        <div className="flex flex-col lg:flex-row justify-between">
                                            <p><span className="text-lg">Brand:</span> {singleProductData.brand}</p>
                                            <p><span className="text-lg">Category:</span> {singleProductData.category}</p>
                                            <p><span className="text-lg">SubCategory:</span> {singleProductData.subCategory}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">Available offers</h3>
                                            <p><span className="font-semibold text-lg">Bank Offer</span> {singleProductData.offers}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10 mt-2 border-b-2 border-black pb-4">
                                        <div>
                                            <span className="text-lg">Service:</span>
                                            <span className="ml-2">{singleProductData.delivery}</span>
                                        </div>
                                        <div >
                                            <span className="text-lg">Warranty:</span>
                                            <span className="ml-2">{singleProductData.warranty}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-2">
                                        <h2 className="text-3xl font-semibold border-b-2 pb-4 border-black">Product Details</h2>
                                        <p>{singleProductData.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog Start */}

            <Dialog
                open={openEditProductDialog}
                onOpenChange={() => {
                    setOpenEditProductDialog(false)
                }}
            >
                <DialogContent className="max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    <form className="h-[400px] md:h-auto overflow-y-scroll md:overflow-hidden px-2" action={handleEditProductForm}>
                        <div className="grid md:grid-cols-2 gap-2">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    value={singleProductData.productName}
                                    onChange={(e) => {
                                        setSingleProductData({
                                            ...singleProductData,
                                            productName: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Product Code</Label>
                                <Input
                                    type="text"
                                    value={singleProductData.hns}
                                    onChange={(e) => {
                                        setSingleProductData({
                                            ...singleProductData,
                                            hns: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Category</Label>
                                <Select
                                    value={singleProductData.category}
                                    onValueChange={(value) => {
                                        setSingleProductData((prevData) => ({
                                            ...prevData,
                                            category: value,
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            getCategory && getCategory.length > 0 ? (
                                                getCategory.map((category, index) => (
                                                    <SelectGroup key={index} >
                                                        <SelectItem value={category.category}>{category.category}</SelectItem>
                                                    </SelectGroup>
                                                ))
                                            ) : (
                                                <SelectGroup>
                                                    <SelectItem>Category Not Found</SelectItem>
                                                </SelectGroup>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Sub Category</Label>
                                <Select
                                    value={singleProductData.subCategory}
                                    onValueChange={(value) => {
                                        setSingleProductData((prevData) => ({
                                            ...prevData,
                                            subCategory: value,
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a SubCategory" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            getSubCategory && getSubCategory.length > 0 ? (
                                                getSubCategory.map((subCategory, index) => (
                                                    <SelectGroup key={index} >
                                                        <SelectItem value={subCategory.subCategory}>{subCategory.subCategory}</SelectItem>
                                                    </SelectGroup>
                                                ))
                                            ) : (
                                                <SelectGroup>
                                                    <SelectItem>SubCategory Not Found</SelectItem>
                                                </SelectGroup>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Price</Label>
                                <Input
                                    type="number"
                                    value={singleProductData.price}
                                    onChange={(e) => {
                                        setSingleProductData({
                                            ...singleProductData,
                                            price: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Brand</Label>
                                <Select
                                    value={singleProductData.brand}
                                    onValueChange={(value) => {
                                        setSingleProductData((prevData) => ({
                                            ...prevData,
                                            brand: value,
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            getBrands && getBrands.length > 0 ? (
                                                getBrands.map((brand, index) => (
                                                    <SelectGroup key={index} >
                                                        <SelectItem value={brand.brand}>{brand.brand}</SelectItem>
                                                    </SelectGroup>
                                                ))
                                            ) : (
                                                <SelectGroup>
                                                    <SelectItem>Brand Not Found</SelectItem>
                                                </SelectGroup>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Discount</Label>
                                <Input
                                    type="number"
                                    value={singleProductData.discount}
                                    onChange={(e) => {
                                        setSingleProductData({
                                            ...singleProductData,
                                            discount: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Images</Label>
                                <Input
                                    type="file"
                                    multiple
                                    onChange={(e) => { setImages(e.target.files) }}
                                    disabled
                                />
                                <p className="text-end italic text-xs">(Multiple File Selected.)</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 items-center">
                            <div>
                                <Label>Size</Label>
                                <div className="flex items-center space-x-2">
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="1" checked={singleProductData.size[0]} value="S" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >S</label>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="2" checked={singleProductData.size[1]} value="M" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >M</label>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="3" checked={singleProductData.size[2]} value="L" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >L</label>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="4" checked={singleProductData.size[3]} value="XL" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >XL</label>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="5" checked={singleProductData.size[3]} value="XXL" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >XXL</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label>Stock</Label>
                                <Input
                                    type="number"
                                    value={singleProductData.qty}
                                    onChange={(e) => {
                                        setSingleProductData({
                                            ...singleProductData,
                                            qty: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Warranty</Label>
                                <Input
                                    type="text"
                                    value={singleProductData.warranty}
                                    onChange={(e) => {
                                        setSingleProductData({
                                            ...singleProductData,
                                            warranty: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Delivery</Label>
                                <Input
                                    type="text"
                                    value={singleProductData.delivery}
                                    onChange={(e) => {
                                        setSingleProductData({
                                            ...singleProductData,
                                            delivery: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Offers</Label>
                            <Textarea
                                value={singleProductData.offers}
                                onChange={(e) => {
                                    setSingleProductData({
                                        ...singleProductData,
                                        offers: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div>
                            <Label>Descripation</Label>
                            <Textarea
                                value={singleProductData.desc}
                                onChange={(e) => {
                                    setSingleProductData({
                                        ...singleProductData,
                                        desc: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <Button type="submit" className='mt-2'>Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ProductDetails;