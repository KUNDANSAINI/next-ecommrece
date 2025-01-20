import connectToDB from "@/db/db";
import Cart from "@/models/cart";
import Order from "@/models/order";
import { NextResponse } from "next/server";

connectToDB()

export const dynamic = "force/dynamic"

export async function POST(req) {
    try {
        const data = await req.json()
        const { userId } = data

        const newRecord = await Order.create(data)

        if (newRecord) {
            await Cart.deleteMany({ userID: userId })

            return NextResponse.json({
                success: true,
                message: "Products Are On The Way."
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed To Create To Order ! Please Try Again."
            })
        }
    } catch (error) {
        console.log("Submission Error", error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong, Please Try Again."
        })
    }
}

export async function GET(req){
    try{
        const getOrders = await Order.find().populate("orderItems.product")

        if (!getOrders) {
            return NextResponse.json({
                success: false,
                message: "Error Fetching To Ordered Products"
            })
        }

        return NextResponse.json({
            success: true,
            getOrders
        })

    }catch(error){
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong, Please Try Again."
        })
    }
}