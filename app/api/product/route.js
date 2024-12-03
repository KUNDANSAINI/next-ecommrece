import Product from "@/models/product"
import { NextResponse } from "next/server"
import fs from "fs"
import path from "path";
import connectToDB from "@/db/db";

export const dynamic = "force/dynamic"
connectToDB()

export async function POST(req) {
    try {
        const data = await req.formData()
        const productName = data.get("productName")
        const hns = data.get("hns")
        const category = data.get("category")
        const subCategory = data.get("subCategory")
        const brand = data.get("brand")
        const price = data.get("price")
        const discount = data.get("discount")
        const warranty = data.get("warranty")
        const delivery = data.get("delivery")
        const offers = data.get("offers")
        const desc = data.get("desc")
        const qty = data.get("qty")
        const productSizes = data.getAll("size")
        const images = data.getAll("images")
        if (!productName || !hns || !category || !brand || !subCategory || !price || !discount || !delivery || !offers || !desc || !qty || !productSizes || !images) {
            return NextResponse.json({ success: false, message: "All Field Are Required!" })
        }

        const uploadedFiles = [];
        const imageData = [];

        for (const image of images) {
            const buffer = await image.arrayBuffer(); // Get the file buffer
            const fileName = `${new Date().getTime()}${path.extname(image.name)}`

            // Save the file buffer to the public/uploads directory
            const filePath = path.join(process.cwd(), `./public/product/${fileName}`);
            await fs.promises.writeFile(filePath, Buffer.from(buffer));

            uploadedFiles.push(filePath);
            imageData.push({
                name: fileName
            });
        }

        const newRecord = await Product.create({ productName, hns, category, subCategory, brand, price, discount, warranty, delivery, offers, desc, qty, size: productSizes, filename: imageData })
        if (newRecord) {
            return NextResponse.json({ success: true, newRecord })
        } else {
        }
        return NextResponse.json({ success: false, message: "Something Went Wrong Please Try Again!" })
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