// src/App.js
// ── Add this route to your existing App.js ──────────────────────────────────
// Just copy-paste the import and the <Route> line below into your existing App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import CategoryProductsPage from "./pages/CategoryProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// ── NEW: Import Admin Page ──
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      {/* Hide Navbar on /admin if you want a standalone admin experience */}
      <Routes>
        {/* ── ADMIN ROUTE (no Navbar/Footer for clean panel look) ── */}
        <Route path="/admin" element={<AdminPage />} />

        {/* ── PUBLIC ROUTES ── */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/category-products/:category" element={<CategoryProductsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;