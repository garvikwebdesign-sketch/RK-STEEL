"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  TrendingUp,
  TrendingDown,
  X,
  Upload,
  Eye,
  CheckCircle,
  FileText,
  Calendar,
  MapPin,
  ExternalLink,
  Download,
  ToggleLeft,
  ToggleRight,
  Layers,
  RefreshCw,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

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

interface WholesaleRateRecord {
  _id: string;
  brandSlug: string;
  brandName: string;
  category: string;
  todayPrice: string;
  yesterdayPrice: string;
  changeVsPrev: number;
  unit: string;
  pdfUrl?: string;
  history: Array<{ day: string; price: string }>;
  order: number;
  isActive: boolean;
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
  const [activeTab, setActiveTab] = useState<"flyers" | "wholesale">("flyers");
  const [priceLists, setPriceLists] = useState<PriceListRecord[]>(initialPriceLists || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states for Rate Cards / Flyers
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

  // Wholesale Rates state
  const [wholesaleRates, setWholesaleRates] = useState<WholesaleRateRecord[]>([]);
  const [showWholesaleSection, setShowWholesaleSection] = useState<boolean>(true);
  const [loadingWholesale, setLoadingWholesale] = useState(false);
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  const [editingWholesale, setEditingWholesale] = useState<WholesaleRateRecord | null>(null);

  // Wholesale Form fields
  const [wsBrandName, setWsBrandName] = useState("");
  const [wsBrandSlug, setWsBrandSlug] = useState("tata-tiscon");
  const [wsCategory, setWsCategory] = useState("TMT Rebars (550SD)");
  const [wsTodayPrice, setWsTodayPrice] = useState("");
  const [wsYesterdayPrice, setWsYesterdayPrice] = useState("");
  const [wsChangeVsPrev, setWsChangeVsPrev] = useState<number>(0);
  const [wsUnit, setWsUnit] = useState("MT");
  const [wsDay7Price, setWsDay7Price] = useState("");
  const [wsDay30Price, setWsDay30Price] = useState("");
  const [wsIsActive, setWsIsActive] = useState(true);

  // Fetch Wholesale Rates
  const loadWholesaleRates = async () => {
    setLoadingWholesale(true);
    try {
      const res = await fetch("/api/admin/wholesale-rates");
      const data = await res.json();
      if (data.rates) {
        setWholesaleRates(data.rates);
        setShowWholesaleSection(data.showWholesaleSection !== false);
      }
    } catch (err) {
      console.error("Error loading wholesale rates:", err);
    } finally {
      setLoadingWholesale(false);
    }
  };

  useEffect(() => {
    loadWholesaleRates();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4.5 * 1024 * 1024) {
      alert(
        `The selected file (${(file.size / (1024 * 1024)).toFixed(
          1
        )} MB) exceeds 4.5 MB. Vercel serverless functions reject payloads above 4.5 MB. Please compress the file or provide an external URL.`
      );
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        throw new Error(
          res.status === 413
            ? "File exceeds the 4.5 MB serverless limit. Please compress the file or use an external URL."
            : `Server returned status ${res.status}. Check your connection.`
        );
      }

      if (res.ok && data.url) {
        setFlyerUrl(data.url);
      } else {
        alert(data.error || "File upload failed");
      }
    } catch (err: any) {
      alert(err.message || "Error uploading file");
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
    setTitle(record.title || (record as any).productName || "");
    setBrand(record.brand || (record as any).brandName || "Tata Tiscon");
    setCategory(record.category || "TMT Bars");
    setEffectiveDate(record.effectiveDate || "1st October 2026");
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

  // Wholesale Rates Actions
  const handleToggleWholesaleSection = async () => {
    const nextState = !showWholesaleSection;
    try {
      const res = await fetch("/api/admin/wholesale-rates/toggle-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ show: nextState }),
      });
      const data = await res.json();
      if (data.success) {
        setShowWholesaleSection(data.showWholesaleSection);
      }
    } catch {
      alert("Failed to toggle wholesale section visibility");
    }
  };

  const handleOpenEditWholesale = (rate: WholesaleRateRecord) => {
    setEditingWholesale(rate);
    setWsBrandName(rate.brandName);
    setWsBrandSlug(rate.brandSlug);
    setWsCategory(rate.category);
    setWsTodayPrice(rate.todayPrice);
    setWsYesterdayPrice(rate.yesterdayPrice || "");
    setWsChangeVsPrev(rate.changeVsPrev || 0);
    setWsUnit(rate.unit || "MT");
    setWsIsActive(rate.isActive !== false);

    // Extract 7 days and 30 days ago
    const day7 = rate.history?.find((h) => h.day === "7 Days Ago")?.price || "";
    const day30 = rate.history?.find((h) => h.day === "30 Days Ago")?.price || "";
    setWsDay7Price(day7);
    setWsDay30Price(day30);

    setWholesaleModalOpen(true);
  };

  const handleOpenCreateWholesale = () => {
    setEditingWholesale(null);
    setWsBrandName("");
    setWsBrandSlug("tata-tiscon");
    setWsCategory("TMT Rebars (550SD)");
    setWsTodayPrice("");
    setWsYesterdayPrice("");
    setWsChangeVsPrev(0);
    setWsUnit("MT");
    setWsDay7Price("");
    setWsDay30Price("");
    setWsIsActive(true);
    setWholesaleModalOpen(true);
  };

  const handleSaveWholesale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wsBrandName || !wsTodayPrice) {
      alert("Please enter Brand Name and Today's Price");
      return;
    }

