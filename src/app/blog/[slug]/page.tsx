import { connectToDatabase } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import Link from "next/link";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
  
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await connectToDatabase();
    const post = await BlogPost.findOne({ slug }).lean();
    if (!post) return { title: "Article Not Found" };
    return {
      title: `${post.title} | RK STEEL CO Technical Insights`,
      description: post.excerpt || post.title,
    };
  } catch {
    return { title: "Blog Article | RK STEEL CO" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: any = null;
  try {
    await connectToDatabase();
    post = await BlogPost.findOne({ slug }).lean();
  } catch (err) {
    console.error("Failed to fetch blog post:", err);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-steel-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Articles
        </Link>

        <article className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {post.coverImage?.url && (
            <div
              className="h-80 bg-cover bg-center"
              style={{ backgroundImage: `url('${post.coverImage.url}')` }}
            />
          )}

          <div className="p-8 sm:p-12 space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag: string, idx: number) => (
                <span key={idx} className="text-xs bg-red-50 text-red-600 font-bold px-3 py-1 rounded border border-red-100">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-gray-500 border-y border-gray-100 py-3">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-gold-500" />
                {post.author || "RK STEEL CO Editorial"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-red-500" />
                {new Date(post.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div
              className="prose prose-navy max-w-none text-sm text-gray-700 leading-relaxed space-y-4 pt-2"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
