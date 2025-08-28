
import React, { useState, useEffect } from "react";

const OrderList = () => {
  const [orders, setOrders] = useState([]); // state untuk simpan semua transaksi
  const [search, setSearch] = useState(""); // state untuk kata kunci pencarian
  const [currentPage, setCurrentPage] = useState(1); // state untuk halaman aktif

  const itemsPerPage = 10; // jumlah data per halaman

  // 🔹 Ambil semua transaksi dari localStorage saat halaman pertama kali dibuka
  useEffect(() => {
    const transaksi = JSON.parse(localStorage.getItem("transactions")) || [];
    setOrders(transaksi); // simpan ke state orders
  }, []);

  // 🔹 Fungsi untuk ubah status transaksi
  const handleStatusChange = (id, newStatus) => {
    // copy semua order yang ada
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );

    // update state biar tampilan ikut berubah
    setOrders(updatedOrders);

    // simpan balik ke localStorage supaya data tidak hilang
    localStorage.setItem("transactions", JSON.stringify(updatedOrders));
  };

  // 🔹 Filtering berdasarkan pencarian
  const filteredOrders = orders.filter(
    (order) =>
      order.productName.toLowerCase().includes(search.toLowerCase()) || // cari berdasarkan nama produk
      order.username.toLowerCase().includes(search.toLowerCase()) // atau nama user
  );

  // 🔹 Hitung index data untuk pagination
  const indexOfLastItem = currentPage * itemsPerPage; // index data terakhir di halaman ini
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // index data pertama di halaman ini
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem); // data yang ditampilkan

  // 🔹 Hitung total halaman
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Order List</h1>

      {/* 🔹 Input pencarian */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Cari berdasarkan user atau produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "5px", width: "300px" }}
        />
      </div>

      {/* Jika tidak ada transaksi */}
      {filteredOrders.length === 0 ? (
        <p>Belum ada transaksi.</p>
      ) : (
        <>
          {/* Tabel order */}
          <table
            border="1"
            cellPadding="10"
            style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}
          >
            <thead>
              <tr>
                <th>Gambar Produk</th>
                <th>Nama User</th>
                <th>Produk</th>
                <th>Jumlah</th>
                <th>Total Harga</th>
                <th>Tanggal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  {/* Gambar produk */}
                  <td>
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      width="80"
                    />
                  </td>

                  {/* Nama user pembeli */}
                  <td>{order.username}</td>

                  {/* Nama produk */}
                  <td>{order.productName}</td>

                  {/* Jumlah produk yang dibeli */}
                  <td>{order.qty}</td>

                  {/* Total harga */}
                  <td>Rp {order.totalHarga}</td>

                  {/* Tanggal transaksi */}
                  <td>{new Date(order.date).toLocaleString()}</td>

                  {/* Dropdown untuk ubah status */}
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔹 Navigasi Pagination */}
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
  );
};

export default OrderList;

