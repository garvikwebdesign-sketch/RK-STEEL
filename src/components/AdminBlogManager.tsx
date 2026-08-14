"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2, X, FileText, CheckCircle, Upload } from "lucide-react";

export function AdminBlogManager({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState<any[]>(initialPosts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    contentHtml: "",
    coverImageUrl: "",
    author: "RK Steel Technical Team",
    tagsText: "",
    published: true,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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
        setFormData((prev) => ({ ...prev, coverImageUrl: data.url }));
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
      title: "",
      excerpt: "",
      contentHtml: "",
      coverImageUrl: "",
      author: "RK Steel Technical Team",
      tagsText: "",
      published: true,
    });
    setEditingId(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setModalOpen(true);
  };

  const handleOpenEdit = (post: any) => {
    setEditingId(post._id);
    setFormData({
      author: post.author || "RK Steel Technical Team",
      tagsText: post.tags ? post.tags.join(", ") : "",
      published: !!post.published,
      title: post.title || "",
      excerpt: post.excerpt || "",
      contentHtml: post.contentHtml || "",
      coverImageUrl: post.coverImage?.url || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((p) => p._id !== id));
      } else {
        alert(data.error || "Delete failed");
      }
    } catch {
      alert("Error deleting blog post");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tags = formData.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title: formData.title,
      excerpt: formData.excerpt,
      contentHtml: formData.contentHtml,
      coverImage: formData.coverImageUrl ? { url: formData.coverImageUrl } : undefined,
      author: formData.author,
      tags,
      published: formData.published,
    };

    try {
      const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        if (editingId) {
          setPosts(posts.map((p) => (p._id === editingId ? data.post : p)));
        } else {
          setPosts([data.post, ...posts]);
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

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy-900">Manage Technical Blog Posts</h1>
          <p className="text-xs text-gray-500 mt-1">Publish news, steel standards guides, and civil engineering tips.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold text-xs uppercase px-5 py-3 rounded-lg flex items-center gap-2 shadow"
        >
          <Plus className="w-4 h-4" /> Create New Blog Article
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950 text-white font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Article Title</th>
                <th className="p-4">Author</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-navy-900 max-w-xs truncate">{post.title}</td>
                  <td className="p-4 text-gray-700">{post.author}</td>
                  <td className="p-4">
                    {post.published ? (
                      <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[10px]">
                        Published
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded text-[10px]">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(post)}
                      className="bg-navy-100 text-navy-900 p-2 rounded hover:bg-navy-900 hover:text-white transition-colors"
                      title="Edit Article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(post._id)}
                      className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-heading text-2xl font-bold text-navy-900">
                {editingId ? "Edit Technical Blog Post" : "Create New Blog Post"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-navy-900">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Why Tata Tiscon 550SD is Gold Standard for NCR"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Short Excerpt / Teaser
                </label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary displayed on article preview cards"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Article Body (HTML content) *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.contentHtml}
                  onChange={(e) => setFormData({ ...formData, contentHtml: e.target.value })}
                  placeholder="<p>Write or paste HTML formatted article content here...</p>"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs font-mono focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                    Cloudinary Cover Image URL
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={formData.coverImageUrl}
                      onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
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
                      {formData.coverImageUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, coverImageUrl: "" })}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-3 py-2.5 rounded-lg flex items-center justify-center gap-1 shadow"
                          title="Clear Image"
                        >
                          <Trash2 className="w-4 h-4" />
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="RK Steel Technical Team"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tagsText}
                  onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                  placeholder="Tata Tiscon, TMT Bars, Construction Tips"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-navy-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-heading font-bold text-sm uppercase py-3 rounded-lg shadow-lg disabled:opacity-50"
              >
                {loading ? "Saving Post..." : editingId ? "Update Blog Post" : "Publish Blog Post"}
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
                Are you sure you want to delete this blog post? This action cannot be undone.
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
