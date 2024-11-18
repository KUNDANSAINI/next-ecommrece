import Brand from "@/models/brand";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path"

export const dynamic = "force/dynamic"


export async function POST(req) {
    try {
        const authorizationHeader = req.headers.get('authorization');
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const data = await req.formData()
        const brand = data.get("brand")
        const desc = data.get("desc")
        const image = data.get("image")
        if (!brand || !image) {
            return NextResponse.json({ success: false, message: "All Field Are Required!" })
        }
        const byteLength = await image.arrayBuffer()
        const bufferData = Buffer.from(byteLength)
        const filename = `${new Date().getTime()}${path.extname(image.name)}`;
        const pathOfImage = path.join(process.cwd(), "./public/brand", filename)

        const newRecord = await Brand.create({ brand, desc, filename })
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