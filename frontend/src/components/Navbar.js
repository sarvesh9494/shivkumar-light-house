// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Box, Typography, Button, IconButton,
  InputBase, Drawer, List, ListItem, ListItemText, Divider,
  useMediaQuery, useTheme, Menu, MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";

const PHONE = "9503423737";
const WA_LINK = `https://wa.me/91${PHONE}`;
const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { setUser(null); }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAnchorEl(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* ── TOP INFO BAR — desktop only ── */}
      <Box sx={{
        background: "#1a1a2e",
        px: 4, py: 0.7,
        display: { xs: "none", md: "flex" },
        justifyContent: "space-between", alignItems: "center",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <LocationOnOutlinedIcon sx={{ fontSize: 14, color: "#aaa" }} />
          <Typography variant="caption" color="#aaa">
            Main Road, Kadegaon, Sangli, Maharashtra
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
            <AccessTimeOutlinedIcon sx={{ fontSize: 14, color: "#aaa" }} />
            <Typography variant="caption" color="#aaa">Mon–Sun: 9:30 AM – 8:30 PM</Typography>
          </Box>
          <Box component="a" href={`tel:${PHONE}`}
            sx={{
              display: "flex", alignItems: "center", gap: 0.6,
              color: "#ffd700", textDecoration: "none",
            }}>
            <PhoneOutlinedIcon sx={{ fontSize: 14 }} />
            <Typography variant="caption" fontWeight={700} color="#ffd700">{PHONE}</Typography>
          </Box>
        </Box>
      </Box>

      {/* ── MAIN NAVBAR ── */}
      <AppBar position="sticky" elevation={1} sx={{
        background: "#fff",
        borderBottom: "3px solid #c72026",
      }}>
        <Toolbar sx={{
          px: { xs: 1.5, md: 3 },
          minHeight: { xs: "58px !important", md: "70px !important" },
          gap: 1.5,
        }}>

          {/* Logo */}
          <Box component={Link} to="/" sx={{
            display: "flex", alignItems: "center", gap: 1.2,
            textDecoration: "none", flexShrink: 0,
          }}>
            <Box component="img" src="/logo.jpeg" alt="Shivkumar Light House"
              onError={(e) => { e.target.style.display = "none"; }}
              sx={{ height: { xs: 40, md: 50 }, width: { xs: 40, md: 50 },
                objectFit: "contain", borderRadius: 1 }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography fontWeight={900} color="#1a1a2e"
                sx={{ fontSize: { xs: 14, md: 16 }, lineHeight: 1.15, letterSpacing: 0.3 }}>
                Shivkumar Light House
              </Typography>
              <Typography color="#c72026" fontWeight={600} sx={{ fontSize: 11 }}>
                Trusted Electrical Store
              </Typography>
            </Box>
          </Box>

          {/* Search — desktop */}
          <Box component="form" onSubmit={handleSearch}
            sx={{
              flex: 1, mx: 3,
              display: { xs: "none", md: "flex" }, alignItems: "center",
              background: "#f5f7fa",
              border: "1.5px solid #e8ecf0",
              borderRadius: "10px", px: 2, py: 0.6,
              "&:focus-within": { border: "1.5px solid #c72026", background: "#fff" },
              transition: "all 0.2s",
            }}>
            <SearchIcon sx={{ color: "#999", fontSize: 20, mr: 1 }} />
            <InputBase placeholder="Search fans, bulbs, switches, wires..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              fullWidth sx={{ fontSize: 14 }} />
            <Button type="submit" disableElevation size="small" sx={{
              background: "#c72026", color: "#fff", borderRadius: "7px",
              px: 2, minWidth: 0, fontWeight: 700, fontSize: 12,
              "&:hover": { background: "#a51a1a" },
            }}>Search</Button>
          </Box>

          <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 0.8 }}>

            {/* Search icon — mobile */}
            {isMobile && (
              <IconButton onClick={() => setSearchOpen(!searchOpen)} size="small"
                sx={{ color: "#1a1a2e", border: "1px solid #e0e0e0", borderRadius: 2, p: 0.8 }}>
                {searchOpen ? <CloseIcon fontSize="small" /> : <SearchIcon fontSize="small" />}
              </IconButton>
            )}

            {/* WhatsApp — desktop */}
            {!isMobile && (
              <Button component="a" href={WA_LINK} target="_blank"
                startIcon={<WhatsAppIcon />}
                variant="contained" disableElevation
                sx={{
                  background: "#25D366", color: "#fff", fontWeight: 700,
                  borderRadius: "9px", px: 2.5, fontSize: 13, textTransform: "none",
                  "&:hover": { background: "#1ebe5d" },
                }}>
                WhatsApp
              </Button>
            )}

            {/* Login / User — desktop */}
            {!isMobile && (
              user ? (
                <>
                  <Button onClick={(e) => setAnchorEl(e.currentTarget)}
                    startIcon={<PersonOutlineIcon />}
                    variant="outlined" disableElevation
                    sx={{
                      border: "1.5px solid #c72026", color: "#c72026",
                      fontWeight: 700, borderRadius: "9px", px: 2, fontSize: 13,
                      textTransform: "none",
                      "&:hover": { background: "#ffebee" },
                    }}>
                    {user.name.split(" ")[0]}
                  </Button>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 180, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" } }}>
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography fontWeight={700} fontSize={14}>{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleLogout}
                      sx={{ color: "#c72026", fontWeight: 600, gap: 1, py: 1.5 }}>
                      <LogoutIcon fontSize="small" /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button component={Link} to="/login"
                  startIcon={<PersonOutlineIcon />}
                  variant="outlined" disableElevation
                  sx={{
                    border: "1.5px solid #c72026", color: "#c72026",
                    fontWeight: 700, borderRadius: "9px", px: 2.5, fontSize: 13,
                    textTransform: "none",
                    "&:hover": { background: "#ffebee" },
                  }}>
                  Login
                </Button>
              )
            )}

            {/* Hamburger — mobile */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} size="small"
                sx={{ color: "#1a1a2e", border: "1px solid #e0e0e0", borderRadius: 2, p: 0.8 }}>
                <MenuIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Mobile search bar */}
        {isMobile && searchOpen && (
          <Box component="form" onSubmit={handleSearch}
            sx={{
              px: 1.5, pb: 1.5, pt: 0.5,
              display: "flex", gap: 1, alignItems: "center",
              borderTop: "1px solid #f0f0f0",
            }}>
            <Box sx={{
              flex: 1, display: "flex", alignItems: "center",
              background: "#f5f7fa", borderRadius: "9px",
              border: "1.5px solid #e8ecf0", px: 1.5, py: 0.6,
              "&:focus-within": { border: "1.5px solid #c72026" },
            }}>
              <SearchIcon sx={{ color: "#999", fontSize: 18, mr: 1 }} />
              <InputBase placeholder="Search products..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                autoFocus fullWidth sx={{ fontSize: 14 }} />
            </Box>
            <Button type="submit" variant="contained" disableElevation size="small"
              sx={{ background: "#c72026", borderRadius: "9px", px: 2, textTransform: "none",
                "&:hover": { background: "#a51a1a" } }}>
              Go
            </Button>
          </Box>
        )}

        {/* Nav links — desktop */}
        {!isMobile && (
          <Box sx={{ display: "flex", px: 3, pb: 0.6, gap: 0.5 }}>
            {NAV_LINKS.map((l) => (
              <Button key={l.path} component={Link} to={l.path} disableElevation
                sx={{
                  color: "#444", fontWeight: 600, fontSize: 13,
                  borderRadius: "7px", px: 2, textTransform: "none",
                  "&:hover": { color: "#c72026", background: "#fff5f5" },
                }}>
                {l.label}
              </Button>
            ))}
          </Box>
        )}
      </AppBar>

      {/* ── MOBILE BOTTOM NAV ── */}
      {isMobile && (
        <Box sx={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1200,
          background: "#fff",
          borderTop: "1px solid #e8ecf0",
          display: "flex",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
        }}>
          {[
            { icon: <HomeOutlinedIcon sx={{ fontSize: 22 }} />, label: "Home", path: "/" },
            { icon: <CategoryOutlinedIcon sx={{ fontSize: 22 }} />, label: "Products", path: "/products" },
            { icon: <WhatsAppIcon sx={{ fontSize: 22 }} />, label: "WhatsApp", path: WA_LINK, external: true },
            { icon: <PersonOutlineIcon sx={{ fontSize: 22 }} />, label: "Account", path: "/login" },
            { icon: <MoreHorizIcon sx={{ fontSize: 22 }} />, label: "More", action: () => setDrawerOpen(true) },
          ].map((item) => (
            <Box
              key={item.label}
              component={item.external ? "a" : item.action ? "div" : Link}
              to={!item.external && !item.action ? item.path : undefined}
              href={item.external ? item.path : undefined}
              target={item.external ? "_blank" : undefined}
              onClick={item.action || undefined}
              sx={{
                flex: 1,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                py: 1, cursor: "pointer", textDecoration: "none",
                color: item.label === "WhatsApp" ? "#25D366" : "#555",
                "&:hover": { color: "#c72026", background: "#fff5f5" },
                "&:active": { background: "#fff5f5" },
                transition: "color 0.15s",
              }}>
              {item.icon}
              <Typography sx={{ fontSize: 10, fontWeight: 600, mt: 0.3, lineHeight: 1 }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* ── MOBILE DRAWER ── */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280 } }}>
        <Box sx={{ pt: 2 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, pb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Box component="img" src="/logo.jpeg" alt="logo"
                sx={{ height: 40, width: 40, objectFit: "contain", borderRadius: 1 }} />
              <Box>
                <Typography fontWeight={900} fontSize={13} color="#1a1a2e">Shivkumar Light House</Typography>
                <Typography fontSize={11} color="#c72026" fontWeight={600}>Trusted Electrical Store</Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Divider />

          {user && (
            <Box sx={{ px: 2, py: 1.5, background: "#fff8f0" }}>
              <Typography fontSize={13} fontWeight={700} color="#e65100">{user.name}</Typography>
              <Typography fontSize={11} color="text.secondary">{user.email}</Typography>
            </Box>
          )}

          <List sx={{ py: 1 }}>
            {NAV_LINKS.map((l) => (
              <ListItem key={l.path} component={Link} to={l.path}
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 1.2, "&:hover": { background: "#fff5f5" }, cursor: "pointer" }}>
                <ListItemText primary={l.label}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: 14, color: "#333" }} />
              </ListItem>
            ))}
          </List>
          <Divider />

          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.2 }}>
            <Button component="a" href={WA_LINK} target="_blank" fullWidth
              startIcon={<WhatsAppIcon />} variant="contained" disableElevation
              sx={{ background: "#25D366", color: "#fff", fontWeight: 700,
                borderRadius: "9px", py: 1.2, textTransform: "none" }}>
              WhatsApp Us
            </Button>
            <Button component="a" href={`tel:${PHONE}`} fullWidth
              startIcon={<PhoneOutlinedIcon />} variant="contained" disableElevation
              sx={{ background: "#c72026", color: "#fff", fontWeight: 700,
                borderRadius: "9px", py: 1.2, textTransform: "none" }}>
              Call: {PHONE}
            </Button>
            {user ? (
              <Button onClick={() => { handleLogout(); setDrawerOpen(false); }}
                fullWidth variant="outlined" startIcon={<LogoutIcon />}
                sx={{ borderColor: "#c72026", color: "#c72026", fontWeight: 700,
                  borderRadius: "9px", textTransform: "none" }}>
                Logout
              </Button>
            ) : (
              <Button component={Link} to="/login" fullWidth
                startIcon={<PersonOutlineIcon />} variant="outlined"
                onClick={() => setDrawerOpen(false)}
                sx={{ borderColor: "#c72026", color: "#c72026", fontWeight: 700,
                  borderRadius: "9px", textTransform: "none" }}>
                Login / Register
              </Button>
            )}
          </Box>

          <Box sx={{ px: 2, pb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 14, color: "#999" }} />
              <Typography variant="caption" color="text.secondary">
                Main Road, Kadegaon, Sangli
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTimeOutlinedIcon sx={{ fontSize: 14, color: "#999" }} />
              <Typography variant="caption" color="text.secondary">
                Mon–Sun: 9:30 AM – 8:30 PM
              </Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}