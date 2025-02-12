'use client'

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GlobalContext } from "@/context";
import { Button } from "@/components/ui/button"
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
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/includes/Footer";
import { CreateProfile, fetchProfile, SingleUser, UpdateProfile } from "@/action";
import AccountLoader from "@/components/Loader/AccountLoader";
import axios from "axios";


function Account() {
    const router = useRouter()
    const { userID } = useContext(GlobalContext)
    const [personalDetail, setPersonalDetail] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        address: "",
        pincode: "",
        bankName: "",
        ifse: "",
        branch: "",
        accountNo: ""
    })
    const [getUser, setGetUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isEditID, setIsEditID] = useState(null)
    const [image, setImage] = useState(null)
    const [filename, setFilename] = useState(null)

    useEffect(() => {
        if (userID) {
            fetchData()
        }
    }, [userID])

    async function fetchData() {
        if (!userID) {
            router.push('/login')
            return toast.error("You are not login. please login in again ?")
        }
        try {
            setLoading(true)
            const [getProfile, getUser] = await Promise.all([
                fetchProfile(userID),
                SingleUser(userID)
            ]);

            if (getProfile.success === true && getUser.success === true) {
                setPersonalDetail({
                    firstName: getProfile.data.firstName,
                    lastName: getProfile.data.lastName,
                    dob: getProfile.data.dob,
                    phone: getProfile.data.phone,
                    address: getProfile.data.address,
                    pincode: getProfile.data.pincode,
                    bankName: getProfile.data.bankName,
                    ifse: getProfile.data.ifse,
                    branch: getProfile.data.branch,
                    accountNo: getProfile.data.accountNo,
                })
                setFilename(getProfile.data.filename)
                setGetUser(getUser.data)
                setIsEditID(getProfile.data._id)
            } else if (getProfile.success === false && getUser.success === true) {
                setGetUser(getUser.data)
                setIsEditID(null)
            }
        } catch (error) {
            console.log("Fetching Error:", error);
        } finally {
            setLoading(false)
        }
    }

    function handleDivClick() {
        document.getElementById("profile-file").click()
    }

    async function handleImage(e) {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            if (!file) {
                return toast.error("File Not Selected!")
            }
            if (file) {
                const preview = URL.createObjectURL(file)
                setImage(preview);
            }
            const fdata = new FormData()
            fdata.append("file", file)

            const response = await axios.post('/api/upload-profile-image', fdata)
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

    function handleMobileInput(e) {
        let mobile = e.target.value;
        if (mobile.length === 1 && !/^[6-9]$/.test(mobile)) {
            return;
        }
        if (!/^\d{0,10}$/.test(mobile)) return;
        setPersonalDetail((prev) => ({
            ...prev,
            phone: mobile
        }));
    }

    const handlePincodeInput = (e) => {
        let pin = e.target.value;
        if (/^\d*$/.test(pin)) {
            setPersonalDetail((prev) => ({
                ...prev,
                pincode: pin
            }));
        }
    };

    function validateIFSC(ifsc) {
        const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        return regex.test(ifsc);
    }

    function validateAccountNumber(accountNo) {
        const regex = /^[0-9]{9,18}$/; // Only numbers, length 9-18
        return regex.test(accountNo);
    }

    const handleDateSelect = (date) => {
        setPersonalDetail((prevState) => ({
            ...prevState,
            dob: date,
        }));
    }

    async function handlePersonalForm(e) {
        e.preventDefault()
        const { firstName, lastName, dob, phone, pincode, address, bankName, ifse, branch, accountNo } = personalDetail
        if (!userID) {
            router.push('/login')
            return toast.error("You are not login. please login in again ?")
        }
        if (!phone || phone.length !== 10) {
            return toast.error("Please enter your phone number.")
        }

        if (!address) {
            return toast.error("Please enter your address.")
        }

        if (!pincode) {
            return toast.error("Please enter your pin code.")
        }

        if (!bankName) {
            return toast.error("Please enter your bank name.")
        }

        if (!ifse) {
            return toast.error("Please enter your bank name.")
        }

        if (!validateIFSC(ifse)) {
            return toast.error("Invalid ifsc number.")
        }

        if (!branch) {
            return toast.error("Please enter your branch name.")
        }

        if (!accountNo) {
            return toast.error("Please enter your account number.")
        }

        if (!validateAccountNumber(accountNo)) {
            return toast.error("Invalid account number.")
        }

        try {
            const data = { firstName, lastName, dob, phone, address, pincode, bankName, ifse, branch, accountNo, userID, filename }
            const updatedata = { firstName, lastName, dob, phone, address, pincode, bankName, ifse, branch, accountNo, filename }
            const response = isEditID !== null ? await UpdateProfile(updatedata, isEditID, '/account')
                : await CreateProfile(data, '/account')
            if (response.success === true) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Submission Failed!")
        }
    }

    return (
        <>
            <div className="mx-4 mt-10">
                <Navbar />

                <div className="flex p-4 border-b mt-8 w-full justify-center items-center">
                    {
                        !getUser ? (
                            <AccountLoader />
                        ) : (
                            <div className="flex w-5/6 gap-4">
                                <div className="w-1/4 p-6 border rounded-xl space-y-4">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <input
                                            type="file"
                                            id="profile-file"
                                            className="hidden"
                                            onChange={handleImage}
                                        />
                                        {
                                            image ? (
                                                <img
                                                    src={image}
                                                    alt="Profile"
                                                    className="w-20 h-20 rounded-full object-cover border"
                                                />
                                            ) : filename ? (
                                                <img
                                                    src={filename}
                                                    alt="Profile"
                                                    className="w-20 h-20 rounded-full object-cover border"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full border flex items-center justify-center text-2xl font-bold">
                                                    {getUser.fullName?.charAt(0).toUpperCase()}
                                                </div>
                                            )
                                        }
                                        <Button variant="link" onClick={handleDivClick} >Change Profile</Button>
                                    </div>

                                    <div className="text-center">
                                        <h1 className="text-xl font-bold">{getUser.fullName}</h1>
                                        <p className="text-gray-500">{getUser.email}</p>
                                    </div>
                                </div>

                                <div className="w-3/4 border rounded-xl">
                                    {/* Personal Information */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold">Personal Information</h2>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
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
                                            <div>
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
                                            <div className="flex flex-col gap-2.5">
                                                <Label>DOB</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "justify-start text-left font-normal",
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
                                            <div>
                                                <Label>Phone No.</Label>
                                                <Input
                                                    type="text"
                                                    maxLength={10}
                                                    value={personalDetail.phone}
                                                    onChange={handleMobileInput}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Information */}
                                    <div className="p-6 border-t">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold">Address Information</h2>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Address</Label>
                                                <Input
                                                    type="text"
                                                    value={personalDetail.address}
                                                    onChange={(e) => {
                                                        setPersonalDetail({
                                                            ...personalDetail,
                                                            address: e.target.value
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label>PinCode</Label>
                                                <Input
                                                    type="text"
                                                    value={personalDetail.pincode}
                                                    maxLength={6}
                                                    onChange={handlePincodeInput}
                                                />
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
                                            <div>
                                                <Label>IFSE No.</Label>
                                                <Input
                                                    type="text"
                                                    maxLength={11}
                                                    value={personalDetail.ifse}
                                                    onChange={(e) => {
                                                        setPersonalDetail({
                                                            ...personalDetail,
                                                            ifse: e.target.value.toUpperCase()
                                                        })
                                                    }}
                                                />
                                            </div>
                                            <div>
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
                                            <div>
                                                <Label>Account Number</Label>
                                                <Input
                                                    type="text"
                                                    maxLength={18}
                                                    inputMode="numeric"
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
                                    </div>
                                    <div className="text-center mb-4">
                                        <Button type="submit" onClick={handlePersonalForm}>
                                            {
                                                isEditID !== null ? "Update Profile" : "Create Profile"
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Account;