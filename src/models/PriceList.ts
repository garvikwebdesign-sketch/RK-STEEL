import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPriceItem {
  size: string; // e.g. "6 mm", "8 mm", "12 mm"
  pricePerPiece?: number; // e.g. 245, 417
  pricePerMT?: number; // e.g. 54500
  unit?: string; // "Per Piece" | "Per MT" | "Per Kg"
}

export interface IPriceHistoryEntry {
  date: Date;
  pricePerMT: number;
  changeVsPrevious?: number;
  notes?: string;
}

export interface IPriceList extends Document {
  title: string; // e.g. "Tata Tiscon 550SD Recommended Consumer Price List"
  brand: string; // e.g. "Tata Tiscon"
  brandSlug: string; // e.g. "tata-tiscon"
  category: string; // e.g. "TMT Bars", "Pipes & Hollow Sections"
  effectiveDate: string; // e.g. "1st October 2026"
  validityRegion?: string; // e.g. "Valid in West UP / Delhi NCR"
  flyerUrl?: string; // High-res image or flyer circular
  pdfUrl?: string; // Downloadable official PDF circular
  items: IPriceItem[];
  notes: string[]; // Disclaimers, BIS tolerance notes, tax info
  isActive: boolean;
  isFeatured: boolean;
  currentPricePerMT?: number;
  unit: string;
  priceHistory: IPriceHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const PriceItemSchema = new Schema<IPriceItem>(
  {
    size: { type: String, required: true },
    pricePerPiece: { type: Number, default: 0 },
    pricePerMT: { type: Number, default: 0 },
    unit: { type: String, default: "Per Piece" },
  },
  { _id: false }
);

const PriceHistoryEntrySchema = new Schema<IPriceHistoryEntry>(
  {
    date: { type: Date, default: Date.now },
    pricePerMT: { type: Number, required: true },
    changeVsPrevious: { type: Number, default: 0 },
    notes: { type: String, default: "" },
  },
  { _id: false }
);

const PriceListSchema = new Schema<IPriceList>(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true, index: true },
    brandSlug: { type: String, required: true, index: true },
    category: { type: String, default: "TMT Bars", index: true },
    effectiveDate: { type: String, required: true },
    validityRegion: { type: String, default: "Valid in West UP / Delhi NCR" },
    flyerUrl: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },
    items: [PriceItemSchema],
    notes: { type: [String], default: [] },
    isActive: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false },
    currentPricePerMT: { type: Number, default: 0 },
    unit: { type: String, default: "Piece" },
    priceHistory: [PriceHistoryEntrySchema],
  },
  { timestamps: true }
);

export const PriceList: Model<IPriceList> =
  mongoose.models.PriceList || mongoose.model<IPriceList>("PriceList", PriceListSchema);

