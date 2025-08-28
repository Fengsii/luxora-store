
// import React, { useState, useEffect } from "react";

// const UserList = () => {
//   // 1. Buat state untuk menampung data user
//   const [users, setUsers] = useState([]);

//   // ------------------- SEARCHING (paling sederhana) -------------------
//   // state untuk menampung teks pencarian
//   const [search, setSearch] = useState("");

//   // ------------------- PAGINATION (paling sederhana) -------------------
//   // currentPage = halaman aktif sekarang
//   const [currentPage, setCurrentPage] = useState(1);
//   // berapa baris/row per halaman
//   const itemsPerPage = 5;

//   // 2. useEffect -> dijalankan sekali ketika halaman dibuka
//   useEffect(() => {
//     // fungsi ambil data user
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch("https://api-sepokat.vercel.app/api/user/get-all");
//         const data = await res.json(); // ubah response jadi JSON
//         setUsers(data); // simpan data ke state
//       } catch (err) {
//         console.error("Gagal ambil data user:", err);
//       }
//     };

//     fetchUsers(); // panggil fungsi
//   }, []); // [] -> supaya cuma dijalankan sekali

//   // ------------------- LOGIKA SEARCHING -------------------
//   // Filter data berdasarkan 'search'
//   // Di sini kita cek username ATAU full_name mengandung kata yang dicari (case-insensitive)
//   const filteredUsers = users.filter((u) => {
//     const q = search.toLowerCase();
//     return (
//       (u.username || "").toLowerCase().includes(q) ||
//       (u.full_name || "").toLowerCase().includes(q)
//     );
//   });

//   // Kalau teks pencarian berubah, biar aman kita kembalikan ke halaman 1
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search]);

//   // ------------------- LOGIKA PAGINATION -------------------
//   // Hitung index awal & akhir dari data yang akan ditampilkan di halaman saat ini
//   const indexOfLastItem = currentPage * itemsPerPage;      // index terakhir data di halaman
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage; // index pertama data di halaman

//   // Ambil potongan data sesuai halaman yang aktif (setelah di-filter oleh searching)
//   const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

//   // Hitung total halaman (dibulatkan ke atas)
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;

//   // Handler tombol prev/next
//   const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
//   const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

//   return (
//     <div>
//       <h1>User List</h1>

//       {/* input searching sederhana */}
//       <div style={{ marginBottom: 12 }}>
//         <input
//           placeholder="Cari username / nama lengkap..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ padding: 8, minWidth: 260 }}
//         />
//       </div>

//       {/* kalau masih kosong */}
//       {users.length === 0 ? (
//         <p>Loading data user...</p>
//       ) : filteredUsers.length === 0 ? (
//         <p>Tidak ada user yang cocok dengan pencarian.</p>
//       ) : (
//         <>
//           <table border="1" cellPadding="10">
//             <thead>
//               <tr>
//                 <th>Id</th>
//                 <th>Username</th>
//                 <th>Nama Lengkap</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.username}</td>
//                   <td>{user.full_name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Kontrol pagination paling sederhana: Prev / info halaman / Next */}
//           <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
//             <button onClick={goPrev} disabled={currentPage === 1}>
//               Prev
//             </button>
//             <span>
//               Halaman {currentPage} dari {totalPages}
//             </span>
//             <button onClick={goNext} disabled={currentPage === totalPages}>
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default UserList;
























import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// Variants untuk animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    backgroundColor: "#f0f9ff",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://api-sepokat.vercel.app/api/user/get-all");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Gagal ambil data user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.username || "").toLowerCase().includes(q) ||
      (u.full_name || "").toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">User Management</h1>
          <p className="text-gray-600">Kelola pengguna Luxora Store dengan mudah</p>
        </motion.div>

        {/* SEARCH BAR */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 mb-6 border border-blue-100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari username atau nama lengkap..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-blue-50"
            />
          </div>
        </motion.div>

        {/* USER TABLE */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
            />
          </motion.div>
        ) : filteredUsers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center border border-blue-100"
          >
            <svg className="mx-auto h-16 w-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-blue-800">
              {search ? "Tidak ada user yang cocok" : "Belum ada user"}
            </h3>
            <p className="mt-2 text-blue-600">
              {search ? "Coba ubah kata kunci pencarian" : "User akan muncul di sini"}
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                        Nama Lengkap
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    <AnimatePresence>
                      {currentUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          whileHover="hover"
                          transition={{ delay: index * 0.05 }}
                          className="cursor-pointer"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">
                            {user.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-800 font-medium">
                            {user.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700">
                            {user.full_name}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* PAGINATION */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-md p-4 mt-6 border border-blue-100"
            >
              <div className="text-sm text-blue-600">
                Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredUsers.length)} dari {filteredUsers.length} user
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={goPrev}
                  disabled={currentPage === 1}
                  whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
                  whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                  className="px-4 py-2 bg-white border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition duration-200 text-blue-700 font-medium"
                >
                  Previous
                </motion.button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-lg transition duration-200 font-medium ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  onClick={goNext}
                  disabled={currentPage === totalPages}
                  whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
                  whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
                  className="px-4 py-2 bg-white border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition duration-200 text-blue-700 font-medium"
                >
                  Next
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default UserList;
