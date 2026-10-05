import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    await connectToDatabase();
    const db = mongoose.connection.db;

    if (db) {
      const bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "uploads",
      });

      const files = await bucket.find({ filename }).toArray();

      if (files && files.length > 0) {
        const fileDoc = files[0];
        const downloadStream = bucket.openDownloadStreamByName(filename);

        const webStream = new ReadableStream({
          start(controller) {
            downloadStream.on("data", (chunk) => controller.enqueue(chunk));
            downloadStream.on("end", () => controller.close());
            downloadStream.on("error", (err) => controller.error(err));
          },
          cancel() {
            downloadStream.destroy();
          },
        });

        const contentType =
          (fileDoc.metadata && (fileDoc.metadata as any).contentType) ||
          (fileDoc as any).contentType ||
          (filename.endsWith(".pdf")
            ? "application/pdf"
            : filename.endsWith(".png")
            ? "image/png"
            : filename.endsWith(".jpg") || filename.endsWith(".jpeg")
            ? "image/jpeg"
            : filename.endsWith(".webp")
            ? "image/webp"
            : "application/octet-stream");

        const headers = new Headers();
        headers.set("Content-Type", contentType);
        headers.set("Content-Length", fileDoc.length.toString());
        headers.set("Cache-Control", "public, max-age=31536000, immutable");

        const isViewable =
          contentType.includes("pdf") ||
          contentType.includes("image") ||
          contentType.includes("text");

        headers.set(
          "Content-Disposition",
          `${isViewable ? "inline" : "attachment"}; filename="${encodeURIComponent(
            fileDoc.filename
          )}"`
        );

        return new NextResponse(webStream, {
          status: 200,
          headers,
        });
      }
    }

    // Fallback: check public/uploads/ in case file was saved to local disk
    const localFilePath = path.join(process.cwd(), "public", "uploads", filename);
    if (fs.existsSync(localFilePath)) {
      const stats = fs.statSync(localFilePath);
      const readStream = fs.createReadStream(localFilePath);

      const webStream = new ReadableStream({
        start(controller) {
          readStream.on("data", (chunk) => controller.enqueue(chunk));
          readStream.on("end", () => controller.close());
          readStream.on("error", (err) => controller.error(err));
        },
        cancel() {
          readStream.destroy();
        },
      });

      const contentType = filename.endsWith(".pdf")
        ? "application/pdf"
        : filename.endsWith(".png")
        ? "image/png"
        : filename.endsWith(".jpg") || filename.endsWith(".jpeg")
        ? "image/jpeg"
        : "application/octet-stream";

      return new NextResponse(webStream, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Length": stats.size.toString(),
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Disposition": `inline; filename="${encodeURIComponent(filename)}"`,
        },
      });
    }

    return NextResponse.json({ error: "File not found" }, { status: 404 });
  } catch (error: any) {
    console.error("Error retrieving file:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve file" },
      { status: 500 }
    );
  }
}
