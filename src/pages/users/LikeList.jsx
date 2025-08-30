// // src/pages/users/LikeList.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { getSession } from "../../helper/session"; 
// import { ProductContext } from "../../helper/ProductContext"; 

// const LikeList = () => {
//   const navigate = useNavigate();
//   const ctx = useContext(ProductContext) || {};
//   const { setLikeCount = () => {} } = ctx;

//   // State
//   const [user, setUser] = useState(null); 
//   const [liked, setLiked] = useState([]); 

//   // 🔹 Tambahan state untuk pagination
//   const [currentPage, setCurrentPage] = useState(1); // halaman aktif sekarang
//   const itemsPerPage = 20; // tampilkan 20 produk per halaman

//   const getImageSrc = (p) => {
//     const img = p.image_1 || p.image || p.productImage; 
//     if (!img) return ""; 
//     return img.toString().startsWith("http")
//       ? img.toString()
//       : `https://api-sepokat.vercel.app/${img.toString()}`; 
//   };

//   useEffect(() => {
//     const sessionUser = getSession(); 
//     if (!sessionUser) {
//       setUser(null);
//       setLiked([]);
//       return;
//     }
//     setUser(sessionUser);

//     const key = `likedProducts_${sessionUser.username}`;
//     const data = JSON.parse(localStorage.getItem(key)) || [];

//     setLiked(Array.isArray(data) ? data : []);
//     setLikeCount(Array.isArray(data) ? data.length : 0);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); 

//   const handleRemove = (productId) => {
//     if (!user) {
//       alert("Silakan login terlebih dahulu.");
//       return;
//     }
//     if (!confirm("Hapus produk ini dari favorit?")) return;

//     const key = `likedProducts_${user.username}`;
//     const current = JSON.parse(localStorage.getItem(key)) || [];

//     const updated = current.filter((p) => p.id != productId);
//     localStorage.setItem(key, JSON.stringify(updated));
//     setLiked(updated);
//     setLikeCount(updated.length);
//   };

//   const handleBuy = (product) => {
//     const productData = {
//       id: product.id,
//       name: product.name || product.productName,
//       price: product.price || product.productPrice,
//       image_1: product.image_1 || product.image || product.productImage,
//       stok: product.stok ?? product.stock ?? 0,
//     };
//     localStorage.setItem("buyProduct", JSON.stringify(productData));
//     navigate("/user/payment");
//   };

//   // 🔹 Logika pagination
//   // Hitung index awal & akhir berdasarkan halaman
//   const indexOfLastItem = currentPage * itemsPerPage; // misal halaman 1: 1*20 = 20
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 20-20 = 0
//   const currentItems = liked.slice(indexOfFirstItem, indexOfLastItem); 
//   // slice array liked sesuai halaman

//   const totalPages = Math.ceil(liked.length / itemsPerPage); // total halaman

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Product Favorite</h1>

//       {!user ? (
//         <p>Silakan login untuk melihat daftar favorit Anda.</p>
//       ) : liked.length === 0 ? (
//         <p>Belum ada produk favorit.</p>
//       ) : (
//         <>
//           {/* Grid produk per halaman */}
//           <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//             {currentItems.map((p) => (
//               <div
//                 key={p.id}
//                 style={{
//                   border: "1px solid #ccc",
//                   padding: "10px",
//                   width: "220px",
//                   textAlign: "center",
//                   borderRadius: 8,
//                 }}
//               >
//                 <img
//                   src={getImageSrc(p)}
//                   alt={p.name || p.productName}
//                   style={{ width: "100%", height: "150px", objectFit: "cover" }}
//                 />
//                 <h3 style={{ margin: "8px 0" }}>{p.name || p.productName}</h3>
//                 <p>Rp {p.price || p.productPrice}</p>
//                 <p>Stok: {p.stok ?? p.stock ?? "-"}</p>

//                 <div style={{ display: "flex", justifyContent: "space-around", marginTop: 10 }}>
//                   <button onClick={() => handleBuy(p)} disabled={(p.stok ?? p.stock ?? 0) <= 0}>
//                     🛒 Buy
//                   </button>
//                   <button onClick={() => handleRemove(p.id)} style={{ background: "#f87171", color: "#fff" }}>
//                     🗑️ Hapus
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* 🔹 Navigasi pagination */}
//           <div style={{ marginTop: "20px", textAlign: "center" }}>
//             <button 
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               ⬅️ Prev
//             </button>

//             <span style={{ margin: "0 10px" }}>
//               Halaman {currentPage} dari {totalPages}
//             </span>

//             <button 
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//             >
//               Next ➡️
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default LikeList;
















// // src/pages/users/LikeList.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart, ShoppingCart, Trash2, Star, Info, ChevronLeft, ChevronRight, Check } from "lucide-react";
// import { getSession } from "../../helper/session";
// import { ProductContext } from "../../helper/ProductContext";

// const LikeList = () => {
//   const navigate = useNavigate();
//   const ctx = useContext(ProductContext) || {};
//   const { setLikeCount = () => {} } = ctx;

//   const [user, setUser] = useState(null);
//   const [liked, setLiked] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
//   const itemsPerPage = 10;

//   const getImageSrc = (p) => {
//     const img = p.image_1 || p.image || p.productImage;
//     if (!img) return "";
//     return img.toString().startsWith("http")
//       ? img.toString()
//       : `https://api-sepokat.vercel.app/${img.toString()}`;
//   };

//   useEffect(() => {
//     const sessionUser = getSession();
//     if (!sessionUser) {
//       setUser(null);
//       setLiked([]);
//       return;
//     }
//     setUser(sessionUser);

//     const key = `likedProducts_${sessionUser.username}`;
//     const data = JSON.parse(localStorage.getItem(key)) || [];
//     setLiked(Array.isArray(data) ? data : []);
//     setLikeCount(Array.isArray(data) ? data.length : 0);
//   }, [setLikeCount]);

//   const handleRemove = (productId) => {
//     if (!user) {
//       alert("Silakan login terlebih dahulu.");
//       return;
//     }

//     if (!confirm("Hapus produk ini dari favorit?")) return;

//     const key = `likedProducts_${user.username}`;
//     const current = JSON.parse(localStorage.getItem(key)) || [];
//     const updated = current.filter((p) => p.id != productId);
//     localStorage.setItem(key, JSON.stringify(updated));
//     setLiked(updated);
//     setLikeCount(updated.length);
    
//     // Tampilkan popup sukses
//     setShowSuccessPopup(true);
//     setTimeout(() => setShowSuccessPopup(false), 2000);
//   };

//   const handleBuy = (product) => {
//     const productData = {
//       id: product.id,
//       name: product.name || product.productName,
//       price: product.price || product.productPrice,
//       image_1: product.image_1 || product.image || product.productImage,
//       stok: product.stok ?? product.stock ?? 0,
//     };
//     localStorage.setItem("buyProduct", JSON.stringify(productData));
//     navigate("/user/payment");
//   };

//   // Logika pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = liked.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(liked.length / itemsPerPage);

