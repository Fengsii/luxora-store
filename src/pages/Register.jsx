import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, User, Sparkles, ShoppingBag, Heart, Star, Zap, Check, X, Mail, UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" atau "error"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showPopupMessage = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    
    // Sembunyikan popup setelah 2 detik
    setTimeout(() => {
      setShowPopup(false);
      if (type === "success") {
        navigate("/");
      }
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("https://api-sepokat.vercel.app/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Register success:", data);

      showPopupMessage("Registrasi berhasil! Mengarahkan ke login...", "success");
    } catch (err) {
      console.error("Register error:", err);
      showPopupMessage("Registrasi gagal! Silakan coba lagi.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
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
  const rotate = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
      ></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute top-10 right-20 w-16 h-16 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
     
        {/* Register Form Container */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="py-8 px-6 sm:px-10">
            <motion.h2 
              className="text-2xl font-bold text-center text-blue-900 mb-6"
              variants={fadeIn}
            >
              Buat Akun Baru
            </motion.h2>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <motion.div 
                variants={fadeIn}
                className="relative"
              >
                <label htmlFor="full_name" className="block text-sm font-medium text-blue-800 mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-blue-500" />
                  </div>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="pl-10 appearance-none block w-full px-4 py-3 border border-blue-200 rounded-xl shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-200 bg-white/50"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
              </motion.div>

              {/* Username Field */}
              <motion.div 
                variants={fadeIn}
                className="relative"
              >
                <label htmlFor="username" className="block text-sm font-medium text-blue-800 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserPlus size={18} className="text-blue-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10 appearance-none block w-full px-4 py-3 border border-blue-200 rounded-xl shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-200 bg-white/50"
                    placeholder="Buat username unik"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div 
                variants={fadeIn}
                className="relative"
              >
                <label htmlFor="password" className="block text-sm font-medium text-blue-800 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-blue-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 appearance-none block w-full px-4 py-3 border border-blue-200 rounded-xl shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-200 bg-white/50"
                    placeholder="Buat password yang kuat"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </motion.div>

            

              {/* Register Button */}
              <motion.div variants={fadeIn}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mendaftarkan...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} className="mr-2" />
                      Daftar
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div 
              className="mt-6"
              variants={fadeIn}
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-blue-500">Sudah punya akun?</span>
                </div>
              </div>

              {/* Login Button */}
              <motion.div 
                className="mt-4"
                variants={fadeIn}
              >
                <motion.button
                  onClick={() => navigate("/")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-blue-200 rounded-xl shadow-sm bg-white text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  <User size={16} className="mr-2" />
                  Masuk ke Akun
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Decorative Elements */}
        <motion.div 
          className="absolute -bottom-10 -left-10 text-blue-200 opacity-50"
          variants={rotate}
          animate="animate"
        >
          <Star size={40} fill="currentColor" />
        </motion.div>
        
        <motion.div 
          className="absolute -top-10 -right-10 text-indigo-200 opacity-50"
          variants={rotate}
          animate="animate"
          style={{ rotate: -180 }}
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>
      </div>

      {/* Success/Error Popup */}
      <AnimatePresence>
        {showPopup && (
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
              className={`bg-white rounded-xl p-6 shadow-2xl border-2 max-w-sm w-full ${
                popupType === "error" ? "border-red-200" : "border-green-200"
              }`}
            >
              <div className="text-center">
                {/* Icon with Circle */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  popupType === "error" ? "bg-red-100" : "bg-green-100"
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
                    {popupType === "error" ? (
                      <X size={32} className="text-red-600" strokeWidth={3} />
                    ) : (
                      <Check size={32} className="text-green-600" strokeWidth={3} />
                    )}
                  </motion.div>
                </div>
                
                {/* Message */}
                <h3 className={`text-lg font-semibold mb-2 ${
                  popupType === "error" ? "text-red-800" : "text-green-800"
                }`}>
                  {popupMessage}
                </h3>
                
                {/* Sub Message */}
                <p className="text-gray-600 text-sm">
                  {popupType === "error" 
                    ? "Silakan coba lagi dengan informasi yang berbeda" 
                    : "Anda akan diarahkan ke halaman login"}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;