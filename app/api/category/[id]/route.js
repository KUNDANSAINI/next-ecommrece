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
                const filePath = path.join(process.cwd(), './public/category', filename);
                fs.unlinkSync(filePath);
            }
            return NextResponse.json({ success: true })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}