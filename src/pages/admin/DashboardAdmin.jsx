
// src/pages/admin/DashboardAdmin.jsx
import React, { useEffect, useState } from "react";

const DashboardAdmin = () => {
  // State untuk angka-angka dashboard
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
      const todayStr = new Date().toDateString(); // string tanggal hari ini
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
    };

    load();
  }, []);

  // Helper: format angka ke rupiah
  const rupiah = (n) =>
    Number(n).toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div style={{ padding: "20px" }}>
      <h1>DASHBOARD ADMIN</h1>
      <h2>Jumlah User: {data.jumlahUser}</h2>
      <h2>Jumlah Produk: {data.jumlahProduk}</h2>
      <h2>Jumlah Produk Terjual Hari ini: {data.terjualHariIni}</h2>
      <h2>Jumlah Produk Terjual Minggu ini: {data.terjualMingguIni}</h2>
      <h2>Jumlah Pendapatan Hari ini: {rupiah(data.pendapatanHariIni)}</h2>
      <h2>Total Pendapatan: {rupiah(data.totalPendapatan)}</h2>
    </div>
  );
};

export default DashboardAdmin;
