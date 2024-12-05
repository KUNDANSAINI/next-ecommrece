import connectToDB from "@/db/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import User from "@/models/user";

connectToDB()

export const dynamic = "force/dynamic"

export async function POST(req) {
    try {
        const data = await req.json()
        const { fullName, email, password, confirm_password } = data
        if (!fullName || !email || !password || !confirm_password) {
            return NextResponse.json({ message: "All Fields Are Required!" })
        }
        const checkUser = await User.findOne({ email })
        if (checkUser === null) {
            if (password === confirm_password) {
                const hashPassword = await bcrypt.hash(password, 10)
                const newRecord = await User.create({ fullName, email, password: hashPassword })
                if (newRecord) {
                    return NextResponse.json({ success: true, message: "Your Account Is Successfully Created. Please Try Again!" })
                } else {
                    return NextResponse.json({ success: false, message: "Something Went Wrong. Please Try Again!" })
                }
            } else {
                return NextResponse.json({ success: false, message: "Confirm Password Is Don't Matched!" })
            }
        } else {
            return NextResponse.json({ message: "User Already Exists!" })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}


export async function GET(req) {
    try {
        const getAllUser = await User.find({ isAdmin: false })
        if (!getAllUser) {
            return NextResponse.json({ success: false, message: "Data Not Found!" })
        } else {
            return NextResponse.json({ success: true, getAllUser })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}