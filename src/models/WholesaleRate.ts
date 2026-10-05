import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWholesaleHistory {
  day: string; // e.g. "Today", "Yesterday", "7 Days Ago", "30 Days Ago"
  price: string; // e.g. "54,500"
}

export interface IWholesaleRate extends Document {
  brandSlug: string; // e.g. "tata-tiscon"
  brandName: string; // e.g. "TATA TISCON"
  category: string; // e.g. "TMT Rebars (550SD)"
  todayPrice: string; // e.g. "54,500"
  yesterdayPrice: string; // e.g. "55,000"
  changeVsPrev: number; // e.g. -500
  unit: string; // e.g. "MT"
  pdfUrl?: string; // e.g. "/catalogues"
  history: IWholesaleHistory[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WholesaleHistorySchema = new Schema<IWholesaleHistory>(
  {
    day: { type: String, required: true },
    price: { type: String, required: true },
  },
  { _id: false }
);

const WholesaleRateSchema = new Schema<IWholesaleRate>(
  {
    brandSlug: { type: String, required: true, unique: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    todayPrice: { type: String, required: true },
    yesterdayPrice: { type: String, default: "" },
    changeVsPrev: { type: Number, default: 0 },
    unit: { type: String, default: "MT" },
    pdfUrl: { type: String, default: "/catalogues" },
    history: { type: [WholesaleHistorySchema], default: [] },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const WholesaleRate: Model<IWholesaleRate> =
  mongoose.models.WholesaleRate ||
  mongoose.model<IWholesaleRate>("WholesaleRate", WholesaleRateSchema);
