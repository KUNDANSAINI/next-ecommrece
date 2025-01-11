import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises"

export async function POST(req) {
    try {
        const data = await req.formData()
        const image = data.get("file")
        if (!image) {
            return NextResponse.json({ success: false, message: "Image Not Found" })
        }
        
        const byteLength = await image.arrayBuffer()
        const bufferData = Buffer.from(byteLength)
        const filename = `${new Date().getTime()}${path.extname(image.name)}`;
        const pathOfImage = path.join(process.cwd(), './public/brand', filename);
        await writeFile(pathOfImage, bufferData)
        
        const imageName = `/brand/${filename}`
        
        if (!imageName) {
            return NextResponse.json({ success: false, message: "Image Not Uploading!" })
        }

        return NextResponse.json({ success: true, message: "Brand Images Successfully Uploaded!", imageName })
    } catch (error) {
        console.log("Uploading Error:", error);
        return NextResponse.json({ success: false })
    }
}