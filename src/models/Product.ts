import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProductImage {
  url: string;
  publicId?: string;
}

export interface IProduct extends Document {
  name: string;
  brand: string; // e.g. "Tata Steel", "Tata Tiscon", "SAIL", "JSW Steel", "APL Apollo", "Other"
  category: string; // "TMT Bars", "Pipes & Hollow Sections", "Structural Steel", "Colour Coated & Roofing Sheets", "MS/HR/CR/GI Sheets & Plates", "Weldmesh", "Chain Link & Accessories"
  gradeStandard?: string;
  sizeRange?: string;
  description: string;
  specs: string[];
  images: IProductImage[];
  authorisedDealer: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true, index: true },
    gradeStandard: { type: String, default: "" },
    sizeRange: { type: String, default: "" },
    description: { type: String, required: true },
    specs: { type: [String], default: [] },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
      },
    ],
    authorisedDealer: { type: Boolean, default: false },
    slug: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
