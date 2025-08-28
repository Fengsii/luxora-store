// helper/session.js

// Simpan user ke session
export const setSession = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

// Ambil user dari session
export const getSession = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Hapus session
export const clearSession = () => {
  sessionStorage.removeItem("user");
};
