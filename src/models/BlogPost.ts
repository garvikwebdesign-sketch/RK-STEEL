import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  contentHtml: string;
  excerpt?: string;
  coverImage?: {
    url: string;
    publicId?: string;
  };
  author: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    contentHtml: { type: String, required: true },
    excerpt: { type: String, default: "" },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    author: { type: String, default: "RK STEEL CO Editorial" },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
