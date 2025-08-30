
// // src/pages/admin/DashboardAdmin.jsx
// import React, { useEffect, useState } from "react";

// const DashboardAdmin = () => {
//   // State untuk angka-angka dashboard
//   const [data, setData] = useState({
//     jumlahUser: 0,
//     jumlahProduk: 0,
//     terjualHariIni: 0,
//     terjualMingguIni: 0,
//     pendapatanHariIni: 0,
//     totalPendapatan: 0,
//   });

//   useEffect(() => {
//     const load = async () => {
//       // 1. Ambil user dari API
//       const userRes = await fetch("https://api-sepokat.vercel.app/api/user/get-all");
//       const users = await userRes.json();

//       // 2. Ambil produk dari API
//       const productRes = await fetch("https://api-sepokat.vercel.app/api/product/get-all");
//       const products = await productRes.json();

//       // 3. Ambil transaksi dari localStorage
//       const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

//       // 4. Hanya ambil transaksi Completed
//       const completedTx = transactions.filter((t) => t.status === "Completed");

//       // 5. Utility untuk cek tanggal
//       const todayStr = new Date().toDateString(); // string tanggal hari ini
//       const isToday = (t) => new Date(t.date).toDateString() === todayStr;

//       const sevenDaysAgo = new Date();
//       sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//       const isThisWeek = (t) => new Date(t.date) >= sevenDaysAgo;

//       // 6. Hitung jumlah produk terjual & pendapatan
//       const terjualHariIni = completedTx
//         .filter(isToday)
//         .reduce((sum, t) => sum + Number(t.qty || 0), 0);

//       const terjualMingguIni = completedTx
//         .filter(isThisWeek)
//         .reduce((sum, t) => sum + Number(t.qty || 0), 0);

//       const pendapatanHariIni = completedTx
//         .filter(isToday)
//         .reduce((sum, t) => sum + Number(t.totalHarga || 0), 0);

//       const totalPendapatan = completedTx.reduce(
//         (sum, t) => sum + Number(t.totalHarga || 0),
//         0
//       );

//       // 7. Simpan ke state
//       const newData = {
//         jumlahUser: Array.isArray(users) ? users.length : 0,
//         jumlahProduk: Array.isArray(products) ? products.length : 0,
//         terjualHariIni,
//         terjualMingguIni,
//         pendapatanHariIni,
//         totalPendapatan,
//       };
//       setData(newData);

//       // 8. Simpan hasil perhitungan ke localStorage juga
//       localStorage.setItem("dashboardSummary", JSON.stringify(newData));
//     };

//     load();
//   }, []);

//   // Helper: format angka ke rupiah
//   const rupiah = (n) =>
//     Number(n).toLocaleString("id-ID", { style: "currency", currency: "IDR" });

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>DASHBOARD ADMIN</h1>
//       <h2>Jumlah User: {data.jumlahUser}</h2>
//       <h2>Jumlah Produk: {data.jumlahProduk}</h2>
//       <h2>Jumlah Produk Terjual Hari ini: {data.terjualHariIni}</h2>
//       <h2>Jumlah Produk Terjual Minggu ini: {data.terjualMingguIni}</h2>
//       <h2>Jumlah Pendapatan Hari ini: {rupiah(data.pendapatanHariIni)}</h2>
//       <h2>Total Pendapatan: {rupiah(data.totalPendapatan)}</h2>
//     </div>
//   );
// };

// export default DashboardAdmin;









import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  CreditCard,
  BarChart3
} from "lucide-react";

