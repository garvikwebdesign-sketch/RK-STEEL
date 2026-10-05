import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { PriceList } from "@/models/PriceList";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const activeOnly = searchParams.get("active") !== "false";

    const filter: any = {};
    if (activeOnly) {
      filter.isActive = true;
    }
    if (brand && brand !== "All") {
      filter.$or = [
        { brand: { $regex: brand, $options: "i" } },
        { brandSlug: { $regex: brand, $options: "i" } },
      ];
    }
    if (category && category !== "All") {
      filter.category = { $regex: category, $options: "i" };
    }

    const priceLists = await PriceList.find(filter)
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, priceLists });
  } catch (error: any) {
    console.error("Failed to fetch price lists:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch price lists" },
      { status: 500 }
    );
  }
}
