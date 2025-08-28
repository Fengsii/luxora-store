
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import { ProductProvider } from "./helper/ProductContext";

const App = () => {
  const role = localStorage.getItem("role");

  if (!role) return <Outlet />;

  return (
    <ProductProvider>
      {role === "user" ? (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ) : (
        <main className="flex h-screen">
          <aside className="w-64 bg-gray-800 text-white">
            <SideBar />
          </aside>
          <section className="flex-1 overflow-y-auto p-4">
            <Outlet />
          </section>
        </main>
      )}
    </ProductProvider>
  );
};

export default App;
