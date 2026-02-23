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
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
        <Route path="/products" element={<><Navbar /><ProductsPage /><Footer /></>} />
        <Route path="/product/:id" element={<><Navbar /><ProductDetailsPage /><Footer /></>} />
        <Route path="/category/:category" element={<><Navbar /><CategoryPage /><Footer /></>} />
        <Route path="/category-products/:category" element={<><Navbar /><CategoryProductsPage /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><LoginPage /><Footer /></>} />
        <Route path="/register" element={<><Navbar /><RegisterPage /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><AboutPage /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;