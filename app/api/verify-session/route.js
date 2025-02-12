import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: "Invalid session ID" }, { status: 400 });
  }
}