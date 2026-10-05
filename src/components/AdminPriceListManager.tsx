"use client";

import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  TrendingUp,
  X,
  Upload,
  Eye,
  CheckCircle,
  FileText,
  Calendar,
  MapPin,
  ExternalLink,
  Download,
} from "lucide-react";

interface PriceItem {
  size: string;
  pricePerPiece?: number;
  pricePerMT?: number;
  unit?: string;
}

interface PriceListRecord {
  _id: string;
  title: string;
  brand: string;
  brandSlug: string;
  category: string;
  effectiveDate: string;
  validityRegion?: string;
  flyerUrl?: string;
  pdfUrl?: string;
  items: PriceItem[];
  notes: string[];
  isActive: boolean;
  isFeatured: boolean;
  currentPricePerMT?: number;
  unit: string;
  createdAt: string;
}

const BRAND_OPTIONS = [
  "Tata Tiscon",
  "SAIL",
  "JSW Steel",
  "Tata Structura",
  "Tata Durashine",
  "Tata Astrum",
  "APL Apollo",
  "Jindal Steel",
  "Other",
];

const CATEGORY_OPTIONS = [
  "TMT Bars",
  "Pipes & Hollow Sections",
  "Structural Steel",
  "Colour Coated & Roofing Sheets",
  "MS/HR/CR/GI Sheets & Plates",
  "Weldmesh",
  "Chain Link & Accessories",
];

