
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
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight, User, Users, Filter, Eye, Mail, Calendar } from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://api-sepokat.vercel.app/api/user/get-all");
        const data = await res.json();
        setUsers(data);
      } catch (err) { 
        console.error("Gagal ambil data user:", err);
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

  // Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-6 border border-blue-100"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-800">User Management</h1>
              <p className="text-blue-600 mt-2">Manage and view all system users</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button className="flex items-center justify-center px-4 py-2 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-6 md:mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-white p-4 sm:p-5 rounded-xl border border-blue-100 shadow-sm"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <div className="rounded-xl bg-blue-100 p-2 sm:p-3 mr-3 sm:mr-4">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-600">Total Users</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800">{users.length}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-4 sm:p-5 rounded-xl border border-blue-100 shadow-sm"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <div className="rounded-xl bg-blue-100 p-2 sm:p-3 mr-3 sm:mr-4">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-600">Filtered Users</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800">{filteredUsers.length}</p>
                </div>
              </div>
            </motion.div>
  
            <motion.div 
              className="bg-white p-4 sm:p-5 rounded-xl border border-blue-100 shadow-sm"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <div className="rounded-xl bg-blue-100 p-2 sm:p-3 mr-3 sm:mr-4">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-600">Current Page</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800">{currentPage}/{totalPages}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="text"
              placeholder="Cari username atau nama lengkap..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-900 placeholder-blue-400"
            />
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-blue-100">
              <Users className="mx-auto h-16 w-16 text-blue-300" />
              <h3 className="mt-4 text-xl font-medium text-blue-800">Loading data user...</h3>
              <p className="mt-2 text-blue-600">Please wait while we fetch user data.</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-blue-100">
              <Search className="mx-auto h-16 w-16 text-blue-300" />
              <h3 className="mt-4 text-xl font-medium text-blue-800">Tidak ada user yang cocok</h3>
              <p className="mt-2 text-blue-600">Coba kata kunci pencarian yang berbeda.</p>
            </div>
          ) : (
            <>
              {/* Users Table */}
              <motion.div 
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-blue-100">
                    <thead className="bg-blue-50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Username
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Nama Lengkap
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-blue-100">
                      {currentUsers.map((user) => (
                        <motion.tr 
                          key={user.id} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-blue-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-900">#{user.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-900">{user.username}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-900">{user.full_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button className="text-blue-500 hover:text-blue-700 p-1 rounded-md hover:bg-blue-100 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-blue-500 hover:text-blue-700 p-1 rounded-md hover:bg-blue-100 transition-colors">
                                <Mail className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Pagination */}
              <div className="flex flex-col md:flex-row items-center justify-between mt-6 px-2 space-y-4 md:space-y-0">
                <div className="text-sm text-blue-600">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredUsers.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredUsers.length}</span> users
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={goPrev}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 py-2 rounded-lg border ${
                      currentPage === 1
                        ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  
                  <div className="hidden md:flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-lg text-sm ${
                          currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "text-blue-700 hover:bg-blue-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={goNext}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 py-2 rounded-lg border ${
                      currentPage === totalPages
                        ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserList;