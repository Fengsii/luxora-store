import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSession } from "../helper/session";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, User, Sparkles, ShoppingBag, Heart, Star, Zap, Check, X } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("https://api-sepokat.vercel.app/api/user/get-all");
      const users = await res.json();

      const user = users.find(
        (u) =>
          u.username === formData.username &&
          u.password === formData.password
      );

       if (user) {
        // Tambahkan role ke data user
        const userWithRole = {
          ...user,
          role: user.id === "1" ? "admin" : "user",
        };

        // Simpan ke session
        setSession(userWithRole);
        
        // Tampilkan pesan sukses
        showPopupMessage("Login berhasil! Mengarahkan...", "success");

        // Tunggu sebentar sebelum redirect agar user bisa melihat pesan sukses
        setTimeout(() => {
          // cek role admin / user
          if (user.id === "1") {
            localStorage.setItem("role", "admin");
            window.location.href = "/admin/Dashboard"; // paksa reload
          } else {
            localStorage.setItem("role", "user")
            window.location.href = "/user/Home"; // paksa reload
          }
        }, 1500);
      } else {
        showPopupMessage("Username atau password salah!", "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      showPopupMessage("Terjadi kesalahan saat login!", "error");
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
        
        {/* Login Form Container */}
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
              Masuk ke Akun Anda
            </motion.h2>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
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
                    <User size={18} className="text-blue-500" />
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
                    placeholder="Masukkan username Anda"
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
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 appearance-none block w-full px-4 py-3 border border-blue-200 rounded-xl shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-200 bg-white/50"
                    placeholder="Masukkan password Anda"
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

              {/* Remember Me & Forgot Password */}
              <motion.div 
                className="flex items-center justify-between"
                variants={fadeIn}
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-800">
                    Ingat saya
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition duration-200">
                    Lupa password?
                  </a>
                </div>
              </motion.div>

              {/* Login Button */}
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
                      Sedang masuk...
                    </>
                  ) : (
                    <>
                      <Zap size={16} className="mr-2" />
                      Masuk
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
                  <span className="px-2 bg-transparent text-blue-500">Belum punya akun?</span>
                </div>
              </div>

              {/* Register Button */}
              <motion.div 
                className="mt-4"
                variants={fadeIn}
              >
                <motion.button
                  onClick={() => navigate("/Register")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-blue-200 rounded-xl shadow-sm bg-white text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  <User size={16} className="mr-2" />
                  Daftar Akun Baru
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
                    ? "Silakan coba lagi dengan kredensial yang benar" 
                    : "Anda akan diarahkan dalam beberapa detik"}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;













// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { setSession } from "../helper/session";
// // eslint-disable-next-line no-unused-vars
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Eye, EyeOff, Lock, User,
//   Heart, Star, Zap, Check, X
// } from "lucide-react";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState(""); // "success" atau "error"

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const showPopupMessage = (message, type) => {
//     setPopupMessage(message);
//     setPopupType(type);
//     setShowPopup(true);

//     // Sembunyikan popup setelah 2 detik
//     setTimeout(() => {
//       setShowPopup(false);
//     }, 2000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await fetch("https://api-sepokat.vercel.app/api/user/get-all");
//       const users = await res.json();

//       const user = users.find(
//         (u) =>
//           u.username === formData.username &&
//           u.password === formData.password
//       );

//       if (user) {
//         // Tambahkan role ke data user
//         const userWithRole = {
//           ...user,
//           role: user.id === "1" ? "admin" : "user",
//         };

//         // Simpan ke session
//         setSession(userWithRole);

//         // Tampilkan pesan sukses
//         showPopupMessage("Login berhasil! Mengarahkan...", "success");

//         // Tunggu sebentar sebelum redirect agar user bisa melihat pesan sukses
//         setTimeout(() => {
//           if (userWithRole.role === "admin") {
//             window.location.href = "/admin/Dashboard";
//           } else {
//             window.location.href = "/user/Home";
//           }
//         }, 1500);
//       } else {
//         showPopupMessage("Username atau password salah!", "error");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       showPopupMessage("Terjadi kesalahan saat login!", "error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Animations
//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" }
//     }
//   };

//   const scaleIn = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   // eslint-disable-next-line no-unused-vars
//   const rotate = {
//     animate: {
//       rotate: 360,
//       transition: {
//         duration: 20,
//         repeat: Infinity,
//         ease: "linear"
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
//         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
//       ></div>

//       {/* Main Content */}
//       <div className="relative z-10 w-full max-w-md">
//         {/* Login Form Container */}
//         <motion.div
//           variants={scaleIn}
//           initial="hidden"
//           animate="visible"
//           className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
//         >
//           <div className="py-8 px-6 sm:px-10">
//             <motion.h2
//               className="text-2xl font-bold text-center text-blue-900 mb-6"
//               variants={fadeIn}
//             >
//               Masuk ke Akun Anda
//             </motion.h2>

//             <form className="space-y-5" onSubmit={handleSubmit}>
//               {/* Username */}
//               <motion.div variants={fadeIn} className="relative">
//                 <label htmlFor="username" className="block text-sm font-medium text-blue-800 mb-1">
//                   Username
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User size={18} className="text-blue-500" />
//                   </div>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     required
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="pl-10 appearance-none block w-full px-4 py-3 border border-blue-200 rounded-xl shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-200 bg-white/50"
//                     placeholder="Masukkan username Anda"
//                   />
//                 </div>
//               </motion.div>

//               {/* Password */}
//               <motion.div variants={fadeIn} className="relative">
//                 <label htmlFor="password" className="block text-sm font-medium text-blue-800 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock size={18} className="text-blue-500" />
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="pl-10 pr-10 appearance-none block w-full px-4 py-3 border border-blue-200 rounded-xl shadow-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition duration-200 bg-white/50"
//                     placeholder="Masukkan password Anda"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-600 transition-colors"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </motion.div>

//               {/* Remember Me */}
//               <motion.div className="flex items-center justify-between" variants={fadeIn}>
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-800">
//                     Ingat saya
//                   </label>
//                 </div>
//               </motion.div>

//               {/* Login Button */}
//               <motion.div variants={fadeIn}>
//                 <motion.button
//                   type="submit"
//                   disabled={isLoading}
//                   whileHover={{ scale: isLoading ? 1 : 1.02 }}
//                   whileTap={{ scale: isLoading ? 1 : 0.98 }}
//                   className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sedang masuk...
//                     </>
//                   ) : (
//                     <>
//                       <Zap size={16} className="mr-2" />
//                       Masuk
//                     </>
//                   )}
//                 </motion.button>
//               </motion.div>
//             </form>

//             {/* Register Button */}
//             <motion.div className="mt-4" variants={fadeIn}>
//               <motion.button
//                 onClick={() => navigate("/Register")}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-blue-200 rounded-xl shadow-sm bg-white text-sm font-medium text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
//               >
//                 <User size={16} className="mr-2" />
//                 Daftar Akun Baru
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Popup */}
//       <AnimatePresence>
//         {showPopup && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, scale: 0.8, y: 50 },
//                 visible: {
//                   opacity: 1, scale: 1, y: 0,
//                   transition: { type: "spring", stiffness: 300, damping: 20 }
//                 },
//                 exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } }
//               }}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className={`bg-white rounded-xl p-6 shadow-2xl border-2 max-w-sm w-full ${
//                 popupType === "error" ? "border-red-200" : "border-green-200"
//               }`}
//             >
//               <div className="text-center">
//                 <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
//                   popupType === "error" ? "bg-red-100" : "bg-green-100"
//                 }`}>
//                   {popupType === "error" ? (
//                     <X size={32} className="text-red-600" strokeWidth={3} />
//                   ) : (
//                     <Check size={32} className="text-green-600" strokeWidth={3} />
//                   )}
//                 </div>
//                 <h3 className={`text-lg font-semibold mb-2 ${
//                   popupType === "error" ? "text-red-800" : "text-green-800"
//                 }`}>
//                   {popupMessage}
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   {popupType === "error"
//                     ? "Silakan coba lagi dengan kredensial yang benar"
//                     : "Anda akan diarahkan dalam beberapa detik"}
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Login;