//   // Animasi untuk produk
//   const productVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     },
//     hover: {
//       y: -8,
//       scale: 1.02,
//       boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
//       transition: { duration: 0.3 }
//     }
//   };

//   // Animasi untuk icon
//   const iconVariants = {
//     hover: { scale: 1.1 },
//     tap: { scale: 0.9 }
//   };

//   // Animasi untuk popup
//   const popupVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 50 },
//     visible: { 
//       opacity: 1, 
//       scale: 1, 
//       y: 0,
//       transition: { 
//         type: "spring",
//         stiffness: 300,
//         damping: 20
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       scale: 0.8,
//       y: 50,
//       transition: { duration: 0.2 }
//     }
//   };

//   // Animasi untuk check icon
//   const checkIconVariants = {
//     hidden: { scale: 0, opacity: 0 },
//     visible: { 
//       scale: 1, 
//       opacity: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 400,
//         damping: 10,
//         delay: 0.1
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
//       <div className="container mx-auto">
//         <motion.h1 
//           className="text-3xl font-bold text-center text-blue-900 mb-2"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Daftar Favorit Anda
//         </motion.h1>
        
//         <motion.p 
//           className="text-center text-gray-600 mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           {liked.length} produk favorit
//         </motion.p>

//         {!user ? (
//           <motion.div 
//             className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <Info size={48} className="mx-auto text-blue-500 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Login Diperlukan</h2>
//             <p className="text-gray-600">Silakan login untuk melihat daftar favorit Anda.</p>
//           </motion.div>
//         ) : liked.length === 0 ? (
//           <motion.div 
//             className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <Heart size={48} className="mx-auto text-pink-500 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Favorit</h2>
//             <p className="text-gray-600">Anda belum menambahkan produk ke daftar favorit.</p>
//           </motion.div>
//         ) : (
//           <>
//             <motion.div 
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <AnimatePresence>
//                 {currentItems.map((p) => (
//                   <motion.div
//                     key={p.id}
//                     variants={productVariants}
//                     initial="hidden"
//                     animate="visible"
//                     whileHover="hover"
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 relative group"
//                   >
//                     <div className="relative overflow-hidden h-48">
//                       <motion.img 
//                         src={getImageSrc(p)} 
//                         alt={p.name || p.productName} 
//                         className="w-full h-full object-cover"
//                         whileHover={{ scale: 1.1 }}
//                         transition={{ duration: 0.4 }}
//                       />
                      
//                       {(p.stok ?? p.stock ?? 0) <= 0 && (
//                         <motion.div 
//                           className="absolute inset-0 bg-black/60 flex items-center justify-center"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                         >
//                           <span className="text-white font-bold text-sm bg-red-500 px-2 py-1 rounded-md">Habis</span>
//                         </motion.div>
//                       )}
//                     </div>

//                     <div className="p-4">
//                       <h3 className="font-semibold text-gray-800 text-sm mb-2 truncate">
//                         {p.name || p.productName}
//                       </h3>
                      
//                       <div className="flex items-center mb-2">
//                         <div className="flex">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star 
//                               key={star}
//                               size={12} 
//                               className={star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"} 
//                             />
//                           ))}
//                         </div>
//                         <span className="text-xs text-gray-600 ml-1">4.8</span>
//                       </div>
                      
//                       <p className="text-blue-600 font-bold text-base mb-2">
//                         Rp {(p.price || p.productPrice).toLocaleString('id-ID')}
//                       </p>
                      
//                       <p className={`text-xs mb-3 ${(p.stok ?? p.stock ?? 0) <= 5 ? 'text-red-500' : 'text-green-600'}`}>
//                         Stok: {p.stok ?? p.stock ?? 0}
//                       </p>

//                       <div className="flex space-x-2">
//                         <motion.button
//                           onClick={() => handleBuy(p)}
//                           disabled={(p.stok ?? p.stock ?? 0) <= 0}
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                           className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
//                             (p.stok ?? p.stock ?? 0) <= 0 
//                               ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                               : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
//                           }`}
//                         >
//                           <ShoppingCart size={14} className="mr-1" />
//                           Beli
//                         </motion.button>
                        
//                         <motion.button
//                           onClick={() => handleRemove(p.id)}
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                           className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
//                           title="Hapus dari favorit"
//                         >
//                           <Trash2 size={16} />
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <motion.div 
//                 className="flex justify-center items-center mt-10 space-x-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <motion.button 
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(prev => prev - 1)}
//                   whileTap={{ scale: 0.95 }}
//                   whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
//                   className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
//                     currentPage === 1 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
//                   }`}
//                 >
//                   <ChevronLeft size={16} className="mr-1" />
//                   Sebelumnya
//                 </motion.button>
                
//                 <span className="text-gray-700 text-sm">
//                   Halaman <span className="font-bold text-blue-700">{currentPage}</span> dari {totalPages}
//                 </span>
                
//                 <motion.button 
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(prev => prev + 1)}
//                   whileTap={{ scale: 0.95 }}
//                   whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
//                   className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
//                     currentPage === totalPages 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
//                   }`}
//                 >
//                   Selanjutnya
//                   <ChevronRight size={16} className="ml-1" />
//                 </motion.button>
//               </motion.div>
//             )}
//           </>
//         )}

//         {/* Success Popup */}
//         <AnimatePresence>
//           {showSuccessPopup && (
//             <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//               <motion.div
//                 variants={popupVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="bg-white rounded-xl p-6 shadow-2xl border-2 border-green-200 max-w-sm mx-4"
//               >
//                 <div className="text-center">
//                   <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
//                     <motion.div
//                       variants={checkIconVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <Check 
//                         size={32} 
//                         className="text-green-600" 
//                         strokeWidth={3}
//                       />
//                     </motion.div>
//                   </div>
                  
//                   <h3 className="text-lg font-semibold mb-2 text-green-800">
//                     Berhasil Dihapus
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm">
//                     Produk telah dihapus dari daftar favorit Anda
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default LikeList;


















// // src/pages/users/LikeList.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart, ShoppingCart, Trash2, Star, Info, ChevronLeft, ChevronRight, Check } from "lucide-react";
// import { getSession } from "../../helper/session";
// import { ProductContext } from "../../helper/ProductContext";

// const LikeList = () => {
//   const navigate = useNavigate();
//   const ctx = useContext(ProductContext) || {};
//   const { setLikeCount = () => {} } = ctx;

//   const [user, setUser] = useState(null);
//   const [liked, setLiked] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
//   const itemsPerPage = 8;

//   // Ukuran yang tersedia
//   const sizes = ["S", "M", "L", "XL"];

//   const getImageSrc = (p) => {
//     const img = p.image_1 || p.image || p.productImage;
//     if (!img) return "";
//     return img.toString().startsWith("http")
//       ? img.toString()
//       : `https://api-sepokat.vercel.app/${img.toString()}`;
//   };

//   useEffect(() => {
//     const sessionUser = getSession();
//     if (!sessionUser) {
//       setUser(null);
//       setLiked([]);
//       return;
//     }
//     setUser(sessionUser);

