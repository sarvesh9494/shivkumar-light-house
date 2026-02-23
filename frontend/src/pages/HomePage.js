// src/pages/HomePage.js
import React from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import CategoryIconsSection from "../components/CategoryIconsSection";
import BrandsSection from "../components/BrandsSection";

function HomePage() {
  const navigate = useNavigate();

  // ✅ Categories no longer hardcoded here — CategoryIconsSection fetches from MongoDB
  // ✅ If MongoDB has no data, components fall back to your original local images automatically

  const handleCategoryClick = () => {
    navigate("/products");
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5" }}>

      {/* Hero slider — now reads from MongoDB, falls back to /images/banner1.jpg etc. */}
      <HeroSection />

      {/* Category icons row */}
      <Box sx={{
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        ml: "-50vw",
        mr: "-50vw",
        px: 2,
        mt: 4,
      }}>
        <Typography variant="h5" sx={{
          fontWeight: "bold",
          borderBottom: "3px solid #c72026",
          display: "inline-block",
          mb: 2,
          px: 2,
        }}>
          <Link to="/products" style={{ textDecoration: "none", color: "#000" }}>
            Shop By Category
          </Link>
        </Typography>

        {/* ✅ Still passes onClickCategory — component now self-fetches categories from MongoDB */}
        <CategoryIconsSection onClickCategory={handleCategoryClick} />
      </Box>

      {/* Brands section — now reads from MongoDB, falls back to /brands/polycab-banner.jpg etc. */}
      <BrandsSection />

    </Box>
  );
}

export default HomePage;