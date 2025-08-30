
// import React, { useEffect, useState, useContext } from "react";
// import { ProductContext } from "../../helper/ProductContext"; 
// import { useNavigate } from "react-router-dom";

// const Product = () => {
//   const { search, setLikeCount, setSaveCount, filter, sort, username } = useContext(ProductContext);
//   const [products, setProducts] = useState([]); 
//   const [currentPage, setCurrentPage] = useState(1); 
//   const itemsPerPage = 20; 
//   const navigate = useNavigate();

//   // Ambil data product dari API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("https://api-sepokat.vercel.app/api/product/get-all");
//         const data = await res.json();

//         // 🔹 Ambil semua transaksi dari localStorage
//         const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

//         // 🔹 Loop semua produk lalu cek apakah pernah dibeli di transactions
//         const merged = data.map(p => {
//           // Cari semua transaksi produk ini
//           const trans = transactions.filter(t => t.productId == p.id);

//           // Hitung total qty yang sudah dibeli dari transaksi
//           const totalQty = trans.reduce((sum, t) => sum + t.qty, 0);

//           // Kurangi stok produk
//           const newStok = p.stok - totalQty;

//           return {
//             ...p,
//             stok: newStok < 0 ? 0 : newStok // stok jangan minus
//           };
//         });

//         setProducts(merged);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Filter + Sorting
//   let filtered = products
//     .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
//     .filter(p => {
//       if (filter === "all") return true;
//       if (filter === "mens") return p.name.slice(-1).toLowerCase() === "n";
//       if (filter === "womens") return p.name.slice(-1).toLowerCase() === "w";
//       return true;
//     });

//   if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
//   if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);

//   // Pagination
//   const indexOfLast = currentPage * itemsPerPage; 
//   const indexOfFirst = indexOfLast - itemsPerPage; 
//   const currentProducts = filtered.slice(indexOfFirst, indexOfLast); 
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);

//   // Fungsi Like
//   const handleLike = (product) => {
//     if (!username) return;
//     const key = `likedProducts_${username}`;
//     const liked = JSON.parse(localStorage.getItem(key)) || [];
//     if (!liked.find(p => p.id === product.id)) liked.push(product);
//     localStorage.setItem(key, JSON.stringify(liked));
//     setLikeCount(liked.length);
//   };

//   // Fungsi Save
//   const handleSave = (product) => {
//     if (!username) return;
//     const key = `savedProducts_${username}`;
//     const saved = JSON.parse(localStorage.getItem(key)) || [];
//     if (!saved.find(p => p.id === product.id)) saved.push(product);
//     localStorage.setItem(key, JSON.stringify(saved));
//     setSaveCount(saved.length);
//   };

//   // Fungsi Buy
//   const handleBuy = (product) => {
//      // Simpan hanya data yang diperlukan untuk payment
//   const productData = {
//     id: product.id,
//     name: product.name,
//     price: product.price,
//     image_1: product.image_1, // Pastikan property ini benar
//     stok: product.stok
//   };
  
//   localStorage.setItem("buyProduct", JSON.stringify(productData));
//   navigate("/user/payment");

//   };

//   return (
//     <>
//       <div>
//         <img src="https://i.pinimg.com/736x/d6/20/cf/d620cf73dfc1456a52a9d55578e3da4c.jpg" alt="" />
//         <img src="https://i.pinimg.com/736x/23/83/30/2383304c73c239f8311550322fef3f9f.jpg" alt="" />
//         <img src="https://i.pinimg.com/1200x/d3/46/70/d34670f8c51798f0471f611e5a893290.jpg" alt="" />
//         <img src="https://i.pinimg.com/1200x/d3/46/70/d34670f8c51798f0471f611e5a893290.jpg" alt="" />
//         <img src="https://i.pinimg.com/1200x/d3/46/70/d34670f8c51798f0471f611e5a893290.jpg" alt="" />
//       </div>
//       <div style={{ padding: "20px" }}>
//       <h1>Daftar Produk</h1>

