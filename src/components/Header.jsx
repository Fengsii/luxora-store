
// import React, { useContext } from "react";
// import { ProductContext } from "../helper/ProductContext";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const { search, setSearch, likeCount, saveCount, filter, setFilter, sort, setSort } = useContext(ProductContext);

//   return (
//     <nav style={{ display: "flex", gap: "10px", padding: "10px", borderBottom: "1px solid #ccc" }}>
//       <Link to="/user/Home">Home</Link>
//       <Link to="/user/Product">Product</Link>
//       <Link to="/user/Profile">Profile</Link>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search product..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ marginLeft: "20px" }}
//       />

//       {/* Filter kategori berdasarkan huruf terakhir */}
//       <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//         <option value="all">Semua Kategori</option>
//         <option value="mens">Men's</option>
//         <option value="womens">Women's</option>
//       </select>

//       {/* Sort */}
//       <select value={sort} onChange={(e) => setSort(e.target.value)}>
//         <option value="default">Default</option>
//         <option value="price-asc">Harga Rendah → Tinggi</option>
//         <option value="price-desc">Harga Tinggi → Rendah</option>
//       </select>

//       {/* Like & Save count */}
//       {/* <div style={{ marginLeft: "auto" }}>
//         <span style={{ marginRight: "10px" }}>❤️ {likeCount}</span>
//         <span>💾 {saveCount}</span>
//       </div> */}

//       <div style={{ marginLeft: "auto" }}>
//         <Link to="/user/LikeList" style={{ marginRight: "10px", textDecoration: "none" }}>
//           ❤️ {likeCount}
//         </Link>
//         <Link to="/user/ChartList" style={{ textDecoration: "none" }}>
//           💾 {saveCount}
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Header;











// import React, { useContext, useState, useEffect } from "react";
// import { ProductContext } from "../helper/ProductContext";
// import { Link } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";

// const Header = () => {
//   const { search, setSearch, likeCount, saveCount, filter, setFilter, sort, setSort } = useContext(ProductContext);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Animasi untuk logo
//   const logoVariants = {
//     initial: { 
//       scale: 1,
//       rotate: 0 
//     },
//     hover: { 
//       scale: 1.05,
//       rotate: -2,
//       transition: { 
//         type: "spring", 
//         stiffness: 300, 
//         damping: 10 
//       }
//     }
//   };

//   // Animasi untuk item navigasi
//   const navItemVariants = {
//     initial: { y: 0 },
//     hover: { 
//       y: -2,
//       transition: { 
//         duration: 0.2 
//       } 
//     }
//   };

//   return (
//     <motion.header 
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//         isScrolled 
//           ? 'bg-white shadow-md py-2 border-b border-blue-100' 
//           : 'bg-blue-600 py-4'
//       }`}
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 120, damping: 20 }}
//     >
//       <div className="container mx-auto px-4 flex items-center justify-between">
//         {/* Logo */}
//         <motion.div
//           className="flex items-center"
//           variants={logoVariants}
//           initial="initial"
//           whileHover="hover"
//         >
//           <motion.div 
//             className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-2"
//             animate={{ 
//               rotate: 360,
//               transition: { 
//                 repeat: Infinity, 
//                 duration: 20, 
//                 ease: "linear" 
//               } 
//             }}
//           >
//             <span className="text-blue-600 font-bold text-lg">L</span>
//           </motion.div>
//           <span className={`text-2xl font-bold ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
//             Luxora <span className="text-blue-300">Store</span>
//           </span>
//         </motion.div>

//         {/* Navigation Menu - Desktop */}
//         <nav className="hidden md:flex space-x-6 items-center">
//           <motion.div variants={navItemVariants} whileHover="hover">
//             <Link 
//               to="/user/Home" 
//               className={`font-medium ${isScrolled ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'}`}
//             >
//               Home
//             </Link>
//           </motion.div>
          
//           <motion.div variants={navItemVariants} whileHover="hover">
//             <Link 
//               to="/user/Product" 
//               className={`font-medium ${isScrolled ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'}`}
//             >
//               Product
//             </Link>
//           </motion.div>
          
//           <motion.div variants={navItemVariants} whileHover="hover">
//             <Link 
//               to="/user/Profile" 
//               className={`font-medium ${isScrolled ? 'text-blue-600 hover:text-blue-800' : 'text-white hover:text-blue-200'}`}
//             >
//               Profile
//             </Link>
//           </motion.div>

