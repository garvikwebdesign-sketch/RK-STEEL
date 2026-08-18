import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPriceHistoryEntry {
  date: Date;
  pricePerMT: number;
  changeVsPrevious?: number;
}

export interface IPriceList extends Document {
  brandSlug: string; // e.g., 'tata-tiscon', 'sail-seqr'
  brandName: string; // e.g., 'Tata Tiscon'
  productName: string; // e.g., '12mm - 32mm Fe 550D TMT Bars'
  category: string; // e.g., 'TMT Bars'
  currentPricePerMT: number;
  unit: string; // e.g., 'MT' or 'Piece'
  pdfCatalogueUrl?: string;
  priceHistory: IPriceHistoryEntry[];
  updatedAt: Date;
  createdAt: Date;
}

const PriceHistoryEntrySchema = new Schema<IPriceHistoryEntry>(
  {
    date: { type: Date, default: Date.now },
    pricePerMT: { type: Number, required: true },
    changeVsPrevious: { type: Number, default: 0 },
  },
  { _id: false }
);

const PriceListSchema = new Schema<IPriceList>(
  {
    brandSlug: { type: String, required: true, index: true },
    brandName: { type: String, required: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    currentPricePerMT: { type: Number, required: true },
    unit: { type: String, default: "MT" },
    pdfCatalogueUrl: { type: String, default: "" },
    priceHistory: [PriceHistoryEntrySchema],
  },
  { timestamps: true }
);

export const PriceList: Model<IPriceList> =
  mongoose.models.PriceList || mongoose.model<IPriceList>("PriceList", PriceListSchema);