//     const key = `likedProducts_${sessionUser.username}`;
//     const data = JSON.parse(localStorage.getItem(key)) || [];
//     setLiked(Array.isArray(data) ? data : []);
//     setLikeCount(Array.isArray(data) ? data.length : 0);
//   }, [setLikeCount]);

//   const handleRemove = (productId) => {
//     if (!user) {
//       alert("Silakan login terlebih dahulu.");
//       return;
//     }

//     if (!confirm("Hapus produk ini dari favorit?")) return;

//     const key = `likedProducts_${user.username}`;
//     const current = JSON.parse(localStorage.getItem(key)) || [];
//     const updated = current.filter((p) => p.id != productId);
//     localStorage.setItem(key, JSON.stringify(updated));
//     setLiked(updated);
//     setLikeCount(updated.length);
    
//     // Tampilkan popup sukses
//     setShowSuccessPopup(true);
//     setTimeout(() => setShowSuccessPopup(false), 2000);
//   };

//   const handleBuy = (product) => {
//     const productData = {
//       id: product.id,
//       name: product.name || product.productName,
//       price: product.price || product.productPrice,
//       image_1: product.image_1 || product.image || product.productImage,
//       stok: product.stok ?? product.stock ?? 0,
//     };
//     localStorage.setItem("buyProduct", JSON.stringify(productData));
//     navigate("/user/payment");
//   };

//   // Logika pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = liked.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(liked.length / itemsPerPage);

//   // Animasi untuk produk
//   const productVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     },
//     hover: {
//       y: -8,
//       scale: 1.02,
//       boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
//       transition: { duration: 0.3 }
//     }
//   };

//   // Animasi untuk icon
//   const iconVariants = {
//     hover: { scale: 1.1 },
//     tap: { scale: 0.9 }
//   };

//   // Animasi untuk popup
//   const popupVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 50 },
//     visible: { 
//       opacity: 1, 
//       scale: 1, 
//       y: 0,
//       transition: { 
//         type: "spring",
//         stiffness: 300,
//         damping: 20
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       scale: 0.8,
//       y: 50,
//       transition: { duration: 0.2 }
//     }
//   };

//   // Animasi untuk check icon
//   const checkIconVariants = {
//     hidden: { scale: 0, opacity: 0 },
//     visible: { 
//       scale: 1, 
//       opacity: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 400,
//         damping: 10,
//         delay: 0.1
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
//       <div className="container mx-auto max-w-6xl">
//         <motion.h1 
//           className="text-3xl font-bold text-center text-blue-900 mb-2"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Daftar Favorit Anda
//         </motion.h1>
        
//         <motion.p 
//           className="text-center text-gray-600 mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           {liked.length} produk favorit
//         </motion.p>

//         {!user ? (
//           <motion.div 
//             className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <Info size={48} className="mx-auto text-blue-500 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Login Diperlukan</h2>
//             <p className="text-gray-600">Silakan login untuk melihat daftar favorit Anda.</p>
//           </motion.div>
//         ) : liked.length === 0 ? (
//           <motion.div 
//             className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <Heart size={48} className="mx-auto text-pink-500 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Favorit</h2>
//             <p className="text-gray-600">Anda belum menambahkan produk ke daftar favorit.</p>
//           </motion.div>
//         ) : (
//           <>
//             <motion.div 
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <AnimatePresence>
//                 {currentItems.map((p) => (
//                   <motion.div
//                     key={p.id}
//                     variants={productVariants}
//                     initial="hidden"
//                     animate="visible"
//                     whileHover="hover"
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 relative group w-[240px] h-[290px] mx-auto" // Ukuran diubah menjadi lebih kecil
//                   >
//                     <div className="relative overflow-hidden h-[130px]"> {/* Tinggi gambar diperkecil */}
//                       <motion.img 
//                         src={getImageSrc(p)} 
//                         alt={p.name || p.productName} 
//                         className="w-full h-full object-cover"
//                         whileHover={{ scale: 1.1 }}
//                         transition={{ duration: 0.4 }}
//                       />
                      
//                       {(p.stok ?? p.stock ?? 0) <= 0 && (
//                         <motion.div 
//                           className="absolute inset-0 bg-black/60 flex items-center justify-center"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                         >
//                           <span className="text-white font-bold text-sm bg-red-500 px-2 py-1 rounded-md">Habis</span>
//                         </motion.div>
//                       )}
//                     </div>

//                     <div className="p-3 flex flex-col h-[150px]"> {/* Padding dan tinggi konten diperkecil */}
//                       <h3 className="font-semibold text-gray-800 text-xs mb-1 line-clamp-2 h-8"> {/* Font size diperkecil */}
//                         {p.name || p.productName}
//                       </h3>
                      
//                       <div className="flex items-center mb-1">
//                         <div className="flex">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star 
//                               key={star}
//                               size={10} // Ukuran bintang diperkecil
//                               className={star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"} 
//                             />
//                           ))}
//                         </div>
//                         <span className="text-[10px] text-gray-600 ml-1">4.8</span> {/* Font size rating diperkecil */}
//                       </div>
                      
//                       <p className="text-blue-600 font-bold text-sm mb-1"> {/* Font size harga diperkecil */}
//                         Rp {(p.price || p.productPrice).toLocaleString('id-ID')}
//                       </p>
//                        {/* Tampilan ukuran */}
//                     <div className="mb-2">
//                      <p className="text-[10px] text-gray-600 mb-1">Ukuran:</p>
//                       <div className="flex space-x-1">
//                         {sizes.map((size) => (
//                             <span 
//                               key={size}
//                               className="text-[10px] border border-gray-300 rounded px-1 py-0.5 min-w-[20px] text-center"
//                             >
//                               {size}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                       <p className={`text-[10px] mb-2 ${(p.stok ?? p.stock ?? 0) <= 5 ? 'text-red-500' : 'text-green-600'}`}>
//                         Stok: {p.stok ?? p.stock ?? 0}
//                       </p>

//                       <div className="flex space-x-1 mt-auto"> {/* Spacing tombol diperkecil */}
//                         <motion.button
//                           onClick={() => handleBuy(p)}
//                           disabled={(p.stok ?? p.stock ?? 0) <= 0}
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                           className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-all flex items-center justify-center ${
//                             (p.stok ?? p.stock ?? 0) <= 0 
//                               ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                               : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
//                           }`}
//                         >
//                           <ShoppingCart size={12} className="mr-1" /> {/* Ukuran ikon diperkecil */}
//                           Beli
//                         </motion.button>
                        
//                         <motion.button
//                           onClick={() => handleRemove(p.id)}
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                           className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors flex items-center justify-center"
//                           title="Hapus dari favorit"
//                         >
//                           <Trash2 size={14} /> {/* Ukuran ikon diperkecil */}
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <motion.div 
//                 className="flex justify-center items-center mt-10 space-x-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <motion.button 
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(prev => prev - 1)}
//                   whileTap={{ scale: 0.95 }}
//                   whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
//                   className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
//                     currentPage === 1 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
//                   }`}
//                 >
//                   <ChevronLeft size={16} className="mr-1" />
//                   Sebelumnya
//                 </motion.button>
                