const DashboardAdmin = () => {
  const [data, setData] = useState({
    jumlahUser: 0,
    jumlahProduk: 0,
    terjualHariIni: 0,
    terjualMingguIni: 0,
    pendapatanHariIni: 0,
    totalPendapatan: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        // 1. Ambil user dari API
        const userRes = await fetch("https://api-sepokat.vercel.app/api/user/get-all");
        const users = await userRes.json();

        // 2. Ambil produk dari API
        const productRes = await fetch("https://api-sepokat.vercel.app/api/product/get-all");
        const products = await productRes.json();

        // 3. Ambil transaksi dari localStorage
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

        // 4. Hanya ambil transaksi Completed
        const completedTx = transactions.filter((t) => t.status === "Completed");

        // 5. Utility untuk cek tanggal
        const todayStr = new Date().toDateString();
        const isToday = (t) => new Date(t.date).toDateString() === todayStr;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const isThisWeek = (t) => new Date(t.date) >= sevenDaysAgo;

        // 6. Hitung jumlah produk terjual & pendapatan
        const terjualHariIni = completedTx
          .filter(isToday)
          .reduce((sum, t) => sum + Number(t.qty || 0), 0);

        const terjualMingguIni = completedTx
          .filter(isThisWeek)
          .reduce((sum, t) => sum + Number(t.qty || 0), 0);

        const pendapatanHariIni = completedTx
          .filter(isToday)
          .reduce((sum, t) => sum + Number(t.totalHarga || 0), 0);

        const totalPendapatan = completedTx.reduce(
          (sum, t) => sum + Number(t.totalHarga || 0),
          0
        );

        // 7. Simpan ke state
        const newData = {
          jumlahUser: Array.isArray(users) ? users.length : 0,
          jumlahProduk: Array.isArray(products) ? products.length : 0,
          terjualHariIni,
          terjualMingguIni,
          pendapatanHariIni,
          totalPendapatan,
        };
        setData(newData);

        // 8. Simpan hasil perhitungan ke localStorage juga
        localStorage.setItem("dashboardSummary", JSON.stringify(newData));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    load();
  }, []);

  // Helper: format angka ke rupiah
  const rupiah = (n) =>
    Number(n).toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  // Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800">Dashboard Admin</h1>
          <p className="text-blue-600 mt-1 md:mt-2 text-sm md:text-base">Overview of your store performance</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Jumlah User */}
          <motion.div 
            className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-100 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="rounded-lg md:rounded-xl bg-blue-100 p-2 md:p-3 mr-3 md:mr-4">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm font-medium text-blue-600 truncate">Total Users</p>
                <p className="text-lg md:text-2xl font-bold text-blue-800 truncate">{data.jumlahUser}</p>
              </div>
            </div>
          </motion.div>

          {/* Jumlah Produk */}
          <motion.div 
            className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-100 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="rounded-lg md:rounded-xl bg-blue-100 p-2 md:p-3 mr-3 md:mr-4">
                <Package className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm font-medium text-blue-600 truncate">Total Products</p>
                <p className="text-lg md:text-2xl font-bold text-blue-800 truncate">{data.jumlahProduk}</p>
              </div>
            </div>
          </motion.div>

          {/* Terjual Hari Ini */}
          <motion.div 
            className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-100 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="rounded-lg md:rounded-xl bg-blue-100 p-2 md:p-3 mr-3 md:mr-4">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm font-medium text-blue-600 truncate">Sold Today</p>
                <p className="text-lg md:text-2xl font-bold text-blue-800 truncate">{data.terjualHariIni}</p>
              </div>
            </div>
          </motion.div>

          {/* Terjual Minggu Ini */}
          <motion.div 
            className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-100 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="rounded-lg md:rounded-xl bg-blue-100 p-2 md:p-3 mr-3 md:mr-4">
                <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm font-medium text-blue-600 truncate">Sold This Week</p>
                <p className="text-lg md:text-2xl font-bold text-blue-800 truncate">{data.terjualMingguIni}</p>
              </div>
            </div>
          </motion.div>

          {/* Pendapatan Hari Ini */}
          <motion.div 
            className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-100 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="rounded-lg md:rounded-xl bg-blue-100 p-2 md:p-3 mr-3 md:mr-4">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm font-medium text-blue-600 truncate">Today's Revenue</p>
                <p className="text-lg md:text-2xl font-bold text-blue-800 truncate">{rupiah(data.pendapatanHariIni)}</p>
              </div>
            </div>
          </motion.div>

          {/* Total Pendapatan - Diperbaiki responsivitasnya */}
          <motion.div 
            className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-100 shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <div className="rounded-lg md:rounded-xl bg-blue-100 p-2 md:p-3 mr-3 md:mr-4">
                <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm font-medium text-blue-600 truncate">Total Revenue</p>
                <p className="text-lg md:text-2xl font-bold text-blue-800 truncate">{rupiah(data.totalPendapatan)}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center mb-3 md:mb-4">
              <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
              <h3 className="text-base md:text-lg font-semibold text-blue-800">Quick Stats</h3>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between">
                <span className="text-xs md:text-sm text-blue-600">Avg. Daily Sales</span>
                <span className="font-medium text-blue-800 text-xs md:text-sm">
                  {data.terjualMingguIni > 0 ? Math.round(data.terjualMingguIni / 7) : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs md:text-sm text-blue-600">Conversion Rate</span>
                <span className="font-medium text-blue-800 text-xs md:text-sm">
                  {data.jumlahUser > 0 ? Math.round((data.terjualMingguIni / data.jumlahUser) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-blue-100 shadow-sm">
            <div className="flex items-center mb-3 md:mb-4">
              <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
              <h3 className="text-base md:text-lg font-semibold text-blue-800">Performance</h3>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between">
                <span className="text-xs md:text-sm text-blue-600">Weekly Growth</span>
                <span className="font-medium text-green-600 text-xs md:text-sm">
                  +{data.terjualMingguIni > 0 ? Math.round((data.terjualHariIni / data.terjualMingguIni) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs md:text-sm text-blue-600">Active Customers</span>
                <span className="font-medium text-blue-800 text-xs md:text-sm">
                  {data.jumlahUser}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardAdmin;