import { useNavigate, useLocation } from "react-router-dom";
import { clearSession } from "../helper/session";
import { LayoutDashboard, PackageSearch, Logs, CircleUser, LogOut, Handbag, X } from "lucide-react";
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    clearSession();
    window.location.reload();
    navigate("/");
  };

  const menus = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/Dashboard" },
    { label: "Product List", icon: <PackageSearch size={20} />, path: "/admin/ProductList" },
    { label: "Order List", icon: <Logs size={20} />, path: "/admin/OrderList" },
    { label: "User List", icon: <CircleUser size={20} />, path: "/admin/UserList" },
  ];

  return (
    <>
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-64 h-screen bg-white border-r border-blue-100 text-blue-800 p-5 flex flex-col justify-between sticky top-0 left-0 shadow-sm"
      >
        {/* Header Section */}
        <div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 mb-10 px-4 py-4 rounded-xl bg-blue-50 border border-blue-100"
          >
            <div className="p-2 bg-blue-600 rounded-lg">
              <Handbag className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-800 tracking-tight">LUXORA</h1>
              <h2 className="text-sm font-semibold text-blue-600 tracking-wide">ADMIN PANEL</h2>
            </div>
          </motion.div>
          
          {/* Navigation Menu */}
          <nav className="flex flex-col gap-2">
            {menus.map((menu, index) => {
              const isActive = activeTab === menu.path;
              return (
                <motion.button
                  key={index}
                  onClick={() => {
                    setActiveTab(menu.path);
                    navigate(menu.path);
                  }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "bg-white text-blue-700 hover:bg-blue-50 border border-blue-100"
                  }`}
                >
                  <motion.div 
                    animate={{ 
                      color: isActive ? "white" : "#1e40af",
                      scale: isActive ? 1.1 : 1 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {menu.icon}
                  </motion.div>
                  <span className="font-medium text-sm">{menu.label}</span>
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="pb-4">
          <motion.button
            onClick={() => setShowLogoutPopup(true)}
            whileHover={{ x: 5, backgroundColor: "#fef2f2" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 w-full p-3 rounded-xl bg-white text-red-600 border border-red-100 hover:border-red-200 transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Logout Confirmation Popup */}
      <AnimatePresence>
        {showLogoutPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-opacity-50"
              onClick={() => setShowLogoutPopup(false)}
            />
            
            {/* Popup Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-2xl border border-blue-100 max-w-xs sm:max-w-sm w-full relative z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-800">Konfirmasi Logout</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowLogoutPopup(false)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              {/* Content */}
              <div className="mb-4 sm:mb-6">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center"
                  >
                    <LogOut className="text-blue-600" size={20} />
                  </motion.div>
                </div>
                <p className="text-center text-blue-700 text-sm sm:text-base">
                  Apakah Anda yakin ingin logout dari admin panel?
                </p>
              </div>
              
              {/* PERBAIKAN: Tombol yang responsif */}
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <motion.button
                  onClick={() => setShowLogoutPopup(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-white text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition duration-200 font-medium text-sm sm:text-base"
                >
                  Batal
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-sm sm:text-base"
                >
                  Ya, Logout
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideBar;