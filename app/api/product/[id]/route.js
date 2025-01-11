import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import Product from "@/models/product";

export const dynamic = "force/dynamic"

export async function DELETE(req, { params }) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({ success: false, message: "Invalid ID!" })
        }

        const checkData = await Product.findOne({ _id: id })
        if (!checkData) {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        } else {
            const deleteRecord = await Product.findByIdAndDelete(id)
            const deleteImages = deleteRecord.filename
            for (const imageName of deleteImages) {
                const filePath = path.join(process.cwd(), './public', imageName.name);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            return NextResponse.json({ success: true })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}

export async function GET(req, { params }) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({ success: false, message: "Invalid ID" })
        }
        const fetchSingleRecord = await Product.findOne({ _id: id })
        if (!fetchSingleRecord) {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        } else {
            return NextResponse.json({ success: true, fetchSingleRecord })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}


export async function PUT(req, { params }) {
    try {
        const {id} = params
        const data = await req.json()        
        if (!id) {
            return NextResponse.json({ success: false, message: "Invalid ID" })
        }
        if (!data) {
            return NextResponse.json({ success: false, message: "All Field Are Required!" })
        }
        const updateRecord = await Product.findByIdAndUpdate(id, data)
        if (!updateRecord) {
            return NextResponse.json({ success: false, message: "Something Went Wrong. Please Try Again!" })
        }
        return NextResponse.json({ success: true, message:"Product Successfully Updated!" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}