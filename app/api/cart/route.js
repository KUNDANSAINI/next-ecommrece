import connectToDB from "@/db/db"
import Cart from "@/models/cart";
import { NextResponse } from "next/server";


export const dynamic = "force/dynamic"

connectToDB()


export async function POST(req) {
    try {
        const authorizationHeader = req.headers.get('authorization');
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const data = await req.json()
        const { productID, userID, qty, selectedSize, price, basePrice } = data
        if (!productID || !userID) {
            return NextResponse.json({ success: false, message: "Invalid ID!" })
        }
        const checkData = await Cart.findOne({ productID: productID, userID: userID })
        if (checkData) {
            return NextResponse.json({ success: false, message: "Product Already Added In Cart!" })
        }
        const newRecord = await Cart.create({ productID, userID, qty, size: selectedSize, price })
        if (!newRecord) {
            return NextResponse.json({ success: false, message: "Something Went Wrong. Please Try Again!" })
        }
        return NextResponse.json({ success: true, message: "Product Successfully Added In Cart!" })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}


export async function GET(req) {
    try {
        const authorizationHeader = req.headers.get('authorization');
        const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        const { searchParams } = new URL(req.url);
        const userID = searchParams.get("userID")
        if (!userID) {
            return NextResponse.json({ success: false, message: "Invalid ID!" })
        }
        const getCartProduct = await Cart.find({ userID }).populate("productID")
        if (getCartProduct) {
            return NextResponse.json({ success: true, getCartProduct })
        } else {
            return NextResponse.json({ success: false, message: "Something Went Wrong. Please Try Again!" })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}


export async function PUT(req) {
    const data = await req.json();
    try {
        const bulkOperations = data.map((item) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { 
                    $set: {
                        qty: item.qty,
                        price: item.price,
                    },
                 },
            },
        }));

        const result = await Cart.bulkWrite(bulkOperations);
        if (!result) {
            return NextResponse.json({ success: false, message: "Quantities not updated" });
        }

        return NextResponse.json({ success: true, message: "Quantities updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Error updating quantities" });
    }
}
