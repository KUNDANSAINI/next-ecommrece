'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import toast from "react-hot-toast";
import { CancelOrder } from "@/action";


function OrderCancel({ cancelOrder, setCancelOrder, order }) {
    const [reason, setReason] = useState("")

    async function handleCancelOrder(){
        if(!reason){
            return toast.error("Please Give a reason")
        }
        if(!order._id){
            return toast.error("Invalid ID")
        }
        try{
            const response = await CancelOrder(order, reason)
            if(response.success === true){
                setCancelOrder(false)
                setReason("")
                toast.success(response.message)
            }else{
                toast.error(response.message)
            }
        }catch(error){
            console.log("cancel order error:", error);
            toast.error("Bad Request")
        }
    }

    return (
        <>
            <Dialog open={cancelOrder} onOpenChange={() => { setCancelOrder(false) }}>
                <DialogContent className="max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Are You Sure Cancel This Order ?</DialogTitle>
                        <DialogDescription>
                            {
                                order && order.items.map((item, index)=>(
                                    <span key={index}>{item.product.productName}</span>
                                ))
                            }
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Textarea placeholder="Enter your reason for cancellation..." value={reason} onChange = {(e) => {setReason(e.target.value)}} />
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick = {handleCancelOrder} >Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default OrderCancel;