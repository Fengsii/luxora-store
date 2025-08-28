// src/pages/users/LikeList.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../helper/session"; // helper session yang sudah kamu punya
import { ProductContext } from "../../helper/ProductContext"; // optional: untuk update like count di header

const LikeList = () => {
  const navigate = useNavigate();

  // Ambil setter likeCount dari context jika ada, agar header ikut update saat hapus
  const ctx = useContext(ProductContext) || {};
  const { setLikeCount = () => {} } = ctx;

  // State lokal
  const [user, setUser] = useState(null); // user yang sedang login (dari session)
  const [liked, setLiked] = useState([]); // array produk yang di-like oleh user

  // Helper: dapatkan URL gambar yang valid (full URL). Jika path relative, tambahkan base URL API.
  const getImageSrc = (p) => {
    const img = p.image_1 || p.image || p.productImage; // cek beberapa kemungkinan nama field
    if (!img) return ""; // tidak ada gambar
    return img.toString().startsWith("http")
      ? img.toString()
      : `https://api-sepokat.vercel.app/${img.toString()}`; // tambahkan base jika path relative
  };

  // Ambil liked products saat komponen mount
  useEffect(() => {
    const sessionUser = getSession(); // ambil user dari session helper
    if (!sessionUser) {
      setUser(null);
      setLiked([]);
      return;
    }
    setUser(sessionUser);

    // key di localStorage: likedProducts_{username}
    const key = `likedProducts_${sessionUser.username}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];

    setLiked(Array.isArray(data) ? data : []);
    // update header count jika ada context
    setLikeCount(Array.isArray(data) ? data.length : 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // hanya sekali saat mount

  // Hapus 1 produk dari liked list (di localStorage & state)
  const handleRemove = (productId) => {
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    if (!confirm("Hapus produk ini dari favorit?")) return;

    const key = `likedProducts_${user.username}`;
    const current = JSON.parse(localStorage.getItem(key)) || [];

    // filter produk yang bukan id ini
    const updated = current.filter((p) => p.id != productId); // loose compare agar aman string/number
    localStorage.setItem(key, JSON.stringify(updated));
    setLiked(updated);

    // update header count juga
    setLikeCount(updated.length);
  };

  // Fungsi Buy - sama seperti di Product.jsx
  const handleBuy = (product) => {
    // Simpan hanya data yg dibutuhkan di buyProduct -> Payment.jsx akan membacanya
    const productData = {
      id: product.id,
      name: product.name || product.productName,
      price: product.price || product.productPrice,
      image_1: product.image_1 || product.image || product.productImage,
      stok: product.stok ?? product.stock ?? 0,
    };
    localStorage.setItem("buyProduct", JSON.stringify(productData));
    navigate("/user/payment");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Favorite</h1>

      {/* Jika belum login beri pesan */}
      {!user ? (
        <p>Silakan login untuk melihat daftar favorit Anda.</p>
      ) : liked.length === 0 ? (
        // Jika array liked kosong
        <p>Belum ada produk favorit.</p>
      ) : (
        // Tampilkan grid produk yang disukai
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {liked.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "220px",
                textAlign: "center",
                borderRadius: 8,
              }}
            >
              {/* Gambar produk (menggunakan helper untuk memastikan URL valid) */}
              <img
                src={getImageSrc(p)}
                alt={p.name || p.productName}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />

              {/* Nama / Harga / Stok */}
              <h3 style={{ margin: "8px 0" }}>{p.name || p.productName}</h3>
              <p>Rp {p.price || p.productPrice}</p>
              <p>Stok: {p.stok ?? p.stock ?? "-"}</p>

              {/* Tombol: Buy (sama seperti Product.jsx) dan Hapus dari Favorite */}
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 10 }}>
                <button onClick={() => handleBuy(p)} disabled={(p.stok ?? p.stock ?? 0) <= 0}>
                  🛒 Buy
                </button>

                <button onClick={() => handleRemove(p.id)} style={{ background: "#f87171", color: "#fff" }}>
                  🗑️ Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikeList;
