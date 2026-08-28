import { connectToDatabase } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import { AdminBlogManager } from "@/components/AdminBlogManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Blog CRUD | RK STEEL CO",
};

export default async function AdminBlogPage() {
  await connectToDatabase();
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
  const serializedPosts = JSON.parse(JSON.stringify(posts));

  return <AdminBlogManager initialPosts={serializedPosts} />;
}