//           {/* Search */}
//           <motion.div 
//             className="relative"
//             whileHover={{ y: -2 }}
//             transition={{ duration: 0.2 }}
//           >
//             <input
//               type="text"
//               placeholder="Search product..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className={`py-2 px-4 rounded-full text-sm focus:outline-none focus:ring-2 ${
//                 isScrolled 
//                   ? 'bg-blue-50 focus:ring-blue-400 text-blue-800' 
//                   : 'bg-blue-700 focus:ring-white text-white placeholder-blue-200'
//               }`}
//               style={{ width: '220px' }}
//             />
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className={`h-5 w-5 absolute right-3 top-2.5 ${
//                 isScrolled ? 'text-blue-400' : 'text-blue-300'
//               }`} 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </motion.div>

//           {/* Filter kategori */}
//           <motion.div 
//             whileHover={{ y: -2 }}
//             transition={{ duration: 0.2 }}
//           >
//             <select 
//               value={filter} 
//               onChange={(e) => setFilter(e.target.value)}
//               className={`py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
//                 isScrolled 
//                   ? 'bg-blue-50 focus:ring-blue-400 text-blue-800 border border-blue-200' 
//                   : 'bg-blue-700 focus:ring-white text-white border border-blue-500'
//               }`}
//             >
//               <option value="all">Semua Kategori</option>
//               <option value="mens">Men's</option>
//               <option value="womens">Women's</option>
//             </select>
//           </motion.div>

//           {/* Sort */}
//           <motion.div 
//             whileHover={{ y: -2 }}
//             transition={{ duration: 0.2 }}
//           >
//             <select 
//               value={sort} 
//               onChange={(e) => setSort(e.target.value)}
//               className={`py-2 px-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
//                 isScrolled 
//                   ? 'bg-blue-50 focus:ring-blue-400 text-blue-800 border border-blue-200' 
//                   : 'bg-blue-700 focus:ring-white text-white border border-blue-500'
//               }`}
//             >
//               <option value="default">Default</option>
//               <option value="price-asc">Harga Rendah → Tinggi</option>
//               <option value="price-desc">Harga Tinggi → Rendah</option>
//             </select>
//           </motion.div>
//         </nav>

//         {/* Icons */}
//         <div className="flex items-center space-x-5">
//           {/* Like & Save count */}
//           <div className="flex items-center space-x-4">
//             <motion.div 
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <Link to="/user/LikeList" className="flex items-center">
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className={`h-6 w-6 ${isScrolled ? 'text-blue-600' : 'text-white'}`} 
//                   fill="none" 
//                   viewBox="0 0 24 24" 
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//                 <span className={`ml-1 ${isScrolled ? 'text-blue-600' : 'text-white'}`}>{likeCount}</span>
//               </Link>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <Link to="/user/ChartList" className="flex items-center">
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className={`h-6 w-6 ${isScrolled ? 'text-blue-600' : 'text-white'}`} 
//                   fill="none" 
//                   viewBox="0 0 24 24" 
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
//                 </svg>
//                 <span className={`ml-1 ${isScrolled ? 'text-blue-600' : 'text-white'}`}>{saveCount}</span>
//               </Link>
//             </motion.div>
//           </div>
          
