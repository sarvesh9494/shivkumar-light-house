// src/pages/ProductsPage.js
import React, { useEffect, useState } from "react";
import {
  Container, Typography, Grid, Card, CardMedia,
  CardContent, Button, Box, TextField, Rating, Chip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
const WA = "919503423737";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Read search from URL query e.g. /products?search=fan
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearchTerm(q);
  }, [location.search]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get(`${API}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error loading products", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByCategory = filteredProducts.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: 5, minHeight: "100vh" }}>
      <Container>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="#1a1a2e">
          Our Products
        </Typography>

        {/* Search bar */}
        <Box mb={4}>
          <TextField
            fullWidth
            label="Search products..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#c72026" },
                "&.Mui-focused fieldset": { borderColor: "#c72026" },
                borderRadius: "10px",
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#c72026" },
            }}
          />
        </Box>

        {/* Loading state */}
        {loading && (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary" fontSize={18}>
              Loading products...
            </Typography>
          </Box>
        )}

        {/* No results */}
        {!loading && filteredProducts.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography fontSize={48}>😕</Typography>
            <Typography variant="h6" color="text.secondary" mt={1}>
              No products found for "{searchTerm}"
            </Typography>
            <Button
              onClick={() => setSearchTerm("")}
              sx={{ mt: 2, color: "#c72026", fontWeight: 700 }}>
              Clear Search
            </Button>
          </Box>
        )}

        {/* Products grouped by category */}
        {Object.keys(groupedByCategory).map((category) => (
          <Box key={category} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#1a1a2e"
              sx={{
                mb: 3,
                borderBottom: "3px solid #c72026",
                display: "inline-block",
                pb: 0.5,
              }}>
              {category}
            </Typography>
            <Grid container spacing={3}>
              {groupedByCategory[category].map((product) => {
                const mrp = product.mrp || null;
                const price = product.price || 0;
                const discount = mrp && mrp > price
                  ? Math.round(((mrp - price) / mrp) * 100) : null;
                const isNew = product.createdAt
                  ? (Date.now() - new Date(product.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000
                  : false;
                const waMessage = encodeURIComponent(
                  `Hi! I'm interested in *${product.name}* (₹${price.toLocaleString()}). Please share details.`
                );

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <Card sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      transition: "0.25s",
                      position: "relative",
                      "&:hover": {
                        boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
                        transform: "translateY(-4px)",
                      },
                    }}>

                      {/* Badges */}
                      <Box sx={{ position: "absolute", top: 10, left: 10, zIndex: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {isNew && (
                          <Chip label="NEW" size="small"
                            sx={{ background: "#1565c0", color: "#fff", fontWeight: 800, fontSize: 10, height: 20 }} />
                        )}
                        {discount && (
                          <Chip label={`${discount}% OFF`} size="small"
                            sx={{ background: "#c72026", color: "#fff", fontWeight: 800, fontSize: 10, height: 20 }} />
                        )}
                      </Box>

                      {/* Image */}
                      <Box
                        onClick={() => navigate(`/product/${product._id}`)}
                        sx={{ cursor: "pointer", background: "#f9f9f9" }}>
                        <CardMedia
                          component="img"
                          image={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
                          alt={product.name}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
                          sx={{ height: 200, objectFit: "contain", p: 1.5 }}
                        />
                      </Box>

                      <CardContent sx={{ flex: 1, pb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold"
                          sx={{ cursor: "pointer", "&:hover": { color: "#c72026" } }}
                          onClick={() => navigate(`/product/${product._id}`)}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"
                          sx={{ height: 40, overflow: "hidden", mt: 0.5 }}>
                          {product.description || ""}
                        </Typography>

                        {/* Price */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, flexWrap: "wrap" }}>
                          <Typography variant="h6" fontWeight={900} color="#c72026">
                            ₹{price.toLocaleString()}
                          </Typography>
                          {mrp && mrp > price && (
                            <Typography variant="body2" color="#999"
                              sx={{ textDecoration: "line-through" }}>
                              ₹{mrp.toLocaleString()}
                            </Typography>
                          )}
                        </Box>

                        <Rating value={product.rating || 4} readOnly size="small" sx={{ mt: 0.5 }} />
                        <Typography variant="body2" color={product.stock > 0 ? "green" : "red"} fontWeight={600}>
                          {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
                        </Typography>
                      </CardContent>

                      {/* Buttons */}
                      <Box sx={{ p: 1.5, pt: 0, display: "flex", gap: 1 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          size="small"
                          onClick={() => navigate(`/product/${product._id}`)}
                          sx={{
                            background: "#c72026", borderRadius: "8px",
                            fontWeight: 700, fontSize: 12,
                            "&:hover": { background: "#a51a1a" },
                          }}>
                          View
                        </Button>
                        <Button
                          component="a"
                          href={`https://wa.me/${WA}?text=${waMessage}`}
                          target="_blank"
                          variant="outlined"
                          size="small"
                          sx={{
                            borderColor: "#25D366", color: "#25D366",
                            borderRadius: "8px", minWidth: 36, px: 1, fontSize: 16,
                            "&:hover": { background: "#f0fff4" },
                          }}>
                          💬
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default ProductsPage;