export function AdminPriceListManager({
  initialPriceLists,
}: {
  initialPriceLists: PriceListRecord[];
}) {
  const [priceLists, setPriceLists] = useState<PriceListRecord[]>(initialPriceLists || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("Tata Tiscon");
  const [category, setCategory] = useState("TMT Bars");
  const [effectiveDate, setEffectiveDate] = useState("1st October 2026");
  const [validityRegion, setValidityRegion] = useState("Valid in West UP");
  const [flyerUrl, setFlyerUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [currentPricePerMT, setCurrentPricePerMT] = useState<number | "">("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [notesText, setNotesText] = useState(
    "The above prices are on each piece basis and are inclusive of all taxes.\nAll dimensions are subject to BIS Tolerances.\nCustomers can confirm the number of pieces received at the time of delivery."
  );

  const [items, setItems] = useState<PriceItem[]>([
    { size: "6 mm", pricePerPiece: 245, unit: "Per Piece" },
    { size: "8 mm", pricePerPiece: 417, unit: "Per Piece" },
    { size: "10 mm", pricePerPiece: 635, unit: "Per Piece" },
    { size: "12 mm", pricePerPiece: 891, unit: "Per Piece" },
    { size: "16 mm", pricePerPiece: 1586, unit: "Per Piece" },
    { size: "20 mm", pricePerPiece: 2479, unit: "Per Piece" },
    { size: "25 mm", pricePerPiece: 3864, unit: "Per Piece" },
    { size: "32 mm", pricePerPiece: 6379, unit: "Per Piece" },
  ]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [previewFlyerModal, setPreviewFlyerModal] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        setFlyerUrl(data.url);
      } else {
        alert(data.error || "File upload failed");
      }
    } catch {
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { size: "", pricePerPiece: 0, unit: "Per Piece" }]);
  };

  const handleRemoveItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const handleItemChange = (idx: number, field: keyof PriceItem, value: any) => {
    const updated = [...items];
    updated[idx] = { ...updated[idx], [field]: value };
    setItems(updated);
  };

  const resetForm = () => {
    setTitle("");
    setBrand("Tata Tiscon");
    setCategory("TMT Bars");
    setEffectiveDate("1st October 2026");
    setValidityRegion("Valid in West UP");
    setFlyerUrl("");
    setPdfUrl("");
    setCurrentPricePerMT("");
    setIsActive(true);
    setIsFeatured(false);
    setNotesText(
      "The above prices are on each piece basis and are inclusive of all taxes.\nAll dimensions are subject to BIS Tolerances.\nCustomers can confirm the number of pieces received at the time of delivery."
    );
    setItems([
      { size: "6 mm", pricePerPiece: 245, unit: "Per Piece" },
      { size: "8 mm", pricePerPiece: 417, unit: "Per Piece" },
      { size: "10 mm", pricePerPiece: 635, unit: "Per Piece" },
      { size: "12 mm", pricePerPiece: 891, unit: "Per Piece" },
      { size: "16 mm", pricePerPiece: 1586, unit: "Per Piece" },
      { size: "20 mm", pricePerPiece: 2479, unit: "Per Piece" },
      { size: "25 mm", pricePerPiece: 3864, unit: "Per Piece" },
      { size: "32 mm", pricePerPiece: 6379, unit: "Per Piece" },
    ]);
    setEditingId(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleOpenEdit = (record: PriceListRecord) => {
    setEditingId(record._id);
    setTitle(record.title);
    setBrand(record.brand);
    setCategory(record.category || "TMT Bars");
    setEffectiveDate(record.effectiveDate);
    setValidityRegion(record.validityRegion || "Valid in West UP");
    setFlyerUrl(record.flyerUrl || "");
    setPdfUrl(record.pdfUrl || "");
    setCurrentPricePerMT(record.currentPricePerMT || "");
    setIsActive(record.isActive);
    setIsFeatured(record.isFeatured);
    setNotesText(record.notes ? record.notes.join("\n") : "");
    setItems(record.items && record.items.length > 0 ? record.items : []);
    setModalOpen(true);
  };

  const handleToggleActive = async (record: PriceListRecord) => {
    try {
      const res = await fetch(`/api/admin/price-lists/${record._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !record.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setPriceLists((prev) =>
          prev.map((p) => (p._id === record._id ? { ...p, isActive: !p.isActive } : p))
        );
      }
    } catch {
      alert("Failed to toggle status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this price list?")) return;
    try {
      const res = await fetch(`/api/admin/price-lists/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPriceLists((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("Error deleting price list");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !brand || !effectiveDate) {
      alert("Please fill in Title, Brand, and Effective Date");
      return;
    }

    setLoading(true);
    const notesArray = notesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      brand,
      category,
      effectiveDate,
      validityRegion,
      flyerUrl,
      pdfUrl,
      currentPricePerMT: currentPricePerMT ? Number(currentPricePerMT) : 0,
      items,
      notes: notesArray,
      isActive,
      isFeatured,
    };

    try {
      const url = editingId ? `/api/admin/price-lists/${editingId}` : "/api/admin/price-lists";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        if (editingId) {
          setPriceLists((prev) =>
            prev.map((p) => (p._id === editingId ? data.priceList : p))
          );
        } else {
          setPriceLists((prev) => [data.priceList, ...prev]);
        }
        setModalOpen(false);
        resetForm();
      } else {
        alert(data.error || "Operation failed");
      }
    } catch {
      alert("Failed to save price list");
    } finally {
      setLoading(false);
    }
  };

  const filteredLists = priceLists.filter((p) => {
    const t = (p.title || (p as any).productName || "").toLowerCase();
    const b = (p.brand || (p as any).brandName || "").toLowerCase();
    const d = (p.effectiveDate || "").toLowerCase();
    const s = search.toLowerCase();
    return t.includes(s) || b.includes(s) || d.includes(s);
  });

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <h1 className="text-2xl font-bold text-slate-900 font-sans">
              Price Lists &amp; Rate Cards Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Upload and update official brand rate circulars, consumer price flyers (e.g. Tata Tiscon 550SD), effective dates, and per-piece rates.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Upload New Rate Card
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title, brand, or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
        />
        <div className="text-xs font-semibold text-slate-500">
          Total Rate Cards: <span className="text-slate-900 font-bold">{priceLists.length}</span>
        </div>
      </div>

      {/* Cards / Table List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            No price lists or rate cards found. Click "Upload New Rate Card" to add your first circular!
          </div>
        ) : (
          filteredLists.map((record) => {
            const title = record.title || (record as any).productName || "Rate Card";
            const brand = record.brand || (record as any).brandName || "Tata Tiscon";
            const effectiveDate = record.effectiveDate || "Latest";

            return (
              <div
                key={record._id}
                className={`bg-white rounded-2xl border transition-all shadow-sm flex flex-col justify-between overflow-hidden ${
                  record.isActive ? "border-slate-200 hover:border-slate-300" : "border-amber-200 bg-amber-50/20"
                }`}
              >
                <div>
                  {/* Image Banner / Flyer Preview */}
                  <div className="relative h-48 bg-slate-900 overflow-hidden flex items-center justify-center group">
                    {record.flyerUrl ? (
                      <img
                        src={record.flyerUrl}
                        alt={title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-slate-400 gap-2">
                        <FileText className="w-10 h-10 text-slate-600" />
                        <span className="text-xs">No flyer image uploaded</span>
                      </div>
                    )}

                    {/* Badges on top */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        {brand}
                      </span>
                      {record.isFeatured && (
                        <span className="bg-amber-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => handleToggleActive(record)}
                        className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded shadow cursor-pointer transition-colors ${
                          record.isActive
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        }`}
                      >
                        {record.isActive ? "Active Live" : "Draft / Inactive"}
                      </button>
                    </div>

                    {record.flyerUrl && (
                      <button
                        onClick={() => setPreviewFlyerModal(record.flyerUrl!)}
                        className="absolute bottom-3 right-3 bg-black/70 hover:bg-black text-white p-2 rounded-lg text-xs flex items-center gap-1.5 backdrop-blur-sm cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Flyer
                      </button>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 line-clamp-1">{title}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-red-600" />
                        <span>With Effect From: <strong className="text-slate-800">{effectiveDate}</strong></span>
                      </div>
                      {record.validityRegion && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{record.validityRegion}</span>
                        </div>
                      )}
                    </div>

                  {/* Price items count preview */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Items Configured:</span>
                      <span className="font-bold text-slate-800">{record.items?.length || 0} Sizes</span>
                    </div>
                    {record.items && record.items.length > 0 && (
                      <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] border-t border-slate-200">
                        {record.items.slice(0, 4).map((it, i) => (
                          <div key={i} className="flex justify-between bg-white px-2 py-1 rounded border border-slate-100">
                            <span className="font-semibold text-slate-600">{it.size}</span>
                            <span className="font-bold text-red-600">₹{it.pricePerPiece || it.pricePerMT}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(record)}
                    className="p-2 text-slate-700 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Edit Rate Card"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="p-2 text-slate-700 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    title="Delete Rate Card"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <a
                  href="/price-list"
                  target="_blank"
                  className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
                >
                  View on Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            );
          })
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl my-8 max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 font-sans">
                {editingId ? "Edit Rate Card / Price List" : "Upload New Rate Card / Price List"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Flyer upload banner */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Flyer / Circular Image (Rate Card Poster)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {flyerUrl ? (
                    <div className="relative w-36 h-48 bg-slate-100 rounded-xl overflow-hidden border border-slate-300 flex-shrink-0">
                      <img src={flyerUrl} alt="Preview" className="w-full h-full object-cover object-top" />
                      <button
                        type="button"
                        onClick={() => setFlyerUrl("")}
                        className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full text-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-36 h-48 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 p-3 text-center flex-shrink-0">
                      <Upload className="w-6 h-6 mb-1 text-slate-400" />
                      <span className="text-[11px]">Upload image flyer (JPEG/PNG/PDF)</span>
                    </div>
                  )}

                  <div className="space-y-2 flex-1 w-full">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
                    />
                    {uploading && (
                      <div className="text-xs text-red-600 font-semibold flex items-center gap-2">
                        Uploading flyer...
                      </div>
                    )}
                    <div className="text-[11px] text-slate-400">
                      Or paste an existing image or document URL:
                    </div>
                    <input
                      type="text"
                      placeholder="https://... or /uploads/..."
                      value={flyerUrl}
                      onChange={(e) => setFlyerUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* General Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Rate Card Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Tiscon 550SD Recommended Consumer Price List"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Brand *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500 bg-white"
                  >
                    {BRAND_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500 bg-white"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    With Effect From (Date) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1st OCTOBER 2026"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Validity Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Valid in West UP / Delhi NCR"
                    value={validityRegion}
                    onChange={(e) => setValidityRegion(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Dynamic Size & Price Rows */}
              <div className="space-y-3 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase">
                      Size-Wise Price Breakdown Table
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Enter each diameter/size and its consumer price (per piece or per MT).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Size Row
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200"
                    >
                      <input
                        type="text"
                        placeholder="Size (e.g. 8 mm)"
                        value={it.size}
                        onChange={(e) => handleItemChange(idx, "size", e.target.value)}
                        className="w-1/3 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-red-500"
                      />
                      <div className="relative w-1/3">
                        <span className="absolute left-2.5 top-1.5 text-xs text-slate-400">₹</span>
                        <input
                          type="number"
                          placeholder="Price"
                          value={it.pricePerPiece || ""}
                          onChange={(e) =>
                            handleItemChange(idx, "pricePerPiece", Number(e.target.value))
                          }
                          className="w-full pl-6 pr-2 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-red-500 font-bold"
                        />
                      </div>
                      <select
                        value={it.unit || "Per Piece"}
                        onChange={(e) => handleItemChange(idx, "unit", e.target.value)}
                        className="w-1/4 px-2 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Per Piece">Per Piece</option>
                        <option value="Per MT">Per MT</option>
                        <option value="Per Kg">Per Kg</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes & Terms */}
              <div className="space-y-1 border-t border-slate-200 pt-4">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Terms, Notes &amp; Disclaimers (One per line)
                </label>
                <textarea
                  rows={3}
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="e.g. All prices inclusive of taxes&#10;BIS Tolerances apply"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-red-500 leading-relaxed font-sans"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 border-t border-slate-200 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Active &amp; Visible on Public Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span>Featured Circular</span>
                </label>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {loading ? "Saving..." : editingId ? "Update Rate Card" : "Publish Rate Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLYER IMAGE LIGHTBOX PREVIEW */}
      {previewFlyerModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewFlyerModal(null)}
        >
          <div className="relative max-w-2xl max-h-[90vh] bg-white rounded-2xl p-2 shadow-2xl overflow-hidden flex flex-col items-center">
            <button
              onClick={() => setPreviewFlyerModal(null)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewFlyerModal}
              alt="Rate Card Flyer"
              className="max-h-[85vh] w-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
