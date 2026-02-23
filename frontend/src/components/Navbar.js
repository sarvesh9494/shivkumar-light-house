// src/components/Navbar.js
import React, { useState } from "react";
import {
  AppBar, Toolbar, Box, Typography, Button, IconButton,
  InputBase, Drawer, List, ListItem, ListItemText, Divider,
  useMediaQuery, useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const PHONE = "9503423737";
const WA_LINK = `https://wa.me/91${PHONE}`;

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <>
      {/* ── TOP BAR ── */}
      <Box sx={{
        background: "#1a1a2e", color: "#ccc", fontSize: 12,
        px: { xs: 2, md: 4 }, py: 0.6,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <Typography variant="caption" sx={{ color: "#aaa" }}>
          📍 Main Road, Kadegaon, Sangli, Maharashtra
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="caption" sx={{ color: "#aaa" }}>
            🕐 Mon–Sun: 9:30 AM – 8:30 PM
          </Typography>
          <Box
            component="a" href={`tel:${PHONE}`}
            sx={{ color: "#ffd700", textDecoration: "none", fontSize: 12, fontWeight: 700 }}>
            📞 {PHONE}
          </Box>
        </Box>
      </Box>

      {/* ── MAIN NAVBAR ── */}
      <AppBar position="sticky" elevation={2} sx={{
        background: "#fff", color: "#000",
        borderBottom: "3px solid #c72026",
      }}>
        <Toolbar sx={{ px: { xs: 1, md: 3 }, gap: 2, minHeight: "68px !important" }}>

          {/* Logo */}
          <Box component={Link} to="/" sx={{
            display: "flex", alignItems: "center", gap: 1.2,
            textDecoration: "none", flexShrink: 0,
          }}>
            <Box
              component="img"
              src="/logo.jpeg"
              alt="Shivkumar Light House"
              onError={(e) => { e.target.style.display = "none"; }}
              sx={{ height: 48, width: 48, objectFit: "contain", borderRadius: 1 }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="subtitle1" fontWeight={900} color="#1a1a2e"
                sx={{ lineHeight: 1.1, letterSpacing: 0.3 }}>
                Shivkumar Light House
              </Typography>
              <Typography variant="caption" color="#c72026" fontWeight={600}>
                ⚡ Trusted Electrical Store
              </Typography>
            </Box>
          </Box>

          {/* Search bar — center */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              flex: 1, mx: { xs: 1, md: 3 },
              display: "flex", alignItems: "center",
              background: "#f5f5f5", borderRadius: "8px",
              border: "1.5px solid #e0e0e0",
              px: 1.5, py: 0.4,
              "&:focus-within": { border: "1.5px solid #c72026" },
              transition: "border 0.2s",
            }}>
            <Typography sx={{ color: "#999", fontSize: 18, mr: 1 }}>🔍</Typography>
            <InputBase
              placeholder="Search fans, bulbs, switches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              sx={{ fontSize: 14 }}
            />
            <Button
              type="submit"
              size="small"
              sx={{
                background: "#c72026", color: "#fff", borderRadius: "6px",
                px: 1.5, minWidth: 0, fontWeight: 700, fontSize: 12,
                "&:hover": { background: "#a51a1a" },
                display: { xs: "none", sm: "flex" },
              }}>
              Search
            </Button>
          </Box>

          {/* Right side — desktop */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
              {/* WhatsApp */}
              <Button
                component="a" href={WA_LINK} target="_blank"
                startIcon={<span style={{ fontSize: 16 }}>💬</span>}
                sx={{
                  background: "#25D366", color: "#fff", fontWeight: 700,
                  borderRadius: "8px", px: 2, fontSize: 12,
                  "&:hover": { background: "#1ebe5d" },
                }}>
                WhatsApp
              </Button>

              {/* Login */}
              <Button
                component={Link} to="/login"
                sx={{
                  border: "1.5px solid #c72026", color: "#c72026",
                  fontWeight: 700, borderRadius: "8px", px: 2, fontSize: 12,
                  "&:hover": { background: "#ffebee" },
                }}>
                👤 Login
              </Button>
            </Box>
          )}

          {/* Hamburger — mobile */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#1a1a2e" }}>
              <Typography fontSize={24}>☰</Typography>
            </IconButton>
          )}
        </Toolbar>

        {/* ── Nav links row (desktop) ── */}
        {!isMobile && (
          <Box sx={{
            display: "flex", alignItems: "center",
            px: 3, pb: 0.5, gap: 0.5,
          }}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.path}
                component={Link}
                to={link.path}
                sx={{
                  color: "#333", fontWeight: 600, fontSize: 13,
                  borderRadius: "6px", px: 2,
                  "&:hover": { color: "#c72026", background: "#ffebee" },
                  "&.active": { color: "#c72026" },
                }}>
                {link.label}
              </Button>
            ))}
          </Box>
        )}
      </AppBar>

      {/* ── MOBILE DRAWER ── */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 270, pt: 2 }}>
          {/* Logo in drawer */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, pb: 2 }}>
            <Box component="img" src="/logo.jpeg" alt="logo"
              sx={{ height: 44, width: 44, objectFit: "contain", borderRadius: 1 }} />
            <Box>
              <Typography fontWeight={900} fontSize={14} color="#1a1a2e">Shivkumar Light House</Typography>
              <Typography fontSize={11} color="#c72026" fontWeight={600}>⚡ Trusted Electrical Store</Typography>
            </Box>
          </Box>
          <Divider />

          <List>
            {NAV_LINKS.map((link) => (
              <ListItem
                key={link.path}
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                sx={{ "&:hover": { background: "#ffebee" }, cursor: "pointer" }}>
                <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
              </ListItem>
            ))}
          </List>
          <Divider />

          {/* WhatsApp + Login in drawer */}
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              component="a" href={WA_LINK} target="_blank" fullWidth
              sx={{ background: "#25D366", color: "#fff", fontWeight: 700, borderRadius: "8px" }}>
              💬 WhatsApp Us
            </Button>
            <Button
              component={Link} to="/login" fullWidth
              onClick={() => setDrawerOpen(false)}
              sx={{ border: "1.5px solid #c72026", color: "#c72026", fontWeight: 700, borderRadius: "8px" }}>
              👤 Login / Register
            </Button>
            <Typography variant="caption" color="text.secondary" textAlign="center">
              📞 <a href={`tel:${PHONE}`} style={{ color: "#c72026", fontWeight: 700 }}>{PHONE}</a>
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;