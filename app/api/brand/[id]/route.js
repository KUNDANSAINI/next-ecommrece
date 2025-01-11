import Brand from "@/models/brand";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export const dynamic = "force/dynamic"

export async function DELETE(req, { params }) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({ success: false, message: "Invalid ID!" })
        }

        const checkData = await Brand.findOne({ _id: id })
        if (!checkData) {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        } else {
            const deleteRecord = await Brand.findByIdAndDelete(id)
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
        const {brand, filename} = data
        if(!id){
            return NextResponse.json({ success: false, message:"Invalid ID!" })
        }
        if(!brand || !filename){
            return NextResponse.json({ success: false, message:"Name And Image Are required!" })
        }
        
        const update = await Brand.findByIdAndUpdate(id,data)

        if(!update){
            return NextResponse.json({ success: false, message:"Brand Not Updated!" })
        }
        
        return NextResponse.json({ success: true, message:"Brand Successfully Updated!" })
    }catch(error){
        console.log(error);
        return NextResponse.json({ success: false })
    }
}