//                 <span className="text-gray-700 text-sm">
//                   Halaman <span className="font-bold text-blue-700">{currentPage}</span> dari {totalPages}
//                 </span>
                
//                 <motion.button 
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(prev => prev + 1)}
//                   whileTap={{ scale: 0.95 }}
//                   whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
//                   className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
//                     currentPage === totalPages 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
//                   }`}
//                 >
//                   Selanjutnya
//                   <ChevronRight size={16} className="ml-1" />
//                 </motion.button>
//               </motion.div>
//             )}
//           </>
//         )}

//         {/* Success Popup */}
//         <AnimatePresence>
//           {showSuccessPopup && (
//             <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//               <motion.div
//                 variants={popupVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="bg-white rounded-xl p-6 shadow-2xl border-2 border-green-200 max-w-sm mx-4"
//               >
//                 <div className="text-center">
//                   <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
//                     <motion.div
//                       variants={checkIconVariants}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <Check 
//                         size={32} 
//                         className="text-green-600" 
//                         strokeWidth={3}
//                       />
//                     </motion.div>
//                   </div>
                  
//                   <h3 className="text-lg font-semibold mb-2 text-green-800">
//                     Berhasil Dihapus
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm">
//                     Produk telah dihapus dari daftar favorit Anda
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default LikeList;





























// // src/pages/users/LikeList.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart, ShoppingCart, Trash2, Star, Info, ChevronLeft, ChevronRight, Check } from "lucide-react";
// import { getSession } from "../../helper/session";
// import { ProductContext } from "../../helper/ProductContext";

// const LikeList = () => {
//   const navigate = useNavigate();
//   const ctx = useContext(ProductContext) || {};
//   const { setLikeCount = () => {} } = ctx;

//   const [user, setUser] = useState(null);
//   const [liked, setLiked] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [showConfirmPopup, setShowConfirmPopup] = useState(false);
//   const [productToRemove, setProductToRemove] = useState(null);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState("");
  
//   const itemsPerPage = 8;

//   // Ukuran yang tersedia
//   const sizes = ["S", "M", "L", "XL"];

//   const showSuccessMessage = (message, type) => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setShowSuccessPopup(true);
    
//     // Sembunyikan popup setelah 2 detik
//     setTimeout(() => {
//       setShowSuccessPopup(false);
//     }, 2000);
//   };

//   const getImageSrc = (p) => {
//     const img = p.image_1 || p.image || p.productImage;
//     if (!img) return "";
//     return img.toString().startsWith("http")
//       ? img.toString()
//       : `https://api-sepokat.vercel.app/${img.toString()}`;
//   };

//   useEffect(() => {
//     const sessionUser = getSession();
//     if (!sessionUser) {
//       setUser(null);
//       setLiked([]);
//       return;
//     }
//     setUser(sessionUser);

//     const key = `likedProducts_${sessionUser.username}`;
//     const data = JSON.parse(localStorage.getItem(key)) || [];
//     setLiked(Array.isArray(data) ? data : []);
//     setLikeCount(Array.isArray(data) ? data.length : 0);
//   }, [setLikeCount]);

//   const handleRemove = (productId) => {
//     if (!user) {
//       alert("Silakan login terlebih dahulu.");
//       return;
//     }

//     // Set produk yang akan dihapus dan tampilkan popup konfirmasi
//     setProductToRemove(productId);
//     setShowConfirmPopup(true);
//   };

//   const confirmRemove = () => {
//     if (!productToRemove) return;

//     const key = `likedProducts_${user.username}`;
//     const current = JSON.parse(localStorage.getItem(key)) || [];
//     const updated = current.filter((p) => p.id != productToRemove);
//     localStorage.setItem(key, JSON.stringify(updated));
//     setLiked(updated);
//     setLikeCount(updated.length);
    
//     // Sembunyikan popup konfirmasi dan tampilkan popup sukses
//     setShowConfirmPopup(false);
//     setProductToRemove(null);
//     showSuccessMessage("Berhasil Dihapus", "remove");
//   };

//   const cancelRemove = () => {
//     setShowConfirmPopup(false);
//     setProductToRemove(null);
//   };

//   const handleBuy = (product) => {
//     const productData = {
//       id: product.id,
//       name: product.name || product.productName,
//       price: product.price || product.productPrice,
//       image_1: product.image_1 || product.image || product.productImage,
//       stok: product.stok ?? product.stock ?? 0,
//     };
//     localStorage.setItem("buyProduct", JSON.stringify(productData));
//     navigate("/user/payment");
//   };

//   // Logika pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = liked.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(liked.length / itemsPerPage);

//   // Animasi untuk produk
//   const productVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     },
//     hover: {
//       y: -8,
//       scale: 1.02,
//       boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
//       transition: { duration: 0.3 }
//     }
//   };

//   // Animasi untuk icon
//   const iconVariants = {
//     hover: { scale: 1.1 },
//     tap: { scale: 0.9 }
//   };

//   // Animasi untuk popup sukses
//   // eslint-disable-next-line no-unused-vars
//   const successPopupVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 50 },
//     visible: { 
//       opacity: 1, 
//       scale: 1, 
//       y: 0,
//       transition: { 
//         type: "spring",
//         stiffness: 300,
//         damping: 20
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       scale: 0.8,
//       y: 50,
//       transition: { duration: 0.2 }
//     }
//   };

//   // Animasi untuk check icon
//   // eslint-disable-next-line no-unused-vars
//   const checkIconVariants = {
//     hidden: { scale: 0, opacity: 0 },
//     visible: { 
//       scale: 1, 
//       opacity: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 400,
//         damping: 10,
//         delay: 0.1
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
//       <div className="container mx-auto max-w-6xl">
//         <motion.h1 
//           className="text-3xl font-bold text-center text-blue-900 mb-2"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Daftar Favorit Anda
//         </motion.h1>
        
//         <motion.p 
//           className="text-center text-gray-600 mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           {liked.length} produk favorit
//         </motion.p>

//         {!user ? (
//           <motion.div 
//             className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <Info size={48} className="mx-auto text-blue-500 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Login Diperlukan</h2>
//             <p className="text-gray-600">Silakan login untuk melihat daftar favorit Anda.</p>
//           </motion.div>
//         ) : liked.length === 0 ? (
//           <motion.div 
//             className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <Heart size={48} className="mx-auto text-pink-500 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Favorit</h2>
//             <p className="text-gray-600">Anda belum menambahkan produk ke daftar favorit.</p>
//           </motion.div>
//         ) : (
//           <>
//             <motion.div 
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <AnimatePresence>
//                 {currentItems.map((p) => (
//                   <motion.div
//                     key={p.id}
//                     variants={productVariants}
//                     initial="hidden"
//                     animate="visible"
//                     whileHover="hover"
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 relative group w-full max-w-[280px] h-[350px] mx-auto"
//                   >
//                     <div className="relative overflow-hidden h-[180px]">
//                       <motion.img 
//                         src={getImageSrc(p)} 
//                         alt={p.name || p.productName} 
//                         className="w-full h-full object-cover"
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ duration: 0.4 }}
//                       />
                      
