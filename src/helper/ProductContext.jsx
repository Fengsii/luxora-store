
import React, { createContext, useState, useEffect } from "react";

// Buat context untuk sharing state global
// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [likeCount, setLikeCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  const [username, setUsername] = useState(""); // simpan username login

  // Ambil data user login dari session saat pertama kali
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setUsername(JSON.parse(user).username);
    }
  }, []);

  // Ambil like & save count dari localStorage berdasarkan user
  useEffect(() => {
    if (!username) return;
    
    const liked = JSON.parse(localStorage.getItem(`likedProducts_${username}`)) || [];
    const saved = JSON.parse(localStorage.getItem(`savedProducts_${username}`)) || [];
    setLikeCount(liked.length);
    setSaveCount(saved.length);
  }, [username]);

  return (
    <ProductContext.Provider value={{
      search, setSearch,
      filter, setFilter,
      sort, setSort,
      likeCount, setLikeCount,
      saveCount, setSaveCount,
      username
    }}>
      {children}
    </ProductContext.Provider>
  );
};
