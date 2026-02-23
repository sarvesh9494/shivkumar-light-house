// src/components/ProductCard.js
import React, { useState } from "react";
import {
  Card, CardContent, CardMedia, Typography, Button, Box, Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

const WA = "919503423737";

function ProductCard({ product }) {
  const [imgErr, setImgErr] = useState(false);

  const imageSrc = imgErr || !product.image
    ? "https://via.placeholder.com/300x200?text=No+Image"
    : product.image;

  // Calculate discount if MRP provided
  const mrp = product.mrp || null;
  const price = product.price || 0;
  const discount = mrp && mrp > price
    ? Math.round(((mrp - price) / mrp) * 100)
    : null;

  // "New" badge — added within last 7 days
  const isNew = product.createdAt
    ? (Date.now() - new Date(product.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000
    : false;

  const waMessage = encodeURIComponent(
    `Hi! I'm interested in *${product.name}* (₹${price.toLocaleString()}). Please share more details.`
  );

  return (
    <Card sx={{
      borderRadius: 3,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      transition: "transform 0.25s, box-shadow 0.25s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.14)",
      },
      position: "relative",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── Badges ── */}
      <Box sx={{ position: "absolute", top: 10, left: 10, zIndex: 2, display: "flex", gap: 0.6, flexDirection: "column" }}>
        {isNew && (
          <Chip label="NEW" size="small"
            sx={{ background: "#1565c0", color: "#fff", fontWeight: 800, fontSize: 10, height: 20 }} />
        )}
        {discount && (
          <Chip label={`${discount}% OFF`} size="small"
            sx={{ background: "#c72026", color: "#fff", fontWeight: 800, fontSize: 10, height: 20 }} />
        )}
        {(product.stock || 0) === 0 && (
          <Chip label="Out of Stock" size="small"
            sx={{ background: "#666", color: "#fff", fontWeight: 700, fontSize: 10, height: 20 }} />
        )}
      </Box>

      {/* ── Image ── */}
      <Box sx={{ position: "relative", overflow: "hidden", background: "#f9f9f9" }}>
        <CardMedia
          component="img"
          height="200"
          image={imageSrc}
          alt={product.name}
          onError={() => setImgErr(true)}
          sx={{
            objectFit: "contain",
            p: 1.5,
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      </Box>

      {/* ── Content ── */}
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>

        {/* Category chip */}
        <Chip
          label={product.category}
          size="small"
          sx={{ background: "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: 10, mb: 1, alignSelf: "flex-start" }}
        />

        {/* Name */}
        <Typography fontWeight={700} fontSize={14} color="#1a1a2e"
          sx={{ mb: 0.5, lineHeight: 1.3, display: "-webkit-box",
            WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {product.name}
        </Typography>

        {/* Price block */}
        <Box sx={{ mt: "auto", pt: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography fontWeight={900} fontSize={18} color="#c72026">
              ₹{price.toLocaleString()}
            </Typography>
            {mrp && mrp > price && (
              <Typography
                fontSize={13} color="#999"
                sx={{ textDecoration: "line-through" }}>
                ₹{mrp.toLocaleString()}
              </Typography>
            )}
          </Box>

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
            <Button
              component={Link}
              to={`/product/${product._id}`}
              variant="contained"
              size="small"
              fullWidth
              sx={{
                background: "#c72026", fontWeight: 700, borderRadius: "8px", fontSize: 12,
                "&:hover": { background: "#a51a1a" },
              }}>
              View Details
            </Button>
            <Button
              component="a"
              href={`https://wa.me/${WA}?text=${waMessage}`}
              target="_blank"
              variant="outlined"
              size="small"
              sx={{
                borderColor: "#25D366", color: "#25D366", borderRadius: "8px",
                minWidth: 38, px: 1, fontSize: 16,
                "&:hover": { background: "#f0fff4", borderColor: "#25D366" },
              }}>
              💬
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;