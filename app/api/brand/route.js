import Brand from "@/models/brand";
import { NextResponse } from "next/server";

export const dynamic = "force/dynamic"


export async function POST(req) {
    try {
        const data = await req.json()
        const { brand, filename} = data
        if (!brand || !filename) {
            return NextResponse.json({ success: false, message: "Name and Image Are Required!" })
        }

        const newRecord = await Brand.create(data)
        if (!newRecord) {
            return NextResponse.json({ success: false, message: "Something Went Wrong. Please Try Again!" })
        }

        return NextResponse.json({ success: true, message:"New Brand Successfully Added!" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}


export async function GET(req) {
    try {
        const getAllBrand = await Brand.find()
        if (getAllBrand) {
            return NextResponse.json({ success: true, getAllBrand })
        } else {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}