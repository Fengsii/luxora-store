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