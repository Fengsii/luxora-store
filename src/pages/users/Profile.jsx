// import React, { useState, useEffect } from "react";
// import { getSession } from "../../helper/session";

// const Profile = () => {
//   const [user, setUser] = useState(null); // data user login
//   const [topup, setTopup] = useState(""); // input saldo
//   const [transactions, setTransactions] = useState([]); // riwayat transaksi

//   // 🔹 State untuk pagination
//   const [currentPage, setCurrentPage] = useState(1); // halaman aktif
//   const itemsPerPage = 10; // jumlah data per halaman (10 transaksi)

//   // 🔹 Ambil data user + transaksi dari localStorage
//   useEffect(() => {
//     const sessionUser = getSession();
//     if (sessionUser) {
//       setUser(sessionUser);

//       // filter transaksi hanya milik user login
//       const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
//       const userTransactions = allTransactions.filter(
//         (t) => t.username === sessionUser.username
//       );
//       setTransactions(userTransactions);
//     }
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   const key = `saldo_${user.username}`;
//   const totalSaldo = Number(localStorage.getItem(key)) || 0;

//   // 🔹 Fungsi untuk tambah saldo
//   const handleTopup = () => {
//     if (!topup || isNaN(topup) || Number(topup) <= 0) {
//       return alert("Masukkan jumlah saldo valid!");
//     }
//     if (Number(topup) > 1000000) {
//       return alert("Maksimal top up Rp 1.000.000!");
//     }

//     const currentSaldo = Number(localStorage.getItem(key)) || 0;
//     const newSaldo = currentSaldo + Number(topup);

//     localStorage.setItem(key, newSaldo);
//     alert(`Saldo berhasil ditambahkan. Total saldo: Rp ${newSaldo}`);

//     setTopup("");
//     window.location.reload(); // refresh biar saldo update
//   };

//   // 🔹 Logika pagination sederhana
//   // hitung index awal dan akhir data berdasarkan halaman aktif
//   const indexOfLastItem = currentPage * itemsPerPage; 
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
//   // ambil hanya data transaksi sesuai halaman aktif
//   const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem); 
//   // hitung total halaman
//   const totalPages = Math.ceil(transactions.length / itemsPerPage);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Profil User</h1>
//       <h2>Username: {user.username}</h2>
//       <h3>Nama Lengkap: {user.full_name || "-"}</h3>
//       <h3>Total Saldo: Rp {totalSaldo}</h3>

//       {/* Tambah saldo */}
//       <div style={{ marginTop: "10px" }}>
//         <input
//           type="number"
//           placeholder="Masukkan jumlah saldo"
//           value={topup}
//           onChange={(e) => setTopup(e.target.value)}
//         />
//         <button onClick={handleTopup} style={{ marginLeft: "10px" }}>
//           Tambah Saldo
//         </button>
//       </div>

//       {/* Daftar transaksi */}
//       <div style={{ marginTop: "20px" }}>
//         <h2>Daftar Transaksi</h2>
//         {transactions.length === 0 ? (
//           <p>Belum ada transaksi.</p>
//         ) : (
//           <>
//             <ul style={{ listStyle: "none", padding: 0 }}>
//               {currentTransactions.map((t, i) => (
//                 <li key={t.id || i} style={{ marginBottom: "15px" }}>
//                   {/* 🔑 Tampilkan gambar produk */}
//                   <img src={t.productImage} alt={t.productName} width="80" />
//                   <p>Produk: {t.productName}</p>
//                   <p>Jumlah: {t.qty}</p>
//                   <p>Total Harga: Rp {t.totalHarga}</p>
//                   <p>Tanggal: {new Date(t.date).toLocaleString()}</p>
//                   <p>Status: {t.status}</p>
//                   <hr />
//                 </li>
//               ))}
//             </ul>

//             {/* 🔹 Navigasi pagination */}
//             <div style={{ marginTop: "15px" }}>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 Prev
//               </button>
//               <span style={{ margin: "0 10px" }}>
//                 Halaman {currentPage} dari {totalPages}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


