//                       {(p.stok ?? p.stock ?? 0) <= 0 && (
//                         <motion.div 
//                           className="absolute inset-0 bg-black/60 flex items-center justify-center"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                         >
//                           <span className="text-white font-bold text-sm bg-red-500 px-2 py-1 rounded-md">Habis</span>
//                         </motion.div>
//                       )}
//                     </div>

//                     <div className="p-4 flex flex-col h-[170px]">
//                       <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 h-10">
//                         {p.name || p.productName}
//                       </h3>
                      
//                       <div className="flex items-center mb-2">
//                         <div className="flex">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star 
//                               key={star}
//                               size={12}
//                               className={star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"} 
//                             />
//                           ))}
//                         </div>
//                         <span className="text-xs text-gray-600 ml-1">4.8</span>
//                       </div>
                      
//                       <p className="text-blue-600 font-bold text-base mb-2">
//                         Rp {(p.price || p.productPrice).toLocaleString('id-ID')}
//                       </p>
                      
//                       {/* Tampilan ukuran */}
//                       <div className="mb-2">
//                         <p className="text-xs text-gray-600 mb-1">Ukuran:</p>
//                         <div className="flex space-x-1">
//                           {sizes.map((size) => (
//                             <span 
//                               key={size}
//                               className="text-xs border border-gray-300 rounded px-2 py-0.5 min-w-[24px] text-center"
//                             >
//                               {size}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <p className={`text-xs mb-3 ${(p.stok ?? p.stock ?? 0) <= 5 ? 'text-red-500' : 'text-green-600'}`}>
//                         Stok: {p.stok ?? p.stock ?? 0}
//                       </p>

//                       <div className="flex space-x-2 mt-auto">
//                         <motion.button
//                           onClick={() => handleBuy(p)}
//                           disabled={(p.stok ?? p.stock ?? 0) <= 0}
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                           className={`flex-1 py-2 px-3 rounded text-xs font-medium transition-all flex items-center justify-center ${
//                             (p.stok ?? p.stock ?? 0) <= 0 
//                               ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                               : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
//                           }`}
//                         >
//                           <ShoppingCart size={14} className="mr-1" />
//                           Beli
//                         </motion.button>
                        
//                         <motion.button
//                           onClick={() => handleRemove(p.id)}
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                           className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors flex items-center justify-center"
//                           title="Hapus dari favorit"
//                         >
//                           <Trash2 size={16} />
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <motion.div 
//                 className="flex justify-center items-center mt-10 space-x-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <motion.button 
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(prev => prev - 1)}
//                   whileTap={{ scale: 0.95 }}
//                   whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
//                   className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
//                     currentPage === 1 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
//                   }`}
//                 >
//                   <ChevronLeft size={16} className="mr-1" />
//                   Sebelumnya
//                 </motion.button>
                
//                 <span className="text-gray-700 text-sm">
//                   Halaman <span className="font-bold text-blue-700">{currentPage}</span> dari {totalPages}
//                 </span>
                
//                 <motion.button 
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(prev => prev + 1)}
//                   whileTap={{ scale: 0.95 }}
//                   whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
//                   className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
//                     currentPage === totalPages 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
//                   }`}
//                 >
//                   Selanjutnya
//                   <ChevronRight size={16} className="ml-1" />
//                 </motion.button>
//               </motion.div>
//             )}
//           </>
//         )}

//         {/* Confirm Delete Popup */}
//         <AnimatePresence>
//           {showConfirmPopup && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, scale: 0.8, y: 50 },
//                   visible: { 
//                     opacity: 1, 
//                     scale: 1, 
//                     y: 0,
//                     transition: { 
//                       type: "spring",
//                       stiffness: 300,
//                       damping: 20
//                     }
//                   },
//                   exit: { 
//                     opacity: 0, 
//                     scale: 0.8,
//                     y: 50,
//                     transition: { duration: 0.2 }
//                   }
//                 }}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="bg-white rounded-xl p-6 shadow-2xl border-2 border-red-200 max-w-sm w-full"
//               >
//                 <div className="text-center">
//                   {/* Warning Icon */}
//                   <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100">
//                     <motion.div
//                       initial={{ rotate: 0 }}
//                       animate={{ rotate: [0, -10, 10, -10, 0] }}
//                       transition={{ duration: 0.5, delay: 0.2 }}
//                     >
//                       <Trash2 
//                         size={32} 
//                         className="text-red-600" 
//                         strokeWidth={2}
//                       />
//                     </motion.div>
//                   </div>
                  
//                   {/* Message */}
//                   <h3 className="text-lg font-semibold mb-2 text-red-800">
//                     Hapus dari Favorit?
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm mb-6">
//                     Apakah Anda yakin ingin menghapus produk ini dari daftar favorit Anda?
//                   </p>

//                   {/* Buttons */}
//                   <div className="flex space-x-3">
//                     <motion.button
//                       onClick={cancelRemove}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//                     >
//                       Batal
//                     </motion.button>
                    
//                     <motion.button
//                       onClick={confirmRemove}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md"
//                     >
//                       Ya, Hapus
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* Success Popup */}
//         <AnimatePresence>
//           {showSuccessPopup && (
//             <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, scale: 0.8, y: 50 },
//                   visible: { 
//                     opacity: 1, 
//                     scale: 1, 
//                     y: 0,
//                     transition: { 
//                       type: "spring",
//                       stiffness: 300,
//                       damping: 20
//                     }
//                   },
//                   exit: { 
//                     opacity: 0, 
//                     scale: 0.8,
//                     y: 50,
//                     transition: { duration: 0.2 }
//                   }
//                 }}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className={`bg-white rounded-xl p-6 shadow-2xl border-2 max-w-sm mx-4 ${
//                   popupType === "remove" ? "border-red-200" : "border-blue-200"
//                 }`}
//               >
//                 <div className="text-center">
//                   {/* Check Icon with Circle */}
//                   <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
//                     popupType === "remove" ? "bg-red-100" : "bg-blue-100"
//                   }`}>
//                     <motion.div
//                       variants={{
//                         hidden: { scale: 0, opacity: 0 },
//                         visible: { 
//                           scale: 1, 
//                           opacity: 1,
//                           transition: { 
//                             type: "spring",
//                             stiffness: 400,
//                             damping: 10,
//                             delay: 0.1
//                           }
//                         }
//                       }}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <Check 
//                         size={32} 
//                         className={popupType === "remove" ? "text-red-600" : "text-blue-600"} 
//                         strokeWidth={3}
//                       />
//                     </motion.div>
//                   </div>
                  
//                   {/* Message */}
//                   <h3 className={`text-lg font-semibold mb-2 ${
//                     popupType === "remove" ? "text-red-800" : "text-blue-800"
//                   }`}>
//                     {popupMessage}
//                   </h3>
                  
