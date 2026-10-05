import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICatalogue extends Document {
  title: string;
  brand: string;
  brandKey: string;
  desc: string;
  pdfUrl: string;
  fileSize: string;
  isMaster: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CatalogueSchema = new Schema<ICatalogue>(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true, index: true },
    brandKey: { type: String, required: true, index: true },
    desc: { type: String, default: "" },
    pdfUrl: { type: String, required: true },
    fileSize: { type: String, default: "PDF Brochure" },
    isMaster: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Catalogue: Model<ICatalogue> =
  mongoose.models.Catalogue || mongoose.model<ICatalogue>("Catalogue", CatalogueSchema);
