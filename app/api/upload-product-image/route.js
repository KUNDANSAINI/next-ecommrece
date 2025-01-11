import { NextResponse } from "next/server";
import fs from "fs"
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData()
    const images = data.getAll("images")

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
        name: `/product/${fileName}`
      });
    }

    if(!imageData){
      return NextResponse.json({ success: false, message: "Images Not Uploading" })
    }

    return NextResponse.json({ success: true, message: "Product Images Successfully Uploaded!", imageData })
  } catch (error) {
    console.log("Uploading Error:", error);
    return NextResponse.json({ success: false })
  }


}