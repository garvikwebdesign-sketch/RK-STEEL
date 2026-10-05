import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { WholesaleRate } from "@/models/WholesaleRate";

export const dynamic = "force-dynamic";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    await connectToDatabase();

    const updated = await WholesaleRate.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Wholesale rate not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, rate: updated });
  } catch (error: any) {
    console.error("Error updating wholesale rate:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const deleted = await WholesaleRate.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Wholesale rate not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Wholesale rate deleted" });
  } catch (error: any) {
    console.error("Error deleting wholesale rate:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
