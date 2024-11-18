import Brand from "@/models/brand";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export const dynamic = "force/dynamic"

export async function DELETE(req, { params }) {
    try {
        const authorizationHeader = req.headers.get('authorization');
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
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
                const filePath = path.join(process.cwd(), './public/brand', filename);
                fs.unlinkSync(filePath);
            }
            return NextResponse.json({ success: true })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}