import { Route, Routes } from "react-router-dom";
import { HomePage, ProductList } from "../Pages";
import React from 'react'
import ProductDetails from "../Pages/ProductDetails";
import CartPage from "../Pages/Cart/CartPage";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import OrderPage from "../Pages/Order/OrderPage";
import Dashboardpage from "../Pages/Dashboard/Dashboardpage";
import AdminPage from "../Pages/Admin/AdminPage";
import AdminProtectedRoute from "./AdminProtectedRoute";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="products/:id" element={<ProductDetails/>}/>
        <Route path="cart" element={<CartPage/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="order-summary" element={<OrderPage/>}/>
        <Route path="dashboard" element={<Dashboardpage/>}/>
        <Route path="admin" element={
          <AdminProtectedRoute>
            <AdminPage/>
          </AdminProtectedRoute>
        }/>
      </Routes>
    </>
  )
}

