'use client'

import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { useContext, useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { API_URL } from "@/env";


function Account() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const { userID } = useContext(GlobalContext)
    const [getUser, setGetUser] = useState(null)
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

    useEffect(() => {
        if (userID) {
            fetchUserData(userID)
        }
    }, [userID])

    function handleUserDialog(user){
        setOpen(true)
        setPersonalDetail({
            firstName: user.personalDetails.firstName,
            lastName:user.personalDetails.lastName,
            dob:user.personalDetails.dob,
            phone:user.personalDetails.phone,
            country:user.personalDetails.country,
            city:user.personalDetails.city,
            pincode:user.personalDetails.pincode,
            bankName:user.personalDetails.bankName,
            ifse:user.personalDetails.ifse,
            branch:user.personalDetails.branch,
            accountNo:user.personalDetails.accountNo,
        })
    }

    async function fetchUserData(userID) {
        try {

            const response = await axios.get(`${API_URL}/api/register/${userID}`, {
                headers: {
                    'Cache-Control': 'no-store',
                    'Authorization': `Bearer ${Cookies.get("token")}`,
                }
            })
            if (response.data.success === true) {
                setGetUser(response.data.getSingleUser)
            } else {
                toast.error("Something Went Wrong. Please Try Again.")
            }
        } catch (error) {
            console.log(error);
            toast.error("Bad Request")
            router.push('/')
        }
    }

    const handleDateSelect = (date) => {
        setPersonalDetail((prevState) => ({
            ...prevState,
            dob: date,
        }));
    }

    async function handlePersonalForm() {
        try {
            const response = await axios.put(`/api/register/${userID}`, personalDetail, {
                headers: {
                    'Cache-Control': 'no-store'
                }
            })
            if (response.data.success === true) {
                setOpen(false)
                toast.success("Personal Details Successfully Updated")
                router.refresh()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            setOpen(false)
            console.error(error)
            toast.error("Submitted Failed!")
        }
    }

    return (
        <>
            {
                getUser !== null ? (
                    <>
                        <div className="mx-4 mt-10">
                            <Navbar />

                            <div className="flex p-4 border-b mt-8">
                                <div className="w-3/4 mx-auto">

                                    <div className="flex items-center justify-between space-x-4 p-6 border-b">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src="https://imgs.search.brave.com/YeeNofMgM0wWesF9tBgTW0dg3pQ7Rq6VrQC8djCM0fg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4Lzc4LzM4LzI5/LzM2MF9GXzg3ODM4/Mjk4NV8zMVEzRXpl/WVNiSWJScmJBZjNC/clZmbTlqZFJ1ZURz/SS5qcGc"
                                                alt="Profile"
                                                className="w-20 h-20 rounded-full object-cover"
                                            />
                                            <div>
                                                <h1 className="text-xl font-bold">{getUser.fullName}</h1>
                                                <p className="text-gray-500">{getUser.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="text-orange-500 font-semibold hover:underline focus:outline-none"
                                            onClick={()=>{handleUserDialog(getUser)}}
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
                                                <p className="font-medium">{getUser.personalDetails.firstName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Last Name</p>
                                                <p className="font-medium">{getUser.personalDetails.lastName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Date of Birth</p>
                                                <p className="font-medium">{getUser.personalDetails.dob}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email Address</p>
                                                <p className="font-medium">{getUser.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Phone Number</p>
                                                <p className="font-medium">{getUser.personalDetails.phone}</p>
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
                                                <p className="font-medium">{getUser.personalDetails.country}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">City</p>
                                                <p className="font-medium">{getUser.personalDetails.city}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Postal Code</p>
                                                <p className="font-medium">{getUser.personalDetails.pincode}</p>
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
                                                <p className="font-medium">{getUser.personalDetails.bankName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">IFSE No.</p>
                                                <p className="font-medium">{getUser.personalDetails.ifse}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Branch</p>
                                                <p className="font-medium">{getUser.personalDetails.branch}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Account No.</p>
                                                <p className="font-medium">{getUser.personalDetails.accountNo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Footer />
                        </div>


                        {/* Dialog Content */}
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
                ) : (
                    <div className="flex flex-col h-screen justify-center items-center space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default Account;