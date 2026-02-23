// src/pages/ProductDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container, Grid, Typography, Button, Box,
  Chip, CircularProgress, Divider, Card,
} from "@mui/material";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";
const WA = "919503423737";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    axios
      .get(`${API}/api/products/${id}`)
      .then((res) => { setProduct(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#c72026" }} />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography fontSize={60} mb={2}>😕</Typography>
        <Typography variant="h5" fontWeight={700} mb={1}>Product not found</Typography>
        <Typography color="text.secondary" mb={3}>This product may have been removed.</Typography>
        <Button variant="contained" onClick={() => navigate("/products")}
          sx={{ background: "#c72026", "&:hover": { background: "#a51a1a" } }}>
          ← Back to Products
        </Button>
      </Container>
    );
  }

  // Build image gallery — primary image + any extra images[]
  const allImages = [
    product.image,
    ...(product.images || []),
  ].filter(Boolean);
  if (allImages.length === 0) allImages.push("https://via.placeholder.com/400x400?text=No+Image");

  // Discount calculation
  const mrp = product.mrp || null;
  const price = product.price || 0;
  const discount = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : null;

  // Features — can be array or comma-separated string
  const features = Array.isArray(product.features)
    ? product.features.filter(Boolean)
    : (product.features || "").split(",").map(f => f.trim()).filter(Boolean);

  // WhatsApp message
  const waMessage = encodeURIComponent(
    `Hello! I'm interested in *${product.name}*.\n💰 Price: ₹${price.toLocaleString()}${mrp ? ` (MRP ₹${mrp.toLocaleString()})` : ""}\n\nPlease share availability and more details.`
  );

  // "New" badge
  const isNew = product.createdAt
    ? (Date.now() - new Date(product.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000
    : false;

  return (
    <Box sx={{ background: "#f9f9f9", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">

        {/* Breadcrumb */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, flexWrap: "wrap" }}>
          <Box component={Link} to="/" sx={{ color: "#c72026", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Home</Box>
          <Typography color="text.secondary" fontSize={13}>›</Typography>
          <Box component={Link} to="/products" sx={{ color: "#c72026", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Products</Box>
          <Typography color="text.secondary" fontSize={13}>›</Typography>
          <Typography fontSize={13} color="text.secondary" sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {product.name}
          </Typography>
        </Box>

        <Grid container spacing={4}>

          {/* ── LEFT: Image Gallery ── */}
          <Grid item xs={12} md={5}>
            <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>

              {/* Badges */}
              <Box sx={{ position: "relative" }}>
                <Box sx={{ position: "absolute", top: 12, left: 12, zIndex: 2, display: "flex", flexDirection: "column", gap: 0.8 }}>
                  {isNew && (
                    <Chip label="NEW" size="small"
                      sx={{ background: "#1565c0", color: "#fff", fontWeight: 800, fontSize: 11 }} />
                  )}
                  {discount && (
                    <Chip label={`${discount}% OFF`} size="small"
                      sx={{ background: "#c72026", color: "#fff", fontWeight: 800, fontSize: 11 }} />
                  )}
                </Box>

                {/* Main image */}
                <Box sx={{
                  height: { xs: 280, md: 380 },
                  background: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  p: 2,
                }}>
                  <Box
                    component="img"
                    src={allImages[activeImg]}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                    }}
                    sx={{
                      maxWidth: "100%", maxHeight: "100%",
                      objectFit: "contain",
                      transition: "opacity 0.2s",
                    }}
                  />
                </Box>
              </Box>

              {/* Thumbnail row — only if multiple images */}
              {allImages.length > 1 && (
                <Box sx={{
                  display: "flex", gap: 1.5, p: 2,
                  overflowX: "auto",
                  borderTop: "1px solid #f0f0f0",
                  "&::-webkit-scrollbar": { height: 4 },
                }}>
                  {allImages.map((img, i) => (
                    <Box
                      key={i}
                      onClick={() => setActiveImg(i)}
                      sx={{
                        width: 68, height: 68, flexShrink: 0,
                        border: activeImg === i ? "2.5px solid #c72026" : "2px solid #eee",
                        borderRadius: 2, overflow: "hidden",
                        cursor: "pointer", background: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "border 0.15s",
                        "&:hover": { border: "2px solid #c72026" },
                      }}>
                      <Box
                        component="img"
                        src={img}
                        alt={`view ${i + 1}`}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/68?text=?"; }}
                        sx={{ width: "100%", height: "100%", objectFit: "contain", p: 0.5 }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Card>
          </Grid>

          {/* ── RIGHT: Product Info ── */}
          <Grid item xs={12} md={7}>
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>

              {/* Category */}
              <Chip
                label={product.category}
                size="small"
                sx={{ background: "#fff3e0", color: "#e65100", fontWeight: 700, fontSize: 11, mb: 1.5, alignSelf: "flex-start" }}
              />

              {/* Name */}
              <Typography variant="h4" fontWeight={900} color="#1a1a2e"
                sx={{ fontSize: { xs: 22, md: 28 }, lineHeight: 1.3, mb: 2 }}>
                {product.name}
              </Typography>

              {/* Price block */}
              <Box sx={{
                display: "flex", alignItems: "center", gap: 2,
                flexWrap: "wrap", mb: 2,
                p: 2, borderRadius: 2, background: "#fff",
                border: "1.5px solid #f0f0f0",
              }}>
                <Typography variant="h4" fontWeight={900} color="#c72026">
                  ₹{price.toLocaleString()}
                </Typography>
                {mrp && mrp > price && (
                  <>
                    <Typography fontSize={18} color="#999" sx={{ textDecoration: "line-through" }}>
                      ₹{mrp.toLocaleString()}
                    </Typography>
                    <Chip
                      label={`Save ₹${(mrp - price).toLocaleString()} (${discount}% off)`}
                      sx={{ background: "#e8f5e9", color: "#2e7d32", fontWeight: 700, fontSize: 12 }}
                    />
                  </>
                )}
              </Box>

              {/* Stock status */}
              <Box sx={{ mb: 2 }}>
                {(product.stock || 0) > 0 ? (
                  <Chip label={`✅ In Stock (${product.stock} available)`}
                    sx={{ background: "#e8f5e9", color: "#2e7d32", fontWeight: 700 }} />
                ) : (
                  <Chip label="❌ Out of Stock"
                    sx={{ background: "#ffebee", color: "#c62828", fontWeight: 700 }} />
                )}
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Description */}
              {product.description && (
                <Box mb={2.5}>
                  <Typography fontWeight={800} color="#1a1a2e" mb={1}>Description</Typography>
                  <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                    {product.description}
                  </Typography>
                </Box>
              )}

              {/* Key Features */}
              {features.length > 0 && (
                <Box mb={3}>
                  <Typography fontWeight={800} color="#1a1a2e" mb={1.5}>
                    ⚡ Key Features
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {features.map((f, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                        <Box sx={{
                          width: 20, height: 20, borderRadius: "50%",
                          background: "#c72026", color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 11, fontWeight: 900, flexShrink: 0, mt: 0.2,
                        }}>
                          ✓
                        </Box>
                        <Typography variant="body2" color="#333" lineHeight={1.6}>{f}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {/* CTA Buttons */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: "auto" }}>
                {/* WhatsApp Enquire */}
                <Button
                  component="a"
                  href={`https://wa.me/${WA}?text=${waMessage}`}
                  target="_blank"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    background: "#25D366", fontWeight: 800,
                    borderRadius: "12px", py: 1.8, fontSize: 16,
                    "&:hover": { background: "#1ebe5d" },
                    boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
                  }}>
                  💬 Enquire on WhatsApp
                </Button>

                {/* Call button */}
                <Button
                  component="a"
                  href="tel:9503423737"
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    borderColor: "#c72026", color: "#c72026",
                    fontWeight: 700, borderRadius: "12px", py: 1.5, fontSize: 15,
                    "&:hover": { background: "#ffebee" },
                  }}>
                  📞 Call to Order: 9503423737
                </Button>

                <Button
                  component={Link} to="/products"
                  variant="text"
                  sx={{ color: "#666", fontWeight: 600 }}>
                  ← Back to Products
                </Button>
              </Box>

              {/* Trust badges */}
              <Box sx={{
                mt: 3, p: 2, borderRadius: 2,
                background: "#f9f9f9", border: "1px solid #eee",
                display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center",
              }}>
                {[
                  { icon: "🏆", text: "Genuine Products" },
                  { icon: "⚡", text: "25+ Years Trust" },
                  { icon: "🚀", text: "Quick Response" },
                  { icon: "💯", text: "Best Price" },
                ].map((b) => (
                  <Box key={b.text} sx={{ textAlign: "center", minWidth: 70 }}>
                    <Typography fontSize={22}>{b.icon}</Typography>
                    <Typography variant="caption" fontWeight={600} color="text.secondary" display="block">
                      {b.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductDetailsPage;