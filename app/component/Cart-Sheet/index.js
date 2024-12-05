'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"
import { GlobalContext } from "@/context"
import { API_URL } from "@/env"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

export function CartSheet({ cartSheetOpen, setCartSheetOpen }) {
    const { userID } = useContext(GlobalContext)
    const [cartItems, setCartItems] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (userID) {
            fetchCartItems(userID)
        }
    }, [cartSheetOpen])

    async function fetchCartItems(userID) {
        try {
            const response = await axios.get(`${API_URL}/api/cart?userID=${userID}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            if (response.status === 200) {
                setCartItems(response.data.getCartProduct)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRemoveItem(id){
        try{
            if(!id){
                toast.error("Invalid ID")
            }
            const response = await axios.delete(`/api/cart/${id}`)
            if(response.data.success === true){
                router.refresh()
                toast.success("Item Successfully Remove")
            }
        }catch(error){
            console.error("deleteing Error",error);
            toast.error("Bad Request!")
        }
    }

    return (
        <Sheet
            open={cartSheetOpen}
            onOpenChange={() => { setCartSheetOpen(false) }}
        >
            <SheetContent className="flex flex-col justify-between">
                <div className=" overflow-y-auto">
                    {
                        cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <Card className="flex gap-4 p-4 mt-4" key={index}>
                                    <div>
                                        <img src={`/product/${item.productID.filename[0].name}`} alt={item.productID.filename[0].name} className="w-[100px] border rounded" />
                                    </div>
                                    <div>
                                        <h2>{item.productID.productName}</h2>
                                        <Button variant="link" className="p-0 text-red-600" onClick={()=>{handleRemoveItem(item._id)}}>Remove</Button>
                                    </div>
                                </Card>
                            ))
                        ) : <h2>No Item Found</h2>
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <Button onClick={()=> router.push('/cart') }>Go To Cart</Button>
                    <Button>ChackOut</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
