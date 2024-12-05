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
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminHeader from "@/app/component/AdminHeader";
import { API_URL } from "@/env";


function Category() {
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false)
    const [categoryFormData, setCategoryFormData] = useState({
        category: "",
        desc: "",
    })
    const [image, setImage] = useState(null)
    const [getCategory,setGetCategory] = useState([])
    const router = useRouter()

    useEffect(()=>{

        async function fetchCategoryData() {
            try {        
                const response = await axios.get(`${API_URL}/api/category`, {
                    headers: {
                        'Cache-Control': 'no-store'
                    }
                })
                if(response.data.success === true){
                    setGetCategory(response.data.getAllCategory)
                }else{
                    console.log(response.data.message)
                }        
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategoryData()
    },[])


    async function handleCategoryFrom() {
        try {
            const fdata = new FormData()
            fdata.append("category", categoryFormData.category)
            fdata.append("desc", categoryFormData.desc)
            fdata.append("image", image)
            const response = await axios.post('/api/category', fdata,{
                headers:{
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                setOpenCategoryDialog(false)
                setCategoryFormData({
                    category: "",
                    desc: "",
                })
                setImage(null)
                toast.success("Category Successfully Created!")
                router.refresh()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            setOpenCategoryDialog(false)
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }    

    async function handleCategoryDelete(id) {
        try {
            const response = await axios.delete(`/api/category/${id}`,{
                headers:{
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                toast.success("Category Successfully Deleted!")
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
                            <h1 className="text-center text-3xl font-semibold">Category page</h1>
                            <Button className=" float-end" onClick={() => { setOpenCategoryDialog(true) }} >Add Category</Button>
                        </div>
                        <div className="mt-4">
                            <Table>
                                <TableCaption>All Category Data</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No.</TableHead>
                                        <TableHead>Category Name</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Descripation</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        getCategory && getCategory.length > 0 ? (
                                            getCategory.map((category, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>{category.category}</TableCell>
                                                    <TableCell><img src={`/category/${category.filename}`} alt={category.filename} className="w-[100px]" /></TableCell>
                                                    <TableCell>{category.desc}</TableCell>
                                                    <TableCell onClick={()=>{handleCategoryDelete(category._id)}} ><Trash2 className="cursor-pointer" size={18} /></TableCell>
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
                open={openCategoryDialog}
                onOpenChange={() => {
                    setOpenCategoryDialog(false)
                    setCategoryFormData({
                        category: "",
                        desc: "",
                    })
                    setImage(null)
                }}
            >
                <DialogContent className="max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                    </DialogHeader>
                    <form action={handleCategoryFrom}>
                        <div className="grid gap-2">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    value={categoryFormData.category}
                                    onChange={(e) => {
                                        setCategoryFormData({
                                            ...categoryFormData,
                                            category: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Descripation</Label>
                                <Textarea
                                    value={categoryFormData.desc}
                                    onChange={(e) => {
                                        setCategoryFormData({
                                            ...categoryFormData,
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
                        <Button type="submit" className='mt-2' disabled={!categoryFormData.category || !image} >Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Category;