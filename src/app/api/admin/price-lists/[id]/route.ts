import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PriceList } from "@/models/PriceList";
import { WholesaleRate } from "@/models/WholesaleRate";
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

    const existing = await PriceList.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Price list not found" }, { status: 404 });
    }

    if (body.brand && !body.brandSlug) {
      body.brandSlug = body.brand
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    const oldPrice = Number(existing.currentPricePerMT) || 0;
    const newPrice = Number(body.currentPricePerMT) || 0;

    // Filter out any invalid / 0 price history records
    let history = (existing.priceHistory || []).filter(
      (h: any) => h.pricePerMT && Number(h.pricePerMT) > 0
    );

    let priceMovement = 0;
    if (newPrice > 0 && oldPrice > 0 && newPrice !== oldPrice) {
      priceMovement = newPrice - oldPrice;
      history.push({
        date: new Date(),
        pricePerMT: newPrice,
        changeVsPrevious: priceMovement,
        notes: body.effectiveDate
          ? `Rate revision effective ${body.effectiveDate}`
          : "Price update",
      });
    } else if (history.length === 0 && newPrice > 0) {
      history.push({
        date: new Date(),
        pricePerMT: newPrice,
        changeVsPrevious: 0,
        notes: `Approved base rate effective ${body.effectiveDate || "today"}`,
      });
    }

    body.priceHistory = history;

    const updated = await PriceList.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: "Price list not found" }, { status: 404 });
    }

    // Auto-synchronize with WholesaleRate for single source of truth
    try {
      const brandSlug = updated.brandSlug;
      const formattedToday = newPrice > 0 ? newPrice.toLocaleString("en-IN") : (existing.currentPricePerMT ? Number(existing.currentPricePerMT).toLocaleString("en-IN") : "");
      const formattedYesterday = (oldPrice > 0 && oldPrice !== newPrice) ? oldPrice.toLocaleString("en-IN") : "";

      if (brandSlug && formattedToday) {
        const wholesaleHistory = history.slice(-4).map((h: any) => ({
          day: new Date(h.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
          price: Number(h.pricePerMT).toLocaleString("en-IN"),
        }));

        await WholesaleRate.findOneAndUpdate(
          { brandSlug },
          {
            brandSlug,
            brandName: updated.brand.toUpperCase(),
            category: updated.category,
            todayPrice: formattedToday,
            yesterdayPrice: formattedYesterday,
            changeVsPrev: priceMovement,
            unit: updated.unit || "MT",
            pdfUrl: updated.pdfUrl || "/catalogues",
            history: wholesaleHistory.length > 0 ? wholesaleHistory : [{ day: "Approved Rate", price: formattedToday }],
            isActive: updated.isActive,
          },
          { upsert: true }
        );
      }
    } catch (syncErr) {
      console.error("Failed to auto-sync WholesaleRate:", syncErr);
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
