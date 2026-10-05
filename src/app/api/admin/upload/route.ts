import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs/promises";

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary credentials are fully configured, upload to Cloudinary
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        const result = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "rk_steel", resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          ).end(buffer);
        });
        return NextResponse.json({ url: result.secure_url });
      } catch (cloudinaryErr) {
        console.warn("Cloudinary upload failed, falling back to local storage:", cloudinaryErr);
      }
    }

    // Local filesystem upload fallback (in public/uploads)
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${Date.now()}_${originalName}`;
    const filePath = path.join(uploadsDir, uniqueName);

    await fs.writeFile(filePath, buffer);
    const fileUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}

