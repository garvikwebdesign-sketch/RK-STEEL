import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PriceList } from "@/models/PriceList";
import { WholesaleRate } from "@/models/WholesaleRate";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const priceLists = await PriceList.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, priceLists });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await request.json();

    const {
      title,
      brand,
      brandSlug,
      category,
      effectiveDate,
      validityRegion,
      flyerUrl,
      pdfUrl,
      items,
      notes,
      isActive,
      isFeatured,
      currentPricePerMT,
      unit,
    } = body;

    if (!title || !brand || !effectiveDate) {
      return NextResponse.json(
        { success: false, error: "Title, brand, and effective date are required" },
        { status: 400 }
      );
    }

    const calculatedSlug =
      brandSlug ||
      brand
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const numericPrice = Number(currentPricePerMT) || 0;
    const initialHistory =
      numericPrice > 0
        ? [
            {
              date: new Date(),
              pricePerMT: numericPrice,
              changeVsPrevious: 0,
              notes: `Approved rate effective ${effectiveDate}`,
            },
          ]
        : [];

    const newPriceList = await PriceList.create({
      title,
      brand,
      brandSlug: calculatedSlug,
      category: category || "TMT Bars",
      effectiveDate,
      validityRegion: validityRegion || "Valid in West UP / Delhi NCR",
      flyerUrl: flyerUrl || "",
      pdfUrl: pdfUrl || "",
      items: Array.isArray(items) ? items : [],
      notes: Array.isArray(notes) ? notes : [],
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: !!isFeatured,
      currentPricePerMT: numericPrice,
      unit: unit || "Piece",
      priceHistory: initialHistory,
    });

    // Auto-synchronize with WholesaleRate
    try {
      if (numericPrice > 0) {
        await WholesaleRate.findOneAndUpdate(
          { brandSlug: calculatedSlug },
          {
            brandSlug: calculatedSlug,
            brandName: brand.toUpperCase(),
            category: category || "TMT Bars",
            todayPrice: numericPrice.toLocaleString("en-IN"),
            yesterdayPrice: "",
            changeVsPrev: 0,
            unit: unit || "MT",
            pdfUrl: pdfUrl || "/catalogues",
            history: [{ day: "Approved Rate", price: numericPrice.toLocaleString("en-IN") }],
            isActive: isActive !== undefined ? isActive : true,
          },
          { upsert: true }
        );
      }
    } catch (syncErr) {
      console.error("Failed to auto-sync WholesaleRate on create:", syncErr);
    }

    return NextResponse.json({ success: true, priceList: newPriceList }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating price list:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
