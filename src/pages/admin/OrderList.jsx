
// import React, { useState, useEffect } from "react";

// const OrderList = () => {
//   const [orders, setOrders] = useState([]); // state untuk simpan semua transaksi
//   const [search, setSearch] = useState(""); // state untuk kata kunci pencarian
//   const [currentPage, setCurrentPage] = useState(1); // state untuk halaman aktif

//   const itemsPerPage = 10; // jumlah data per halaman

//   // 🔹 Ambil semua transaksi dari localStorage saat halaman pertama kali dibuka
//   useEffect(() => {
//     const transaksi = JSON.parse(localStorage.getItem("transactions")) || [];
//     setOrders(transaksi); // simpan ke state orders
//   }, []);

//   // 🔹 Fungsi untuk ubah status transaksi
//   const handleStatusChange = (id, newStatus) => {
//     // copy semua order yang ada
//     const updatedOrders = orders.map((order) =>
//       order.id === id ? { ...order, status: newStatus } : order
//     );

//     // update state biar tampilan ikut berubah
//     setOrders(updatedOrders);

//     // simpan balik ke localStorage supaya data tidak hilang
//     localStorage.setItem("transactions", JSON.stringify(updatedOrders));
//   };

//   // 🔹 Filtering berdasarkan pencarian
//   const filteredOrders = orders.filter(
//     (order) =>
//       order.productName.toLowerCase().includes(search.toLowerCase()) || // cari berdasarkan nama produk
//       order.username.toLowerCase().includes(search.toLowerCase()) // atau nama user
//   );

//   // 🔹 Hitung index data untuk pagination
//   const indexOfLastItem = currentPage * itemsPerPage; // index data terakhir di halaman ini
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage; // index data pertama di halaman ini
//   const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem); // data yang ditampilkan

//   // 🔹 Hitung total halaman
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Order List</h1>

//       {/* 🔹 Input pencarian */}
//       <div style={{ marginBottom: "10px" }}>
//         <input
//           type="text"
//           placeholder="Cari berdasarkan user atau produk..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ padding: "5px", width: "300px" }}
//         />
//       </div>

//       {/* Jika tidak ada transaksi */}
//       {filteredOrders.length === 0 ? (
//         <p>Belum ada transaksi.</p>
//       ) : (
//         <>
//           {/* Tabel order */}
//           <table
//             border="1"
//             cellPadding="10"
//             style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}
//           >
//             <thead>
//               <tr>
//                 <th>Gambar Produk</th>
//                 <th>Nama User</th>
//                 <th>Produk</th>
//                 <th>Jumlah</th>
//                 <th>Total Harga</th>
//                 <th>Tanggal</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentOrders.map((order) => (
//                 <tr key={order.id}>
//                   {/* Gambar produk */}
//                   <td>
//                     <img
//                       src={order.productImage}
//                       alt={order.productName}
//                       width="80"
//                     />
//                   </td>

//                   {/* Nama user pembeli */}
//                   <td>{order.username}</td>

//                   {/* Nama produk */}
//                   <td>{order.productName}</td>

//                   {/* Jumlah produk yang dibeli */}
//                   <td>{order.qty}</td>

//                   {/* Total harga */}
//                   <td>Rp {order.totalHarga}</td>

//                   {/* Tanggal transaksi */}
//                   <td>{new Date(order.date).toLocaleString()}</td>

//                   {/* Dropdown untuk ubah status */}
//                   <td>
//                     <select
//                       value={order.status}
//                       onChange={(e) =>
//                         handleStatusChange(order.id, e.target.value)
//                       }
//                     >
//                       <option value="Processing">Processing</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* 🔹 Navigasi Pagination */}
//           <div style={{ marginTop: "15px" }}>
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//             >
//               Prev
//             </button>

//             <span style={{ margin: "0 10px" }}>
//               Halaman {currentPage} dari {totalPages}
//             </span>

//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default OrderList;




import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Package, 
  Calendar, 
  User, 
  DollarSign, 
  Hash,
  Filter,
  Eye,
  Download,
  MoreVertical
} from "lucide-react";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const transaksi = JSON.parse(localStorage.getItem("transactions")) || [];
    setOrders(transaksi);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("transactions", JSON.stringify(updatedOrders));
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.productName.toLowerCase().includes(search.toLowerCase()) ||
      order.username.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);


  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-5 md:p-8 mb-6 border border-blue-100"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Order Management</h1>
              <p className="text-blue-600 mt-2">Manage and track all customer orders</p>
            </div>
            {/* PERBAIKAN: Tombol Filter dan Export untuk tablet */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors text-sm sm:text-base">
                <Filter className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Filter</span>
              </button>
              <button className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors text-sm sm:text-base">
                <Download className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Export</span>
              </button>
            </div>
          </div>

          {/* Search and Stats Container */}
          <div className="bg-blue-20 rounded-2xl p-4 md:p-6 mb-8 border border-blue-100">
            {/* Search Bar */}
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Search by user or product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-900 placeholder-blue-400"
              />
            </div>

           
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-blue-100">
              <Package className="mx-auto h-16 w-16 text-blue-300" />
              <h3 className="mt-4 text-xl font-medium text-blue-800">No orders found</h3>
              <p className="mt-2 text-blue-600">Get started by making your first sale.</p>
            </div>
          ) : (
            <>
              {/* Orders Table */}
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
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Qty
                        </th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Total Price
                        </th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-blue-100">
                      {currentOrders.map((order) => (
                        <motion.tr 
                          key={order.id} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-blue-50 transition-colors duration-150"
                        >
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 rounded-lg overflow-hidden border border-blue-100">
                                <img
                                  className="h-full w-full object-cover"
                                  src={order.productImage}
                                  alt={order.productName}
                                />
                              </div>
                              <div className="ml-2 sm:ml-4">
                                <div className="text-sm font-medium text-blue-900 truncate max-w-[120px] sm:max-w-none">{order.productName}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-900 truncate max-w-[80px] sm:max-w-none">{order.username}</div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-blue-800">{order.qty}</div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-blue-800">Rp {order.totalHarga}</div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-blue-600">
                              <Calendar className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className={`text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                order.status === "Completed" 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                              }`}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* PERBAIKAN: Pagination untuk tablet */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-2 space-y-3 sm:space-y-0">
                <div className="text-xs sm:text-sm text-blue-600">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredOrders.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredOrders.length}</span> results
                </div>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-lg border text-xs sm:text-sm ${
                      currentPage === 1
                        ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="hidden xs:inline">Previous</span>
                    <span className="xs:hidden">Prev</span>
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm ${
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
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-2 py-1 sm:px-3 sm:py-2 rounded-lg border text-xs sm:text-sm ${
                      currentPage === totalPages
                        ? "bg-blue-100 text-blue-400 cursor-not-allowed"
                        : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"
                    }`}
                  >
                    <span className="hidden xs:inline">Next</span>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
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

export default OrderList;