//                   {/* Sub Message */}
//                   <p className="text-gray-600 text-sm">
//                     {popupType === "remove" 
//                       ? "Produk telah dihapus dari favorit Anda" 
//                       : "Produk telah disimpan ke keranjang Anda"}
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default LikeList;
































// // src/pages/users/LikeList.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import { Heart, ShoppingCart, Trash2, Star, Info, ChevronLeft, ChevronRight, Check } from "lucide-react";
// import { getSession } from "../../helper/session";
// import { ProductContext } from "../../helper/ProductContext";

// const LikeList = () => {
//   const navigate = useNavigate();
//   const ctx = useContext(ProductContext) || {};
//   const { setLikeCount = () => {} } = ctx;

//   const [user, setUser] = useState(null);
//   const [liked, setLiked] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);
//   const [showConfirmPopup, setShowConfirmPopup] = useState(false);
//   const [productToRemove, setProductToRemove] = useState(null);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState("");
  
//   const itemsPerPage = 8;

//   // Ukuran yang tersedia
//   const sizes = ["S", "M", "L", "XL"];

//   // Fungsi untuk menghasilkan rating acak antara 3.5 hingga 5.0
//   const generateRandomRating = () => {
//     return (Math.random() * 1.5 + 3.5).toFixed(1);
//   };

//   const showSuccessMessage = (message, type) => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setShowSuccessPopup(true);
    
//     // Sembunyikan popup setelah 2 detik
//     setTimeout(() => {
//       setShowSuccessPopup(false);
//     }, 2000);
//   };

//   const getImageSrc = (p) => {
//     const img = p.image_1 || p.image || p.productImage;
//     if (!img) return "";
//     return img.toString().startsWith("http")
//       ? img.toString()
//       : `https://api-sepokat.vercel.app/${img.toString()}`;
//   };

//   useEffect(() => {
//     const sessionUser = getSession();
//     if (!sessionUser) {
//       setUser(null);
//       setLiked([]);
//       return;
//     }
//     setUser(sessionUser);

//     const key = `likedProducts_${sessionUser.username}`;
//     const data = JSON.parse(localStorage.getItem(key)) || [];
//     setLiked(Array.isArray(data) ? data : []);
//     setLikeCount(Array.isArray(data) ? data.length : 0);
//   }, [setLikeCount]);

//   const handleRemove = (productId) => {
//     if (!user) {
//       alert("Silakan login terlebih dahulu.");
//       return;
//     }

//     // Set produk yang akan dihapus dan tampilkan popup konfirmasi
//     setProductToRemove(productId);
//     setShowConfirmPopup(true);
//   };

//   const confirmRemove = () => {
//     if (!productToRemove) return;

//     const key = `likedProducts_${user.username}`;
//     const current = JSON.parse(localStorage.getItem(key)) || [];
//     const updated = current.filter((p) => p.id != productToRemove);
//     localStorage.setItem(key, JSON.stringify(updated));
//     setLiked(updated);
//     setLikeCount(updated.length);
    
//     // Sembunyikan popup konfirmasi dan tampilkan popup sukses
//     setShowConfirmPopup(false);
//     setProductToRemove(null);
//     showSuccessMessage("Berhasil Dihapus", "remove");
//   };

//   const cancelRemove = () => {
//     setShowConfirmPopup(false);
//     setProductToRemove(null);
//   };

//   const handleBuy = (product) => {
//     const productData = {
//       id: product.id,
//       name: product.name || product.productName,
//       price: product.price || product.productPrice,
//       image_1: product.image_1 || product.image || product.productImage,
//       stok: product.stok ?? product.stock ?? 0,
//     };
//     localStorage.setItem("buyProduct", JSON.stringify(productData));
//     navigate("/user/payment");
//   };

//   // Logika pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = liked.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(liked.length / itemsPerPage);

//   // Animasi untuk produk
//   const productVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     },
//     hover: {
//       y: -8,
//       scale: 1.02,
//       boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
//       transition: { duration: 0.3 }
//     }
//   };

//   // Animasi untuk icon
//   const iconVariants = {
//     hover: { scale: 1.1 },
//     tap: { scale: 0.9 }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
//       <div className="container mx-auto max-w-6xl">
//         <motion.h1 
//           className="text-3xl font-bold text-center text-blue-900 mb-2"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Daftar Favorit Anda
//         </motion.h1>
        
//         <motion.p 
//           className="text-center text-gray-600 mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           {liked.length} produk favorit
//         </motion.p>

//         {!user ? (
//           <motion.div 
//             className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <Info size={48} className="mx-auto text-blue-500 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Login Diperlukan</h2>
//             <p className="text-gray-600">Silakan login untuk melihat daftar favorit Anda.</p>
//           </motion.div>
//         ) : liked.length === 0 ? (
//           <motion.div 
//             className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <Heart size={48} className="mx-auto text-pink-500 mb-4" />
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Favorit</h2>
//             <p className="text-gray-600">Anda belum menambahkan produk ke daftar favorit.</p>
//           </motion.div>
//         ) : (
//           <>
//             <motion.div 
//               className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <AnimatePresence>
//                 {currentItems.map((p) => {
//                   const rating = generateRandomRating();
//                   const fullStars = Math.floor(rating);
//                   const hasHalfStar = rating % 1 >= 0.5;
                  
//                   return (
//                   <motion.div
//                     key={p.id}
//                     variants={productVariants}
//                     initial="hidden"
//                     animate="visible"
//                     whileHover="hover"
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 relative group w-full max-w-[240px] h-[390px] mx-auto flex flex-col"
//                   >
//                     <div className="relative overflow-hidden h-[180px] flex-shrink-0">
//                       <motion.img 
//                         src={getImageSrc(p)} 
//                         alt={p.name || p.productName} 
//                         className="w-full h-full object-cover"
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ duration: 0.4 }}
//                       />
                      
//                       {(p.stok ?? p.stock ?? 0) <= 0 && (
//                         <motion.div 
//                           className="absolute inset-0 bg-black/60 flex items-center justify-center"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                         >
//                           <span className="text-white font-bold text-sm bg-red-500 px-2 py-1 rounded-md">Habis</span>
//                         </motion.div>
//                       )}
//                     </div>

//                     <div className="p-4 flex flex-col flex-grow">
//                       <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 h-10">
//                         {p.name || p.productName}
//                       </h3>
                      
//                       <div className="flex items-center mb-2">
//                         <div className="flex">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <Star 
//                               key={star}
//                               size={12}
//                               className={
//                                 star <= fullStars 
//                                   ? "text-yellow-400 fill-current" 
//                                   : (hasHalfStar && star === fullStars + 1 ? "text-yellow-400 fill-half" : "text-gray-300")
//                               } 
//                             />
//                           ))}
//                         </div>
//                         <span className="text-xs text-gray-600 ml-1">{rating}</span>
//                       </div>
                      
//                       <p className="text-blue-600 font-bold text-base mb-2">
//                         Rp {(p.price || p.productPrice).toLocaleString('id-ID')}
//                       </p>
                      
