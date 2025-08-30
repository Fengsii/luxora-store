import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Edit, Save, Image as ImageIcon } from "lucide-react";

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

  // POPUP NOTIFICATION
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showUpdateSuccessPopup, setShowUpdateSuccessPopup] = useState(false);

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
      
      // Tampilkan popup sukses
      setShowSuccessPopup(true);
      
      // Sembunyikan popup setelah 3 detik
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
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

  // START EDIT - Buka popup edit
  const startEdit = (p) => {
    setEditId(p.id);
    setEditForm({
      name: p.name ?? "",
      price: p.price ?? "",
      stok: p.stok ?? "",
      image_1: p.image_1 ?? "",
    });
    setShowEditPopup(true);
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
      setShowEditPopup(false);
      await fetchProducts();
      
      // Tampilkan popup sukses update
      setShowUpdateSuccessPopup(true);
      
      // Sembunyikan popup setelah 3 detik
      setTimeout(() => {
        setShowUpdateSuccessPopup(false);
      }, 3000);
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
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">Product Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Kelola produk Luxora Store dengan mudah</p>
        </motion.div>

        {/* SEARCH AND SORT */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
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
                  className="pl-10 pr-4 py-2 sm:py-3 w-full border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
                />
              </div>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 sm:py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base w-full md:w-auto"
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
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 md:mb-8 border border-blue-100 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-4">Tambah Produk Baru</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">Nama Produk</label>
              <input
                placeholder="Nama produk"
                value={newProduct.name}
                onChange={(e) => setNewProduct((s) => ({ ...s, name: e.target.value }))}
                required
                className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
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
                className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
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
                className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-1">URL Gambar</label>
              <input
                placeholder="URL gambar"
                value={newProduct.image_1}
                onChange={(e) => setNewProduct((s) => ({ ...s, image_1: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4 flex justify-center md:justify-start mt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md text-sm sm:text-base w-full md:w-auto"
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
            className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 text-center"
          >
            <p className="text-red-600 text-sm sm:text-base">{err}</p>
          </motion.div>
        ) : currentProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-12 text-center border border-blue-100"
          >
            <svg className="mx-auto h-12 sm:h-16 w-12 sm:w-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16" />
            </svg>
            <h3 className="mt-4 text-base sm:text-lg font-medium text-blue-800">Tidak ada produk</h3>
            <p className="mt-2 text-blue-600 text-sm sm:text-base">Coba ubah pencarian atau filter Anda</p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 md:mb-8"
            >
              <AnimatePresence>
                {currentProducts.map((p) => (
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
                    <div className="p-4 sm:p-5">
                      <div className="flex justify-center mb-4">
                        <motion.img
                          src={p.image_1}
                          alt={p.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-lg border border-blue-100"
                          onError={onImgError}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-base md:text-lg text-blue-800 mb-2 truncate">{p.name}</h3>
                        <div className="space-y-2 mb-4">
                          <p className="text-blue-600 text-sm md:text-base">Harga: <span className="font-semibold">Rp {Number(p.price).toLocaleString("id-ID")}</span></p>
                          <p className="text-blue-600 text-sm md:text-base">Stok: <span className="font-semibold">{p.stok}</span></p>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => startEdit(p)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition duration-200 font-medium flex items-center justify-center gap-1 text-xs sm:text-sm"
                          >
                            <Edit size={14} />
                            <span>Edit</span>
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(p.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-200 font-medium text-xs sm:text-sm"
                          >
                            Hapus
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white rounded-xl shadow-md p-4 sm:p-5 border border-blue-100"
              >
                <div className="text-xs sm:text-sm text-blue-600">
                  Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, normalized.length)} dari {normalized.length} produk
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
                    whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                    className="px-3 py-2 bg-white border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition duration-200 text-blue-700 text-xs sm:text-sm"
                  >
                    Prev
                  </motion.button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <motion.button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition duration-200 font-medium text-xs sm:text-sm ${
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
                    className="px-3 py-2 bg-white border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition duration-200 text-blue-700 text-xs sm:text-sm"
                  >
                    Next
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Success Popup - Add Product */}
      <AnimatePresence>
        {showSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 50 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                },
                exit: { 
                  opacity: 0, 
                  scale: 0.8,
                  y: 50,
                  transition: { duration: 0.2 }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-4 sm:p-6 shadow-2xl border-2 border-green-200 max-w-xs sm:max-w-sm w-full"
            >
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 bg-green-100">
                  <motion.div
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          delay: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <CheckCircle 
                      size={24} 
                      className="text-green-600" 
                      strokeWidth={2}
                    />
                  </motion.div>
                </div>
                
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-green-800">
                  Produk Berhasil Ditambahkan!
                </h3>
                
                <p className="text-gray-600 text-xs sm:text-sm">
                  Produk baru telah ditambahkan ke katalog
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Product Popup */}
      <AnimatePresence>
        {showEditPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowEditPopup(false)}
            />
            
            {/* Popup Content */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 50 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                },
                exit: { 
                  opacity: 0, 
                  scale: 0.8,
                  y: 50,
                  transition: { duration: 0.2 }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-4 sm:p-6 shadow-2xl border border-blue-100 max-w-md w-full relative z-10 mx-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800">Edit Produk</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowEditPopup(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </motion.button>
              </div>
              
              {/* Form */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Nama Produk</label>
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm((s) => ({ ...s, name: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
                    placeholder="Nama produk"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Harga</label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm((s) => ({ ...s, price: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
                    placeholder="Harga"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Stok</label>
                  <input
                    type="number"
                    value={editForm.stok}
                    onChange={(e) => setEditForm((s) => ({ ...s, stok: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
                    placeholder="Stok"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">URL Gambar</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-4 w-4 text-blue-500" />
                    </div>
                    <input
                      value={editForm.image_1}
                      onChange={(e) => setEditForm((s) => ({ ...s, image_1: e.target.value }))}
                      className="w-full pl-10 pr-3 sm:pr-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50 text-sm sm:text-base"
                      placeholder="URL Gambar"
                    />
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
                <motion.button
                  onClick={() => setShowEditPopup(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 font-medium text-sm sm:text-base"
                >
                  Batal
                </motion.button>
                <motion.button
                  onClick={() => saveEdit(editId)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center justify-center gap-1 text-sm sm:text-base"
                >
                  <Save size={16} />
                  Simpan
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Update Success Popup */}
      <AnimatePresence>
        {showUpdateSuccessPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 50 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                },
                exit: { 
                  opacity: 0, 
                  scale: 0.8,
                  y: 50,
                  transition: { duration: 0.2 }
                }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl p-4 sm:p-6 shadow-2xl border-2 border-blue-200 max-w-xs sm:max-w-sm w-full"
            >
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 bg-blue-100">
                  <motion.div
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: { 
                        scale: 1, 
                        opacity: 1,
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                          delay: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <CheckCircle 
                      size={24} 
                      className="text-blue-600" 
                      strokeWidth={2}
                    />
                  </motion.div>
                </div>
                
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-blue-800">
                  Produk Berhasil Diupdate!
                </h3>
                
                <p className="text-gray-600 text-xs sm:text-sm">
                  Perubahan telah disimpan
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductList;