"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ContactForm({ initialProduct = "" }: { initialProduct?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productRequirement: initialProduct,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setFormData({ name: "", email: "", phone: "", productRequirement: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to submit request.");
      }
    } catch {
      setErrorMsg("Network error occurred. Please call our office directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {successMsg && (
        <div className="bg-green-50 text-green-800 p-4 rounded-lg text-xs font-bold flex items-center gap-2 border border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 text-red-800 p-4 rounded-lg text-xs font-bold flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ramesh Kumar"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. 9999307984"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@company.com"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
            Product Requirement / Brand
          </label>
          <input
            type="text"
            value={formData.productRequirement}
            onChange={(e) => setFormData({ ...formData, productRequirement: e.target.value })}
            placeholder="e.g. Tata Tiscon 12mm / SAIL SEQR / Durashine"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
          Detailed Message / Quantity Specs *
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Specify tonnages, size schedules, or delivery location in NCR..."
          className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-navy-900 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-heading font-bold text-sm uppercase tracking-wider py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending Request...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Rate Quote Request
          </>
        )}
      </button>
    </form>
  );
}
