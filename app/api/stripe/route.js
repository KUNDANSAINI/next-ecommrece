import { NextResponse } from "next/server";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY)

export const dynamic = "force/dynamic"

export async function POST(req) {
    try {
        const { userId, lineItems } = await req.json()

        if (!userId || !lineItems?.length) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            client_reference_id: userId,
            metadata: {
                userId: userId
            },
            success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/checkout/cancel?session_id`
        })

        return NextResponse.json({ success: true, id: session.id })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Bad Request" })
    }
}