//       {/* List Produk */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {currentProducts.map(p => (
//           <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px", width: "220px", textAlign: "center" }}>
//             <img src={p.image_1} alt={p.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
//             <h3>{p.name}</h3>
//             <p>Rp {p.price}</p>
//             {/* 🔹 Stok sudah otomatis berkurang berdasarkan transaksi */}
//             <p>Stok: {p.stok}</p>

//             <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
//               <button onClick={() => handleLike(p)}>❤️ Like</button>
//               <button onClick={() => handleSave(p)}>💾 Save</button>
//               <button disabled={p.stok <= 0} onClick={() => handleBuy(p)}>🛒 Buy</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* PAGINATION */}
//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
//         <span style={{ margin: "0 10px" }}>Halaman {currentPage} dari {totalPages}</span>
//         <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
//       </div>
//       </div>
//     </>
//   );
// };

// export default Product;



import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../helper/ProductContext"; 
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, 
  Sparkles, Bookmark, Zap, X, Info, CheckCircle, Tag, 
  Package, Clock, Shield, Truck, Check
} from "lucide-react";

const Product = () => {
  const { search, setLikeCount, setSaveCount, filter, sort, username } = useContext(ProductContext);
  const [products, setProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // like, save
  const itemsPerPage = 20; 
  const navigate = useNavigate();

  // Data gambar cover dengan URL yang diperbaiki
  const coverImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    "https://i.pinimg.com/1200x/f3/81/3e/f3813e522f948e15adac759acf87464a.jpg"
  ];


  // Rating acak untuk produk
  const generateRandomRating = () => {
    const ratings = [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
    return ratings[Math.floor(Math.random() * ratings.length)];
  };

  // Generate deskripsi produk
  const generateDescription = (productName) => {
    return `${productName} adalah produk fashion premium dari Luxora Store. Terbuat dari bahan berkualitas tinggi dengan jahitan yang rapi dan detail yang sempurna. Cocok untuk berbagai occasion baik formal maupun casual. Didesain untuk kenyamanan maksimal dan gaya yang elegan.`;
  };

  // Ukuran yang tersedia
  const sizes = ["S", "M", "L", "XL"];

  // Otomatis ganti slide setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === coverImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ambil data product dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api-sepokat.vercel.app/api/product/get-all");
        const data = await res.json();

        // Ambil semua transaksi dari localStorage
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        
        // Ambil data liked dan saved products
        if (username) {
          const likedKey = `likedProducts_${username}`;
          const savedKey = `savedProducts_${username}`;
          const liked = JSON.parse(localStorage.getItem(likedKey)) || [];
          const saved = JSON.parse(localStorage.getItem(savedKey)) || [];
          setLikedProducts(liked.map(p => p.id));
          setSavedProducts(saved.map(p => p.id));
        }

        // Loop semua produk
        const merged = data.map(p => {
          const trans = transactions.filter(t => t.productId == p.id);
          const totalQty = trans.reduce((sum, t) => sum + t.qty, 0);
          const newStok = p.stok - totalQty;

          return {
            ...p,
            stok: newStok < 0 ? 0 : newStok,
            rating: generateRandomRating(),
            sizes: sizes,
            description: generateDescription(p.name)
          };
        });

        setProducts(merged);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  // Tampilkan popup sukses
  const showSuccessMessage = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowSuccessPopup(true);
    
    // Sembunyikan popup setelah 2 detik
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 2000);
  };

  // Fungsi Like dengan toggle
  const handleLike = (product) => {
    if (!username) return;
    
    const key = `likedProducts_${username}`;
    const liked = JSON.parse(localStorage.getItem(key)) || [];
    const isLiked = liked.find(p => p.id === product.id);
    
    if (isLiked) {
      const updatedLiked = liked.filter(p => p.id !== product.id);
      localStorage.setItem(key, JSON.stringify(updatedLiked));
      setLikedProducts(updatedLiked.map(p => p.id));
      setLikeCount(updatedLiked.length);
      showSuccessMessage("Produk dihapus dari favorit", "like");
    } else {
      liked.push(product);
      localStorage.setItem(key, JSON.stringify(liked));
      setLikedProducts([...likedProducts, product.id]);
      setLikeCount(liked.length);
      showSuccessMessage("Produk ditambahkan ke favorit", "like");
    }
  };

  // Fungsi Save dengan toggle
  const handleSave = (product) => {
    if (!username) return;
    
    const key = `savedProducts_${username}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    const isSaved = saved.find(p => p.id === product.id);
    
    if (isSaved) {
      const updatedSaved = saved.filter(p => p.id !== product.id);
      localStorage.setItem(key, JSON.stringify(updatedSaved));
      setSavedProducts(updatedSaved.map(p => p.id));
      setSaveCount(updatedSaved.length);
      showSuccessMessage("Produk dihapus dari simpan", "save");
    } else {
      saved.push(product);
      localStorage.setItem(key, JSON.stringify(saved));
      setSavedProducts([...savedProducts, product.id]);
      setSaveCount(saved.length);
      showSuccessMessage("Produk disimpan ke keranjang", "save");
    }
  };

  // Fungsi Buy
  const handleBuy = (product) => {
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_1: product.image_1,
      stok: product.stok
    };
    
    localStorage.setItem("buyProduct", JSON.stringify(productData));
    navigate("/user/payment");
  };

  // Fungsi untuk membuka detail produk
  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  // Filter + Sorting
  let filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => {
      if (filter === "all") return true;
      if (filter === "mens") return p.name.slice(-1).toLowerCase() === "n";
      if (filter === "womens") return p.name.slice(-1).toLowerCase() === "w";
      return true;
    });

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);

  // Pagination
  const indexOfLast = currentPage * itemsPerPage; 
  const indexOfFirst = indexOfLast - itemsPerPage; 
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast); 
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Navigasi slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === coverImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? coverImages.length - 1 : prev - 1));
  };

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

  // Animasi untuk logo Luxora
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Animasi untuk modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { opacity: 0, scale: 0.8 }
  };

  // Animasi untuk success popup
  const successPopupVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 50 
    },
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
      scale: 0.5,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  // Animasi untuk check icon
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Banner Slider */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img 
              src={coverImages[currentSlide]} 
              alt={`Slide ${currentSlide + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50 flex items-center justify-center">
              <motion.div 
                className="text-center"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
              >

                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-white mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  LUXORA STORE
                </motion.h1>
                <motion.p 
                  className="text-xl text-white max-w-2xl mx-auto px-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Temukan Keanggunan dalam Setiap Koleksi
                </motion.p>
                <motion.div
                  className="mt-6 flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                >
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        <motion.button 
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-all z-10 shadow-md"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button 
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-all z-10 shadow-md"
        >
          <ChevronRight size={24} />
        </motion.button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {coverImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Product List Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold text-center text-blue-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Koleksi Eksklusif Luxora
        </motion.h1>

        {/* List Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {currentProducts.map((p, index) => (
            <motion.div 
              key={p.id}
              variants={productVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 relative group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden h-40">
                <motion.img 
                  src={p.image_1} 
                  alt={p.name} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Like Button */}
                <motion.button 
                  onClick={() => handleLike(p)}
                  whileTap={{ scale: 0.8 }}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-md transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  animate={{ 
                    color: likedProducts.includes(p.id) ? "#ef4444" : "#4b5563"
                  }}
                >
                  <Heart 
                    size={16} 
                    fill={likedProducts.includes(p.id) ? "#ef4444" : "none"} 
                  />
                </motion.button>
                
                {/* Save Button */}
                <motion.button 
                  onClick={() => handleSave(p)}
                  whileTap={{ scale: 0.8 }}
                  className="absolute top-2 left-2 bg-white/90 p-1.5 rounded-full shadow-md transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  animate={{ 
                    color: savedProducts.includes(p.id) ? "#3b82f6" : "#4b5563"
                  }}
                >
                  <Bookmark 
                    size={16} 
                    fill={savedProducts.includes(p.id) ? "#3b82f6" : "none"} 
                  />
                </motion.button>
                
                {/* Out of Stock Overlay */}
                {p.stok <= 0 && (
                  <motion.div 
                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="text-white font-bold text-sm bg-red-500 px-2 py-1 rounded-md">Habis</span>
                  </motion.div>
                )}
                
                {/* Detail Button */}
                <motion.button 
                  onClick={() => openProductDetail(p)}
                  whileHover={{ scale: 1.05 }}
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Lihat Detail
                </motion.button>
              </div>

              {/* Product Info - Compact */}
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
                
                {/* Price */}
                <p className="text-blue-600 font-bold text-base mb-2">Rp {p.price.toLocaleString('id-ID')}</p>
                
                {/* Stock */}
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

                {/* Buy Button */}
                <motion.button 
                  disabled={p.stok <= 0}
                  onClick={() => handleBuy(p)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: p.stok > 0 ? 1.02 : 1 }}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center ${
                    p.stok <= 0 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <ShoppingCart size={14} className="mr-1" />
                  {p.stok > 0 ? 'Beli Sekarang' : 'Stok Habis'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
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

        {filtered.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan.</p>
          </motion.div>
        )}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Product Image */}
                <div className="h-64 md:h-80 overflow-hidden">
                  <img
                    src={selectedProduct.image_1}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                    <span className="text-blue-600 font-bold text-xl">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={star <= Math.floor(selectedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">{selectedProduct.rating} •</span>
                    <span className={`ml-2 ${selectedProduct.stok <= 5 ? 'text-red-500' : 'text-green-600'}`}>
                      Stok: {selectedProduct.stok}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Info size={16} className="mr-2 text-blue-500" />
                      Deskripsi Produk
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Tag size={16} className="mr-2 text-blue-500" />
                      Pilih Ukuran
                    </h3>
                    <div className="flex space-x-3">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Features */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center">
                      <Package size={16} className="text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">Bahan Premium</span>
                    </div>
                    <div className="flex items-center">
                      <Shield size={16} className="text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">Kualitas Terjamin</span>
                    </div>
                    <div className="flex items-center">
                      <Truck size={16} className="text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">Gratis Ongkir</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">Pengiriman Cepat</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={() => handleLike(selectedProduct)}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      <Heart
                        size={18}
                        fill={likedProducts.includes(selectedProduct.id) ? "#ef4444" : "none"}
                        className={likedProducts.includes(selectedProduct.id) ? "text-red-500 mr-2" : "text-gray-600 mr-2"}
                      />
                      {likedProducts.includes(selectedProduct.id) ? 'Hapus Favorit' : 'Tambah Favorit'}
                    </motion.button>
                    <motion.button
                      onClick={() => handleBuy(selectedProduct)}
                      disabled={selectedProduct.stok <= 0}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center transition-colors ${
                        selectedProduct.stok <= 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Beli Sekarang
                    </motion.button>
                  </div>
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
              variants={successPopupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`bg-white rounded-xl p-6 shadow-2xl border-2 max-w-sm mx-4 ${
                popupType === "like" ? "border-pink-200" : "border-blue-200"
              }`}
            >
              <div className="text-center">
                {/* Check Icon with Circle */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  popupType === "like" ? "bg-pink-100" : "bg-blue-100"
                }`}>
                  <motion.div
                    variants={checkIconVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Check 
                      size={32} 
                      className={popupType === "like" ? "text-pink-600" : "text-blue-600"} 
                      strokeWidth={3}
                    />
                  </motion.div>
                </div>
                
                {/* Message */}
                <h3 className={`text-lg font-semibold mb-2 ${
                  popupType === "like" ? "text-pink-800" : "text-blue-800"
                }`}>
                  {popupMessage}
                </h3>
                
                {/* Sub Message */}
                <p className="text-gray-600 text-sm">
                  {popupType === "like" 
                    ? "Produk telah ditambahkan ke favorit Anda" 
                    : "Produk telah disimpan ke keranjang Anda"}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Product;