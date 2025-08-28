// ChartList.jsx
import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../../helper/ProductContext";
import { useNavigate } from "react-router-dom";

const ChartList = () => {
  const { username } = useContext(ProductContext); 
  const [savedProducts, setSavedProducts] = useState([]); // state untuk produk yg disimpan
  const [selected, setSelected] = useState([]); // state untuk produk yg dipilih
  const navigate = useNavigate();

  // 🔹 Load produk dari localStorage berdasarkan username yg login
  useEffect(() => {
    if (!username) return;
    const key = `savedProducts_${username}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];
    setSavedProducts(data);
  }, [username]);

  // 🔹 Fungsi hapus produk dari saved list
  const handleDelete = (id) => {
    const key = `savedProducts_${username}`;
    const newData = savedProducts.filter(p => p.id !== id);
    localStorage.setItem(key, JSON.stringify(newData));
    setSavedProducts(newData);
  };

  // 🔹 Fungsi Buy 1 produk (sama seperti di Product.jsx)
  const handleBuy = (product) => {
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      image_1: product.image_1,
      stok: product.stok
    };
    localStorage.setItem("buyProduct", JSON.stringify([productData])); // pake array biar konsisten
    navigate("/user/payment");
  };

  // 🔹 Fungsi pilih/deselect produk (untuk multiple buy)
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id)); // kalau sudah dipilih → hapus dari list selected
    } else {
      setSelected([...selected, id]); // kalau belum dipilih → tambahkan ke list selected
    }
  };

  // 🔹 Fungsi select all
  const handleSelectAll = () => {
    if (selected.length === savedProducts.length) {
      setSelected([]); // kalau semua sudah dipilih → deselect semua
    } else {
      setSelected(savedProducts.map(p => p.id)); // pilih semua produk
    }
  };

  // 🔹 Fungsi Buy banyak produk (selected)
  const handleBuySelected = () => {
    const toBuy = savedProducts.filter(p => selected.includes(p.id));
    if (toBuy.length === 0) return;
    localStorage.setItem("buyProduct", JSON.stringify(toBuy));
    navigate("/user/payment");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {/* Tombol select all + buy selected */}
      {savedProducts.length > 0 && (
        <div style={{ marginBottom: "15px" }}>
          <button onClick={handleSelectAll}>
            {selected.length === savedProducts.length ? "Deselect All" : "Select All"}
          </button>
          <button 
            onClick={handleBuySelected} 
            disabled={selected.length === 0} 
            style={{ marginLeft: "10px" }}
          >
            Buy Selected ({selected.length})
          </button>
        </div>
      )}

      {/* List produk */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {savedProducts.map(p => (
          <div 
            key={p.id} 
            style={{ 
              border: selected.includes(p.id) ? "2px solid blue" : "1px solid #ccc",
              padding: "10px", 
              width: "220px", 
              textAlign: "center" 
            }}
          >
            <input 
              type="checkbox" 
              checked={selected.includes(p.id)} 
              onChange={() => toggleSelect(p.id)} 
            />
            <img src={p.image_1} alt={p.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{p.name}</h3>
            <p>Rp {p.price}</p>
            <p>Stok: {p.stok}</p>

            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
              <button onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
              <button disabled={p.stok <= 0} onClick={() => handleBuy(p)}>🛒 Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartList;
