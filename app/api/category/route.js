import Category from "@/models/category";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"
import path from "path";
import connectToDB from "@/db/db";

export const dynamic = "force/dynamic"

connectToDB()

export async function POST(req) {
    try {
        const data = await req.formData()
        const category = data.get("category")
        const desc = data.get("desc")
        const image = data.get("image")

        if (!category || !image) {
            return NextResponse.json({ success: false, message: "All Field Are Required!" })
        }
        const byteLength = await image.arrayBuffer()
        const bufferData = Buffer.from(byteLength)
        const filename = `${new Date().getTime()}${path.extname(image.name)}`;
        const pathOfImage = path.join(process.cwd(), './public/category', filename);

        const newRecord = await Category.create({ category, desc, filename })
        if (newRecord) {
            await writeFile(pathOfImage, bufferData)
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