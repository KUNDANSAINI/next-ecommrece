'use client'

import AdminLeftbar from "@/components/admin/Admin-Leftbar";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import { IconPencil, IconX } from "@tabler/icons-react";
import Loading from "@/components/Loading";
import { AddCategory, DeleteCategory, UpdateCategory } from "@/action";


function Category({getCategory}) {
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false)
    const [categoryFormData, setCategoryFormData] = useState({
        category: "",
        type: "",
    })
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)
    const [filename, setFilename] = useState(null)
    // const [getCategory, setGetCategory] = useState([])
    const [filteredCategory, setFilteredCategory] = useState([])
    const [edit, setEdit] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPages = 5
    const lastPage = currentPage * recordPerPages
    const firstPage = lastPage - recordPerPages
    const records = filteredCategory.slice(firstPage, lastPage)
    const totalPages = Math.ceil(filteredCategory.length / recordPerPages)
    const [searchType, setSearchType] = useState("")
    const [searchName, setSearchName] = useState("")

    async function handleImage(e) {
        e.preventDefault()
        try {
            if (!file) {
                return toast.error("File Not Selected!")
            }
            const fdata = new FormData()
            fdata.append("file", file)

            const response = await axios.post('/api/upload-category-image', fdata)
            if (response.data.success === true) {
                setFilename(response.data.imageName)
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("Uploading Error:", error);
        }
    }

    async function handleCategoryFrom() {
        try {
            const { category, type } = categoryFormData
            const data = { category, type, filename }
            const response = edit ? await UpdateCategory(edit, data, "/admin-dashboard/category")
                : await AddCategory(data, "/admin-dashboard/category")
            if (response.success === true) {
                setOpenCategoryDialog(false)
                setCategoryFormData({
                    category: "",
                    type: "",
                })
                setImage(null)
                setFile(null)
                setFilename(null)
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            setOpenCategoryDialog(false)
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    async function handleCategoryDelete(e,id) {
        e.preventDefault()
        if(!id){
            toast.error("Invalid Category ID!")
        }

        try {
            const response = await DeleteCategory(id, "//admin-dashboard/category")
            if (response.success === true) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please Try Again!")
            console.log("category deleting error:", error);
        }
    }

    function handleRenderImage(e) {
        const file = e.target.files[0]
        if (file) {
            setFile(file)
            const preview = URL.createObjectURL(file)
            setImage(preview);
        }
    }

    function handleRemovePreview() {
        setImage(null)
        setFilename(null)
    }

    function EditCategory(category) {
        setOpenCategoryDialog(true)
        setEdit(category._id)
        setCategoryFormData({
            category: category.category,
            type: category.type
        })
        setImage(category.filename)
        setFilename(category.filename)
    }

    useEffect(() => {
        filterProductData()
    }, [getCategory, searchType, searchName])

    function filterProductData() {
        let filtered = getCategory;

        // Search By Name
        if (searchName) {
            filtered = filtered.filter(item => item.category.toLowerCase().includes(searchName.trim().toLowerCase()));
        }

        // Search By Type
        if (searchType) {
            filtered = filtered.filter(item => item.type.toLowerCase() === searchType.toLowerCase());
        }

        setFilteredCategory(filtered)
    }

    // Next page handler
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Previous page handler
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Page change handler
    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="my-10 mx-4">
                <AdminHeader />
                <div className="flex mt-8">
                    <div className="hidden md:block md:w-[450px]">
                        <AdminLeftbar />
                    </div>
                    <div className="flex flex-col w-full px-1 md:px-4 mt-4">
                        <div className="grid gap-4">
                            <h1 className="text-center text-3xl font-semibold">Category page</h1>
                            <p><Button className=" float-end mr-2" onClick={() => { setOpenCategoryDialog(true) }} >Add Category</Button></p>
                            <div className="p-4 rounded-lg shadow-md space-y-1">
                                <h4 className="text-lg font-semibold">Filter</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        type="text"
                                        placeholder="Search By Name"
                                        value={searchName}
                                        onChange={(e) => { setSearchName(e.target.value) }}
                                    />
                                    <select
                                        value={searchType}
                                        onChange={(e) => { setSearchType(e.target.value) }}
                                        className="border h-10 px-2 rounded-lg text-sm"
                                    >
                                        <option value="">Search By Category</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            {
                                loading ? (
                                    <Loading />
                                ) : (
                                    <Table>
                                        <TableCaption>All Category Data</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">No.</TableHead>
                                                <TableHead>Category Name</TableHead>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Edit</TableHead>
                                                <TableHead>Delete</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                records && records.length > 0 ? (
                                                    records.map((category, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                                            <TableCell>{category.category}</TableCell>
                                                            <TableCell>
                                                                <div className="w-[80px] h-[80px] grid items-center overflow-hidden">
                                                                    <img src={category.filename} alt={category.filename} className="object-cover" />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{category.type}</TableCell>
                                                            <TableCell><IconPencil stroke={2} className="cursor-pointer" onClick={() => { EditCategory(category) }} /></TableCell>
                                                            <TableCell onClick={(e) => { handleCategoryDelete(e,category._id) }} ><Trash2 className="cursor-pointer" size={18} /></TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className="text-center">No Record Found!</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                )
                            }
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-6 mr-2">
                            <div></div>
                            <div className="flex items-center space-x-4">
                                <Button
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>

                                {/* Display page numbers */}
                                <span className="flex space-x-2">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <span
                                            key={index + 1}
                                            className={`px-2 py-1 rounded-md cursor-pointer text-sm ${currentPage === index + 1
                                                ? 'bg-blue-500 font-bold'
                                                : ' hover:bg-blue-500'
                                                } transition duration-200 ease-in-out`}
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </span>
                                    ))}
                                </span>

                                <Button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </div>
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
                        type: "",
                    })
                    setImage(null)
                    setFile(null)
                    setFilename(null)
                    setEdit(null)
                }}
            >
                <DialogContent className="max-w-[400px] rounded-lg md:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>
                            {
                                edit ? "Edit Category" : "Add Category"
                            }
                        </DialogTitle>
                    </DialogHeader>
                    <form action={handleCategoryFrom}>
                        <div className="grid gap-4">
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Enter Category Name"
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
                                <select
                                    className="w-full border rounded-lg px-2 h-10"
                                    value={categoryFormData.type}
                                    onChange={(e) => {
                                        setCategoryFormData({
                                            ...categoryFormData,
                                            type: e.target.value
                                        })
                                    }}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                </select>
                            </div>
                            <div>
                                <div className="flex gap-4">
                                    <Input
                                        type="file"
                                        onChange={handleRenderImage}
                                    />
                                    <Button onClick={handleImage} disabled={!file} >Upload</Button>
                                </div>
                            </div>
                            {
                                image && (
                                    <div className="relative w-[140px] h-[140px] p-2 border rounded-lg grid items-center overflow-hidden ">
                                        <img
                                            src={image}
                                            alt="Brand Image"
                                            className="object-cover rounded-lg"
                                        />
                                        <span
                                            className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex justify-center items-center cursor-pointer p-1"
                                            onClick={handleRemovePreview}
                                        >
                                            <IconX stroke={2} />
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        <Button type="submit" className='mt-2' disabled={!categoryFormData.category || !categoryFormData.type || !image} >
                            {
                                edit ? "Edit" : "Add"
                            }
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Category;