import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { WholesaleRate } from "@/models/WholesaleRate";
import { SiteSetting } from "@/models/SiteSetting";
import { initialWholesaleRates } from "@/lib/seedData";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Check count; if 0, auto-seed with initial data
    let rates = await WholesaleRate.find().sort({ order: 1, createdAt: 1 }).lean();
    if (rates.length === 0) {
      await WholesaleRate.insertMany(initialWholesaleRates);
      rates = await WholesaleRate.find().sort({ order: 1, createdAt: 1 }).lean();
    }

    // Get section visibility setting
    let settingDoc = await SiteSetting.findOne({ key: "showWholesaleRatesSection" });
    if (!settingDoc) {
      settingDoc = await SiteSetting.create({
        key: "showWholesaleRatesSection",
        value: true,
      });
    }

    return NextResponse.json({
      success: true,
      rates,
      showWholesaleSection: settingDoc.value !== false,
    });
  } catch (error: any) {
    console.error("Error fetching wholesale rates:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      brandSlug,
      brandName,
      category,
      todayPrice,
      yesterdayPrice,
      changeVsPrev,
      unit,
      pdfUrl,
      history,
      order,
      isActive,
    } = body;

    if (!brandSlug || !brandName || !todayPrice) {
      return NextResponse.json(
        { error: "brandSlug, brandName, and todayPrice are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newRate = await WholesaleRate.create({
      brandSlug,
      brandName,
      category: category || "Structural & TMT Steel",
      todayPrice,
      yesterdayPrice: yesterdayPrice || "",
      changeVsPrev: Number(changeVsPrev) || 0,
      unit: unit || "MT",
      pdfUrl: pdfUrl || "/catalogues",
      history: history || [
        { day: "Today", price: todayPrice },
        { day: "Yesterday", price: yesterdayPrice || todayPrice },
      ],
      order: Number(order) || 0,
      isActive: isActive !== false,
    });

    return NextResponse.json({ success: true, rate: newRate }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating wholesale rate:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
