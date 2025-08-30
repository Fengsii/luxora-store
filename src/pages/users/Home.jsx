/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
/// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, Search, Heart, User, 
  ArrowRight, Star, ChevronLeft, ChevronRight, 
  Shield, Truck, Clock, Package, Quote,
  Instagram, Facebook, Twitter, Youtube, X
} from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Data produk featured
  const featuredProducts = [
    {
      id: 1,
      name: "Single-breasted blazer",
      price: 3700,
      originalPrice: 4600,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Blazer with two buttons",
      rating: 4.8
    },
    {
      id: 2,
      name: "Linen blazer with thin belt",
      price: 199,
      originalPrice: 240,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Elegant linen blazer",
      rating: 4.5
    },
    {
      id: 3,
      name: "Tweed blazer",
      price: 320,
      originalPrice: 340,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Classic tweed design",
      rating: 4.7
    },
    {
      id: 4,
      name: "Designer blazer",
      price: 210,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "From $150.00USD",
      rating: 4.9
    }
  ];

  // Data koleksi
  const collections = [
    { 
      name: "Dresses", 
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "24 products",
      link: "/user/Product?category=dresses"
    },
    { 
      name: "New In", 
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "18 products",
      link: "/user/Product?category=new"
    },
    { 
      name: "Blazers", 
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "12 products",
      link: "/user/Product?category=blazers"
    },
    { 
      name: "Accessories", 
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      count: "36 products",
      link: "/user/Product?category=accessories"
    }
  ];

  // Slider images
  const sliderImages = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
  ];

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const bounce = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        y: { type: "spring", stiffness: 100, damping: 10 }
      }
    }
  };

  const floating = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Slider */}
      <div className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={sliderImages[currentSlide]} 
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                >
                  New Collection
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl mb-8 font-light"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                >
                  Your Inner Beauty
                </motion.p>
                <motion.div
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
                >
                  <Link to="/user/Product">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 text-lg"
                    >
                      SHOP NOW
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {sliderImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              className={`w-4 h-4 rounded-full transition-all ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              animate={{
                scale: currentSlide === index ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          variants={floating}
          animate="animate"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{
                y: [0, 12, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Featured Collection */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span 
              className="text-blue-600 font-semibold mb-2 block"
              variants={bounce}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Check this out
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Featured collection</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                className="bg-white rounded-2xl overflow-hidden shadow-xl group relative"
                whileHover={{ y: -15, rotate: 0 }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden h-80">
                  <motion.img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"
                    initial={false}
                    animate={{ opacity: hoveredProduct === product.id ? 0.2 : 0 }}
                  />
                  
                  {/* Rating */}
                  <motion.div 
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Star size={14} className="text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="absolute top-4 right-4 flex flex-col space-y-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md"
                    >
                      <Heart size={16} />
                    </motion.button>
                    <Link to="/user/Product">
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md"
                      >
                        <ShoppingBag size={16} />
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600 font-bold text-xl">
                        ${product.price}USD
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ${product.originalPrice}USD
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <motion.div 
                  className="absolute inset-0 bg-blue-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                >
                  <Link to="/user/Product">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold"
                    >
                      Quick View
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link to="/user/Product">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-12 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 text-lg flex items-center mx-auto"
              >
                SHOP ALL COLLECTIONS
                <ArrowRight size={20} className="ml-3" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Collection List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Collection list</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our curated collections designed for the modern fashion enthusiast</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {collections.map((collection, index) => (
              <Link key={collection.name} to={collection.link}>
                <motion.div
                  variants={index % 2 === 0 ? slideInFromLeft : slideInFromRight}
                  className="relative group overflow-hidden rounded-2xl h-96 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                      <p className="text-blue-200">{collection.count}</p>
                      <motion.div
                        whileHover={{ x: 10 }}
                        className="mt-4 flex items-center text-sm font-semibold text-white/90 hover:text-white"
                      >
                        Explore Collection
                        <ArrowRight size={16} className="ml-2" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={floating}
              animate="animate"
              className="mb-8"
            >
              <Quote size={64} className="mx-auto text-blue-200 opacity-60" />
            </motion.div>
            <blockquote className="text-2xl md:text-3xl italic mb-6 max-w-4xl mx-auto leading-relaxed">
              "Ingat yaah... Hari ini mungkin berat, tapi besok bisa jadi jawaban atas semua doa yang pernah kamu ucapkan."
            </blockquote>
            <motion.p 
              className="text-blue-200 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              - Efengsi Rahmanto Zalukhu, Pekanbaru 2025
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { 
                icon: Shield, 
                title: "Quality Assurance", 
                desc: "Premium materials and expert craftsmanship in every piece",
                color: "text-green-600"
              },
              { 
                icon: Truck, 
                title: "Free Shipping", 
                desc: "Complimentary delivery on all orders over $100",
                color: "text-blue-600"
              },
              { 
                icon: Clock, 
                title: "24/7 Support", 
                desc: "Round-the-clock customer service for your convenience",
                color: "text-purple-600"
              },
              { 
                icon: Package, 
                title: "Easy Returns", 
                desc: "30-day hassle-free return policy on all items",
                color: "text-orange-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                className="text-center p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ 
                  y: -10,
                  rotate: 0,
                  backgroundColor: "#f8fafc"
                }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  className={`w-16 h-16 ${feature.color} bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6`}
                >
                  <feature.icon size={32} className={feature.color} />
                </motion.div>
                <h3 className="font-bold text-gray-800 text-xl mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;