"use client";

import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  FileText,
  X,
  Upload,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Eye,
  Award,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

export interface CatalogueRecord {
  _id: string;
  title: string;
  brand: string;
  brandKey: string;
  desc: string;
  pdfUrl: string;
  fileSize: string;
  isMaster: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
}

const BRAND_OPTIONS = [
  { name: "RK STEEL CO", key: "tata-steel" },
  { name: "Tata Tiscon", key: "tata-tiscon" },
  { name: "SAIL", key: "sail" },
  { name: "Tata Structura", key: "tata-structura" },
  { name: "Tata Durashine", key: "tata-durashine" },
  { name: "Tata Astrum", key: "tata-astrum" },
  { name: "JSW Steel", key: "jsw-steel" },
  { name: "APL Apollo", key: "apl-apollo" },
  { name: "Jindal Steel & Power", key: "jindal-steel" },
  { name: "Other Brand", key: "other" },
];

export function AdminCatalogueManager({
  initialCatalogues,
}: {
  initialCatalogues: CatalogueRecord[];
}) {
  const [catalogues, setCatalogues] = useState<CatalogueRecord[]>(initialCatalogues || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("Tata Tiscon");
  const [brandKey, setBrandKey] = useState("tata-tiscon");
  const [desc, setDesc] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [fileSize, setFileSize] = useState("2.5 MB PDF");
  const [isMaster, setIsMaster] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const handleBrandChange = (selectedName: string) => {
    setBrand(selectedName);
    const found = BRAND_OPTIONS.find((b) => b.name === selectedName);
    if (found) {
      setBrandKey(found.key);
    } else {
      setBrandKey(selectedName.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Auto-calculate file size string
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    setFileSize(`${sizeInMb} MB PDF`);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setPdfUrl(data.url);
      } else {
        alert(data.error || "PDF upload failed");
      }
    } catch {
      alert("Error uploading PDF file");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setBrand("Tata Tiscon");
    setBrandKey("tata-tiscon");
    setDesc("");
    setPdfUrl("");
    setFileSize("2.5 MB PDF");
    setIsMaster(false);
    setIsActive(true);
    setOrder(0);
    setEditingId(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleOpenEdit = (record: CatalogueRecord) => {
    setEditingId(record._id);
    setTitle(record.title);
    setBrand(record.brand);
    setBrandKey(record.brandKey || "tata-steel");
    setDesc(record.desc || "");
    setPdfUrl(record.pdfUrl || "");
    setFileSize(record.fileSize || "PDF Brochure");
    setIsMaster(record.isMaster);
    setIsActive(record.isActive);
    setOrder(record.order || 0);
    setModalOpen(true);
  };

  const handleToggleActive = async (record: CatalogueRecord) => {
    try {
      const res = await fetch(`/api/admin/catalogues/${record._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !record.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setCatalogues((prev) =>
          prev.map((c) => (c._id === record._id ? { ...c, isActive: !c.isActive } : c))
        );
      }
    } catch {
      alert("Failed to toggle status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this catalogue?")) return;
    try {
      const res = await fetch(`/api/admin/catalogues/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCatalogues((prev) => prev.filter((c) => c._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("Error deleting catalogue");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !brand || !pdfUrl) {
      alert("Please provide Title, Brand, and a PDF file/URL");
      return;
    }

    setLoading(true);
    const payload = {
      title,
      brand,
      brandKey,
      desc,
      pdfUrl,
      fileSize,
      isMaster,
      isActive,
      order,
    };

    try {
      const url = editingId ? `/api/admin/catalogues/${editingId}` : "/api/admin/catalogues";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        if (editingId) {
          setCatalogues((prev) =>
            prev.map((c) => (c._id === editingId ? data.catalogue : c))
          );
        } else {
          setCatalogues((prev) => [data.catalogue, ...prev]);
        }
        setModalOpen(false);
        resetForm();
      } else {
        alert(data.error || "Operation failed");
      }
    } catch {
      alert("Failed to save catalogue");
    } finally {
      setLoading(false);
    }
  };

  const filteredCatalogues = catalogues.filter((c) => {
    const t = (c.title || "").toLowerCase();
    const b = (c.brand || "").toLowerCase();
    const s = search.toLowerCase();
    return t.includes(s) || b.includes(s);
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            <h1 className="text-2xl font-bold text-slate-900 font-sans">
              Product Catalogues &amp; Brochures Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Upload official PDF product catalogues, technical brochures, and master catalogues displayed in Knowledge Center &gt; Catalogues.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Upload New Catalogue
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
        />
        <div className="text-xs font-semibold text-slate-500">
          Total Catalogues: <span className="text-slate-900 font-bold">{catalogues.length}</span>
        </div>
      </div>

      {/* Grid of Catalogues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCatalogues.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            No catalogues found. Click "Upload New Catalogue" to add your first PDF brochure!
          </div>
        ) : (
          filteredCatalogues.map((cat) => (
            <div
              key={cat._id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all ${
                cat.isMaster ? "border-2 border-red-500 bg-red-50/10" : "border-slate-200"
              }`}
            >
              <div className="space-y-4">
                {/* Brand & Size Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="h-8 flex items-center">
                    <BrandLogo brand={cat.brandKey} className="max-h-7" />
                  </div>
                  <div className="flex items-center gap-2">
                    {cat.isMaster && (
                      <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        Master
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      {cat.fileSize}
                    </span>
                  </div>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug font-sans">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-5 mt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleToggleActive(cat)}
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded transition-colors cursor-pointer ${
                      cat.isActive
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.isActive ? "Published" : "Draft"}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-slate-50 rounded-lg cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-slate-50 rounded-lg cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <a
                  href={cat.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold text-xs uppercase py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  View / Download PDF
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl my-8 max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 font-sans">
                {editingId ? "Edit Catalogue / Brochure" : "Upload New Catalogue / Brochure"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Catalogue Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Tiscon 550SD Product Catalogue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Brand *</label>
                  <select
                    value={brand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500 bg-white"
                  >
                    {BRAND_OPTIONS.map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    File Size Label
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2.1 MB PDF"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* PDF File Upload */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Upload PDF File *
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  disabled={uploading}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
                />
                {uploading && (
                  <div className="text-xs text-red-600 font-semibold flex items-center gap-1.5">
                    Uploading PDF document...
                  </div>
                )}
                <div className="text-[11px] text-slate-400">
                  Or enter document URL directly:
                </div>
                <input
                  type="text"
                  required
                  placeholder="https://... or /uploads/..."
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-1 border-t border-slate-100 pt-3">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Brochure Description
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="e.g. Official technical brochure with mechanical properties, bendability guidelines..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-red-500 leading-relaxed font-sans"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 border-t border-slate-200 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isMaster}
                    onChange={(e) => setIsMaster(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Master Product Catalogue (Highlighted)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Published on Website</span>
                </label>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {loading ? "Saving..." : editingId ? "Update Catalogue" : "Publish Catalogue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
