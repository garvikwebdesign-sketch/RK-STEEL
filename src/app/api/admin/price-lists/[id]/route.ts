import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PriceList } from "@/models/PriceList";
import { getAdminSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const priceList = await PriceList.findById(id).lean();
    if (!priceList) {
      return NextResponse.json({ success: false, error: "Price list not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, priceList });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const body = await request.json();

    if (body.brand && !body.brandSlug) {
      body.brandSlug = body.brand
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    const updated = await PriceList.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Price list not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, priceList: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const deleted = await PriceList.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Price list not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Price list deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
