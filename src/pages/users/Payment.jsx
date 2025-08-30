import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../../helper/session";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ShoppingCart, Wallet, CheckCircle, 
  AlertCircle, Plus, Minus, Package, CreditCard 
} from "lucide-react";

const Payment = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [saldoUser, setSaldoUser] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("buyProduct")) || [];
    const arrProducts = Array.isArray(data) ? data : [data];
    setProducts(arrProducts);

    const defaultQty = {};
    arrProducts.forEach(p => {
      defaultQty[p.id] = 1;
    });
    setQuantities(defaultQty);

    const sessionUser = getSession();
    if (sessionUser) {
      const saldo = Number(localStorage.getItem(`saldo_${sessionUser.username}`)) || 0;
      setSaldoUser(saldo);
    }
  }, []);

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat produk...</p>
        </div>
      </div>
    );
  }

  const totalHarga = products.reduce((sum, p) => {
    const qty = quantities[p.id] || 1;
    return sum + p.price * qty;
  }, 0);

  const handleQtyChange = (id, value) => {
    const numValue = Math.max(1, Math.min(products.find(p => p.id === id)?.stok || 1, Number(value)));
    setQuantities({
      ...quantities,
      [id]: numValue
    });
  };

  const incrementQty = (id) => {
    const currentQty = quantities[id] || 1;
    const maxStock = products.find(p => p.id === id)?.stok || 1;
    if (currentQty < maxStock) {
      handleQtyChange(id, currentQty + 1);
    }
  };

  const decrementQty = (id) => {
    const currentQty = quantities[id] || 1;
    if (currentQty > 1) {
      handleQtyChange(id, currentQty - 1);
    }
  };

  const handleBuy = () => {
    const sessionUser = getSession();
    if (!sessionUser) {
      setErrorMessage("User belum login!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const keySaldo = `saldo_${sessionUser.username}`;
    const saldo = Number(localStorage.getItem(keySaldo)) || 0;

    if (totalHarga > saldo) {
      setErrorMessage("Saldo tidak mencukupi, silakan top up dulu!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    for (const p of products) {
      const qty = quantities[p.id] || 1;
      if (p.stok <= 0) {
        setErrorMessage(`Stok ${p.name} habis!`);
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }
      if (qty > p.stok) {
        setErrorMessage(`Jumlah beli ${p.name} melebihi stok tersedia!`);
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }
    }

    const sisaSaldo = saldo - totalHarga;
    localStorage.setItem(keySaldo, sisaSaldo);
    setSaldoUser(sisaSaldo);

    const transaksi = JSON.parse(localStorage.getItem("transactions")) || [];
    products.forEach(p => {
      const qty = quantities[p.id] || 1;
      transaksi.push({
        id: Date.now() + p.id,
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

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/user/Product");
    }, 2000);
  };

  // Animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div 
          className="flex items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-white rounded-lg shadow-md mr-4 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={24} className="text-blue-600" />
          </motion.button>
          <h1 className="text-3xl font-bold text-blue-900">Checkout</h1>
        </motion.div>

        {/* Saldo Info */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-md mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet size={24} className="text-blue-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Saldo Anda</h3>
                <p className="text-2xl font-bold text-blue-600">
                  Rp {saldoUser.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            {totalHarga > saldoUser && (
              <div className="bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center">
                <AlertCircle size={16} className="mr-2" />
                <span className="text-sm">Saldo tidak mencukupi</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Products List */}
        <motion.div 
          className="space-y-6 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Produk yang Dibeli</h2>
          {products.map((p, index) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={p.image_1 || p.image || p.productImage} 
                    alt={p.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{p.name}</h3>
                  <p className="text-blue-600 font-bold text-xl mb-4">
                    Rp {p.price.toLocaleString('id-ID')}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center">
                      <Package size={16} className="text-gray-500 mr-2" />
                      <span className={`text-sm ${p.stok <= 5 ? 'text-red-500' : 'text-green-600'}`}>
                        Stok: {p.stok}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Jumlah:</label>
                      <div className="flex items-center">
                        <motion.button
                          onClick={() => decrementQty(p.id)}
                          disabled={quantities[p.id] <= 1}
                          whileTap={{ scale: 0.9 }}
                          className={`p-1 rounded-lg border ${
                            quantities[p.id] <= 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          <Minus size={16} />
                        </motion.button>
                        <input
                          type="number"
                          min="1"
                          max={p.stok}
                          value={quantities[p.id] || 1}
                          onChange={(e) => handleQtyChange(p.id, e.target.value)}
                          className="w-16 text-center mx-2 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <motion.button
                          onClick={() => incrementQty(p.id)}
                          disabled={quantities[p.id] >= p.stok}
                          whileTap={{ scale: 0.9 }}
                          className={`p-1 rounded-lg border ${
                            quantities[p.id] >= p.stok
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          }`}
                        >
                          <Plus size={16} />
                        </motion.button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">Subtotal:</p>
                      <p className="text-lg font-bold text-blue-600">
                        Rp {(p.price * (quantities[p.id] || 1)).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Total Summary */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-md mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Pembayaran</h3>
              <p className="text-sm text-gray-600">{products.length} produk</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              Rp {totalHarga.toLocaleString('id-ID')}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Kembali
          </motion.button>
          
          <motion.button
            onClick={handleBuy}
            disabled={totalHarga > saldoUser}
            whileHover={{ scale: totalHarga <= saldoUser ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
              totalHarga > saldoUser
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            }`}
          >
            <CreditCard size={20} className="mr-2" />
            Bayar Sekarang
          </motion.button>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-4 right-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center"
            >
              <AlertCircle size={20} className="mr-2" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccess && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-xl p-8 text-center shadow-2xl border-2 border-green-200 max-w-sm mx-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Pembelian Berhasil!</h3>
                <p className="text-gray-600 mb-4">Status: Processing</p>
                <p className="text-sm text-gray-500">Mengarahkan ke halaman produk...</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Payment;