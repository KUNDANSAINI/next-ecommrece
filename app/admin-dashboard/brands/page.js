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
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminHeader from "@/app/component/AdminHeader";
import { API_URL } from "@/env";

function Brand() {
    const [openBrandDialog, setOpenBrandDialog] = useState(false)
    const [brandFormData, setBrandFormData] = useState({
        brand: "",
        desc: "",
    })
    const [image, setImage] = useState(null)
    const [getBrands,setGetBrand] = useState([])
    const router = useRouter()

    useEffect(()=>{

        async function fetchBrandData() {
            try {
                const response = await axios.get(`${API_URL}/api/brand`, {
                    headers: {
                        'Cache-Control': 'no-store'
                    }
                })
                if(response.data.success === true){
                    setGetBrand(response.data.getAllBrand)
                }else{
                    console.log(response.data.message)
                }        
            } catch (error) {
                console.log(error)
            }
        }

        fetchBrandData()
    },[])

    async function handleBrandFrom() {
        try {
            const fdata = new FormData()
            fdata.append("brand", brandFormData.brand)
            fdata.append("desc", brandFormData.desc)
            fdata.append("image", image)
            const response = await axios.post('/api/brand', fdata,{
                headers:{
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                setOpenBrandDialog(false)
                setBrandFormData({
                    brand: "",
                    desc: "",
                })
                setImage(null)
                toast.success("Brand Successfully Created!")
                router.refresh()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            setOpenBrandDialog(false)
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    async function handleBrandDelete(id) {
        try {
            const response = await axios.delete(`/api/brand/${id}`,{
                headers:{
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                toast.success("Brand Successfully Deleted!")
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
                            <h1 className="text-center text-3xl font-semibold">Brand page</h1>
                            <Button className=" float-end" onClick={() => { setOpenBrandDialog(true) }} >Add Brand</Button>
                        </div>
                        <div className="mt-4">
                            <Table>
                                <TableCaption>All Brand Data.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No.</TableHead>
                                        <TableHead>Brand Name</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Descripation</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        getBrands && getBrands.length > 0 ? (
                                            getBrands.map((brand, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>{brand.brand}</TableCell>
                                                    <TableCell><img src={`/brand/${brand.filename}`} alt={brand.filename} className="w-[100px]" /></TableCell>
                                                    <TableCell>{brand.desc}</TableCell>
                                                    <TableCell className="text-right" onClick={() => { handleBrandDelete(brand._id) }} ><Trash2 size={18} className="cursor-pointer" /></TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-xl font-semibold">No Record Found!</TableCell>
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
                open={openBrandDialog}
                onOpenChange={() => {
                    setOpenBrandDialog(false)
                    setBrandFormData({
                        brand: "",
                        desc: "",
                    })
                    setImage(null)
                }}
            >
                <DialogContent className="max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Add Brand</DialogTitle>
                    </DialogHeader>
                    <form action={handleBrandFrom}>
                        <div className="grid gap-2">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    value={brandFormData.brand}
                                    onChange={(e) => {
                                        setBrandFormData({
                                            ...brandFormData,
                                            brand: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Descripation</Label>
                                <Textarea
                                    value={brandFormData.desc}
                                    onChange={(e) => {
                                        setBrandFormData({
                                            ...brandFormData,
                                            desc: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Image</Label>
                                <Input
                                    type="file"
                                    onChange={(e) => { setImage(e.target.files[0]) }}
                                />
                            </div>
                        </div>
                        <Button type="submit" className='mt-2' disabled={!image || !brandFormData.brand} >Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Brand;