// src/pages/ProductsPage.js
import React, { useEffect, useState } from "react";
import {
  Container, Typography, Grid, Card, CardMedia,
  CardContent, Button, Box, TextField, Chip, InputAdornment,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
const WA = "919503423737";

const CATEGORIES = [
  "All","Fans","Bulbs","Switches","Wires","Inverters",
  "MCBs","Geysers","Batteries","Mixers","Tubelights","Table Fans",
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    if (q) setSearchTerm(q);
  }, [location.search]);

  useEffect(() => {
    axios.get(`${API}/api/products`)
      .then(r => { setProducts(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const grouped = filtered.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <Box sx={{ background: "#f5f7fa", minHeight: "100vh", pb: { xs: 10, md: 4 } }}>

      {/* Header */}
      <Box sx={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        py: { xs: 3, md: 4 }, px: 2,
        borderBottom: "3px solid #c72026",
      }}>
        <Container maxWidth="lg">
          <Typography fontWeight={900} color="#fff" mb={2.5}
            sx={{ fontSize: { xs: 20, md: 28 }, letterSpacing: 0.3 }}>
            Our Products
          </Typography>

          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search fans, bulbs, switches, wires..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#999", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              background: "#fff", borderRadius: "10px", mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&:hover fieldset": { borderColor: "#c72026" },
                "&.Mui-focused fieldset": { borderColor: "#c72026" },
              },
            }}
          />

          {/* Category chips */}
          <Box sx={{
            display: "flex", gap: 1,
            overflowX: "auto", pb: 0.5,
            "&::-webkit-scrollbar": { display: "none" },
          }}>
            {CATEGORIES.map((c) => (
              <Chip key={c} label={c} onClick={() => setCategory(c)}
                sx={{
                  flexShrink: 0,
                  background: category === c ? "#c72026" : "rgba(255,255,255,0.12)",
                  color: category === c ? "#fff" : "rgba(255,255,255,0.8)",
                  fontWeight: 600, fontSize: 12,
                  border: category === c ? "none" : "1px solid rgba(255,255,255,0.2)",
                  "&:hover": { background: category === c ? "#a51a1a" : "rgba(255,255,255,0.2)" },
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>

        {/* Loading */}
        {loading && (
          <Box textAlign="center" py={10}>
            <Box sx={{
              width: 48, height: 48, borderRadius: "50%",
              border: "3px solid #f0f0f0",
              borderTopColor: "#c72026",
              animation: "spin 0.8s linear infinite",
              mx: "auto", mb: 2,
              "@keyframes spin": { to: { transform: "rotate(360deg)" } },
            }} />
            <Typography color="text.secondary" fontSize={14}>Loading products...</Typography>
          </Box>
        )}

        {/* No results */}
        {!loading && filtered.length === 0 && (
          <Box textAlign="center" py={10}>
            <Typography fontSize={48} mb={2}>—</Typography>
            <Typography variant="h6" fontWeight={700} color="#333">No products found</Typography>
            <Typography color="text.secondary" fontSize={14} mb={3}>
              Try a different search term or category
            </Typography>
            <Button onClick={() => { setSearchTerm(""); setCategory("All"); }}
              variant="outlined"
              sx={{ color: "#c72026", borderColor: "#c72026", fontWeight: 700,
                borderRadius: "9px", textTransform: "none",
                "&:hover": { background: "#fff5f5" } }}>
              Clear Filters
            </Button>
          </Box>
        )}

        {/* Products grouped by category */}
        {Object.keys(grouped).map((cat) => (
          <Box key={cat} mb={5}>
            {/* Category heading */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2.5, gap: 1.5 }}>
              <Box sx={{ width: 4, height: 22, background: "#c72026", borderRadius: 1, flexShrink: 0 }} />
              <Typography fontWeight={900} color="#1a1a2e"
                sx={{ fontSize: { xs: 16, md: 20 }, letterSpacing: 0.2 }}>
                {cat}
              </Typography>
              <Box sx={{
                height: 1, flex: 1,
                background: "linear-gradient(to right, #e0e0e0, transparent)"
              }} />
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                {grouped[cat].length} items
              </Typography>
            </Box>

            <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
              {grouped[cat].map((product) => {
                const mrp = product.mrp || null;
                const price = product.price || 0;
                const discount = mrp && mrp > price
                  ? Math.round(((mrp - price) / mrp) * 100) : null;
                const isNew = product.createdAt
                  ? (Date.now() - new Date(product.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000
                  : false;
                const waMsg = encodeURIComponent(
                  `Hello! I'm interested in *${product.name}* (₹${price.toLocaleString()}). Please share details.`
                );

                return (
                  <Grid item xs={6} sm={4} md={3} key={product._id}>
                    <Card sx={{
                      borderRadius: { xs: 2, md: 2.5 },
                      height: "100%", display: "flex", flexDirection: "column",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                      border: "1px solid #f0f0f0",
                      position: "relative", overflow: "hidden",
                      transition: "all 0.25s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.11)",
                        border: "1px solid #e0e0e0",
                      },
                    }}>

                      {/* Badges */}
                      <Box sx={{ position: "absolute", top: 7, left: 7, zIndex: 2,
                        display: "flex", flexDirection: "column", gap: 0.4 }}>
                        {isNew && <Chip label="NEW" size="small"
                          sx={{ background: "#1565c0", color: "#fff", fontWeight: 700,
                            fontSize: 9, height: 18, borderRadius: "4px" }} />}
                        {discount && <Chip label={`${discount}% OFF`} size="small"
                          sx={{ background: "#c72026", color: "#fff", fontWeight: 700,
                            fontSize: 9, height: 18, borderRadius: "4px" }} />}
                      </Box>

                      {/* Image */}
                      <Box onClick={() => navigate(`/product/${product._id}`)}
                        sx={{ background: "#fafafa", cursor: "pointer",
                          borderBottom: "1px solid #f5f5f5" }}>
                        <CardMedia component="img"
                          image={product.image || "https://via.placeholder.com/300x200?text=No+Image"}
                          alt={product.name}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
                          sx={{
                            height: { xs: 130, md: 175 },
                            objectFit: "contain", p: { xs: 1, md: 1.5 },
                            transition: "transform 0.3s",
                            "&:hover": { transform: "scale(1.04)" },
                          }}
                        />
                      </Box>

                      <CardContent sx={{ flex: 1, p: { xs: 1, md: 1.5 }, pb: "8px !important" }}>
                        <Typography fontWeight={700} color="#1a1a2e"
                          sx={{
                            fontSize: { xs: 12, md: 13 }, mb: 0.8,
                            display: "-webkit-box", WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical", overflow: "hidden",
                            cursor: "pointer", lineHeight: 1.35,
                            "&:hover": { color: "#c72026" },
                          }}
                          onClick={() => navigate(`/product/${product._id}`)}>
                          {product.name}
                        </Typography>

                        {/* Price */}
                        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.7, mb: 1 }}>
                          <Typography fontWeight={900} color="#c72026"
                            sx={{ fontSize: { xs: 14, md: 16 } }}>
                            ₹{price.toLocaleString()}
                          </Typography>
                          {mrp && mrp > price && (
                            <Typography color="#bbb"
                              sx={{ textDecoration: "line-through", fontSize: { xs: 10, md: 11 } }}>
                              ₹{mrp.toLocaleString()}
                            </Typography>
                          )}
                        </Box>

                        {/* Buttons */}
                        <Box sx={{ display: "flex", gap: 0.6 }}>
                          <Button fullWidth variant="contained" disableElevation size="small"
                            startIcon={<VisibilityOutlinedIcon sx={{ fontSize: "14px !important" }} />}
                            onClick={() => navigate(`/product/${product._id}`)}
                            sx={{
                              background: "#c72026", borderRadius: "7px",
                              fontWeight: 700, fontSize: { xs: 10, md: 11 },
                              py: { xs: 0.5, md: 0.6 }, textTransform: "none",
                              "&:hover": { background: "#a51a1a" },
                            }}>
                            View
                          </Button>
                          <Button component="a"
                            href={`https://wa.me/${WA}?text=${waMsg}`}
                            target="_blank" variant="outlined" size="small"
                            sx={{
                              borderColor: "#25D366", color: "#25D366",
                              borderRadius: "7px", minWidth: 34, px: 0,
                              "&:hover": { background: "#f0fff4", borderColor: "#25D366" },
                            }}>
                            <WhatsAppIcon sx={{ fontSize: 16 }} />
                          </Button>
                        </Box>
                      </CardContent>
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
}