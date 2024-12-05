import connectToDB from "@/db/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

connectToDB()

export async function GET(req, { params }) {
    try {
        const id = params.id
        if (!id) {
            return NextResponse.json({ success: false, message: "Invalid ID!" })
        }
        const getSingleUser = await User.findOne({ _id: id })
        if (getSingleUser) {
            return NextResponse.json({ success: true, getSingleUser })
        } else {
            return NextResponse.json({ success: false, message: "User Not Found!" })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}

export async function DELETE(req, { params }) {
    try {
        const id = params.id

        if (!id) {
            return NextResponse.json({ success: false, message: "Invalid ID!" })
        }
        const userCheck = await User.findOne({ _id: id })
        if (!userCheck) {
            return NextResponse.json({ success: false, message: "User Not Found" })
        }

        await User.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}

export async function PUT(req, { params }) {
    try {
        const id = params.id
        const data = await req.json()

        if (!id) {
            return NextResponse.json({ success: false, message: "Invalid ID" })
        }

        const userCheck = await User.findOne({ _id: id })

        if (!userCheck) {
            return NextResponse.json({ success: false, message: "User Not Found!" })
        }

        await User.findByIdAndUpdate(id, { personalDetails: data })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request!" })
    }
}