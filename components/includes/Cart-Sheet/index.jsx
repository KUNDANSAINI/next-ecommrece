'use client'

import { FetchCart } from "@/action"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"
import axios from "axios"
import { ArrowRight, IndianRupee } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"

export function CartSheet({ cartSheetOpen, setCartSheetOpen }) {
    const userID = useSelector((state) => state.auth.user)
    const [cartItems, setCartItems] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function fetchCartItems(userID) {
            if (!userID) {
                router.push('/login')
                return toast.error("You are not login. please login in again ?")
            }
            try {
                setLoading(true)
                const response = await FetchCart(userID)
                if (response.success === true) {
                    setCartItems(response.getCartProduct)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        if (userID && cartSheetOpen) {
            fetchCartItems(userID)
        }
    }, [userID, cartSheetOpen])

    async function handleRemoveItem(id) {
        try {
            if (!id) {
                toast.error("Invalid ID")
            }
            const response = await axios.delete(`/api/cart/${id}`)
            if (response.data.success === true) {
                const data = cartItems.filter((item) => {
                    return item._id !== id
                })
                setCartItems(data)
                toast.success("Item Successfully Remove")
            }
        } catch (error) {
            console.error("deleteing Error", error);
            toast.error("Bad Request!")
        }
    }

    return (
        <Sheet
            open={cartSheetOpen}
            onOpenChange={() => { setCartSheetOpen(false) }}
        >
            <SheetContent className="flex flex-col justify-between">
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className="overflow-y-auto">
                                {
                                    cartItems && cartItems.length > 0 ? (
                                        cartItems.map((item, index) => (
                                            <Card className="flex gap-4 p-4 mt-4" key={index}>
                                                <div>
                                                    <Image width={150} height={150} src={item.productID.filename[0].name} alt={item.productID.filename[0].name} className="border rounded" />
                                                </div>
                                                <div>
                                                    <h2>{item.productID.productName}</h2>
                                                    <p className="flex items-center mt-2"><IndianRupee size={13} className="mb-0.5" />{item.price}</p>
                                                    <Button variant="link" className="p-0 text-red-600" onClick={() => { handleRemoveItem(item._id) }}>Remove</Button>
                                                </div>
                                            </Card>
                                        ))
                                    ) : <h2>No Item Found</h2>
                                }
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center px-2">
                                    <p className="font-semibold">Total Price</p>
                                    <p className="text-sm flex gap-0.5 items-center"><IndianRupee size={13} className="mb-0.5" />
                                        {
                                            cartItems && cartItems.length > 0 ? (
                                                cartItems.reduce((total, item) =>
                                                    item.price + total, 0
                                                )
                                            ) : "0"
                                        }
                                    </p>
                                </div>
                                <Button onClick={() => router.push('/cart')}>Go To Cart</Button>
                                <Button onClick={() => { router.push('/checkout') }}>ChackOut</Button>
                                <Button className="flex gap-2" onClick={() => { setCartSheetOpen(false) }}>Continue<ArrowRight /></Button>
                            </div>
                        </>
                    )
                }
            </SheetContent>
        </Sheet>
    )
}