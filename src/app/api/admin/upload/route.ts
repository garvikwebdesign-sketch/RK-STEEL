import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { Readable } from "stream";
import path from "path";
import fs from "fs/promises";

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in again." }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file was provided in the upload request" }, { status: 400 });
    }

    // Check file size (e.g. 15MB limit)
    const MAX_FILE_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 15 MB limit. Please compress or link externally." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try Cloudinary if fully configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type.includes("pdf");
        const result = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: "rk_steel",
              resource_type: isPdf ? "raw" : "auto",
            },
            (error, res) => {
              if (error) reject(error);
              else resolve(res);
            }
          ).end(buffer);
        });

        if (result && result.secure_url) {
          return NextResponse.json({ url: result.secure_url });
        }
      } catch (cloudinaryErr: any) {
        console.warn("Cloudinary upload failed or unconfigured, proceeding to MongoDB GridFS:", cloudinaryErr?.message);
      }
    }

    // 2. Upload to MongoDB GridFS (Works 100% on Vercel Serverless & Localhost)
    await connectToDatabase();
    const db = mongoose.connection.db;

    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueName = `${Date.now()}_${originalName}`;
    const contentType = file.type || (originalName.endsWith(".pdf") ? "application/pdf" : "application/octet-stream");

    if (db) {
      const bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "uploads",
      });

      const uploadStream = bucket.openUploadStream(uniqueName, {
        metadata: {
          contentType,
          originalName: file.name,
          size: buffer.length,
          uploadedAt: new Date(),
        },
      });

      await new Promise<void>((resolve, reject) => {
        const readable = Readable.from(buffer);
        readable.pipe(uploadStream)
          .on("finish", () => resolve())
          .on("error", (err) => reject(err));
      });

      // Optionally write to local disk if writable (non-blocking, ignore errors on serverless)
      try {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadsDir, { recursive: true });
        await fs.writeFile(path.join(uploadsDir, uniqueName), buffer);
      } catch {
        // Silently ignore filesystem error on read-only serverless hosts
      }

      return NextResponse.json({
        url: `/api/files/${uniqueName}`,
        filename: uniqueName,
        size: buffer.length,
      });
    }

    // 3. Fallback to local filesystem if DB is not available
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, uniqueName);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${uniqueName}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "File upload failed on server" },
      { status: 500 }
    );
  }
}
