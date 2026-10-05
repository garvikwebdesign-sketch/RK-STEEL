import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Catalogue } from "@/models/Catalogue";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get("brand");

    const filter: any = { isActive: true };
    if (brand && brand !== "All") {
      filter.$or = [
        { brand: { $regex: brand, $options: "i" } },
        { brandKey: { $regex: brand, $options: "i" } },
      ];
    }

    const catalogues = await Catalogue.find(filter)
      .sort({ isMaster: -1, order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, catalogues });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch catalogues" },
      { status: 500 }
    );
  }
}
