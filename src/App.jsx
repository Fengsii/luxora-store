import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { ProductProvider } from "./helper/ProductContext";
import { Menu } from "lucide-react"; // Import ikon Menu dari Lucide React
import { getSession } from "./helper/session";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const user = getSession(); 
  const role = user?.role; // ambil role dari session
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Effect untuk menutup sidebar ketika resize ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!role) return <Outlet />;

  return (
    
    <ProductProvider>
      {role === "user" ? (
        <>
          <ScrollToTop/>
          <Header />
          <Outlet />
          <Footer />
        </>
      ) : (
        <div className="flex flex-col md:flex-row h-screen">
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-opacity-50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <aside className={`fixed md:static w-64 text-white h-full md:h-screen transform transition-transform duration-300 z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <SideBar 
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          </aside>
          
          <section className="flex-1 overflow-y-auto p-4 w-full">
            <button 
              className="md:hidden mb-4 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 transition-colors duration-200 shadow-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
              <span className="text-sm font-medium">Buka Menu</span>
            </button>
            <Outlet />
          </section>
        </div>
      )}
    </ProductProvider>
  );
};

export default App;
