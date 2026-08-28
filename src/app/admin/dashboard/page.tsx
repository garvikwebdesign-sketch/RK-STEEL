import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { BlogPost } from "@/models/BlogPost";
import { Lead } from "@/models/Lead";
import Link from "next/link";
import { Package, FileText, MessageSquare, Plus, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | RK STEEL CO",
};

export default async function AdminDashboardPage() {
  await connectToDatabase();
  const productCount = await Product.countDocuments();
  const blogCount = await BlogPost.countDocuments();
  const leadCount = await Lead.countDocuments();
  const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5).lean();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-500" />
            <h1 className="font-heading text-3xl font-bold text-navy-900">Admin Command Dashboard</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Full management access for products, technical blog posts, and customer leads.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/products"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
          <Link
            href="/admin/blog"
            className="bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" /> New Blog Post
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Products</div>
            <div className="font-heading text-4xl font-black text-navy-900 mt-1">{productCount}</div>
            <Link href="/admin/products" className="text-xs font-bold text-red-600 hover:underline mt-2 inline-block">
              Manage Products →
            </Link>
          </div>
          <div className="w-12 h-12 bg-navy-100 text-navy-900 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Published Articles</div>
            <div className="font-heading text-4xl font-black text-navy-900 mt-1">{blogCount}</div>
            <Link href="/admin/blog" className="text-xs font-bold text-red-600 hover:underline mt-2 inline-block">
              Manage Blog Posts →
            </Link>
          </div>
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lead Inquiries</div>
            <div className="font-heading text-4xl font-black text-navy-900 mt-1">{leadCount}</div>
            <Link href="/admin/leads" className="text-xs font-bold text-red-600 hover:underline mt-2 inline-block">
              View All Submissions →
            </Link>
          </div>
          <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h3 className="font-heading text-xl font-bold text-navy-900">Recent Customer Rate Inquiries</h3>
          <Link href="/admin/leads" className="text-xs font-bold text-red-600 hover:underline">
            View All ({leadCount}) →
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-xs text-gray-500 italic py-4">No inquiries submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-steel-100 text-navy-900 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Product Needed</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead: any) => (
                  <tr key={lead._id} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-navy-900">{lead.name}</td>
                    <td className="p-3 font-bold text-red-600">{lead.phone}</td>
                    <td className="p-3 text-gray-700">{lead.productRequirement || "General Inquiry"}</td>
                    <td className="p-3 text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
