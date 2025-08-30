
// // ChartList.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { ProductContext } from "../../helper/ProductContext";
// import { useNavigate } from "react-router-dom";

// const ChartList = () => {
//   const { username } = useContext(ProductContext); 
//   const [savedProducts, setSavedProducts] = useState([]); 
//   const [selected, setSelected] = useState([]); 
//   const [currentPage, setCurrentPage] = useState(1); // 🔹 state untuk halaman aktif
//   const productsPerPage = 10; // 🔹 jumlah produk per halaman
//   const navigate = useNavigate();

//   // 🔹 Load produk dari localStorage berdasarkan username yg login
//   useEffect(() => {
//     if (!username) return;
//     const key = `savedProducts_${username}`;
//     const data = JSON.parse(localStorage.getItem(key)) || [];
//     setSavedProducts(data);
//   }, [username]);

//   // 🔹 Fungsi hapus produk dari saved list
//   const handleDelete = (id) => {
//     const key = `savedProducts_${username}`;
//     const newData = savedProducts.filter(p => p.id !== id);
//     localStorage.setItem(key, JSON.stringify(newData));
//     setSavedProducts(newData);
//   };

//   // 🔹 Fungsi Buy 1 produk
//   const handleBuy = (product) => {
//     const productData = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image_1: product.image_1,
//       stok: product.stok
//     };
//     localStorage.setItem("buyProduct", JSON.stringify([productData])); 
//     navigate("/user/payment");
//   };

//   // 🔹 Fungsi pilih/deselect produk
//   const toggleSelect = (id) => {
//     if (selected.includes(id)) {
//       setSelected(selected.filter(s => s !== id));
//     } else {
//       setSelected([...selected, id]);
//     }
//   };

//   // 🔹 Fungsi select all
//   const handleSelectAll = () => {
//     if (selected.length === savedProducts.length) {
//       setSelected([]);
//     } else {
//       setSelected(savedProducts.map(p => p.id));
//     }
//   };

//   // 🔹 Fungsi Buy banyak produk
//   const handleBuySelected = () => {
//     const toBuy = savedProducts.filter(p => selected.includes(p.id));
//     if (toBuy.length === 0) return;
//     localStorage.setItem("buyProduct", JSON.stringify(toBuy));
//     navigate("/user/payment");
//   };

//   // ========================== 🔹 LOGIKA PAGINATION ==========================
//   // 1. Hitung index produk terakhir di halaman sekarang
//   const indexOfLastProduct = currentPage * productsPerPage; 
//   // 2. Hitung index produk pertama
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 
//   // 3. Ambil data produk sesuai halaman aktif
//   const currentProducts = savedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   // 4. Hitung jumlah total halaman
//   const totalPages = Math.ceil(savedProducts.length / productsPerPage); 

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Your Cart</h1>

//       {/* Tombol select all + buy selected */}
//       {savedProducts.length > 0 && (
//         <div style={{ marginBottom: "15px" }}>
//           <button onClick={handleSelectAll}>
//             {selected.length === savedProducts.length ? "Deselect All" : "Select All"}
//           </button>
//           <button 
//             onClick={handleBuySelected} 
//             disabled={selected.length === 0} 
//             style={{ marginLeft: "10px" }}
//           >
//             Buy Selected ({selected.length})
//           </button>
//         </div>
//       )}

//       {/* List produk (hanya tampil sesuai halaman) */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {currentProducts.map(p => (
//           <div 
//             key={p.id} 
//             style={{ 
//               border: selected.includes(p.id) ? "2px solid blue" : "1px solid #ccc",
//               padding: "10px", 
//               width: "220px", 
//               textAlign: "center" 
//             }}
//           >
//             <input 
//               type="checkbox" 
//               checked={selected.includes(p.id)} 
//               onChange={() => toggleSelect(p.id)} 
//             />
//             <img src={p.image_1} alt={p.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
//             <h3>{p.name}</h3>
//             <p>Rp {p.price}</p>
//             <p>Stok: {p.stok}</p>

