
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../helper/session";

const Payment = () => {
  const [products, setProducts] = useState([]); // array produk yang mau dibeli
  const [quantities, setQuantities] = useState({}); // jumlah beli per produk {id: qty}
  const [saldoUser, setSaldoUser] = useState(0);
  const navigate = useNavigate();

  // Ambil data product dari localStorage + saldo user login
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("buyProduct")) || [];

    // pastikan selalu array
    const arrProducts = Array.isArray(data) ? data : [data];
    setProducts(arrProducts);

    // set default qty = 1 untuk semua produk
    const defaultQty = {};
    arrProducts.forEach(p => {
      defaultQty[p.id] = 1;
    });
    setQuantities(defaultQty);

    // ambil saldo user
    const sessionUser = getSession();
    if (sessionUser) {
      const saldo = Number(localStorage.getItem(`saldo_${sessionUser.username}`)) || 0;
      setSaldoUser(saldo);
    }
  }, []);

  if (products.length === 0) return <p>Loading...</p>;

  // Hitung total harga semua produk
  const totalHarga = products.reduce((sum, p) => {
    const qty = quantities[p.id] || 1;
    return sum + p.price * qty;
  }, 0);

  // Update qty 1 produk
  const handleQtyChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: Number(value)
    });
  };

  // Fungsi ketika user klik "Buy Now"
  const handleBuy = () => {
    const sessionUser = getSession();
    if (!sessionUser) return alert("User belum login!");

    const keySaldo = `saldo_${sessionUser.username}`;
    const saldo = Number(localStorage.getItem(keySaldo)) || 0;

    // cek saldo cukup?
    if (totalHarga > saldo) {
      return alert("Saldo tidak mencukupi, silakan top up dulu!");
    }

    // validasi stok
    for (const p of products) {
      const qty = quantities[p.id] || 1;
      if (p.stok <= 0) {
        return alert(`Stok ${p.name} habis, tidak bisa membeli produk ini!`);
      }
      if (qty > p.stok) {
        return alert(`Jumlah beli ${p.name} melebihi stok tersedia!`);
      }
    }

    // kurangi saldo
    const sisaSaldo = saldo - totalHarga;
    localStorage.setItem(keySaldo, sisaSaldo);
    setSaldoUser(sisaSaldo);

    // simpan transaksi untuk semua produk
    const transaksi = JSON.parse(localStorage.getItem("transactions")) || [];
    products.forEach(p => {
      const qty = quantities[p.id] || 1;
      transaksi.push({
        id: Date.now() + p.id, // biar unik
        username: sessionUser.username,
        productId: p.id,
        productName: p.name,
        productImage: p.image_1 || p.image || p.productImage,
        qty,
        totalHarga: p.price * qty,
        status: "Processing",
        date: new Date().toISOString()
      });
    });
    localStorage.setItem("transactions", JSON.stringify(transaksi));

    alert("Pembelian berhasil, status: Processing!");
    navigate("/user/Product");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>
      <h3>Saldo Anda: Rp {saldoUser}</h3>

      {/* List produk */}
      {products.map(p => (
        <div key={p.id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <img 
            src={p.image_1 || p.image || p.productImage} 
            alt={p.name} 
            style={{ width: "150px", height: "150px", objectFit: "cover" }} 
          />
          <h3>{p.name}</h3>
          <p>Harga: Rp {p.price}</p>
          <p>Stok: {p.stok}</p>
          <div>
            <label>Jumlah beli: </label>
            <input
              type="number"
              min="1"
              max={p.stok}
              value={quantities[p.id] || 1}
              onChange={(e) => handleQtyChange(p.id, e.target.value)}
            />
          </div>
          <p>Subtotal: Rp {p.price * (quantities[p.id] || 1)}</p>
        </div>
      ))}

      <h2>Total Harga Semua: Rp {totalHarga}</h2>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: "10px" }}>
          Back
        </button>
        <button onClick={handleBuy}>Buy Now</button>
      </div>
    </div>
  );
};

export default Payment;

