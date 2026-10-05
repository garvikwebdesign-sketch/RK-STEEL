import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { SiteSetting } from "@/models/SiteSetting";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { show } = await request.json();

    await connectToDatabase();

    const updated = await SiteSetting.findOneAndUpdate(
      { key: "showWholesaleRatesSection" },
      { value: !!show },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      showWholesaleSection: updated.value,
    });
  } catch (error: any) {
    console.error("Error toggling wholesale rates section:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
