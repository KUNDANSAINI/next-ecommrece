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
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AdminHeader from "@/components/admin/AdminHeader";
import { API_URL } from "@/env";
import { IconPencil, IconX } from "@tabler/icons-react";
import Loading from "@/components/Loading";

function Brand() {
    const [openBrandDialog, setOpenBrandDialog] = useState(false)
    const [brandFormData, setBrandFormData] = useState({
        brand: "",
        desc: "",
    })
    const [getBrands, setGetBrand] = useState([])
    const [filteredBrands, setFilteredBrands] = useState([])
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchName, setSearchName] = useState("")
    const [image, setImage] = useState(null)
    const [filename, setFilename] = useState(null)
    const [editId, setEditId] = useState(null)
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const recordPerPages = 5
    const lastPage = currentPage * recordPerPages
    const firstPage = lastPage - recordPerPages
    const records = filteredBrands.slice(firstPage, lastPage)
    const totalPages = Math.ceil(filteredBrands.length / recordPerPages)

    useEffect(() => {

        async function fetchBrandData() {
            try {
                setLoading(true)
                const response = await axios.get(`${API_URL}/api/brand`, {
                    headers: {
                        'Cache-Control': 'no-store'
                    }
                })
                if (response.data.success === true) {
                    setGetBrand(response.data.getAllBrand)
                } else {
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchBrandData()
    }, [])

    async function handleBrandFrom() {
        try {
            const { brand, desc } = brandFormData
            const data = { brand, desc, filename }
            const response = editId ? await axios.put(`/api/brand/${editId}`, data)
                : await axios.post('/api/brand', data)
            if (response.data.success === true) {
                setOpenBrandDialog(false)
                setBrandFormData({
                    brand: "",
                    desc: "",
                })
                setImage(null)
                setFile(null)
                setFilename(null)
                toast.success(response.data.message)
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
            const response = await axios.delete(`/api/brand/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.data.success === true) {
                const data = getBrands.filter((value)=>{
                    return value._id !== id
                })
                setGetBrand(data)
                toast.success("Brand Successfully Deleted!")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Something Went Wrong. Please Try Again!")
        }
    }

    function EditBrand(brand) {
        setOpenBrandDialog(true)
        setEditId(brand._id)
        setBrandFormData({
            brand: brand.brand,
            desc: brand.desc
        })
        setImage(brand.filename)
        setFilename(brand.filename)
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

    async function handleImage(e) {
        e.preventDefault()
        try {
            if (!file) {
                return toast.error("File Not Selected!")
            }
            const fdata = new FormData()
            fdata.append("file", file)

            const response = await axios.post('/api/upload-brand-image', fdata)
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

    useEffect(() => {
        filterProductData()
    }, [getBrands, searchName])

    function filterProductData() {
        let filtered = getBrands;

        // Search By Name
        if (searchName) {
            filtered = filtered.filter(item => item.brand.toLowerCase().includes(searchName.trim().toLowerCase()));
        }

        setFilteredBrands(filtered)
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
                            <h1 className="text-center text-3xl font-semibold">Brand page</h1>
                            <p><Button className=" float-end mr-2" onClick={() => { setOpenBrandDialog(true) }} >Add Brand</Button></p>
                            <div className="p-4 rounded-lg shadow-md space-y-1">
                                <h4 className="text-lg font-semibold">Filter</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Input
                                        type="text"
                                        placeholder="Search By Name"
                                        value={searchName}
                                        onChange={(e) => { setSearchName(e.target.value) }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            {
                                loading ? (
                                    <Loading />
                                ) : (
                                    <Table>
                                        <TableCaption>All Brand Data.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">No.</TableHead>
                                                <TableHead>Brand Name</TableHead>
                                                <TableHead>Image</TableHead>
                                                <TableHead>Descripation</TableHead>
                                                <TableHead>Edit</TableHead>
                                                <TableHead>Delete</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                records && records.length > 0 ? (
                                                    records.map((brand, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                                            <TableCell>{brand.brand}</TableCell>
                                                            <TableCell>
                                                                <div className="w-[100px] h-[100px] grid items-center overflow-hidden ">
                                                                    <img src={brand.filename} alt={brand.filename} className="object-cover" />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>{brand.desc}</TableCell>
                                                            <TableCell><IconPencil stroke={2} className="cursor-pointer" onClick={() => { EditBrand(brand) }} /></TableCell>
                                                            <TableCell className="text-right" onClick={() => { handleBrandDelete(brand._id) }} ><Trash2 size={18} className="cursor-pointer" /></TableCell>
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
                open={openBrandDialog}
                onOpenChange={() => {
                    setOpenBrandDialog(false)
                    setBrandFormData({
                        brand: "",
                        desc: "",
                    })
                    setImage(null)
                    setEditId(null)
                }}
            >
                <DialogContent className="max-w-[400px] rounded-lg md:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>
                            {
                                editId ? "Edit Brand" : "Add Brand"
                            }
                        </DialogTitle>
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
                                    <div className="relative w-[140px] h-[140px] p-2 border rounded-lg grid items-center overflow-hidden">
                                        <img
                                            src={image}
                                            alt="Category Image"
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
                        <Button type="submit" className='mt-2' disabled={!image || !brandFormData.brand} >
                            {
                                editId ? "Edit" : "Add"
                            }
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Brand;