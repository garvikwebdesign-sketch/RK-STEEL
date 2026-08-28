import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/models/Lead";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const { name, email, phone, productRequirement, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: "Please fill in all required fields (Name, Email, Phone, Message)." }, { status: 400 });
    }

    const newLead = await Lead.create({
      name,
      email,
      phone,
      productRequirement: productRequirement || "",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your quote request has been received. Our sales team at RK STEEL CO Noida will contact you shortly.",
      leadId: newLead._id,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
