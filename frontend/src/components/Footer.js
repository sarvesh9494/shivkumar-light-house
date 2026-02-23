// src/components/Footer.js
import React from "react";
import { Box, Typography, Grid, Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const PHONE = "9503423737";
const WA_LINK = `https://wa.me/91${PHONE}`;
const INSTAGRAM = "https://www.instagram.com/shivkumar_light/";
const EMAIL = "shivkumarlighthouse@gmail.com";
const MAPS = "https://www.google.com/maps/place/Shivkumar+Light+House/@17.2968224,74.3307349,17z";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

const categories = [
  "Fans", "Bulbs", "Switches", "Wires",
  "Inverters", "MCBs", "Geysers", "Batteries",
];

function Footer() {
  return (
    <Box sx={{ background: "#1a1a2e", color: "#ccc", mt: 6 }}>

      {/* ── Main footer content ── */}
      <Box sx={{ px: { xs: 3, md: 6 }, pt: 6, pb: 4 }}>
        <Grid container spacing={4}>

          {/* Column 1 — Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                component="img"
                src="/logo.jpeg"
                alt="Shivkumar Light House"
                onError={(e) => { e.target.style.display = "none"; }}
                sx={{ height: 52, width: 52, objectFit: "contain", borderRadius: 1 }}
              />
              <Box>
                <Typography fontWeight={900} fontSize={16} color="#fff">
                  Shivkumar Light House
                </Typography>
                <Typography fontSize={12} color="#c72026" fontWeight={600}>
                  ⚡ Trusted Electrical Store
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: "#aaa", lineHeight: 1.8, mb: 2 }}>
              Established in 1999 by Nilkanth Mahajan, Shivkumar Light House has been
              Kadegaon's most trusted electrical store for 25+ years. We stock all major
              brands under one roof.
            </Typography>

            {/* Social icons */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 1 }}>
              <IconButton
                component="a" href={INSTAGRAM} target="_blank"
                sx={{
                  background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                  color: "#fff", width: 38, height: 38, fontSize: 18,
                  "&:hover": { opacity: 0.85 },
                }}>
                📷
              </IconButton>
              <IconButton
                component="a" href={WA_LINK} target="_blank"
                sx={{
                  background: "#25D366", color: "#fff",
                  width: 38, height: 38, fontSize: 18,
                  "&:hover": { background: "#1ebe5d" },
                }}>
                💬
              </IconButton>
              <IconButton
                component="a" href={`tel:${PHONE}`}
                sx={{
                  background: "#c72026", color: "#fff",
                  width: 38, height: 38, fontSize: 18,
                  "&:hover": { background: "#a51a1a" },
                }}>
                📞
              </IconButton>
            </Box>
          </Grid>

          {/* Column 2 — Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight={800} color="#fff" mb={2} fontSize={14}
              sx={{ borderBottom: "2px solid #c72026", pb: 1, display: "inline-block" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {quickLinks.map((l) => (
                <Box
                  key={l.path}
                  component={Link}
                  to={l.path}
                  sx={{
                    color: "#aaa", textDecoration: "none", fontSize: 13,
                    "&:hover": { color: "#c72026", pl: 0.5 },
                    transition: "all 0.2s",
                  }}>
                  › {l.label}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Column 3 — Categories */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight={800} color="#fff" mb={2} fontSize={14}
              sx={{ borderBottom: "2px solid #c72026", pb: 1, display: "inline-block" }}>
              Categories
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {categories.map((c) => (
                <Box
                  key={c}
                  component={Link}
                  to="/products"
                  sx={{
                    color: "#aaa", textDecoration: "none", fontSize: 13,
                    "&:hover": { color: "#c72026", pl: 0.5 },
                    transition: "all 0.2s",
                  }}>
                  › {c}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Column 4 — Contact & Hours */}
          <Grid item xs={12} md={4}>
            <Typography fontWeight={800} color="#fff" mb={2} fontSize={14}
              sx={{ borderBottom: "2px solid #c72026", pb: 1, display: "inline-block" }}>
              Contact Us
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-start" }}>
                <Typography fontSize={16}>📍</Typography>
                <Typography variant="body2" color="#aaa" lineHeight={1.6}>
                  Main Road, Kadegaon,<br />Sangli, Maharashtra, India
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
                <Typography fontSize={16}>📞</Typography>
                <Box component="a" href={`tel:${PHONE}`}
                  sx={{ color: "#ffd700", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                  {PHONE}
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
                <Typography fontSize={16}>💬</Typography>
                <Box component="a" href={WA_LINK} target="_blank"
                  sx={{ color: "#25D366", textDecoration: "none", fontWeight: 700, fontSize: 13 }}>
                  WhatsApp Us
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
                <Typography fontSize={16}>✉️</Typography>
                <Box component="a" href={`mailto:${EMAIL}`}
                  sx={{ color: "#aaa", textDecoration: "none", fontSize: 13,
                    "&:hover": { color: "#c72026" } }}>
                  {EMAIL}
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.2, alignItems: "center" }}>
                <Typography fontSize={16}>📍</Typography>
                <Box component="a" href={MAPS} target="_blank"
                  sx={{ color: "#aaa", textDecoration: "none", fontSize: 13,
                    "&:hover": { color: "#c72026" } }}>
                  View on Google Maps
                </Box>
              </Box>

              {/* Business hours */}
              <Box sx={{
                mt: 1, p: 1.5, borderRadius: 2,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <Typography variant="caption" color="#ffd700" fontWeight={700} display="block" mb={0.5}>
                  🕐 Business Hours
                </Typography>
                <Typography variant="caption" color="#aaa" display="block">
                  Monday – Sunday
                </Typography>
                <Typography variant="caption" color="#fff" fontWeight={600} display="block">
                  9:30 AM – 8:30 PM
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

      {/* ── Bottom bar ── */}
      <Box sx={{
        px: { xs: 3, md: 6 }, py: 2,
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 1,
      }}>
        <Typography variant="caption" color="#666">
          © {new Date().getFullYear()} Shivkumar Light House. All rights reserved.
        </Typography>
        <Typography variant="caption" color="#666">
          Est. 1999 · 25+ Years of Trust · Kadegaon, Maharashtra
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;