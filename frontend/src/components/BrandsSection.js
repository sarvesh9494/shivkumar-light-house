// src/components/BrandsSection.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardMedia, CircularProgress } from "@mui/material";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ✅ Your original local brands — used as fallback if MongoDB is unreachable
const LOCAL_FALLBACK = [
  { id: 1, name: "Polycab",   image: "/brands/polycab-banner.jpg",   url: "/products", row: 1 },
  { id: 2, name: "Legrand",   image: "/brands/legrand-banner.jpg",   url: "/products", row: 1 },
  { id: 3, name: "GM",        image: "/brands/gm-banner.jpg",        url: "/products", row: 1 },
  { id: 4, name: "Goldmedal", image: "/brands/goldmedal-banner.jpg", url: "/products", row: 2 },
  { id: 5, name: "Vinay",     image: "/brands/vinay-banner.jpg",     url: "/products", row: 2 },
  { id: 6, name: "Racold",    image: "/brands/racold-banner.jpg",    url: "/products", row: 2 },
  { id: 7, name: "Usha",      image: "/brands/usha-banner.jpg",      url: "/products", row: 2 },
];

const BrandsSection = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/api/config/brands`)
      .then((res) => {
        // Only show brands toggled ON in admin, with a valid image
        const active = (res.data?.value || []).filter((b) => b.active && b.image);
        setBrands(active.length > 0 ? active : LOCAL_FALLBACK);
      })
      .catch(() => setBrands(LOCAL_FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const row1 = brands.filter((b) => b.row === 1);
  const row2 = brands.filter((b) => b.row === 2);

  // ✅ Exact same outer wrapper as your original BrandsSection
  return (
    <Box sx={{
      width: "100vw",
      mx: "-50vw",
      position: "relative",
      left: "50%",
      py: 4,
      px: 2,
      backgroundColor: "#f5f5f5",
    }}>
      <Typography variant="h5" fontWeight="bold" mb={4} ml={2}>
        Available Brands
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress sx={{ color: "#c72026" }} />
        </Box>
      ) : (
        <>
          {/* ✅ First Row: 3 columns — exact same as your original */}
          {row1.length > 0 && (
            <Grid container spacing={3} sx={{ pl: 2 }}>
              {row1.map((brand, idx) => (
                <Grid item xs={12} sm={4} key={brand.id || idx}>
                  <Card
                    onClick={() => (window.location.href = brand.url || "/products")}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="280"               // ✅ your original height
                      image={brand.image}
                      alt={brand.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/800x280?text=${brand.name}`;
                      }}
                      sx={{ objectFit: "cover", width: "100%" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ✅ Second Row: 5 columns — exact same as your original */}
          {row2.length > 0 && (
            <Grid container spacing={3} mt={2} sx={{ pl: 2 }}>
              {row2.map((brand, idx) => (
                <Grid item xs={12} sm={6} md={2.4} key={brand.id || idx}>
                  <Card
                    onClick={() => (window.location.href = brand.url || "/products")}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"               // ✅ your original height
                      image={brand.image}
                      alt={brand.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x180?text=${brand.name}`;
                      }}
                      sx={{ objectFit: "cover", width: "100%" }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default BrandsSection;