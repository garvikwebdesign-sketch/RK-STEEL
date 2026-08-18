import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBrandPage extends Document {
  slug: string; // e.g. 'tata-tiscon'
  name: string; // e.g. 'Tata Tiscon'
  parentCompany: string; // e.g. 'Tata Steel'
  tagline: string;
  logoUrl?: string;
  bannerImage?: string;
  overview: string;
  availableSizes: string[];
  grades: string[];
  bundleDetails: string;
  weightChart: { size: string; weightPerMeterKg: number; standardLengthM: number; pieceWeightKg: number }[];
  todayPricePerMT: number;
  pdfCatalogueUrl: string;
  inStock: boolean;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
}

const WeightChartSchema = new Schema(
  {
    size: { type: String, required: true },
    weightPerMeterKg: { type: Number, required: true },
    standardLengthM: { type: Number, required: true },
    pieceWeightKg: { type: Number, required: true },
  },
  { _id: false }
);

const BrandPageSchema = new Schema<IBrandPage>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    parentCompany: { type: String, required: true },
    tagline: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    bannerImage: { type: String, default: "" },
    overview: { type: String, required: true },
    availableSizes: { type: [String], default: [] },
    grades: { type: [String], default: [] },
    bundleDetails: { type: String, default: "" },
    weightChart: [WeightChartSchema],
    todayPricePerMT: { type: Number, default: 0 },
    pdfCatalogueUrl: { type: String, default: "" },
    inStock: { type: Boolean, default: true },
    features: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const BrandPageModel: Model<IBrandPage> =
  mongoose.models.BrandPage || mongoose.model<IBrandPage>("BrandPage", BrandPageSchema);
