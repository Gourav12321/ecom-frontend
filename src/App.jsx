import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Layout Components
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Page Components
import Home from "./Pages/User/Home";
import Profile from "./Pages/User/Profile";
import Signin from "./Pages/User/Signin";
import Signup from "./Pages/User/Signup";
import VerifyEmail from "./Pages/User/VerifyEmail";
import SetupPassword from "./Pages/User/SetupPassword";
import AddressForm from "./Pages/User/AddressForm";

// Admin Components
import Admin from "./Pages/Admin/Admin";
import AllUsers from "./Pages/Admin/AllUsers";
import AllProduct from "./Pages/Admin/AllProduct";
import UploadProduct from "./Pages/Admin/UploadProduct";
import CreateCategory from "./Pages/Admin/CreateCategory";
import AdminBannerProduct from "./Pages/Admin/AdminBannerProduct";
import AdminOrderPage from "./Pages/Admin/AdminOrderPage";
import Dashboard from "./Pages/Admin/Dashboard";

// Product Components
import ProductPage from "./Pages/Product/ProductPage";
import ProductCategory from "./Pages/Product/ProductCategory";
import CartPage from "./Pages/Product/CartPage";
import OrderPage from "./Pages/Product/OrderPage";
import OrderHistory from "./Pages/Product/OrderHistory";
import PaymentPage from "./Pages/Product/PaymentPage";
import Wishlist from "./Pages/Product/Wishlist";

// Protected Route Component
import AdminRoute from "./components/common/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Authentication Routes */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/setup-password" element={<SetupPassword />} />

        {/* User Routes */}
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />
        <Route
          path="/address"
          element={
            <MainLayout>
              <AddressForm />
            </MainLayout>
          }
        />

        {/* Product Routes */}
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />
        <Route
          path="/product-category"
          element={
            <MainLayout>
              <ProductCategory />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <MainLayout>
              <OrderPage />
            </MainLayout>
          }
        />
        <Route
          path="/payment"
          element={
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          }
        />
        <Route
          path="/orders-history"
          element={
            <MainLayout>
              <OrderHistory />
            </MainLayout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <Wishlist />
            </MainLayout>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-products" element={<AllProduct />} />
          <Route path="upload-product" element={<UploadProduct />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="banner-product" element={<AdminBannerProduct />} />
          <Route path="admin-order" element={<AdminOrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
