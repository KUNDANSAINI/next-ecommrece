import Product from "@/models/product"
import { NextResponse } from "next/server"
import connectToDB from "@/db/db";

export const dynamic = "force/dynamic"
connectToDB()

export async function POST(req) {
    try {
        const data = await req.json()
        if (!data) {
            return NextResponse.json({ success: false, message: "All Field Are Required!" })
        }

        const newRecord = await Product.create(data)
        if (!newRecord) {
            return NextResponse.json({ success: false, message: "Something Went Wrong Please Try Again!" })
        }
        return NextResponse.json({ success: true, message:"Product Successfully Added!" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}


export async function GET(req) {
    try {
        const getAllProduct = await Product.find()
        if (!getAllProduct) {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        } else {
            return NextResponse.json({ success: true, getAllProduct })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}