//                       {/* Tampilan ukuran */}
//                       <div className="mb-2">
//                         <p className="text-xs text-gray-600 mb-1">Ukuran:</p>
//                         <div className="flex space-x-1">
//                           {sizes.map((size) => (
//                             <span 
//                               key={size}
//                               className="text-xs border border-gray-300 rounded px-2 py-0.5 min-w-[24px] text-center"
//                             >
//                               {size}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <p className={`text-xs mb-3 ${(p.stok ?? p.stock ?? 0) <= 5 ? 'text-red-500' : 'text-green-600'}`}>
//                         Stok: {p.stok ?? p.stock ?? 0}
//                       </p>

//                       <div className="flex space-x-2 mt-auto">
//                         <motion.button
//                           onClick={() => handleBuy(p)}
//                           disabled={(p.stok ?? p.stock ?? 0) <= 0}
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                           className={`flex-1 py-2 px-3 rounded text-xs font-medium transition-all flex items-center justify-center ${
//                             (p.stok ?? p.stock ?? 0) <= 0 
//                               ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
//                               : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
//                           }`}
//                         >
//                           <ShoppingCart size={14} className="mr-1" />
//                           Beli Sekarang
//                         </motion.button>
                        
//                         <motion.button
//                           onClick={() => handleRemove(p.id)}
//                           variants={iconVariants}
//                           whileHover="hover"
//                           whileTap="tap"
//                           className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors flex items-center justify-center"
//                           title="Hapus dari favorit"
//                         >
//                           <Trash2 size={16} />
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )})}
//               </AnimatePresence>
//             </motion.div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <motion.div 
//                 className="flex justify-center items-center mt-10 space-x-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <motion.button 
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(prev => prev - 1)}
//                   whileTap={{ scale: 0.95 }}
//                   whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
//                   className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
//                     currentPage === 1 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
//                   }`}
//                 >
//                   <ChevronLeft size={16} className="mr-1" />
//                   Sebelumnya
//                 </motion.button>
                
//                 <span className="text-gray-700 text-sm">
//                   Halaman <span className="font-bold text-blue-700">{currentPage}</span> dari {totalPages}
//                 </span>
                
//                 <motion.button 
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(prev => prev + 1)}
//                   whileTap={{ scale: 0.95 }}
//                   whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
//                   className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
//                     currentPage === totalPages 
//                       ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
//                       : 'bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-md'
//                   }`}
//                 >
//                   Selanjutnya
//                   <ChevronRight size={16} className="ml-1" />
//                 </motion.button>
//               </motion.div>
//             )}
//           </>
//         )}

//         {/* Confirm Delete Popup */}
//         <AnimatePresence>
//           {showConfirmPopup && (
//             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, scale: 0.8, y: 50 },
//                   visible: { 
//                     opacity: 1, 
//                     scale: 1, 
//                     y: 0,
//                     transition: { 
//                       type: "spring",
//                       stiffness: 300,
//                       damping: 20
//                     }
//                   },
//                   exit: { 
//                     opacity: 0, 
//                     scale: 0.8,
//                     y: 50,
//                     transition: { duration: 0.2 }
//                   }
//                 }}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="bg-white rounded-xl p-6 shadow-2xl border-2 border-red-200 max-w-sm w-full"
//               >
//                 <div className="text-center">
//                   {/* Warning Icon */}
//                   <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100">
//                     <motion.div
//                       initial={{ rotate: 0 }}
//                       animate={{ rotate: [0, -10, 10, -10, 0] }}
//                       transition={{ duration: 0.5, delay: 0.2 }}
//                     >
//                       <Trash2 
//                         size={32} 
//                         className="text-red-600" 
//                         strokeWidth={2}
//                       />
//                     </motion.div>
//                   </div>
                  
//                   {/* Message */}
//                   <h3 className="text-lg font-semibold mb-2 text-red-800">
//                     Hapus dari Favorit?
//                   </h3>
                  
//                   <p className="text-gray-600 text-sm mb-6">
//                     Apakah Anda yakin ingin menghapus produk ini dari daftar favorit Anda?
//                   </p>

//                   {/* Buttons */}
//                   <div className="flex space-x-3">
//                     <motion.button
//                       onClick={cancelRemove}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//                     >
//                       Batal
//                     </motion.button>
                    
//                     <motion.button
//                       onClick={confirmRemove}
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md"
//                     >
//                       Ya, Hapus
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>

//         {/* Success Popup */}
//         <AnimatePresence>
//           {showSuccessPopup && (
//             <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//               <motion.div
//                 variants={{
//                   hidden: { opacity: 0, scale: 0.8, y: 50 },
//                   visible: { 
//                     opacity: 1, 
//                     scale: 1, 
//                     y: 0,
//                     transition: { 
//                       type: "spring",
//                       stiffness: 300,
//                       damping: 20
//                     }
//                   },
//                   exit: { 
//                     opacity: 0, 
//                     scale: 0.8,
//                     y: 50,
//                     transition: { duration: 0.2 }
//                   }
//                 }}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className={`bg-white rounded-xl p-6 shadow-2xl border-2 max-w-sm mx-4 ${
//                   popupType === "remove" ? "border-red-200" : "border-blue-200"
//                 }`}
//               >
//                 <div className="text-center">
//                   {/* Check Icon with Circle */}
//                   <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
//                     popupType === "remove" ? "bg-red-100" : "bg-blue-100"
//                   }`}>
//                     <motion.div
//                       variants={{
//                         hidden: { scale: 0, opacity: 0 },
//                         visible: { 
//                           scale: 1, 
//                           opacity: 1,
//                           transition: { 
//                             type: "spring",
//                             stiffness: 400,
//                             damping: 10,
//                             delay: 0.1
//                           }
//                         }
//                       }}
//                       initial="hidden"
//                       animate="visible"
//                     >
//                       <Check 
//                         size={32} 
//                         className={popupType === "remove" ? "text-red-600" : "text-blue-600"} 
//                         strokeWidth={3}
//                       />
//                     </motion.div>
//                   </div>
                  
//                   {/* Message */}
//                   <h3 className={`text-lg font-semibold mb-2 ${
//                     popupType === "remove" ? "text-red-800" : "text-blue-800"
//                   }`}>
//                     {popupMessage}
//                   </h3>
                  
//                   {/* Sub Message */}
//                   <p className="text-gray-600 text-sm">
//                     {popupType === "remove" 
//                       ? "Produk telah dihapus dari favorit Anda" 
//                       : "Produk telah disimpan ke keranjang Anda"}
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default LikeList;






















// src/pages/users/LikeList.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Star, Info, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { getSession } from "../../helper/session";
import { ProductContext } from "../../helper/ProductContext";

