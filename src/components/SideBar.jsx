
import { useNavigate, useLocation } from "react-router-dom";
import { clearSession } from "../helper/session";
import { LayoutDashboard, PackageSearch, Logs, CircleUser, LogOut, Handbag } from "lucide-react";
import { useState, useEffect } from "react";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    clearSession();
    window.location.reload();
    navigate("/");
  };

  const menus = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin/Dashboard" },
    { label: "Product List", icon: <PackageSearch size={20} />, path: "/admin/ProductList" },
    { label: "Order List", icon: <Logs size={20} />, path: "/admin/OrderList" },
    { label: "User List", icon: <CircleUser size={20} />, path: "/admin/UserList" },
  ];


  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-50 to-white border-r border-blue-100 text-gray-800 p-5 flex flex-col justify-between transition-all duration-500 ease-in-out shadow-lg sticky top-0 left-0">
      {/* Header Section */}
      <div>
        <div className="flex items-center gap-3 mb-10 px-4 py-4 rounded-xl bg-white shadow-md transform transition-transform duration-300 hover:scale-105">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md">
            <Handbag className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-800 tracking-tight">LUXORA</h1>
            <h2 className="text-sm font-semibold text-blue-600 tracking-wide">STORE</h2>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2">
          {menus.map((menu, index) => {
            const isActive = activeTab === menu.path;
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveTab(menu.path);
                  navigate(menu.path);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-in-out transform hover:translate-x-2 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "bg-white text-gray-600 shadow-sm hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <div className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                  {menu.icon}
                </div>
                <span className="font-medium">{menu.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl bg-white text-gray-600 shadow-sm hover:bg-red-50 hover:text-red-600 border border-gray-100 hover:border-red-200 transition-all duration-300 ease-in-out transform hover:translate-x-1 hover:shadow-md"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;