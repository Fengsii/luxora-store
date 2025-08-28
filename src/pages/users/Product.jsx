
import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../helper/ProductContext"; 
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { search, setLikeCount, setSaveCount, filter, sort, username } = useContext(ProductContext);
  const [products, setProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 20; 
  const navigate = useNavigate();

  // Ambil data product dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api-sepokat.vercel.app/api/product/get-all");
        const data = await res.json();

        // 🔹 Ambil semua transaksi dari localStorage
        const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

        // 🔹 Loop semua produk lalu cek apakah pernah dibeli di transactions
        const merged = data.map(p => {
          // Cari semua transaksi produk ini
          const trans = transactions.filter(t => t.productId == p.id);

          // Hitung total qty yang sudah dibeli dari transaksi
          const totalQty = trans.reduce((sum, t) => sum + t.qty, 0);

          // Kurangi stok produk
          const newStok = p.stok - totalQty;

          return {
            ...p,
            stok: newStok < 0 ? 0 : newStok // stok jangan minus
          };
        });

        setProducts(merged);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Filter + Sorting
  let filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => {
      if (filter === "all") return true;
      if (filter === "mens") return p.name.slice(-1).toLowerCase() === "n";
      if (filter === "womens") return p.name.slice(-1).toLowerCase() === "w";
      return true;
    });

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);

  // Pagination
  const indexOfLast = currentPage * itemsPerPage; 
  const indexOfFirst = indexOfLast - itemsPerPage; 
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast); 
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Fungsi Like
  const handleLike = (product) => {
    if (!username) return;
    const key = `likedProducts_${username}`;
    const liked = JSON.parse(localStorage.getItem(key)) || [];
    if (!liked.find(p => p.id === product.id)) liked.push(product);
    localStorage.setItem(key, JSON.stringify(liked));
    setLikeCount(liked.length);
  };

  // Fungsi Save
  const handleSave = (product) => {
    if (!username) return;
    const key = `savedProducts_${username}`;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    if (!saved.find(p => p.id === product.id)) saved.push(product);
    localStorage.setItem(key, JSON.stringify(saved));
    setSaveCount(saved.length);
  };

  // Fungsi Buy
  const handleBuy = (product) => {
     // Simpan hanya data yang diperlukan untuk payment
  const productData = {
    id: product.id,
    name: product.name,
    price: product.price,
    image_1: product.image_1, // Pastikan property ini benar
    stok: product.stok
  };
  
  localStorage.setItem("buyProduct", JSON.stringify(productData));
  navigate("/user/payment");

  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Produk</h1>

      {/* List Produk */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {currentProducts.map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: "10px", width: "220px", textAlign: "center" }}>
            <img src={p.image_1} alt={p.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{p.name}</h3>
            <p>Rp {p.price}</p>
            {/* 🔹 Stok sudah otomatis berkurang berdasarkan transaksi */}
            <p>Stok: {p.stok}</p>

            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
              <button onClick={() => handleLike(p)}>❤️ Like</button>
              <button onClick={() => handleSave(p)}>💾 Save</button>
              <button disabled={p.stok <= 0} onClick={() => handleBuy(p)}>🛒 Buy</button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
        <span style={{ margin: "0 10px" }}>Halaman {currentPage} dari {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Product;

