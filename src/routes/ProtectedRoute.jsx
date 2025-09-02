import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../helper/session";

const ProtectedRoute = ({ role }) => {
  const user = getSession();
 

  if (!user) {
    return <Navigate to="/" replace />; // kalau belum login balik ke login
  }

  if (role === "admin" && user.id !== "1") {
    return <Navigate to="/user" replace />; // kalau bukan admin balikin ke home
  }

  if (role === "user" && user.id === "1") {
    return <Navigate to="/admin" replace />; // kalau admin jangan ke user
  }

  return <Outlet />;
};

export default ProtectedRoute;
