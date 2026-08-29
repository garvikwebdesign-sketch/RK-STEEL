import { connectToDatabase } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import Link from "next/link";
import { FileText, Calendar, User, ChevronRight } from "lucide-react";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Steel News & Technical Blog | RK STEEL CO Noida",
  description: "Industry news, steel weight calculation formulas, Tata Tiscon features, and construction tips from RK STEEL CO. All steel and iron items under one roof.",
};

export default async function BlogListPage() {
  await headers();
  let posts: any[] = [];
  try {
    await connectToDatabase();
    posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean();
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
  }

  return (
    <div className="space-y-0 bg-steel-100 min-h-screen">
      {/* Banner */}
      <section className="bg-navy-950 text-white py-14 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-navy-900 text-gold-400 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 border border-navy-700">
            <FileText className="w-4 h-4 text-gold-500" />
            TECHNICAL ARTICLES &amp; NEWS • RK STEEL CO
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white">
            RK STEEL CO Insights &amp; Blog
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl mt-2 font-light">
            Stay informed with technical steel guides, IS standard specifications, material selection tips, and market insights.
          </p>
          <div className="mt-3 inline-block bg-red-950/70 border border-red-500/40 text-red-300 text-xs font-extrabold px-3.5 py-1.5 rounded font-sans">
            ALL STEEL AND IRON ITEMS UNDER ONE ROOF
          </div>
        </div>
      </section>

      {/* Grid of Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <h3 className="font-heading text-xl font-bold text-navy-900">No blog posts available yet</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <article
                  key={post._id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-gold-500/50 transition-all group"
                >
                  {post.coverImage?.url && (
                    <div
                      className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${post.coverImage.url}')` }}
                    />
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.map((t: string, tidx: number) => (
                          <span key={tidx} className="text-[10px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded border border-red-100">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-heading text-xl font-bold text-navy-900 group-hover:text-red-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-gold-500" />
                        {post.author || "RK Steel Team"}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-red-600 hover:text-navy-900 flex items-center gap-1"
                      >
                        Read Article
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
