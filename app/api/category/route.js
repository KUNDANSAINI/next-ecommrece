import Category from "@/models/category";
import { NextResponse } from "next/server";
import connectToDB from "@/db/db";

export const dynamic = "force/dynamic"

connectToDB()

export async function POST(req) {
    try {
        const data = await req.json()
        const { category, filename } = data
        if (!category || !filename) {
            return NextResponse.json({ success: false, message: "All Fields Are Required!" })
        }

        const newRecord = await Category.create(data)
        if (!newRecord) {
            return NextResponse.json({ success: false, message: "Something Went Wrong. Please Try Again!" })
        }
        return NextResponse.json({ success: true, message:"New Category Successfully Added!" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}


export async function GET(req) {
    try {
        const getAllCategory = await Category.find()
        if (getAllCategory) {
            return NextResponse.json({ success: true, getAllCategory })
        } else {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}