//           {/* Mobile Menu Button */}
//           <motion.button 
//             className="md:hidden"
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isScrolled ? 'text-blue-600' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               {isMobileMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </motion.button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <motion.div 
//         className="md:hidden bg-white shadow-lg"
//         initial={{ opacity: 0, height: 0 }}
//         animate={{ 
//           opacity: isMobileMenuOpen ? 1 : 0, 
//           height: isMobileMenuOpen ? 'auto' : 0 
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
//           <Link to="/user/Home" className="text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50">
//             Home
//           </Link>
//           <Link to="/user/Product" className="text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50">
//             Product
//           </Link>
//           <Link to="/user/Profile" className="text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50">
//             Profile
//           </Link>
          
//           <div className="pt-2 border-t border-gray-100">
//             <input
//               type="text"
//               placeholder="Search product..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full py-2 px-4 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-3">
//             <select 
//               value={filter} 
//               onChange={(e) => setFilter(e.target.value)}
//               className="py-2 px-3 rounded-lg border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="all">Semua Kategori</option>
//               <option value="mens">Men's</option>
//               <option value="womens">Women's</option>
//             </select>
            
//             <select 
//               value={sort} 
//               onChange={(e) => setSort(e.target.value)}
//               className="py-2 px-3 rounded-lg border border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="default">Default</option>
//               <option value="price-asc">Harga Rendah → Tinggi</option>
//               <option value="price-desc">Harga Tinggi → Rendah</option>
//             </select>
//           </div>
//         </div>
//       </motion.div>
//     </motion.header>
//   );
// };

// export default Header;










// import React, { useContext, useState, useEffect } from "react";
// import { ProductContext } from "../helper/ProductContext";
// import { Link, useLocation } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";
// import { Search, Heart, ShoppingBag, User, Menu, X, Home, Shirt, Contact } from "lucide-react";

// const Header = () => {
//   const { search, setSearch, likeCount, saveCount, filter, setFilter, sort, setSort } = useContext(ProductContext);
//   // eslint-disable-next-line no-unused-vars
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Animasi untuk teks logo
//   const letterVariants = {
//     initial: { y: 0 },
//     hover: { 
//       y: -3,
//       transition: { 
//         type: "spring", 
//         stiffness: 500, 
//         damping: 15 
//       }
//     }
//   };

//   // Animasi untuk underline navigasi
//   const underlineVariants = {
//     initial: { width: 0 },
//     hover: { width: "100%" }
//   };

//   // Animasi untuk item menu aktif
//   const activeMenuVariants = {
//     initial: { width: 0 },
//     animate: { width: "100%" }
//   };

//   // Animasi masuk untuk header
//   const headerVariants = {
//     initial: { y: -100, opacity: 0 },
//     animate: { 
//       y: 0, 
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 120,
//         damping: 20,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   // Animasi untuk item children
//   const itemVariants = {
//     initial: { y: -20, opacity: 0 },
//     animate: { y: 0, opacity: 1 }
//   };

//   return (
//     <motion.header 
//       className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300"
//       variants={headerVariants}
//       initial="initial"
//       animate="animate"
//     >
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
          
//           {/* Logo dengan animasi */}
//           <motion.div
//             className="flex items-center"
//             whileHover="hover"
//           >
//             <motion.div 
//               className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-2"
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//             >
//               <span className="text-white font-bold text-lg">L</span>
//             </motion.div>
//             <motion.div className="flex">
//               {["L", "u", "x", "o", "r", "a"].map((letter, index) => (
//                 <motion.span 
//                   key={index}
//                   className="text-2xl font-bold text-blue-800"
//                   variants={letterVariants}
//                   whileHover="hover"
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   {letter}
//                 </motion.span>
//               ))}
//               <span className="text-2xl font-bold text-blue-800 ml-1">Store</span>
//             </motion.div>
//           </motion.div>

//           {/* Navigation Menu - Desktop */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {[
//               { path: "/user/Home", label: "Home", icon: <Home size={18} /> },
//               { path: "/user/Product", label: "Product", icon: <Shirt size={18} /> },
//               { path: "/user/Profile", label: "Profile", icon: <User size={18} /> }
//             ].map((item) => (
//               <motion.div 
//                 key={item.path}
//                 className="relative"
//                 variants={itemVariants}
//               >
//                 <Link 
//                   to={item.path} 
//                   className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
//                 >
//                   <span className="mr-1">{item.icon}</span>
//                   {item.label}
//                 </Link>
//                 {/* Active indicator */}
//                 {location.pathname === item.path && (
//                   <motion.div 
//                     className="absolute -bottom-2 left-0 h-0.5 bg-blue-600"
//                     variants={activeMenuVariants}
//                     initial="initial"
//                     animate="animate"
//                     transition={{ duration: 0.3 }}
//                   />
//                 )}
//                 {/* Hover underline */}
//                 <motion.div 
//                   className="absolute -bottom-2 left-0 h-0.5 bg-blue-400"
//                   variants={underlineVariants}
//                   initial="initial"
//                   whileHover="hover"
//                   transition={{ duration: 0.2 }}
//                 />
//               </motion.div>
//             ))}
//           </nav>

//           {/* Search, Filter, Sort Section */}
//           <div className="hidden md:flex items-center space-x-4">
//             <motion.div 
//               className="relative"
//               variants={itemVariants}
//             >
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search product..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 style={{ width: '220px' }}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <select 
//                 value={filter} 
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               >
//                 <option value="all">All Categories</option>
//                 <option value="mens">Men's</option>
//                 <option value="womens">Women's</option>
//               </select>
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <select 
//                 value={sort} 
//                 onChange={(e) => setSort(e.target.value)}
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//               >
//                 <option value="default">Default</option>
//                 <option value="price-asc">Price: Low to High</option>
//                 <option value="price-desc">Price: High to Low</option>
//               </select>
//             </motion.div>
//           </div>

//           {/* Like & Save Count */}
//           <motion.div 
//             className="hidden md:flex items-center space-x-4"
//             variants={itemVariants}
//           >
//             <Link to="/user/LikeList" className="flex items-center text-gray-700 hover:text-red-500 transition-colors">
//               <Heart className="mr-1" size={20} />
//               <span className="text-sm font-medium">{likeCount}</span>
//             </Link>
//             <Link to="/user/ChartList" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
//               <ShoppingBag className="mr-1" size={20} />
//               <span className="text-sm font-medium">{saveCount}</span>
//             </Link>
//           </motion.div>

//           {/* Mobile Menu Button */}
//           <motion.button 
//             className="md:hidden p-2"
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             variants={itemVariants}
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </motion.button>
//         </div>

//         {/* Mobile Menu */}
//         <motion.div 
//           className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ 
//             opacity: isMobileMenuOpen ? 1 : 0, 
//             height: isMobileMenuOpen ? 'auto' : 0 
//           }}
//           transition={{ duration: 0.3 }}
//           style={{ overflow: 'hidden' }}
//         >
//           <div className="flex flex-col space-y-4">
//             {[
//               { path: "/user/Home", label: "Home", icon: <Home size={18} /> },
//               { path: "/user/Product", label: "Product", icon: <Shirt size={18} /> },
//               { path: "/user/Profile", label: "Profile", icon: <User size={18} /> }
//             ].map((item) => (
//               <Link 
//                 key={item.path}
//                 to={item.path} 
//                 className="flex items-center text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
            
//             <div className="pt-4 border-t border-gray-200">
//               <div className="relative mb-4">
//                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search product..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-3 mb-4">
//                 <select 
//                   value={filter} 
//                   onChange={(e) => setFilter(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 >
//                   <option value="all">All Categories</option>
//                   <option value="mens">Men's</option>
//                   <option value="womens">Women's</option>
//                 </select>
                
//                 <select 
//                   value={sort} 
//                   onChange={(e) => setSort(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 >
//                   <option value="default">Default</option>
//                   <option value="price-asc">Price: Low to High</option>
//                   <option value="price-desc">Price: High to Low</option>
//                 </select>
//               </div>
              
//               <div className="flex justify-between">
//                 <Link to="/user/LikeList" className="flex items-center text-gray-700 hover:text-red-500 transition-colors">
//                   <Heart className="mr-1" size={20} />
//                   <span className="text-sm font-medium">{likeCount}</span>
//                 </Link>
//                 <Link to="/user/ChartList" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
//                   <ShoppingBag className="mr-1" size={20} />
//                   <span className="text-sm font-medium">{saveCount}</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.header>
//   );
// };

// export default Header;




















// import React, { useContext, useState, useEffect } from "react";
// import { ProductContext } from "../helper/ProductContext";
// import { Link, useLocation } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";
// import { Search, Heart, ShoppingBag, User, Menu, X, Home, Shirt } from "lucide-react";

// const Header = () => {
//   const { search, setSearch, likeCount, saveCount, filter, setFilter, sort, setSort } = useContext(ProductContext);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Animasi untuk teks logo
//   const letterVariants = {
//     initial: { y: 0 },
//     hover: { 
//       y: -3,
//       transition: { 
//         type: "spring", 
//         stiffness: 500, 
//         damping: 15 
//       }
//     }
//   };

//   // Animasi untuk underline navigasi
//   const underlineVariants = {
//     initial: { width: 0 },
//     hover: { width: "100%" }
//   };

//   // Animasi untuk item menu aktif
//   const activeMenuVariants = {
//     initial: { width: 0 },
//     animate: { width: "100%" }
//   };

//   // Animasi masuk untuk header
//   const headerVariants = {
//     initial: { y: -100, opacity: 0 },
//     animate: { 
//       y: 0, 
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 120,
//         damping: 20,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   // Animasi untuk item children
//   const itemVariants = {
//     initial: { y: -20, opacity: 0 },
//     animate: { y: 0, opacity: 1 }
//   };

//   return (
//     <motion.header 
//       className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//         isScrolled 
//           ? "bg-white shadow-md backdrop-blur-sm bg-opacity-95" 
//           : "bg-blue-600"
//       }`}
//       variants={headerVariants}
//       initial="initial"
//       animate="animate"
//     >
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
          
//           {/* Logo dengan animasi */}
//           <motion.div
//             className="flex items-center"
//             whileHover="hover"
//           >
//             <motion.div 
//               className={`w-10 h-10 rounded-full flex items-center justify-center mr-2 ${
//                 isScrolled ? "bg-blue-600" : "bg-white"
//               }`}
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//             >
//               <span className={`font-bold text-lg ${
//                 isScrolled ? "text-white" : "text-blue-600"
//               }`}>L</span>
//             </motion.div>
//             <motion.div className="flex">
//               {["L", "u", "x", "o", "r", "a"].map((letter, index) => (
//                 <motion.span 
//                   key={index}
//                   className={`text-2xl font-bold ${
//                     isScrolled ? "text-blue-800" : "text-white"
//                   }`}
//                   variants={letterVariants}
//                   whileHover="hover"
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   {letter}
//                 </motion.span>
//               ))}
//               <span className={`text-2xl font-bold ml-1 ${
//                 isScrolled ? "text-blue-800" : "text-white"
//               }`}>Store</span>
//             </motion.div>
//           </motion.div>

//           {/* Navigation Menu - Desktop */}
//           <nav className="hidden md:flex items-center space-x-8">
//             {[
//               { path: "/user/Home", label: "Home", icon: <Home size={18} /> },
//               { path: "/user/Product", label: "Product", icon: <Shirt size={18} /> },
//               { path: "/user/Profile", label: "Profile", icon: <User size={18} /> }
//             ].map((item) => (
//               <motion.div 
//                 key={item.path}
//                 className="relative"
//                 variants={itemVariants}
//               >
//                 <Link 
//                   to={item.path} 
//                   className={`flex items-center font-medium transition-colors ${
//                     isScrolled 
//                       ? "text-gray-700 hover:text-blue-600" 
//                       : "text-white hover:text-blue-100"
//                   }`}
//                 >
//                   <span className="mr-1">{item.icon}</span>
//                   {item.label}
//                 </Link>
//                 {/* Active indicator */}
//                 {location.pathname === item.path && (
//                   <motion.div 
//                     className={`absolute -bottom-2 left-0 h-0.5 ${
//                       isScrolled ? "bg-blue-600" : "bg-white"
//                     }`}
//                     variants={activeMenuVariants}
//                     initial="initial"
//                     animate="animate"
//                     transition={{ duration: 0.3 }}
//                   />
//                 )}
//                 {/* Hover underline */}
//                 <motion.div 
//                   className={`absolute -bottom-2 left-0 h-0.5 ${
//                     isScrolled ? "bg-blue-400" : "bg-blue-100"
//                   }`}
//                   variants={underlineVariants}
//                   initial="initial"
//                   whileHover="hover"
//                   transition={{ duration: 0.2 }}
//                 />
//               </motion.div>
//             ))}
//           </nav>

//           {/* Search, Filter, Sort Section */}
//           <div className="hidden md:flex items-center space-x-4">
//             <motion.div 
//               className="relative"
//               variants={itemVariants}
//             >
//               <Search className={`absolute left-3 top-2.5 h-4 w-4 ${
//                 isScrolled ? "text-gray-400" : "text-blue-200"
//               }`} />
//               <input
//                 type="text"
//                 placeholder="Search product..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
//                   isScrolled 
//                     ? "border-gray-300" 
//                     : "border-blue-500 bg-blue-500 bg-opacity-10 text-white placeholder-blue-200"
//                 }`}
//                 style={{ width: '220px' }}
//               />
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <select 
//                 value={filter} 
//                 onChange={(e) => setFilter(e.target.value)}
//                 className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
//                   isScrolled 
//                     ? "border-gray-300" 
//                     : "border-blue-500 bg-blue-500 bg-opacity-10 text-white"
//                 }`}
//               >
//                 <option value="all" className={isScrolled ? "" : "text-gray-800"}>All Categories</option>
//                 <option value="mens" className={isScrolled ? "" : "text-gray-800"}>Men's</option>
//                 <option value="womens" className={isScrolled ? "" : "text-gray-800"}>Women's</option>
//               </select>
//             </motion.div>

//             <motion.div variants={itemVariants}>
//               <select 
//                 value={sort} 
//                 onChange={(e) => setSort(e.target.value)}
//                 className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
//                   isScrolled 
//                     ? "border-gray-300" 
//                     : "border-blue-500 bg-blue-500 bg-opacity-10 text-white"
//                 }`}
//               >
//                 <option value="default" className={isScrolled ? "" : "text-gray-800"}>Default</option>
//                 <option value="price-asc" className={isScrolled ? "" : "text-gray-800"}>Price: Low to High</option>
//                 <option value="price-desc" className={isScrolled ? "" : "text-gray-800"}>Price: High to Low</option>
//               </select>
//             </motion.div>
//           </div>

//           {/* Like & Save Count */}
//           <motion.div 
//             className="hidden md:flex items-center space-x-4"
//             variants={itemVariants}
//           >
//             <Link to="/user/LikeList" className={`flex items-center transition-colors ${
//               isScrolled ? "text-gray-700 hover:text-red-500" : "text-white hover:text-blue-100"
//             }`}>
//               <Heart className="mr-1" size={20} />
//               <span className="text-sm font-medium">{likeCount}</span>
//             </Link>
//             <Link to="/user/ChartList" className={`flex items-center transition-colors ${
//               isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-100"
//             }`}>
//               <ShoppingBag className="mr-1" size={20} />
//               <span className="text-sm font-medium">{saveCount}</span>
//             </Link>
//           </motion.div>

//           {/* Mobile Menu Button */}
//           <motion.button 
//             className="md:hidden p-2"
//             whileTap={{ scale: 0.9 }}
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             variants={itemVariants}
//           >
//             {isMobileMenuOpen ? (
//               <X size={24} className={isScrolled ? "text-gray-700" : "text-white"} />
//             ) : (
//               <Menu size={24} className={isScrolled ? "text-gray-700" : "text-white"} />
//             )}
//           </motion.button>
//         </div>

//         {/* Mobile Menu */}
//         <motion.div 
//           className={`md:hidden mt-4 rounded-lg shadow-lg p-4 ${
//             isScrolled ? "bg-white" : "bg-blue-600"
//           }`}
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ 
//             opacity: isMobileMenuOpen ? 1 : 0, 
//             height: isMobileMenuOpen ? 'auto' : 0 
//           }}
//           transition={{ duration: 0.3 }}
//           style={{ overflow: 'hidden' }}
//         >
//           <div className="flex flex-col space-y-4">
//             {[
//               { path: "/user/Home", label: "Home", icon: <Home size={18} /> },
//               { path: "/user/Product", label: "Product", icon: <Shirt size={18} /> },
//               { path: "/user/Profile", label: "Profile", icon: <User size={18} /> }
//             ].map((item) => (
//               <Link 
//                 key={item.path}
//                 to={item.path} 
//                 className={`flex items-center font-medium py-2 px-4 rounded-lg transition-colors ${
//                   isScrolled 
//                     ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" 
//                     : "text-white hover:text-blue-100 hover:bg-blue-500 hover:bg-opacity-20"
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 {item.label}
//               </Link>
//             ))}
            
//             <div className={`pt-4 ${
//               isScrolled ? "border-t border-gray-200" : "border-t border-blue-400 border-opacity-30"
//             }`}>
//               <div className="relative mb-4">
//                 <Search className={`absolute left-3 top-2.5 h-4 w-4 ${
//                   isScrolled ? "text-gray-400" : "text-blue-200"
//                 }`} />
//                 <input
//                   type="text"
//                   placeholder="Search product..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
//                     isScrolled 
//                       ? "border-gray-300" 
//                       : "border-blue-400 bg-blue-500 bg-opacity-10 text-white placeholder-blue-200"
//                   }`}
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-3 mb-4">
//                 <select 
//                   value={filter} 
//                   onChange={(e) => setFilter(e.target.value)}
//                   className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
//                     isScrolled 
//                       ? "border-gray-300" 
//                       : "border-blue-400 bg-blue-500 bg-opacity-10 text-white"
//                   }`}
//                 >
//                   <option value="all" className={isScrolled ? "" : "text-gray-800"}>All Categories</option>
//                   <option value="mens" className={isScrolled ? "" : "text-gray-800"}>Men's</option>
//                   <option value="womens" className={isScrolled ? "" : "text-gray-800"}>Women's</option>
//                 </select>
                
//                 <select 
//                   value={sort} 
//                   onChange={(e) => setSort(e.target.value)}
//                   className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
//                     isScrolled 
//                       ? "border-gray-300" 
//                       : "border-blue-400 bg-blue-500 bg-opacity-10 text-white"
//                   }`}
//                 >
//                   <option value="default" className={isScrolled ? "" : "text-gray-800"}>Default</option>
//                   <option value="price-asc" className={isScrolled ? "" : "text-gray-800"}>Price: Low to High</option>
//                   <option value="price-desc" className={isScrolled ? "" : "text-gray-800"}>Price: High to Low</option>
//                 </select>
//               </div>
              
//               <div className="flex justify-between">
//                 <Link 
//                   to="/user/LikeList" 
//                   className={`flex items-center transition-colors ${
//                     isScrolled ? "text-gray-700 hover:text-red-500" : "text-white hover:text-blue-100"
//                   }`}
//                 >
//                   <Heart className="mr-1" size={20} />
//                   <span className="text-sm font-medium">{likeCount}</span>
//                 </Link>
//                 <Link 
//                   to="/user/ChartList" 
//                   className={`flex items-center transition-colors ${
//                     isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-100"
//                   }`}
//                 >
//                   <ShoppingBag className="mr-1" size={20} />
//                   <span className="text-sm font-medium">{saveCount}</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.header>
//   );
// };

// export default Header;















import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../helper/ProductContext";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, Home, Shirt } from "lucide-react";

const Header = () => {
  const { search, setSearch, likeCount, saveCount, filter, setFilter, sort, setSort } = useContext(ProductContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const letterVariants = {
    initial: { y: 0 },
    hover: { 
      y: -3,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15 
      }
    }
  };

  const underlineVariants = {
    initial: { width: 0 },
    hover: { width: "100%" }
  };

  const activeMenuVariants = {
    initial: { width: 0 },
    animate: { width: "100%" }
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white shadow-md backdrop-blur-sm bg-opacity-95" 
          : "bg-blue-600"
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Main Header Container */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Top Row - Logo and Mobile Menu Button */}
        <div className="flex items-center justify-between py-2 sm:py-3">
          
          {/* Logo Section - Responsive sizing */}
          <motion.div
            className="flex items-center flex-shrink-0"
            whileHover="hover"
          >
            <motion.div 
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 ${
                isScrolled ? "bg-blue-600" : "bg-white"
              }`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <span className={`font-bold text-sm sm:text-lg ${
                isScrolled ? "text-white" : "text-blue-600"
              }`}>L</span>
            </motion.div>
            <motion.div className="flex">
              {["L", "u", "x", "o", "r", "a"].map((letter, index) => (
                <motion.span 
                  key={index}
                  className={`text-lg sm:text-2xl font-bold ${
                    isScrolled ? "text-blue-800" : "text-white"
                  }`}
                  variants={letterVariants}
                  whileHover="hover"
                  transition={{ delay: index * 0.05 }}
                >
                  {letter}
                </motion.span>
              ))}
              <span className={`text-lg sm:text-2xl font-bold ml-1 ${
                isScrolled ? "text-blue-800" : "text-white"
              }`}>Store</span>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation - Hidden on mobile and tablet */}
          <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
            {[
              { path: "/user/Home", label: "Home", icon: <Home size={18} /> },
              { path: "/user/Product", label: "Product", icon: <Shirt size={18} /> },
              { path: "/user/Profile", label: "Profile", icon: <User size={18} /> }
            ].map((item) => (
              <motion.div 
                key={item.path}
                className="relative"
                variants={itemVariants}
              >
                <Link 
                  to={item.path} 
                  className={`flex items-center font-medium transition-colors text-sm lg:text-base ${
                    isScrolled 
                      ? "text-gray-700 hover:text-blue-600" 
                      : "text-white hover:text-blue-100"
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
                {/* Active indicator */}
                {location.pathname === item.path && (
                  <motion.div 
                    className={`absolute -bottom-2 left-0 h-0.5 ${
                      isScrolled ? "bg-blue-600" : "bg-white"
                    }`}
                    variants={activeMenuVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.3 }}
                  />
                )}
                {/* Hover underline */}
                <motion.div 
                  className={`absolute -bottom-2 left-0 h-0.5 ${
                    isScrolled ? "bg-blue-400" : "bg-blue-100"
                  }`}
                  variants={underlineVariants}
                  initial="initial"
                  whileHover="hover"
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            ))}
          </nav>

          {/* Desktop Search, Filter, Sort - Hidden on mobile and small tablet */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <Search className={`absolute left-3 top-2.5 h-4 w-4 ${
                isScrolled ? "text-gray-400" : "text-blue-200"
              }`} />
              <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                  isScrolled 
                    ? "border-gray-300" 
                    : "border-blue-500 bg-blue-500 bg-opacity-10 text-white placeholder-blue-200"
                } w-40 xl:w-56`}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className={`px-2 xl:px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs xl:text-sm ${
                  isScrolled 
                    ? "border-gray-300" 
                    : "border-blue-500 bg-blue-500 bg-opacity-10 text-white"
                }`}
              >
                <option value="all" className={isScrolled ? "" : "text-gray-800"}>All</option>
                <option value="mens" className={isScrolled ? "" : "text-gray-800"}>Men's</option>
                <option value="womens" className={isScrolled ? "" : "text-gray-800"}>Women's</option>
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                className={`px-2 xl:px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs xl:text-sm ${
                  isScrolled 
                    ? "border-gray-300" 
                    : "border-blue-500 bg-blue-500 bg-opacity-10 text-white"
                }`}
              >
                <option value="default" className={isScrolled ? "" : "text-gray-800"}>Default</option>
                <option value="price-asc" className={isScrolled ? "" : "text-gray-800"}>Low-High</option>
                <option value="price-desc" className={isScrolled ? "" : "text-gray-800"}>High-Low</option>
              </select>
            </motion.div>
          </div>

          {/* Like & Save Count - Responsive sizing */}
          <motion.div 
            className="hidden md:flex items-center space-x-3 lg:space-x-4"
            variants={itemVariants}
          >
            <Link to="/user/LikeList" className={`flex items-center transition-colors ${
              isScrolled ? "text-gray-700 hover:text-red-500" : "text-white hover:text-blue-100"
            }`}>
              <Heart className="mr-1" size={18} />
              <span className="text-xs lg:text-sm font-medium">{likeCount}</span>
            </Link>
            <Link to="/user/ChartList" className={`flex items-center transition-colors ${
              isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-100"
            }`}>
              <ShoppingBag className="mr-1" size={18} />
              <span className="text-xs lg:text-sm font-medium">{saveCount}</span>
            </Link>
          </motion.div>

          {/* Mobile/Tablet Menu Button */}
          <motion.button 
            className="xl:hidden p-2"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variants={itemVariants}
          >
            {isMobileMenuOpen ? (
              <X size={20} className={isScrolled ? "text-gray-700" : "text-white"} />
            ) : (
              <Menu size={20} className={isScrolled ? "text-gray-700" : "text-white"} />
            )}
          </motion.button>
        </div>

        {/* Secondary Row for Tablet - Search and Controls */}
        <div className={`hidden md:flex xl:hidden items-center justify-between py-2 space-x-4 ${
          isScrolled ? "border-t border-gray-200" : "border-t border-blue-400 border-opacity-30"
        }`}>
          {/* Tablet Search */}
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-2.5 h-4 w-4 ${
              isScrolled ? "text-gray-400" : "text-blue-200"
            }`} />
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                isScrolled 
                  ? "border-gray-300" 
                  : "border-blue-500 bg-blue-500 bg-opacity-10 text-white placeholder-blue-200"
              }`}
            />
          </div>

          {/* Tablet Filter and Sort */}
          <div className="flex items-center space-x-3">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                isScrolled 
                  ? "border-gray-300" 
                  : "border-blue-500 bg-blue-500 bg-opacity-10 text-white"
              }`}
            >
              <option value="all" className={isScrolled ? "" : "text-gray-800"}>All Categories</option>
              <option value="mens" className={isScrolled ? "" : "text-gray-800"}>Men's</option>
              <option value="womens" className={isScrolled ? "" : "text-gray-800"}>Women's</option>
            </select>

            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                isScrolled 
                  ? "border-gray-300" 
                  : "border-blue-500 bg-blue-500 bg-opacity-10 text-white"
              }`}
            >
              <option value="default" className={isScrolled ? "" : "text-gray-800"}>Default</option>
              <option value="price-asc" className={isScrolled ? "" : "text-gray-800"}>Price: Low to High</option>
              <option value="price-desc" className={isScrolled ? "" : "text-gray-800"}>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile/Tablet Navigation Menu */}
        <motion.div 
          className={`xl:hidden rounded-lg shadow-lg overflow-hidden ${
            isScrolled ? "bg-white" : "bg-blue-600"
          }`}
          variants={mobileMenuVariants}
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
        >
          <div className="p-4 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-2">
              {[
                { path: "/user/Home", label: "Home", icon: <Home size={18} /> },
                { path: "/user/Product", label: "Product", icon: <Shirt size={18} /> },
                { path: "/user/Profile", label: "Profile", icon: <User size={18} /> }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center font-medium py-2 px-4 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? isScrolled 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-blue-500 bg-opacity-30 text-white"
                      : isScrolled 
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" 
                        : "text-white hover:text-blue-100 hover:bg-blue-500 hover:bg-opacity-20"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Mobile Search and Controls */}
            <div className={`pt-4 space-y-4 ${
              isScrolled ? "border-t border-gray-200" : "border-t border-blue-400 border-opacity-30"
            }`}>
              {/* Search for Mobile only (hidden on tablet) */}
              <div className="relative md:hidden">
                <Search className={`absolute left-3 top-2.5 h-4 w-4 ${
                  isScrolled ? "text-gray-400" : "text-blue-200"
                }`} />
                <input
                  type="text"
                  placeholder="Search product..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isScrolled 
                      ? "border-gray-300" 
                      : "border-blue-400 bg-blue-500 bg-opacity-10 text-white placeholder-blue-200"
                  }`}
                />
              </div>
              
              {/* Filter and Sort for Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isScrolled 
                      ? "border-gray-300" 
                      : "border-blue-400 bg-blue-500 bg-opacity-10 text-white"
                  }`}
                >
                  <option value="all" className={isScrolled ? "" : "text-gray-800"}>All Categories</option>
                  <option value="mens" className={isScrolled ? "" : "text-gray-800"}>Men's</option>
                  <option value="womens" className={isScrolled ? "" : "text-gray-800"}>Women's</option>
                </select>
                
                <select 
                  value={sort} 
                  onChange={(e) => setSort(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    isScrolled 
                      ? "border-gray-300" 
                      : "border-blue-400 bg-blue-500 bg-opacity-10 text-white"
                  }`}
                >
                  <option value="default" className={isScrolled ? "" : "text-gray-800"}>Default</option>
                  <option value="price-asc" className={isScrolled ? "" : "text-gray-800"}>Price: Low to High</option>
                  <option value="price-desc" className={isScrolled ? "" : "text-gray-800"}>Price: High to Low</option>
                </select>
              </div>
              
              {/* Mobile Like & Save Count */}
              <div className="flex justify-center space-x-8 md:hidden pt-2">
                <Link 
                  to="/user/LikeList" 
                  className={`flex items-center transition-colors ${
                    isScrolled ? "text-gray-700 hover:text-red-500" : "text-white hover:text-blue-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="mr-2" size={20} />
                  <span className="text-sm font-medium">Liked ({likeCount})</span>
                </Link>
                <Link 
                  to="/user/ChartList" 
                  className={`flex items-center transition-colors ${
                    isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  <span className="text-sm font-medium">Cart ({saveCount})</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;