//             <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
//               <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
//               <button disabled={p.stok <= 0} onClick={() => handleBuy(p)}>🛒 Buy</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ========================== 🔹 NAVIGASI PAGINATION ========================== */}
//       {totalPages > 1 && (
//         <div style={{ marginTop: "20px", textAlign: "center" }}>
//           <button 
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>

//           {/* Tombol nomor halaman */}
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button 
//               key={i + 1} 
//               onClick={() => setCurrentPage(i + 1)} 
//               style={{ 
//                 margin: "0 5px", 
//                 fontWeight: currentPage === i + 1 ? "bold" : "normal" 
//               }}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button 
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChartList;








import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../helper/ProductContext";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, Trash2, ChevronLeft, ChevronRight, 
  Check, X, Info, AlertCircle, Plus, Minus, Star, Tag
} from "lucide-react";

const ChartList = () => {
  const { username } = useContext(ProductContext); 
  const [savedProducts, setSavedProducts] = useState([]); 
  const [selected, setSelected] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const productsPerPage = 10;
  const navigate = useNavigate();

  // Ukuran yang tersedia
  const sizes = ["S", "M", "L", "XL"];

  // Rating acak untuk produk
  const generateRandomRating = () => {
    const ratings = [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  useEffect(() => {
    if (!username) return;
    const key = `savedProducts_${username}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    
    // Tambahkan rating dan sizes ke produk yang disimpan
    const productsWithRating = data.map(p => ({
      ...p,
      rating: p.rating || generateRandomRating(),
      sizes: p.sizes || sizes
    }));
    
    setSavedProducts(productsWithRating);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleDelete = (id) => {
    const key = `savedProducts_${username}`;
    const newData = savedProducts.filter(p => p.id !== id);
    localStorage.setItem(key, JSON.stringify(newData));
    setSavedProducts(newData);
    setSelected(selected.filter(s => s !== id));
    setShowSuccessPopup(true);
    setPopupMessage("Produk berhasil dihapus dari keranjang");
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleBuy = (product) => {
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_1: product.image_1,
      stok: product.stok,
      rating: product.rating,
      sizes: product.sizes
    };
    localStorage.setItem("buyProduct", JSON.stringify([productData])); 
    navigate("/user/payment");
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === savedProducts.length) {
      setSelected([]);
    } else {
      setSelected(savedProducts.map(p => p.id));
    }
  };

  const handleBuySelected = () => {
    const toBuy = savedProducts.filter(p => selected.includes(p.id));
    if (toBuy.length === 0) return;
    localStorage.setItem("buyProduct", JSON.stringify(toBuy));
    navigate("/user/payment");
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage; 
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 
  const currentProducts = savedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(savedProducts.length / productsPerPage); 

  // Animations
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const popupVariants = {
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
  };

  const checkIconVariants = {
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
  };

  // Animasi untuk bintang rating
  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.h1 
          className="text-3xl font-bold text-center text-blue-900 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Keranjang Belanja Anda
        </motion.h1>
        
        <motion.p 
          className="text-center text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {savedProducts.length} produk di keranjang
        </motion.p>

        {savedProducts.length === 0 ? (
          <motion.div 
            className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ShoppingCart size={48} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Keranjang Kosong</h2>
            <p className="text-gray-600">Belum ada produk di keranjang belanja Anda.</p>
          </motion.div>
        ) : (
          <>
            {/* Selection Controls */}
            <motion.div 
              className="bg-white rounded-xl p-4 shadow-md mb-6 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={selected.length === savedProducts.length && savedProducts.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Pilih Semua ({selected.length} dipilih)
                </label>
              </div>
              
              <motion.button
                onClick={handleBuySelected}
                disabled={selected.length === 0}
                whileHover={{ scale: selected.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  selected.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                }`}
              >
                <ShoppingCart size={16} className="mr-2" />
                Beli yang Dipilih ({selected.length})
              </motion.button>
            </motion.div>

            {/* Product Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence>
                {currentProducts.map((p) => (
                  <motion.div
                    key={p.id}
                    variants={productVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`bg-white rounded-xl overflow-hidden shadow-md border-2 transition-all ${
                      selected.includes(p.id) ? 'border-blue-500' : 'border-gray-100'
                    }`}
                  >
                    <div className="relative">
                      {/* Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <input 
                          type="checkbox" 
                          checked={selected.includes(p.id)}
                          onChange={() => toggleSelect(p.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 bg-white"
                        />
                      </div>

                      {/* Product Image */}
                      <div className="relative overflow-hidden h-40">
                        <motion.img 
                          src={p.image_1} 
                          alt={p.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        />
                        
                        {p.stok <= 0 && (
                          <motion.div 
                            className="absolute inset-0 bg-black/60 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <span className="text-white font-bold text-sm bg-red-500 px-2 py-1 rounded-md">Habis</span>
                          </motion.div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">{p.name}</h3>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star, i) => (
                              <motion.div
                                key={star}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={starVariants}
                              >
                                <Star 
                                  size={12} 
                                  className={star <= Math.floor(p.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                                />
                              </motion.div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 ml-1">{p.rating}</span>
                        </div>
                        
                        <p className="text-blue-600 font-bold text-base mb-2">
                          Rp {p.price.toLocaleString('id-ID')}
                        </p>
                        
                        {/* Size and Stock Info */}
                        <div className="flex justify-between items-center mb-2">
                          <span className={`text-xs ${p.stok <= 5 ? 'text-red-500' : 'text-green-600'}`}>
                            Stok: {p.stok}
                          </span>
                          <div className="flex space-x-1">
                            {p.sizes.slice(0, 3).map((size) => (
                              <span
                                key={size}
                                className="text-xs text-gray-500 border border-gray-200 px-1 rounded"
                              >
                                {size}
                              </span>
                            ))}
                            {p.sizes.length > 3 && (
                              <span className="text-xs text-gray-500">+{p.sizes.length - 3}</span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => confirmDelete(p.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-1 py-2 bg-red-100 text-red-600 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors flex items-center justify-center"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Hapus
                          </motion.button>
                          
                          <motion.button
                            onClick={() => handleBuy(p)}
                            disabled={p.stok <= 0}
                            whileHover={{ scale: p.stok > 0 ? 1.05 : 1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center ${
                              p.stok <= 0 
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                            }`}
                          >
                            <ShoppingCart size={14} className="mr-1" />
                            Beli
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                className="flex justify-center items-center mt-10 space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
                  className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                    currentPage === 1 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
                  }`}
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Sebelumnya
                </motion.button>
                
                <span className="text-gray-700 text-sm">
                  Halaman <span className="font-bold text-blue-700">{currentPage}</span> dari {totalPages}
                </span>
                
                <motion.button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
                  className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                    currentPage === totalPages 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
                  }`}
                >
                  Selanjutnya
                  <ChevronRight size={16} className="ml-1" />
                </motion.button>
              </motion.div>
            )}
          </>
        )}

        {/* Delete Confirmation Popup */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-6 shadow-2xl border-2 border-red-200 max-w-sm w-full"
              >
                <div className="text-center">
                  {/* Warning Icon */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100">
                    <AlertCircle size={32} className="text-red-600" />
                  </div>
                  
                  {/* Message */}
                  <h3 className="text-lg font-semibold mb-2 text-red-800">
                    Hapus dari Keranjang?
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    Apakah Anda yakin ingin menghapus produk ini dari keranjang belanja?
                  </p>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={cancelDelete}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Batal
                    </motion.button>
                    
                    <motion.button
                      onClick={() => {
                        handleDelete(productToDelete);
                        setShowDeleteConfirm(false);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md"
                    >
                      Ya, Hapus
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccessPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-6 shadow-2xl border-2 border-green-200 max-w-sm mx-4"
              >
                <div className="text-center">
                  {/* Check Icon with Circle */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
                    <motion.div
                      variants={checkIconVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Check 
                        size={32} 
                        className="text-green-600" 
                        strokeWidth={3}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Message */}
                  <h3 className="text-lg font-semibold mb-2 text-green-800">
                    {popupMessage}
                  </h3>
                  
                  {/* Sub Message */}
                  <p className="text-gray-600 text-sm">
                    Produk telah dihapus dari keranjang belanja
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChartList;