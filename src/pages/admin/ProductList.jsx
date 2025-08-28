
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "https://api-sepokat.vercel.app/api/product";

// Variants untuk animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// eslint-disable-next-line no-unused-vars
const formVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const ProductList = () => {
  // STATE DATA & UI
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // SEARCH & SORT
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  // FORM TAMBAH
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stok: "",
    image_1: "",
  });

  // EDIT
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    stok: "",
    image_1: "",
  });

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await fetch(`${API_BASE}/get-all`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr("Gagal mengambil data produk.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE ADD PRODUCT
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("Tambah produk gagal");
      setNewProduct({ name: "", price: "", stok: "", image_1: "" });
      await fetchProducts();
      alert("Produk berhasil ditambahkan!");
    } catch (e) {
      alert("Tambah produk gagal!");
      console.error(e);
    }
  };

  // HANDLE DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return;
    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Hapus produk gagal");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Produk dihapus.");
    } catch (e) {
      alert("Gagal menghapus produk!");
      console.error(e);
    }
  };

  // START EDIT
  const startEdit = (p) => {
    setEditId(p.id);
    setEditForm({
      name: p.name ?? "",
      price: p.price ?? "",
      stok: p.stok ?? "",
      image_1: p.image_1 ?? "",
    });
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Update produk gagal");
      setEditId(null);
      await fetchProducts();
      alert("Produk berhasil diupdate!");
    } catch (e) {
      alert("Update produk gagal!");
      console.error(e);
    }
  };

  // FILTER AND SORT
  const normalized = products
    .filter((p) =>
      p.name?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const [key, dir] = sortBy.split("-");
      const mul = dir === "asc" ? 1 : -1;

      if (key === "name") {
        return a.name.localeCompare(b.name) * mul;
      }
      if (key === "price") {
        return (Number(a.price) - Number(b.price)) * mul;
      }
      if (key === "stok") {
        return (Number(a.stok) - Number(b.stok)) * mul;
      }
      return 0;
    });

  // PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = normalized.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(normalized.length / itemsPerPage);

  // IMAGE ERROR HANDLER
  const onImgError = (e) => {
    e.currentTarget.src = "https://via.placeholder.com/200x200?text=No+Image";
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Product Management</h1>
          <p className="text-gray-600">Kelola produk Luxora Store dengan mudah</p>
        </motion.div>

        {/* SEARCH AND SORT */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 mb-6 border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari nama produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50"
                />
              </div>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50"
            >
              <option value="name-asc">Nama A → Z</option>
              <option value="name-desc">Nama Z → A</option>
              <option value="price-asc">Harga termurah</option>
              <option value="price-desc">Harga termahal</option>
              <option value="stok-asc">Stok sedikit → banyak</option>
              <option value="stok-desc">Stok banyak → sedikit</option>
            </select>
          </div>
        </motion.div>

        {/* ADD PRODUCT FORM */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Tambah Produk Baru</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Nama Produk</label>
              <input
                placeholder="Nama produk"
                value={newProduct.name}
                onChange={(e) => setNewProduct((s) => ({ ...s, name: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Harga</label>
              <input
                type="number"
                placeholder="Harga"
                value={newProduct.price}
                onChange={(e) => setNewProduct((s) => ({ ...s, price: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Stok</label>
              <input
                type="number"
                placeholder="Stok"
                value={newProduct.stok}
                onChange={(e) => setNewProduct((s) => ({ ...s, stok: e.target.value }))}
                required
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">URL Gambar</label>
              <input
                placeholder="URL gambar"
                value={newProduct.image_1}
                onChange={(e) => setNewProduct((s) => ({ ...s, image_1: e.target.value }))}
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50"
              />
            </div>
            <div className="md:col-span-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md w-full md:w-auto"
              >
                + Tambah Produk
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* PRODUCT LIST */}
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
            />
          </motion.div>
        ) : err ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
          >
            <p className="text-red-600">{err}</p>
          </motion.div>
        ) : currentProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center border border-blue-100"
          >
            <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-blue-800">Tidak ada produk</h3>
            <p className="mt-2 text-blue-600">Coba ubah pencarian atau filter Anda</p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
            >
              <AnimatePresence>
                {currentProducts.map((p) => {
                  const isEditing = editId === p.id;

                  return (
                    <motion.div
                      key={p.id}
                      layout
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                      className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden"
                    >
                      <div className="p-4">
                        <div className="flex justify-center mb-4">
                          <motion.img
                            src={p.image_1}
                            alt={p.name}
                            className="w-32 h-32 object-cover rounded-lg border border-blue-100"
                            onError={onImgError}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>

                        <AnimatePresence mode="wait">
                          {!isEditing ? (
                            <motion.div
                              key="view"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <h3 className="font-semibold text-lg text-blue-800 mb-2 truncate">{p.name}</h3>
                              <div className="space-y-2 mb-4">
                                <p className="text-blue-600">Harga: <span className="font-semibold">Rp {Number(p.price).toLocaleString("id-ID")}</span></p>
                                <p className="text-blue-600">Stok: <span className="font-semibold">{p.stok}</span></p>
                              </div>

                              <div className="flex gap-2">
                                <motion.button
                                  onClick={() => startEdit(p)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-200 font-medium"
                                >
                                  Edit
                                </motion.button>
                                <motion.button
                                  onClick={() => handleDelete(p.id)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-200 font-medium"
                                >
                                  Hapus
                                </motion.button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="edit"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="space-y-3 mb-4">
                                <input
                                  value={editForm.name}
                                  onChange={(e) => setEditForm((s) => ({ ...s, name: e.target.value }))}
                                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-50"
                                  placeholder="Nama produk"
                                />
                                <input
                                  value={editForm.price}
                                  onChange={(e) => setEditForm((s) => ({ ...s, price: e.target.value }))}
                                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-50"
                                  placeholder="Harga"
                                />
                                <input
                                  value={editForm.stok}
                                  onChange={(e) => setEditForm((s) => ({ ...s, stok: e.target.value }))}
                                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-50"
                                  placeholder="Stok"
                                />
                                <input
                                  value={editForm.image_1}
                                  onChange={(e) => setEditForm((s) => ({ ...s, image_1: e.target.value }))}
                                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-blue-50"
                                  placeholder="URL Gambar"
                                />
                              </div>

                              <div className="flex gap-2">
                                <motion.button
                                  onClick={() => saveEdit(p.id)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium"
                                >
                                  Simpan
                                </motion.button>
                                <motion.button
                                  onClick={() => setEditId(null)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200 font-medium"
                                >
                                  Batal
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-md p-4 border border-blue-100"
              >
                <div className="text-sm text-blue-600">
                  Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, normalized.length)} dari {normalized.length} produk
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
                    whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                    className="px-4 py-2 bg-white border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition duration-200 text-blue-700"
                  >
                    Previous
                  </motion.button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <motion.button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-lg transition duration-200 font-medium ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        {page}
                      </motion.button>
                    ))}
                  </div>
                  
                  <motion.button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
                    whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
                    className="px-4 py-2 bg-white border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition duration-200 text-blue-700"
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ProductList;