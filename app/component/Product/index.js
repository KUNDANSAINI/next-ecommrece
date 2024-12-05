'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { API_URL } from "@/env";

function ProductDialog({ openProductDialog, setOpenProductDialog, openEditProductDialog, setOpenEditProductDialog, data }) {
    const params = useParams()
    const id = params.id
    const [productFormData, setProductFormData] = useState({
        productName: data?.productName || "",
        hns: data?.hns || "",
        category: data?.category || "",
        subCategory: data?.subCategory || "",
        brand: data?.brand || "",
        price: data?.price || 0,
        discount: data?.discount || 0,
        warranty: data?.warranty || "",
        delivery: data?.delivery || "",
        offers: data?.offers || "",
        desc: data?.desc || "",
        qty: data?.qty || 0,
        size: data?.size || []
    })
    const [image, setImage] = useState(data?.filename || null)
    const [getCategory, setGetCategory] = useState([])
    const [getBrands, setGetBrands] = useState([])
    const router = useRouter()

    useEffect(() => {
        fetchCategoryData()
        fetchBrandData()
    }, [])

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        setProductFormData((prevData) => {
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

    async function handleProductFrom() {
        try {
            const { productName, hns, category, subCategory, brand, price, discount, warranty, delivery, offers, desc, qty, size } = productFormData
            const fdata = new FormData()
            fdata.append("productName", productName)
            fdata.append("hns", hns)
            fdata.append("category", category)
            fdata.append("subCategory", subCategory)
            fdata.append("brand", brand)
            fdata.append("price", price)
            fdata.append("discount", discount)
            fdata.append("warranty", warranty)
            fdata.append("delivery", delivery)
            fdata.append("offers", offers)
            fdata.append("desc", desc)
            fdata.append("qty", qty)
            for (let i = 0; i < size.length; i++) {
                fdata.append('size', size[i]);
            }
            for (let i = 0; i < image.length; i++) {
                fdata.append('images', image[i]);
            }
            const response = id ? await axios.put(`/api/product/${id}`, fdata)
                : await axios.post('/api/product', fdata)
            if (response.data.success === true) {
                id ? (
                    setOpenEditProductDialog(false),
                    toast.success("Product Successfully Updated!"),
                    router.refresh()
                )
                    : (
                        setOpenProductDialog(false),
                        setProductFormData({
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
                        }),
                        setImage(null),
                        toast.success("Product Successfully Created!"),
                        router.refresh()
                    )
            }
        } catch (error) {
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
            <Dialog
                open={
                    id ? openEditProductDialog : openProductDialog
                }
                onOpenChange={() => {
                    id ? setOpenEditProductDialog(false)
                        : (
                            setOpenProductDialog(false),
                            setProductFormData({
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
                            }),
                            setImage(null)
                        )
                }}
            >
                <DialogContent className="max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>{id ? "Edit Product" : "Add Product"}</DialogTitle>
                    </DialogHeader>
                    <form className="h-[400px] md:h-auto overflow-y-scroll md:overflow-hidden px-2" action={handleProductFrom}>
                        <div className="grid md:grid-cols-2 gap-2">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
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
                                <Label>Product Code</Label>
                                <Input
                                    type="text"
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

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Category</Label>
                                <Select
                                    value={productFormData.category}
                                    onValueChange={(value) => {
                                        setProductFormData((prevData) => ({
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
                                    value={productFormData.subCategory}
                                    onValueChange={(value) => {
                                        setProductFormData((prevData) => ({
                                            ...prevData,
                                            subCategory: value,
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a SubCategory" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Men">Men</SelectItem>
                                            <SelectItem value="Women">Women</SelectItem>
                                            <SelectItem value="Kids">Kids</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Price</Label>
                                <Input
                                    type="number"
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
                                <Label>Brand</Label>
                                <Select
                                    value={productFormData.brand}
                                    onValueChange={(value) => {
                                        setProductFormData((prevData) => ({
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
                                <Label>Images</Label>
                                <Input
                                    type="file"
                                    multiple
                                    onChange={(e) => { setImage(e.target.files) }}
                                />
                                <p className="text-end italic text-xs">(Multiple File Selected.)</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 items-center">
                            <div>
                                <Label>Size</Label>
                                <div className="flex items-center space-x-2">
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="1" value="S" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >S</label>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="2" value="M" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >M</label>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="3" value="L" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >L</label>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="4" value="XL" onChange={handleCheckboxChange} />
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >XL</label>
                                    </div>
                                    <div className="flex justify-center items-center gap-1">
                                        <Input type="checkbox" id="5" value="XXL" onChange={handleCheckboxChange} />
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

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Warranty</Label>
                                <Input
                                    type="text"
                                    value={productFormData.warranty}
                                    onChange={(e) => {
                                        setProductFormData({
                                            ...productFormData,
                                            warranty: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Delivery</Label>
                                <Input
                                    type="text"
                                    value={productFormData.delivery}
                                    onChange={(e) => {
                                        setProductFormData({
                                            ...productFormData,
                                            delivery: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Offers</Label>
                            <Textarea
                                value={productFormData.offers}
                                onChange={(e) => {
                                    setProductFormData({
                                        ...productFormData,
                                        offers: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div>
                            <Label>Descripation</Label>
                            <Textarea
                                value={productFormData.desc}
                                onChange={(e) => {
                                    setProductFormData({
                                        ...productFormData,
                                        desc: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <Button type="submit" className='mt-2'>Save</Button>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    );
}

export default ProductDialog;