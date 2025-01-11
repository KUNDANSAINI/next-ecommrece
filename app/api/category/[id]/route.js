import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import Category from "@/models/category";
import connectToDB from "@/db/db";

export const dynamic = "force/dynamic"
connectToDB()

export async function DELETE(req, { params }) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({ success: false, message: "Invalid ID!" })
        }

        const checkData = await Category.findOne({ _id: id })
        if (!checkData) {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        } else {
            const deleteRecord = await Category.findByIdAndDelete(id)
            const filename = deleteRecord.filename
            if (filename) {
                const filePath = path.join(process.cwd(), './public', filename);
                fs.unlinkSync(filePath);
            }
            return NextResponse.json({ success: true })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}

export async function PUT(req, { params }){
    try{
        const data = await req.json()
        const id = params.id
        const {category, filename} = data
        if(!id){
            return NextResponse.json({ success: false, message:"Invalid ID!" })
        }
        if(!category || !filename){
            return NextResponse.json({ success: false, message:"Name And Image Are required!" })
        }
        
        const update = await Category.findByIdAndUpdate(id,data)

        if(!update){
            return NextResponse.json({ success: false, message:"Category Not Updated!" })
        }
        
        return NextResponse.json({ success: true, message:"Category Successfully Updated!" })
    }catch(error){
        console.log(error);
        return NextResponse.json({ success: false })
    }
}