    setLoading(true);
    const history = [
      { day: "Today", price: wsTodayPrice },
      { day: "Yesterday", price: wsYesterdayPrice || wsTodayPrice },
      { day: "7 Days Ago", price: wsDay7Price || wsTodayPrice },
      { day: "30 Days Ago", price: wsDay30Price || wsTodayPrice },
    ];

    const payload = {
      brandName: wsBrandName,
      brandSlug: wsBrandSlug,
      category: wsCategory,
      todayPrice: wsTodayPrice,
      yesterdayPrice: wsYesterdayPrice,
      changeVsPrev: Number(wsChangeVsPrev) || 0,
      unit: wsUnit || "MT",
      history,
      isActive: wsIsActive,
    };

    try {
      const url = editingWholesale
        ? `/api/admin/wholesale-rates/${editingWholesale._id}`
        : "/api/admin/wholesale-rates";
      const method = editingWholesale ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        if (editingWholesale) {
          setWholesaleRates((prev) =>
            prev.map((r) => (r._id === editingWholesale._id ? data.rate : r))
          );
        } else {
          setWholesaleRates((prev) => [...prev, data.rate]);
        }
        setWholesaleModalOpen(false);
      } else {
        alert(data.error || "Failed to save wholesale rate");
      }
    } catch {
      alert("Error saving wholesale rate");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWholesale = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete wholesale rate for "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/wholesale-rates/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setWholesaleRates((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert(data.error || "Failed to delete");
      }
    } catch {
      alert("Error deleting wholesale rate");
    }
  };

  const handleToggleWholesaleActive = async (rate: WholesaleRateRecord) => {
    try {
      const res = await fetch(`/api/admin/wholesale-rates/${rate._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !rate.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setWholesaleRates((prev) =>
          prev.map((r) => (r._id === rate._id ? { ...r, isActive: !r.isActive } : r))
        );
      }
    } catch {
      alert("Failed to update status");
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
              Price Lists &amp; Market Rates Manager
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage both client consumer rate circulars (flyers/per-piece) and bulk wholesale ex-stockyard benchmark rates (Per MT).
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "flyers" ? (
            <button
              onClick={handleOpenCreate}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Upload Rate Card Flyer
            </button>
          ) : (
            <button
              onClick={handleOpenCreateWholesale}
              className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-gold-400" />
              Add Wholesale Brand Rate
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("flyers")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "flyers"
              ? "bg-red-600 text-white shadow"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <FileText className="w-4 h-4" />
          Consumer Price Lists &amp; Flyers ({priceLists.length})
        </button>

        <button
          onClick={() => setActiveTab("wholesale")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === "wholesale"
              ? "bg-navy-900 text-white shadow"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4 text-gold-400" />
          Wholesale Benchmark Rates (Per MT) ({wholesaleRates.length})
        </button>
      </div>

      {/* ===================== TAB 1: FLYERS & CONSUMER LISTS ===================== */}
      {activeTab === "flyers" && (
        <div className="space-y-6">
          {/* Search and count */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Search by title, brand, or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-red-500"
            />
            <div className="text-xs font-semibold text-slate-500">
              Showing <span className="text-slate-900 font-bold">{filteredLists.length}</span> of{" "}
              {priceLists.length} rate cards
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLists.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
                No price lists or rate cards found. Click "Upload Rate Card Flyer" to add your first circular!
              </div>
            ) : (
              filteredLists.map((record) => {
                const cardTitle = record.title || (record as any).productName || "Rate Card";
                const cardBrand = record.brand || (record as any).brandName || "Tata Tiscon";
                const cardDate = record.effectiveDate || "Latest";

                return (
                  <div
                    key={record._id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* Card Media Preview */}
                      <div className="relative h-48 bg-slate-100 border-b border-slate-100 flex items-center justify-center overflow-hidden group">
                        {record.flyerUrl ? (
                          <>
                            <img
                              src={record.flyerUrl}
                              alt={cardTitle}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <button
                              type="button"
                              onClick={() => setPreviewFlyerModal(record.flyerUrl!)}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 cursor-pointer"
                            >
                              <Eye className="w-4 h-4" /> Enlarge Circular
                            </button>
                          </>
                        ) : (
                          <div className="text-slate-400 flex flex-col items-center gap-2">
                            <FileText className="w-8 h-8" />
                            <span className="text-xs font-medium">Text / Table Rate Card</span>
                          </div>
                        )}

                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                              record.isActive
                                ? "bg-green-600 text-white"
                                : "bg-slate-700 text-slate-200"
                            }`}
                          >
                            {record.isActive ? "Published" : "Draft"}
                          </span>
                          {record.isFeatured && (
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase bg-amber-500 text-white">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-bold text-red-600 uppercase tracking-wider">
                            {cardBrand}
                          </span>
                          <span>{record.category}</span>
                        </div>

                        <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                          {cardTitle}
                        </h3>

                        <div className="space-y-1 text-xs text-slate-600 pt-1 border-t border-slate-100">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>Effective: {cardDate}</span>
                          </div>
                          {record.validityRegion && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>Region: {record.validityRegion}</span>
                            </div>
                          )}
                        </div>

                        {/* Breakdown preview */}
                        {record.items && record.items.length > 0 && (
                          <div className="pt-2">
                            <div className="text-[11px] font-bold uppercase text-slate-400 mb-1.5">
                              Sample Rates ({record.items.length} sizes configured):
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                              {record.items.slice(0, 4).map((it, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span className="text-slate-600 font-medium">{it.size}</span>
                                  <span className="font-bold text-red-600">
                                    ₹{it.pricePerPiece || it.pricePerMT || 0}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleActive(record)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          record.isActive
                            ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                            : "bg-green-600 border-green-600 text-white"
                        }`}
                      >
                        {record.isActive ? "Unpublish" : "Publish"}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(record)}
                          className="p-2 text-slate-600 hover:text-navy-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(record._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ===================== TAB 2: WHOLESALE BENCHMARK RATES ===================== */}
      {activeTab === "wholesale" && (
        <div className="space-y-6">
          {/* Section Visibility Master Switch */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900">
                  Public Website Wholesale Section Toggle
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    showWholesaleSection
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {showWholesaleSection ? "Section is LIVE" : "Section is HIDDEN"}
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                Controls the "Live Wholesale Ex-Stockyard Rates (Per MT)" block on the public{" "}
                <code className="text-red-600 bg-red-50 px-1 py-0.5 rounded">/price-list</code> page.
                If turned OFF, that entire wholesale benchmark part is completely hidden from visitors.
              </p>
            </div>

            <button
              onClick={handleToggleWholesaleSection}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow ${
                showWholesaleSection
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {showWholesaleSection ? (
                <>
                  <ToggleRight className="w-5 h-5" />
                  Turn Section OFF
                </>
              ) : (
                <>
                  <ToggleLeft className="w-5 h-5" />
                  Turn Section ON
                </>
              )}
            </button>
          </div>

          {/* Wholesale Rates Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wholesaleRates.length === 0 ? (
              <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
                {loadingWholesale ? (
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-red-600" />
                    <span>Loading wholesale rates...</span>
                  </div>
                ) : (
                  <div>
                    No wholesale benchmark rates found. Click "+ Add Wholesale Brand Rate" to create one!
                  </div>
                )}
              </div>
            ) : (
              wholesaleRates.map((ws) => (
                <div
                  key={ws._id}
                  className={`bg-white rounded-2xl border p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-all ${
                    ws.isActive ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50"
                  }`}
                >
                  <div className="space-y-3.5">
                    {/* Brand header */}
                    <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                      <div className="h-8 flex items-center">
                        <BrandLogo brand={ws.brandSlug} className="max-h-7" />
                      </div>
                      <div className="flex items-center gap-2">
                        {ws.changeVsPrev < 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
                            <TrendingDown className="w-3.5 h-3.5" />
                            ↓ ₹{Math.abs(ws.changeVsPrev)}/MT
                          </span>
                        ) : ws.changeVsPrev > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                            <TrendingUp className="w-3.5 h-3.5" />
                            ↑ ₹{ws.changeVsPrev}/MT
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                            Stable
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            ws.isActive ? "bg-green-600 text-white" : "bg-slate-400 text-white"
                          }`}
                        >
                          {ws.isActive ? "Active" : "Hidden"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase text-red-600">
                        {ws.category}
                      </div>
                      <h3 className="font-heading text-xl font-bold text-slate-900 mt-0.5">
                        {ws.brandName}
                      </h3>
                    </div>

                    {/* Today Price */}
                    <div className="bg-navy-950 text-white p-4 rounded-xl space-y-0.5">
                      <div className="text-[10px] text-gray-300 font-semibold uppercase tracking-wider">
                        Today's Estimated Rate
                      </div>
                      <div className="font-heading text-3xl font-black text-red-500">
                        ₹{ws.todayPrice}{" "}
                        <span className="text-xs font-normal text-gray-300 font-sans">
                          / {ws.unit || "MT"}
                        </span>
                      </div>
                    </div>

                    {/* Trend history preview */}
                    {ws.history && ws.history.length > 0 && (
                      <div className="space-y-1.5 pt-1 text-xs">
                        <div className="text-[11px] font-bold uppercase text-slate-400">
                          Price Trend Tracking:
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {ws.history.map((h, i) => (
                            <div
                              key={i}
                              className="flex justify-between bg-slate-50 p-2 rounded-lg text-slate-700 border border-slate-100"
                            >
                              <span className="text-slate-500">{h.day}:</span>
                              <span className="font-bold text-slate-900">₹{h.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleWholesaleActive(ws)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 underline cursor-pointer"
                    >
                      {ws.isActive ? "Hide on Site" : "Unhide"}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditWholesale(ws)}
                        className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit Rate
                      </button>
                      <button
                        onClick={() => handleDeleteWholesale(ws._id, ws.brandName)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete wholesale rate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ===================== MODAL 1: RATE CARD FLYER MODAL ===================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-6 font-sans">
              {editingId ? "Edit Rate Card Flyer" : "Upload New Rate Card & Flyer Circular"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Flyer upload box */}
              <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Flyer / Circular Image (Rate Card Poster)
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-28 h-32 bg-white rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-2 text-center overflow-hidden">
                    {flyerUrl ? (
                      <img src={flyerUrl} alt="Flyer preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-slate-400 flex flex-col items-center gap-1">
                        <Upload className="w-5 h-5 text-slate-400" />
                        <span className="text-[10px]">Upload image flyer (JPEG/PNG/PDF)</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="text-xs text-slate-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
                    />
                    {uploading && (
                      <p className="text-xs text-red-600 font-semibold animate-pulse">
                        Uploading file to database...
                      </p>
                    )}
                    <p className="text-[11px] text-slate-500">
                      Or paste an existing image or document URL:
                    </p>
                    <input
                      type="text"
                      placeholder="https://... or /api/files/..."
                      value={flyerUrl}
                      onChange={(e) => setFlyerUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Rate Card Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Tiscon 550SD Recommended Consumer Price List"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Brand *
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500"
                  >
                    {BRAND_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category, Date & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    With Effect From (Date) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1st October 2026"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Validity Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Valid in West UP"
                    value={validityRegion}
                    onChange={(e) => setValidityRegion(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Items Breakdown Table */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Size-Wise Price Breakdown Table
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Enter each diameter/size and its consumer price (per piece or per MT).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Size Row
                  </button>
                </div>

                <div className="space-y-2">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Size (e.g. 8 mm)"
                        value={it.size}
                        onChange={(e) => handleItemChange(idx, "size", e.target.value)}
                        className="w-1/3 px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                      />
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-2 text-xs text-slate-400">₹</span>
                        <input
                          type="number"
                          placeholder="Price"
                          value={it.pricePerPiece || ""}
                          onChange={(e) =>
                            handleItemChange(idx, "pricePerPiece", Number(e.target.value))
                          }
                          className="w-full pl-7 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <select
                        value={it.unit || "Per Piece"}
                        onChange={(e) => handleItemChange(idx, "unit", e.target.value)}
                        className="w-28 px-2 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Per Piece">Per Piece</option>
                        <option value="Per MT">Per MT</option>
                        <option value="Per Kg">Per Kg</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Terms &amp; Notes (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500 font-sans"
                />
              </div>

              {/* Status toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <span>Active &amp; Published</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
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

      {/* ===================== MODAL 2: WHOLESALE RATE EDIT / ADD MODAL ===================== */}
      {wholesaleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 my-8">
            <button
              onClick={() => setWholesaleModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold text-slate-900 font-sans">
                {editingWholesale ? `Update Wholesale Rate: ${wsBrandName}` : "Add Wholesale Benchmark Rate"}
              </h2>
            </div>

            <form onSubmit={handleSaveWholesale} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TATA TISCON"
                    value={wsBrandName}
                    onChange={(e) => setWsBrandName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Brand Logo Preset
                  </label>
                  <select
                    value={wsBrandSlug}
                    onChange={(e) => setWsBrandSlug(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500"
                  >
                    <option value="tata-tiscon">Tata Tiscon</option>
                    <option value="sail-seqr">SAIL SEQR</option>
                    <option value="tata-structura">Tata Structura</option>
                    <option value="tata-durashine">Tata Durashine</option>
                    <option value="tata-astrum">Tata Astrum</option>
                    <option value="jsw-neosteel">JSW Neosteel</option>
                    <option value="apl-apollo">APL Apollo</option>
                    <option value="jindal-panther">Jindal Panther</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Category Tag *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TMT Rebars (550SD) or Hollow Sections & Pipes"
                  value={wsCategory}
                  onChange={(e) => setWsCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Pricing Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Today's Rate (₹) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 54,500"
                    value={wsTodayPrice}
                    onChange={(e) => setWsTodayPrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold text-red-600 rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Yesterday's Rate (₹)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 55,000"
                    value={wsYesterdayPrice}
                    onChange={(e) => setWsYesterdayPrice(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold text-slate-700 rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    24h Change (₹/MT)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. -500 or 200"
                    value={wsChangeVsPrev}
                    onChange={(e) => setWsChangeVsPrev(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold text-slate-700 rounded-lg border border-slate-200 bg-white"
                  />
                  <span className="text-[10px] text-slate-400">Negative = drop, positive = hike</span>
                </div>
              </div>

              {/* Trend Tracking Days */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Historical Volatility Trend Index
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">7 Days Ago Price (₹):</label>
                    <input
                      type="text"
                      placeholder="e.g. 55,200"
                      value={wsDay7Price}
                      onChange={(e) => setWsDay7Price(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">30 Days Ago Price (₹):</label>
                    <input
                      type="text"
                      placeholder="e.g. 56,000"
                      value={wsDay30Price}
                      onChange={(e) => setWsDay30Price(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Active Toggle */}
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={wsIsActive}
                  onChange={(e) => setWsIsActive(e.target.checked)}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <span>Active &amp; Visible on Public Website</span>
              </label>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setWholesaleModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {loading ? "Saving..." : editingWholesale ? "Update Wholesale Rate" : "Add Brand Rate"}
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
