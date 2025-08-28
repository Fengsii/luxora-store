
// import React, { useState, useEffect } from "react";
// import { getSession } from "../../helper/session";

// const Profile = () => {
//   const [user, setUser] = useState(null); // data user login
//   const [topup, setTopup] = useState(""); // input saldo
//   const [transactions, setTransactions] = useState([]); // riwayat transaksi

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
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             {transactions.map((t) => (
//               <li key={t.id || Date.now() + Math.random()} style={{ marginBottom: "15px" }}>
//                 {/* 🔑 Tampilkan gambar produk */}
//                 <img src={t.productImage} alt={t.productName} width="80" />
//                 <p>Produk: {t.productName}</p>
//                 <p>Jumlah: {t.qty}</p>
//                 <p>Total Harga: Rp {t.totalHarga}</p>
//                 <p>Tanggal: {new Date(t.date).toLocaleString()}</p>
//                 <p>Status: {t.status}</p>
//                 <hr />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );    
// };

// export default Profile;











import React, { useState, useEffect } from "react";
import { getSession } from "../../helper/session";

const Profile = () => {
  const [user, setUser] = useState(null); // data user login
  const [topup, setTopup] = useState(""); // input saldo
  const [transactions, setTransactions] = useState([]); // riwayat transaksi

  // 🔹 State untuk pagination
  const [currentPage, setCurrentPage] = useState(1); // halaman aktif
  const itemsPerPage = 10; // jumlah data per halaman (10 transaksi)

  // 🔹 Ambil data user + transaksi dari localStorage
  useEffect(() => {
    const sessionUser = getSession();
    if (sessionUser) {
      setUser(sessionUser);

      // filter transaksi hanya milik user login
      const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
      const userTransactions = allTransactions.filter(
        (t) => t.username === sessionUser.username
      );
      setTransactions(userTransactions);
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  const key = `saldo_${user.username}`;
  const totalSaldo = Number(localStorage.getItem(key)) || 0;

  // 🔹 Fungsi untuk tambah saldo
  const handleTopup = () => {
    if (!topup || isNaN(topup) || Number(topup) <= 0) {
      return alert("Masukkan jumlah saldo valid!");
    }
    if (Number(topup) > 1000000) {
      return alert("Maksimal top up Rp 1.000.000!");
    }

    const currentSaldo = Number(localStorage.getItem(key)) || 0;
    const newSaldo = currentSaldo + Number(topup);

    localStorage.setItem(key, newSaldo);
    alert(`Saldo berhasil ditambahkan. Total saldo: Rp ${newSaldo}`);

    setTopup("");
    window.location.reload(); // refresh biar saldo update
  };

  // 🔹 Logika pagination sederhana
  // hitung index awal dan akhir data berdasarkan halaman aktif
  const indexOfLastItem = currentPage * itemsPerPage; 
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; 
  // ambil hanya data transaksi sesuai halaman aktif
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem); 
  // hitung total halaman
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Profil User</h1>
      <h2>Username: {user.username}</h2>
      <h3>Nama Lengkap: {user.full_name || "-"}</h3>
      <h3>Total Saldo: Rp {totalSaldo}</h3>

      {/* Tambah saldo */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="number"
          placeholder="Masukkan jumlah saldo"
          value={topup}
          onChange={(e) => setTopup(e.target.value)}
        />
        <button onClick={handleTopup} style={{ marginLeft: "10px" }}>
          Tambah Saldo
        </button>
      </div>

      {/* Daftar transaksi */}
      <div style={{ marginTop: "20px" }}>
        <h2>Daftar Transaksi</h2>
        {transactions.length === 0 ? (
          <p>Belum ada transaksi.</p>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {currentTransactions.map((t, i) => (
                <li key={t.id || i} style={{ marginBottom: "15px" }}>
                  {/* 🔑 Tampilkan gambar produk */}
                  <img src={t.productImage} alt={t.productName} width="80" />
                  <p>Produk: {t.productName}</p>
                  <p>Jumlah: {t.qty}</p>
                  <p>Total Harga: Rp {t.totalHarga}</p>
                  <p>Tanggal: {new Date(t.date).toLocaleString()}</p>
                  <p>Status: {t.status}</p>
                  <hr />
                </li>
              ))}
            </ul>

            {/* 🔹 Navigasi pagination */}
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span style={{ margin: "0 10px" }}>
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
