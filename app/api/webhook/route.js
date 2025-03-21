import { handleWebhook } from "@/action";
import { NextResponse } from "next/server";


export async function POST(req) {
  const result = await handleWebhook(req);
  return NextResponse.json(result);
}