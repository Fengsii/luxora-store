
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import DashboardAdmin from './pages/admin/DashboardAdmin.jsx';
import Home from './pages/users/Home.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx'; // import
import ProductList from './pages/admin/ProductList.jsx';
import OrderList from './pages/admin/OrderList.jsx';
import UserList from './pages/admin/UserList.jsx';
import Product from "./pages/users/Product.jsx";
import { ProductProvider } from './helper/ProductContext'; // import context
import Payment from './pages/users/Payment.jsx';
import Profile from './pages/users/Profile.jsx';
import LikeList from './pages/users/LikeList.jsx';
import ChartList from './pages/users/ChartList.jsx';

const router = createBrowserRouter([

  {
    path : "/",
    element : <App />,
    children : [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },

  {
  path: "/admin",
  element: <ProtectedRoute role="admin" />,
  children: [
    { index: true, element: <DashboardAdmin /> }, // default ketika /admin
    { path: "Dashboard", element: <DashboardAdmin /> },
    { path: "ProductList", element: <ProductList /> },
    { path: "OrderList", element: <OrderList /> },
    { path: "UserList", element: <UserList /> },
  ],
},
{
  path: "/user",
  element: <ProtectedRoute role="user" />,
  children: [
    { index: true, element: <Home /> }, // default ketika /user
    { path: "Home", element: <Home /> },
    { path: "Product", element: <Product /> },
    { path: "Payment", element: <Payment /> },
    { path: "Profile", element: <Profile /> },
    { path: "LikeList", element: <LikeList />},
    { path: "ChartList", element: <ChartList />},
  ],
},

    ]
  }

]);


createRoot(document.getElementById('root')).render(
   <StrictMode>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </StrictMode>,
)