const LikeList = () => {
  const navigate = useNavigate();
  const ctx = useContext(ProductContext) || {};
  const { setLikeCount = () => {} } = ctx;

  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  
  const itemsPerPage = 10;

  // Ukuran yang tersedia
  const sizes = ["S", "M", "L", "XL"];

  // Fungsi untuk menghasilkan rating acak antara 3.5 hingga 5.0
  const generateRandomRating = () => {
    return (Math.random() * 1.5 + 3.5).toFixed(1);
  };

  const showSuccessMessage = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowSuccessPopup(true);
    
    // Sembunyikan popup setelah 2 detik
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 2000);
  };

  const getImageSrc = (p) => {
    const img = p.image_1 || p.image || p.productImage;
    if (!img) return "";
    return img.toString().startsWith("http")
      ? img.toString()
      : `https://api-sepokat.vercel.app/${img.toString()}`;
  };

  useEffect(() => {
    const sessionUser = getSession();
    if (!sessionUser) {
      setUser(null);
      setLiked([]);
      return;
    }
    setUser(sessionUser);

    const key = `likedProducts_${sessionUser.username}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setLiked(Array.isArray(data) ? data : []);
    setLikeCount(Array.isArray(data) ? data.length : 0);
  }, [setLikeCount]);

  const handleRemove = (productId) => {
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    // Set produk yang akan dihapus dan tampilkan popup konfirmasi
    setProductToRemove(productId);
    setShowConfirmPopup(true);
  };

  const confirmRemove = () => {
    if (!productToRemove) return;

    const key = `likedProducts_${user.username}`;
    const current = JSON.parse(localStorage.getItem(key)) || [];
    const updated = current.filter((p) => p.id != productToRemove);
    localStorage.setItem(key, JSON.stringify(updated));
    setLiked(updated);
    setLikeCount(updated.length);
    
    // Sembunyikan popup konfirmasi dan tampilkan popup sukses
    setShowConfirmPopup(false);
    setProductToRemove(null);
    showSuccessMessage("Berhasil Dihapus", "remove");
  };

  const cancelRemove = () => {
    setShowConfirmPopup(false);
    setProductToRemove(null);
  };

  const handleBuy = (product) => {
    const productData = {
      id: product.id,
      name: product.name || product.productName,
      price: product.price || product.productPrice,
      image_1: product.image_1 || product.image || product.productImage,
      stok: product.stok ?? product.stock ?? 0,
    };
    localStorage.setItem("buyProduct", JSON.stringify(productData));
    navigate("/user/payment");
  };

  // Logika pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = liked.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(liked.length / itemsPerPage);

  // Animasi untuk produk
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  // Animasi untuk icon
  const iconVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
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
          Daftar Favorit Anda
        </motion.h1>
        
        <motion.p 
          className="text-center text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {liked.length} produk favorit
        </motion.p>

        {!user ? (
          <motion.div 
            className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Info size={48} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Login Diperlukan</h2>
            <p className="text-gray-600">Silakan login untuk melihat daftar favorit Anda.</p>
          </motion.div>
        ) : liked.length === 0 ? (
          <motion.div 
            className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Heart size={48} className="mx-auto text-pink-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Favorit</h2>
            <p className="text-gray-600">Anda belum menambahkan produk ke daftar favorit.</p>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence>
                {currentItems.map((p) => {
                  const rating = generateRandomRating();
                  const fullStars = Math.floor(rating);
                  const hasHalfStar = rating % 1 >= 0.5;
                  
                  return (
                  <motion.div
                    key={p.id}
                    variants={productVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 relative group"
                  >
                    <div className="relative overflow-hidden h-40">
                      <motion.img 
                        src={getImageSrc(p)} 
                        alt={p.name || p.productName} 
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {(p.stok ?? p.stock ?? 0) <= 0 && (
                        <motion.div 
                          className="absolute inset-0 bg-black/60 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span className="text-white font-bold text-sm bg-red-500 px-2 py-1 rounded-md">Habis</span>
                        </motion.div>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                        {p.name || p.productName}
                      </h3>
                      
                      <div className="flex items-center mb-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              size={12}
                              className={
                                star <= fullStars 
                                  ? "text-yellow-400 fill-current" 
                                  : (hasHalfStar && star === fullStars + 1 ? "text-yellow-400 fill-half" : "text-gray-300")
                              } 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">{rating}</span>
                      </div>
                      
                      <p className="text-blue-600 font-bold text-base mb-2">
                        Rp {(p.price || p.productPrice).toLocaleString('id-ID')}
                      </p>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-xs ${(p.stok ?? p.stock ?? 0) <= 5 ? 'text-red-500' : 'text-green-600'}`}>
                          Stok: {p.stok ?? p.stock ?? 0}
                        </span>
                        <div className="flex space-x-1">
                          {sizes.slice(0, 3).map((size) => (
                            <span
                              key={size}
                              className="text-xs text-gray-500 border border-gray-200 px-1 rounded"
                            >
                              {size}
                            </span>
                          ))}
                          {sizes.length > 3 && (
                            <span className="text-xs text-gray-500">+{sizes.length - 3}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleBuy(p)}
                          disabled={(p.stok ?? p.stock ?? 0) <= 0}
                          variants={iconVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center ${
                            (p.stok ?? p.stock ?? 0) <= 0 
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                          }`}
                        >
                          <ShoppingCart size={12} className="mr-1" />
                          {p.stok > 0 ? 'Beli' : 'Habis'}
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleRemove(p.id)}
                          variants={iconVariants}
                          whileHover="hover"
                          whileTap="tap"
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                          title="Hapus dari favorit"
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )})}
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

        {/* Confirm Delete Popup */}
        <AnimatePresence>
          {showConfirmPopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
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
                className="bg-white rounded-xl p-6 shadow-2xl border-2 border-red-200 max-w-sm w-full"
              >
                <div className="text-center">
                  {/* Warning Icon */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Trash2 
                        size={32} 
                        className="text-red-600" 
                        strokeWidth={2}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Message */}
                  <h3 className="text-lg font-semibold mb-2 text-red-800">
                    Hapus dari Favorit?
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    Apakah Anda yakin ingin menghapus produk ini dari daftar favorit Anda?
                  </p>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={cancelRemove}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Batal
                    </motion.button>
                    
                    <motion.button
                      onClick={confirmRemove}
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
                className={`bg-white rounded-xl p-6 shadow-2xl border-2 max-w-sm mx-4 ${
                  popupType === "remove" ? "border-red-200" : "border-blue-200"
                }`}
              >
                <div className="text-center">
                  {/* Check Icon with Circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    popupType === "remove" ? "bg-red-100" : "bg-blue-100"
                  }`}>
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
                      <Check 
                        size={32} 
                        className={popupType === "remove" ? "text-red-600" : "text-blue-600"} 
                        strokeWidth={3}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Message */}
                  <h3 className={`text-lg font-semibold mb-2 ${
                    popupType === "remove" ? "text-red-800" : "text-blue-800"
                  }`}>
                    {popupMessage}
                  </h3>
                  
                  {/* Sub Message */}
                  <p className="text-gray-600 text-sm">
                    {popupType === "remove" 
                      ? "Produk telah dihapus dari favorit Anda" 
                      : "Produk telah disimpan ke keranjang Anda"}
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

export default LikeList;