import { NextResponse } from "next/server";
import SubCategory from "@/models/subCategory";

export const dynamic = "force/dynamic"


export async function POST(req) {
    try {
        const data = await req.json()
        const { subCategory, desc } = data

        if (!subCategory) {
            return NextResponse.json({ success: false, message: "Field Are Required!" })
        }

        const newRecord = await SubCategory.create(data)
        if (newRecord) {
            return NextResponse.json({ success: true, newRecord })
        } else {
            return NextResponse.json({ success: false, message: "Something Went Wrong. Please Try Again!" })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}


export async function GET(req) {
    try {
        const getAllSubCategory = await SubCategory.find()
        if (getAllSubCategory) {
            return NextResponse.json({ success: true, getAllSubCategory })
        } else {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}