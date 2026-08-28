import { connectToDatabase } from "@/lib/db";
import { Lead } from "@/models/Lead";
import { MessageSquare, Phone, Mail, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Inquiries & Leads | RK STEEL CO",
};

export default async function AdminLeadsPage() {
  await connectToDatabase();
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-gold-500" />
          <h1 className="font-heading text-3xl font-bold text-navy-900">Customer Quote Inquiries & Leads</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Read-only log of customer contact submissions received through the website. Total ({leads.length}).
        </p>
      </div>

      {/* Leads Cards / Table */}
      {leads.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-gray-200">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <h3 className="font-heading text-xl font-bold text-navy-900">No leads received yet</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead: any) => (
            <div
              key={lead._id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-gold-500/50 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy-900">{lead.name}</h3>
                  {lead.productRequirement && (
                    <div className="text-xs font-bold text-red-600 uppercase mt-0.5">
                      Interested In: {lead.productRequirement}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gold-500" />
                  {new Date(lead.createdAt).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-700 bg-steel-50 p-2.5 rounded border border-gray-200">
                  <Phone className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <strong className="text-navy-900">Phone:</strong>
                  <a href={`tel:${lead.phone}`} className="font-bold text-red-600 hover:underline">
                    {lead.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-gray-700 bg-steel-50 p-2.5 rounded border border-gray-200">
                  <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <strong className="text-navy-900">Email:</strong>
                  <a href={`mailto:${lead.email}`} className="text-navy-900 hover:underline">
                    {lead.email}
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-800 leading-relaxed">
                <strong className="block text-navy-900 mb-1">Message Detail:</strong>
                {lead.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
