"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2, ShieldCheck, X, Upload } from "lucide-react";

export function AdminProductManager({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState<any[]>(initialProducts || []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "Tata Steel",
    category: "TMT Bars",
    gradeStandard: "",
    sizeRange: "",
    description: "",
    specsText: "",
    imageUrl: "",
    authorisedDealer: true,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uData = new FormData();
    uData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uData,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, imageUrl: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "Tata Steel",
      category: "TMT Bars",
      gradeStandard: "",
      sizeRange: "",
      description: "",
      specsText: "",
      imageUrl: "",
      authorisedDealer: true,
    });
    setEditingId(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleOpenEdit = (prod: any) => {
    setEditingId(prod._id);
    setFormData({
      name: prod.name || prod.title || "",
      brand: prod.brand || "Tata Steel",
      category: prod.category || "TMT Bars",
      gradeStandard: prod.gradeStandard || "",
      sizeRange: prod.sizeRange || "",
      description: prod.description || "",
      specsText: prod.specs ? prod.specs.join("\n") : "",
      imageUrl: prod.images?.[0]?.url || prod.imageUrl || "",
      authorisedDealer: !!prod.authorisedDealer,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts(products.filter((p) => p._id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch {
      alert("Error deleting product");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const specs = formData.specsText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      name: formData.name,
      title: formData.name,
      brand: formData.brand,
      category: formData.category,
      gradeStandard: formData.gradeStandard,
      sizeRange: formData.sizeRange,
      description: formData.description,
      specs,
      images: formData.imageUrl ? [{ url: formData.imageUrl }] : [],
      imageUrl: formData.imageUrl,
      authorisedDealer: formData.authorisedDealer,
    };

    try {
      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        if (editingId) {
          setProducts(products.map((p) => (p._id === editingId ? data.product : p)));
        } else {
          setProducts([data.product, ...products]);
        }
        setModalOpen(false);
        resetForm();
      } else {
        alert(data.error || "Operation failed");
      }
    } catch {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const filtered = (products || []).filter(
    (p) =>
      (p?.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p?.brand || "").toLowerCase().includes(search.toLowerCase()) ||
      (p?.category || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy-900">Manage Product Catalogue</h1>
          <p className="text-xs text-gray-500 mt-1">Create, edit, or remove steel inventory lines & brand badges.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-5 py-3 rounded-lg flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" /> Add New Steel Product
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter products by name, brand, or category..."
          className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
        />
      </div>

      {/* Table View */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950 text-white font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4 w-16">Image</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Authorised</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((prod) => {
                const thumb = prod.images?.[0]?.url || prod.imageUrl || "";
                return (
                  <tr key={prod._id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt={prod.name || "Product"}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-[9px] text-gray-400 font-bold">NO IMG</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-navy-900">{prod.name || prod.title}</td>
                    <td className="p-4 text-gray-700">{prod.brand}</td>
                    <td className="p-4 text-gray-600">{prod.category}</td>
                    <td className="p-4">
                      {prod.authorisedDealer ? (
                        <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-[10px] inline-flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Authorised
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(prod)}
                        className="bg-navy-100 text-navy-900 p-2 rounded hover:bg-navy-900 hover:text-white transition-colors"
                        title="Edit Product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(prod._id)}
                        className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-heading text-2xl font-bold text-navy-900">
                {editingId ? "Edit Steel Product" : "Create New Steel Product"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-navy-900">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tata Tiscon 550SD"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Tata Steel / SAIL / JSW"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  >
                    <option value="TMT Bars">TMT Bars</option>
                    <option value="Pipes & Hollow Sections">Pipes & Hollow Sections</option>
                    <option value="Structural Steel">Structural Steel</option>
                    <option value="Colour Coated & Roofing Sheets">Colour Coated & Roofing Sheets</option>
                    <option value="MS/HR/CR/GI Sheets & Plates">MS/HR/CR/GI Sheets & Plates</option>
                    <option value="Weldmesh">Weldmesh</option>
                    <option value="Chain Link & Accessories">Chain Link & Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                    Grade / Standard (IS)
                  </label>
                  <input
                    type="text"
                    value={formData.gradeStandard}
                    onChange={(e) => setFormData({ ...formData, gradeStandard: e.target.value })}
                    placeholder="e.g. Fe 550SD / IS 1786"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Size Range
                </label>
                <input
                  type="text"
                  value={formData.sizeRange}
                  onChange={(e) => setFormData({ ...formData, sizeRange: e.target.value })}
                  placeholder="e.g. 8mm to 32mm"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Technical Specs (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.specsText}
                  onChange={(e) => setFormData({ ...formData, specsText: e.target.value })}
                  placeholder="Super Ductile grade with high strain capacity&#10;Earthquake resistant rib design"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Cloudinary Image URL
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://res.cloudinary.com/... or Unsplash image URL"
                    className="flex-1 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <label className="cursor-pointer bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow whitespace-nowrap min-h-[38px] disabled:opacity-50 flex-1 sm:flex-none">
                      <Upload className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload File"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    {formData.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: "" })}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-3 py-2.5 rounded-lg flex items-center justify-center gap-1 shadow"
                        title="Clear Image"
                      >
                        <Trash2 className="w-4 h-4" />
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {formData.imageUrl && (
                  <div className="mt-2.5 p-2 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-14 h-14 object-cover rounded border border-gray-300 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="text-[11px] text-gray-500 overflow-hidden flex-1">
                      <span className="font-bold text-gray-800 block">Image Preview</span>
                      <span className="truncate block font-mono text-[10px] text-gray-600">{formData.imageUrl}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="authorisedDealer"
                  checked={formData.authorisedDealer}
                  onChange={(e) => setFormData({ ...formData, authorisedDealer: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <label htmlFor="authorisedDealer" className="text-xs font-bold text-navy-900">
                  Mark as Authorised Dealer Product (Shows Badge)
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-heading font-bold text-sm uppercase py-3 rounded-lg shadow-lg disabled:opacity-50"
              >
                {loading ? "Saving Product..." : editingId ? "Update Product" : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 space-y-6 text-center border border-gray-100">
            <div className="mx-auto w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-xl font-bold text-navy-900">
                Confirm Deletion
              </h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to delete this product from the inventory? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs uppercase py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase py-3 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
