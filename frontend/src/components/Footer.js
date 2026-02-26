// src/components/Footer.js
import React from "react";
import { Box, Typography, Grid, Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";

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

export default function Footer() {
  return (
    <Box sx={{ background: "#1a1a2e", color: "#ccc", pb: { xs: 8, md: 0 } }}>

      <Box sx={{ px: { xs: 2.5, md: 6 }, pt: { xs: 4, md: 6 }, pb: 4 }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>

          {/* Brand column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box component="img" src="/logo.jpeg" alt="Shivkumar Light House"
                onError={(e) => { e.target.style.display = "none"; }}
                sx={{ height: 50, width: 50, objectFit: "contain", borderRadius: 1 }}
              />
              <Box>
                <Typography fontWeight={900} fontSize={15} color="#fff">
                  Shivkumar Light House
                </Typography>
                <Typography fontSize={11} color="#c72026" fontWeight={600} letterSpacing={0.5}>
                  Trusted Electrical Store
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: "#888", lineHeight: 1.9, mb: 2.5, fontSize: 13 }}>
              Established in 1999 by Nilkanth Mahajan. Kadegaon's most trusted
              electrical store for 25+ years with all major brands under one roof.
            </Typography>

            {/* Social icons */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton component="a" href={INSTAGRAM} target="_blank" size="small"
                sx={{
                  background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366)",
                  color: "#fff", width: 34, height: 34,
                  "&:hover": { opacity: 0.85 },
                }}>
                <InstagramIcon sx={{ fontSize: 17 }} />
              </IconButton>
              <IconButton component="a" href={WA_LINK} target="_blank" size="small"
                sx={{ background: "#25D366", color: "#fff", width: 34, height: 34,
                  "&:hover": { background: "#1ebe5d" } }}>
                <WhatsAppIcon sx={{ fontSize: 17 }} />
              </IconButton>
              <IconButton component="a" href={`tel:${PHONE}`} size="small"
                sx={{ background: "#c72026", color: "#fff", width: 34, height: 34,
                  "&:hover": { background: "#a51a1a" } }}>
                <PhoneOutlinedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight={800} color="#fff" mb={2} fontSize={13}
              sx={{ borderBottom: "2px solid #c72026", pb: 0.8, display: "inline-block", letterSpacing: 0.5 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {quickLinks.map((l) => (
                <Box key={l.path} component={Link} to={l.path}
                  sx={{
                    color: "#888", textDecoration: "none", fontSize: 13,
                    display: "flex", alignItems: "center", gap: 0.8,
                    "&:hover": { color: "#c72026", paddingLeft: "4px" },
                    transition: "all 0.2s",
                  }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#c72026", flexShrink: 0 }} />
                  {l.label}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Categories */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight={800} color="#fff" mb={2} fontSize={13}
              sx={{ borderBottom: "2px solid #c72026", pb: 0.8, display: "inline-block", letterSpacing: 0.5 }}>
              Categories
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {categories.map((c) => (
                <Box key={c} component={Link} to="/products"
                  sx={{
                    color: "#888", textDecoration: "none", fontSize: 13,
                    display: "flex", alignItems: "center", gap: 0.8,
                    "&:hover": { color: "#c72026", paddingLeft: "4px" },
                    transition: "all 0.2s",
                  }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: "#c72026", flexShrink: 0 }} />
                  {c}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={4}>
            <Typography fontWeight={800} color="#fff" mb={2} fontSize={13}
              sx={{ borderBottom: "2px solid #c72026", pb: 0.8, display: "inline-block", letterSpacing: 0.5 }}>
              Contact Us
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                { icon: <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />, text: "Main Road, Kadegaon, Sangli, Maharashtra", href: MAPS },
                { icon: <PhoneOutlinedIcon sx={{ fontSize: 16 }} />, text: PHONE, href: `tel:${PHONE}` },
                { icon: <WhatsAppIcon sx={{ fontSize: 16 }} />, text: "WhatsApp Us", href: WA_LINK },
                { icon: <EmailOutlinedIcon sx={{ fontSize: 16 }} />, text: EMAIL, href: `mailto:${EMAIL}` },
              ].map((item) => (
                <Box key={item.text} sx={{ display: "flex", gap: 1.2, alignItems: "flex-start" }}>
                  <Box sx={{ color: "#c72026", mt: 0.1, flexShrink: 0 }}>{item.icon}</Box>
                  <Box component="a" href={item.href} target="_blank"
                    sx={{ color: "#888", textDecoration: "none", fontSize: 13, lineHeight: 1.6,
                      "&:hover": { color: "#c72026" }, transition: "color 0.2s" }}>
                    {item.text}
                  </Box>
                </Box>
              ))}

              {/* Hours box */}
              <Box sx={{
                mt: 0.5, p: 1.5, borderRadius: 2,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex", gap: 1.2, alignItems: "flex-start",
              }}>
                <AccessTimeOutlinedIcon sx={{ fontSize: 16, color: "#c72026", mt: 0.1, flexShrink: 0 }} />
                <Box>
                  <Typography variant="caption" color="#ffd700" fontWeight={700} display="block">
                    Business Hours
                  </Typography>
                  <Typography variant="caption" color="#ccc" fontWeight={500} display="block">
                    Monday – Sunday: 9:30 AM – 8:30 PM
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

      <Box sx={{
        px: { xs: 2.5, md: 6 }, py: 2,
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 1,
      }}>
        <Typography variant="caption" color="#555">
          © {new Date().getFullYear()} Shivkumar Light House. All rights reserved.
        </Typography>
        <Typography variant="caption" color="#555">
          Est. 1999 · Kadegaon, Sangli
        </Typography>
      </Box>
    </Box>
  );
}