import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Catalogue } from "@/models/Catalogue";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const catalogues = await Catalogue.find()
      .sort({ isMaster: -1, order: 1, createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, catalogues });
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

    const { title, brand, brandKey, desc, pdfUrl, fileSize, isMaster, isActive, order } = body;

    if (!title || !brand || !pdfUrl) {
      return NextResponse.json(
        { success: false, error: "Title, brand, and PDF URL/file are required" },
        { status: 400 }
      );
    }

    const calculatedBrandKey =
      brandKey ||
      brand
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newCatalogue = await Catalogue.create({
      title,
      brand,
      brandKey: calculatedBrandKey,
      desc: desc || "",
      pdfUrl,
      fileSize: fileSize || "PDF Brochure",
      isMaster: !!isMaster,
      isActive: isActive !== undefined ? isActive : true,
      order: Number(order) || 0,
    });

    return NextResponse.json({ success: true, catalogue: newCatalogue }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
