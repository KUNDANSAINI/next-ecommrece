import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import connectToDB from "@/db/db";
import jwt from "jsonwebtoken"
import User from "@/models/user";
import { decryptPayload, encryptPayload } from "@/app/utils/authFunction";

connectToDB()

export const dynamic = "force/dynamic"

export async function POST(req) {
    try {
        const data = await req.json()
        const { email, password, token } = data

        if (token) {
            // Verify and decrypt the provided token
            const decoded = jwt.verify(token, "next-ecommrece", { algorithms: ['HS512'] });
            const encryptedPayload = decoded.data;
            const decryptedPayload = decryptPayload(encryptedPayload);
            return NextResponse.json({decryptedPayload})
        }

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "All Fields Are Required!" })
        }
        const checkEmailID = await User.findOne({ email })
        if (checkEmailID !== null) {
            const comparePassword = await bcrypt.compare(password, checkEmailID.password)
            if (comparePassword) {

                const payload = {
                    id: checkEmailID._id,
                    email: checkEmailID.email,
                    role: checkEmailID.isAdmin
                }

                const encryptedPayload = encryptPayload(payload);
                const token = jwt.sign({ data : encryptedPayload }, "next-ecommrece", { expiresIn: "1h", algorithm: 'HS512' })
                return NextResponse.json({
                    success: true,
                    token,
                    user: {
                        id: checkEmailID._id,
                        email: checkEmailID.email,
                        role: checkEmailID.isAdmin
                    }
                })
            } else {
                return NextResponse.json({ success: false, message: "Wrong Password!" })
            }
        } else {
            return NextResponse.json({ success: false, message: "Invalid Email ID!" })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}