import React, { useState, useEffect } from "react";
import { getSession, clearSession } from "../../helper/session";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Wallet, Plus, CreditCard, Calendar, 
  Package, CheckCircle, AlertCircle, ChevronLeft, 
  ChevronRight, ArrowUpCircle, History, LogOut,
  Shield
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [topup, setTopup] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = getSession();
    if (sessionUser) {
      setUser(sessionUser);

      const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
      const userTransactions = allTransactions.filter(
        (t) => t.username === sessionUser.username
      );
      setTransactions(userTransactions);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    clearSession();
    navigate("/");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  const key = `saldo_${user.username}`;
  const totalSaldo = Number(localStorage.getItem(key)) || 0;

  const handleTopup = () => {
    if (!topup || isNaN(topup) || Number(topup) <= 0) {
      setErrorMessage("Masukkan jumlah saldo valid!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    if (Number(topup) > 1000000) {
      setErrorMessage("Maksimal top up Rp 1.000.000!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const currentSaldo = Number(localStorage.getItem(key)) || 0;
    const newSaldo = currentSaldo + Number(topup);

    localStorage.setItem(key, newSaldo);
    setShowSuccess(true);
    setTopup("");

    setTimeout(() => {
      setShowSuccess(false);
      window.location.reload();
    }, 2000);
  };

  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem); 
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={48} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Profil Pengguna</h1>
          <p className="text-gray-600">Kelola akun dan lihat riwayat transaksi Anda</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-md mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Akun</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User size={18} className="text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-medium text-gray-800">{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User size={18} className="text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Nama Lengkap</p>
                    <p className="font-medium text-gray-800">{user.full_name || "-"}</p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <motion.button
                  onClick={() => setShowLogoutConfirm(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center justify-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Keluar Akun
                </motion.button>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Saldo</h2>
              <div className="flex items-center mb-4">
                <Wallet size={24} className="text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Total Saldo</p>
                  <p className="text-2xl font-bold text-blue-600">
                    Rp {totalSaldo.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>

              {/* Top Up Form */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Tambah Saldo</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Jumlah saldo"
                    value={topup}
                    onChange={(e) => setTopup(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="1000000"
                  />
                  <motion.button
                    onClick={handleTopup}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus size={18} className="mr-1" />
                    Top Up
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500">Maksimal Rp 1.000.000 per top up</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transactions Section */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-md"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <History size={24} className="text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Riwayat Transaksi</h2>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <Package size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Belum ada transaksi.</p>
            </div>
          ) : (
            <>
              {/* Transactions List */}
              <div className="space-y-4">
                {currentTransactions.map((t, i) => (
                  <motion.div
                    key={t.id || i}
                    variants={itemVariants}
                    transition={{ delay: i * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Product Image */}
                      <img 
                        src={t.productImage} 
                        alt={t.productName}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      {/* Transaction Details */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800 mb-2">{t.productName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Package size={14} className="text-gray-500 mr-2" />
                              <span>Jumlah: {t.qty}</span>
                            </div>
                            <div className="flex items-center">
                              <CreditCard size={14} className="text-gray-500 mr-2" />
                              <span className="font-semibold text-blue-600">
                                Rp {t.totalHarga.toLocaleString('id-ID')}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Calendar size={14} className="text-gray-500 mr-2" />
                              <span>{new Date(t.date).toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                t.status === "Processing" ? "bg-yellow-500" : 
                                t.status === "Completed" ? "bg-green-500" : "bg-blue-500"
                              }`} />
                              <span className={`font-medium ${
                                t.status === "Processing" ? "text-yellow-600" : 
                                t.status === "Completed" ? "text-green-600" : "text-blue-600"
                              }`}>
                                {t.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div 
                  className="flex justify-center items-center mt-8 space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
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
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-4 right-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center"
            >
              <AlertCircle size={20} className="mr-2" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccess && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-8 text-center shadow-2xl border-2 border-green-200 max-w-sm mx-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <ArrowUpCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Top Up Berhasil!</h3>
                <p className="text-gray-600 mb-4">
                  Saldo berhasil ditambahkan. Total saldo: Rp {totalSaldo + Number(topup || 0).toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-gray-500">Memperbarui halaman...</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Logout Confirmation Popup */}
        <AnimatePresence>
          {showLogoutConfirm && (
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
                    <Shield size={32} className="text-red-600" />
                  </div>
                  
                  {/* Message */}
                  <h3 className="text-lg font-semibold mb-2 text-red-800">
                    Keluar Akun?
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6">
                    Apakah Anda yakin ingin keluar dari akun Anda?
                  </p>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={() => setShowLogoutConfirm(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Batal
                    </motion.button>
                    
                    <motion.button
                      onClick={handleLogout}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-md"
                    >
                      Ya, Keluar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Profile;