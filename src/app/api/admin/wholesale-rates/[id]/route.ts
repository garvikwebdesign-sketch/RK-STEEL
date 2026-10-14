import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { WholesaleRate } from "@/models/WholesaleRate";
import { PriceList } from "@/models/PriceList";

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

    const existing = await WholesaleRate.findById(id);
    if (!existing) {
      return NextResponse.json({ error: "Wholesale rate not found" }, { status: 404 });
    }

    const oldPrice = parseInt(String(existing.todayPrice).replace(/[^0-9]/g, "")) || 0;
    const newPrice = parseInt(String(body.todayPrice).replace(/[^0-9]/g, "")) || 0;

    let delta = 0;
    let updatedHistory = existing.history || [];

    if (newPrice > 0 && oldPrice > 0 && newPrice !== oldPrice) {
      delta = newPrice - oldPrice;
      body.changeVsPrev = delta;
      body.yesterdayPrice = existing.todayPrice;
      const todayStr = new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      updatedHistory = [
        { day: todayStr, price: String(body.todayPrice) },
        ...updatedHistory.slice(0, 4),
      ];
      body.history = updatedHistory;
    }

    const updated = await WholesaleRate.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Wholesale rate not found" }, { status: 404 });
    }

    // Auto-sync to PriceList document
    try {
      const brandSlug = existing.brandSlug || body.brandSlug;
      if (brandSlug && newPrice > 0) {
        const pl = await PriceList.findOne({ brandSlug });
        if (pl) {
          let plHistory = (pl.priceHistory || []).filter((h: any) => h.pricePerMT && Number(h.pricePerMT) > 0);
          if (newPrice !== oldPrice) {
            plHistory.push({
              date: new Date(),
              pricePerMT: newPrice,
              changeVsPrevious: delta,
              notes: "Updated from Wholesale Rate Manager",
            });
          }
          await PriceList.updateOne(
            { _id: pl._id },
            {
              $set: {
                currentPricePerMT: newPrice,
                priceHistory: plHistory,
              },
            }
          );
        }
      }
    } catch (syncErr) {
      console.error("Failed to sync PriceList from Wholesale update:", syncErr);
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
