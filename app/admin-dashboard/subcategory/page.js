'use client'

import AdminLeftbar from "@/app/component/Admin-Leftbar";
import Navbar from "@/app/component/Navbar";
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
import { useContext, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { GlobalContext } from "@/context";

function SubCategory() {
    const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false)
    const [subCategoryFormData, setSubCategoryFormData] = useState({
        subCategory: "",
        desc: "",
    })
    const { getSubCategory, setGetSubCategory} = useContext(GlobalContext)
  

    async function handleSubCategoryFrom() {
        try {
            const response = await axios.post('/api/subcategory', subCategoryFormData)
            if (response.data.success === true) {
                setOpenSubCategoryDialog(false)
                setSubCategoryFormData({
                    subCategory: "",
                    desc: "",
                })
                toast.success("SubCategory Successfully Created!")
                setGetSubCategory([...getSubCategory, response.data.newRecord])
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            setOpenSubCategoryDialog(false)
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }    

    async function handleSubCategoryDelete(id) {
        try {
            const response = await axios.delete(`/api/subcategory/${id}`)
            if (response.data.success === true) {
                toast.success("SubCategory Successfully Deleted!")
                setGetSubCategory(getSubCategory.filter(subCategory => subCategory._id !== id))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
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
                        <div>
                            <h1 className="text-center text-3xl font-semibold">SubCategory page</h1>
                            <Button className=" float-end" onClick={() => { setOpenSubCategoryDialog(true) }} >Add SubCategory</Button>
                        </div>
                        <div className="mt-4">
                            <Table>
                                <TableCaption>All SubCategory Data</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No.</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Descripation</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        getSubCategory && getSubCategory.length > 0 ? (
                                            getSubCategory.map((subCategory, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>{subCategory.subCategory}</TableCell>
                                                    <TableCell>{subCategory.desc}</TableCell>
                                                    <TableCell onClick={()=>{handleSubCategoryDelete(subCategory._id)}} ><Trash2 className="cursor-pointer" size={18} /></TableCell>
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
                open={openSubCategoryDialog}
                onOpenChange={() => {
                    setOpenSubCategoryDialog(false)
                    setSubCategoryFormData({
                        subCategory: "",
                        desc: "",
                    })
                }}
            >
                <DialogContent className="max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Add SubCategory</DialogTitle>
                    </DialogHeader>
                    <form action={handleSubCategoryFrom}>
                        <div className="grid gap-2">
                            <div>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    value={subCategoryFormData.subCategory}
                                    onChange={(e) => {
                                        setSubCategoryFormData({
                                            ...subCategoryFormData,
                                            subCategory: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <Label>Descripation</Label>
                                <Textarea
                                    value={subCategoryFormData.desc}
                                    onChange={(e) => {
                                        setSubCategoryFormData({
                                            ...subCategoryFormData,
                                            desc: e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <Button type="submit" className='mt-2' disabled={!subCategoryFormData.subCategory} >Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default SubCategory;