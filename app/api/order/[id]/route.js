import connectToDB from "@/db/db";
import Order from "@/models/order";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

connectToDB()

export const dynamic = "force/dynamic"

export async function GET(req, { params }) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Invalid ID"
            })
        }

        const getAllOrder = await Order.find({ userId: id }).populate("orderItems.product")

        if (!getAllOrder) {
            return NextResponse.json({
                success: false,
                message: "Error Fetching To Ordered Products"
            })
        }

        return NextResponse.json({
            success: true,
            getAllOrder
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong, Please Try Again."
        })
    }
}

export async function PUT(req, { params }) {
    const id = params.id
    try {
        if(!id){
            return NextResponse.json({
                success: false,
                message: "Invalid ID!"
            })
        }

        const updateOrder = await Order.findByIdAndUpdate(
            id,
            {status:"Out Of Delivery"}
        )

        return NextResponse.json({success: true, message:"Order Is Out of Delivery."})

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong, Please Try Again."
        })
    }
}

export async function PATCH(req, { params }) {
    const id = params.id
    try {
        if(!id){
            return NextResponse.json({
                success: false,
                message: "Invalid ID!"
            })
        }

        const updateOrder = await Order.findByIdAndUpdate(
            id,
            {status:"Delivered"}
        )

        return NextResponse.json({success: true, message:"Order Successfully Delivered."})

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong, Please Try Again."
        })
    }
}