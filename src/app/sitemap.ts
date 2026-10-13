import { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/db";
import { PriceList } from "@/models/PriceList";
import { Product } from "@/models/Product";
import { BlogPost } from "@/models/BlogPost";
import { WholesaleRate } from "@/models/WholesaleRate";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.rksteelcompany.in";
  const now = new Date();

  // Core static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/price-list`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/catalogues`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
  ];

  // Static brand showcase pages
  const brandPages = [
    "tata-tiscon",
    "sail-seqr",
    "tata-structura",
    "tata-durashine",
    "tata-astrum",
    "jsw-neosteel",
    "apl-apollo",
  ];
  for (const brandSlug of brandPages) {
    routes.push({
      url: `${baseUrl}/brands/${brandSlug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Pre-seed known price pages to guarantee inclusion even before DB query
  const defaultPriceSlugs = [
    "tata-tiscon",
    "tata-structura",
    "tata-durashine",
    "tata-kosh",
    "sail-seqr",
  ];
  const pricePageMap = new Map<string, { lastModified: Date; priority: number }>();
  for (const slug of defaultPriceSlugs) {
    pricePageMap.set(slug, { lastModified: now, priority: 0.9 });
  }

  try {
    await connectToDatabase();

    // Query active PriceLists
    const priceLists = await PriceList.find({ isActive: true })
      .select("brandSlug updatedAt createdAt")
      .lean();

    for (const pl of priceLists) {
      if (pl.brandSlug) {
        pricePageMap.set(pl.brandSlug, {
          lastModified: pl.updatedAt ? new Date(pl.updatedAt) : (pl.createdAt ? new Date(pl.createdAt) : now),
          priority: 0.9,
        });
      }
    }

    // Add mapped price pages to sitemap
    pricePageMap.forEach((meta, slug) => {
      routes.push({
        url: `${baseUrl}/price-list/${slug}`,
        lastModified: meta.lastModified,
        changeFrequency: "daily",
        priority: meta.priority,
      });
    });

    // Query dynamic products
    const products = await Product.find()
      .select("slug updatedAt createdAt")
      .lean();

    for (const prod of products) {
      if (prod.slug) {
        routes.push({
          url: `${baseUrl}/products/${prod.slug}`,
          lastModified: prod.updatedAt ? new Date(prod.updatedAt) : (prod.createdAt ? new Date(prod.createdAt) : now),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }

    // Query published blog posts
    const blogPosts = await BlogPost.find({ published: true })
      .select("slug updatedAt createdAt")
      .lean();

    for (const post of blogPosts) {
      if (post.slug) {
        routes.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : (post.createdAt ? new Date(post.createdAt) : now),
          changeFrequency: "monthly",
          priority: 0.65,
        });
      }
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap from database:", error);
    // In case of DB disconnection, still push default price pages
    pricePageMap.forEach((meta, slug) => {
      routes.push({
        url: `${baseUrl}/price-list/${slug}`,
        lastModified: meta.lastModified,
        changeFrequency: "daily",
        priority: meta.priority,
      });
    });
  }

  return routes;
}
