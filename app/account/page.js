'use client'

import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useContext, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";


function Account() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { userID } = useContext(GlobalContext)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [user, setUser] = useState("")
    const [personalDetail, setPersonalDetail] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        country: "",
        city: "",
        pincode: "",
        bankName: "",
        ifse: "",
        branch: "",
        accountNo: ""
    })

    const handleDateSelect = (date) => {
        setPersonalDetail((prevState) => ({
            ...prevState,
            dob: date,
        }));
    }

    useEffect(() => {
        if (userID) {
            fetchUserData(userID)
        }
    }, [userID])

    async function fetchUserData(userID) {
        try {

            const response = await axios.get(`http://localhost:3000/api/register/${userID}`, {
                headers: {
                    'Cache-Control': 'no-store',
                    'Authorization': `Bearer ${Cookies.get("token")}`,
                }
            })
            if (response.data.success === true) {
                const { personalDetails } = response.data.getSingleUser;

                setPersonalDetail({
                    firstName: personalDetails.firstName || "",
                    lastName: personalDetails.lastName || "",
                    dob: personalDetails.dob || "",
                    phone: personalDetails.phone || "",
                    country: personalDetails.country || "",
                    city: personalDetails.city || "",
                    pincode: personalDetails.pincode || "",
                    bankName: personalDetails.bankName || "",
                    ifse: personalDetails.ifse || "",
                    branch: personalDetails.branch || "",
                    accountNo: personalDetails.accountNo || ""
                });
                setFullName(response.data.getSingleUser.fullName)
                setEmail(response.data.getSingleUser.email)
            } else {
                toast.error("Something Went Wrong. Please Try Again.")
            }
        } catch (error) {
            console.log(error);
            toast.error("Bad Request")
            router.push('/')
        }
    }

    async function handlePersonalForm() {
        try {
            const response = await axios.put(`/api/register/${userID}`, personalDetail)
            if (response.data.success === true) {
                setOpen(false)
                toast.success("Personal Details Successfully Updated")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Submitted Failed!")
            router.push('/account')
        }
    }


    return (
        <>
            <div className="border rounded-3xl mx-12 my-4 bg-[#F0F1F0] px-4 py-8">
                <Navbar />

                <div className="flex p-4 border-b">
                    <div className="w-3/4 mx-auto">

                        <div className="flex items-center justify-between space-x-4 p-6 border-b">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="https://imgs.search.brave.com/YeeNofMgM0wWesF9tBgTW0dg3pQ7Rq6VrQC8djCM0fg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4Lzc4LzM4LzI5/LzM2MF9GXzg3ODM4/Mjk4NV8zMVEzRXpl/WVNiSWJScmJBZjNC/clZmbTlqZFJ1ZURz/SS5qcGc"
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                                <div>
                                    <h1 className="text-xl font-bold">{fullName}</h1>
                                    <p className="text-gray-500">{email}</p>
                                </div>
                            </div>
                            <button
                                className="text-orange-500 font-semibold hover:underline focus:outline-none"
                                onClick={() => { setOpen(!open) }}
                            >
                                Edit
                            </button>
                        </div>

                        {/* Personal Information */}
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Personal Information</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">First Name</p>
                                    <p className="font-medium">{personalDetail.firstName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Last Name</p>
                                    <p className="font-medium">{personalDetail.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                    <p className="font-medium">{personalDetail.dob}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="font-medium">{email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="font-medium">{personalDetail.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="p-6 border-t">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Address</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Country</p>
                                    <p className="font-medium">{personalDetail.country}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">City</p>
                                    <p className="font-medium">{personalDetail.city}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Postal Code</p>
                                    <p className="font-medium">{personalDetail.pincode}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bank Details Information */}
                        <div className="p-6 border-t">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Bank Details</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Bank Name</p>
                                    <p className="font-medium">{personalDetail.bankName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">IFSE No.</p>
                                    <p className="font-medium">{personalDetail.ifse}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Branch</p>
                                    <p className="font-medium">{personalDetail.branch}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Account No.</p>
                                    <p className="font-medium">{personalDetail.accountNo}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            {/* Personal details Dialog Content */}
            <Dialog
                open={open}
                onOpenChange={() => {
                    setOpen(false)
                }}
            >
                <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Personal Information</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">

                        <div className="grid gap-2">
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                value={personalDetail.firstName}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        firstName: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                value={personalDetail.lastName}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        lastName: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>DOB</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] justify-start text-left font-normal",
                                            !personalDetail.dob && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {personalDetail.dob ? format(personalDetail.dob, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={personalDetail.dob}
                                        onSelect={handleDateSelect}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="grid gap-2">
                            <Label>Phone No.</Label>
                            <Input
                                type="number"
                                value={personalDetail.phone}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        phone: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Country</Label>
                            <Input
                                type="text"
                                value={personalDetail.country}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        country: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>City</Label>
                            <Input
                                type="text"
                                value={personalDetail.city}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        city: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>PinCode</Label>
                            <Input
                                type="number"
                                value={personalDetail.pincode}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        pincode: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Bank Name</Label>
                            <Input
                                type="text"
                                value={personalDetail.bankName}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        bankName: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>IFSE No.</Label>
                            <Input
                                type="text"
                                value={personalDetail.ifse}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        ifse: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Branch</Label>
                            <Input
                                type="text"
                                value={personalDetail.branch}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        branch: e.target.value
                                    })
                                }}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Account Number</Label>
                            <Input
                                type="text"
                                value={personalDetail.accountNo}
                                onChange={(e) => {
                                    setPersonalDetail({
                                        ...personalDetail,
                                        accountNo: e.target.value
                                    })
                                }}
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handlePersonalForm}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Account;