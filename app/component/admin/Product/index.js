'use client'

import AdminLeftbar from "@/app/component/Admin-Leftbar";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import axios from "axios";
import { toast } from "react-toastify";
import { Ellipsis, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import AdminHeader from "../../AdminHeader";


function ProductPage({getProduct,getBrands,getCategory,getSubCategory}) {
    const [openProductDialog, setOpenProductDialog] = useState(false)
    const [productFormData, setProductFormData] = useState({
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
    const [image, setImage] = useState(null)
    const router = useRouter()

    const copyToClipboard = (id) => {
        navigator.clipboard.writeText(id).then(() => {
            toast.success('Product ID copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

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
            const response = await axios.post('/api/product', fdata)
            if (response.data.success === true) {
                setOpenProductDialog(false)
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
                })
                setImage(null)
                toast.success("Product Successfully Created!")
                router.refresh()
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please try Again!")
        }
    }

    async function handleProductDelete(id) {
        try {
            const response = await axios.delete(`/api/product/${id}`,{
                headers:{
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                toast.success("Product Successfully Deleted!")
                router.refresh()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }


    return (
        <>
            <div className="border rounded-3xl mx-12 my-4 h-screen bg-[#F0F1F0] p-4">
            <AdminHeader />
                <div className="flex mt-4">
                    <div className="hidden md:block md:w-1/4 lg:w-1/6">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full mx-4 mt-4">
                        <div>
                            <h1 className="text-center text-3xl font-semibold">Product page</h1>
                            <Button className=" float-end" onClick={() => { setOpenProductDialog(true) }} >Add Product</Button>
                        </div>
                        <div className="mt-4">
                            <Table>
                                <TableCaption>All Product Data.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No.</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Product Name</TableHead>
                                        <TableHead>HNS No.</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Brand</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        getProduct && getProduct.length > 0 ? (
                                            getProduct.map((product, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell><img src={`/product/${product.filename[0].name}`} alt={product.filename[0].name} className="w-[100px]" /></TableCell>
                                                    <TableCell>{product._id}</TableCell>
                                                    <TableCell>{product.productName}</TableCell>
                                                    <TableCell>{product.hns}</TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell>₹ {product.price}</TableCell>
                                                    <TableCell>{product.brand}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Trash2 size={18} className="cursor-pointer" onClick={() => { handleProductDelete(product._id) }} />
                                                            <HoverCard>
                                                                <HoverCardTrigger asChild>
                                                                    <Ellipsis size={18} className="cursor-pointer" />
                                                                </HoverCardTrigger>
                                                                <HoverCardContent className="flex flex-col w-56 mr-20 gap-2">
                                                                    <Link href={`/admin-dashboard/product/${product._id}`}><h3 className="text-center cursor-pointer">Show Details</h3></Link>
                                                                    <h3 className="text-center cursor-pointer" onClick={() => { copyToClipboard(product._id) }} >Copy Product ID</h3>
                                                                </HoverCardContent>
                                                            </HoverCard>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6}>No Product Found</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>


            {/* Dialog Start */}

            <Dialog
                open={openProductDialog}
                onOpenChange={() => {
                    setOpenProductDialog(false)
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
                    })
                    setImage(null)
                }}
            >
                <DialogContent className="max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
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
            </Dialog>
        </>
    );
}

export default ProductPage;