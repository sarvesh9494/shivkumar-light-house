// src/pages/LoginPage.js
import React, { useState } from "react";
import {
  Box, Container, Typography, TextField, Button,
  Divider, Alert, CircularProgress, Tab, Tabs, InputAdornment, IconButton,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const fx = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": { borderColor: "#c72026" },
    "&.Mui-focused fieldset": { borderColor: "#c72026" },
    borderRadius: "10px",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#c72026" },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0); // 0 = Login, 1 = Register
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Login form
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Register form
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "", confirm: "" });

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    setError(""); setSuccess("");
    if (!loginForm.email || !loginForm.password) {
      setError("Please enter email and password."); return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/login`, {
        email: loginForm.email,
        password: loginForm.password,
      });
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess(`Welcome back, ${res.data.user.name}! 🎉`);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // ── REGISTER ───────────────────────────────────────────────────────────────
  const handleRegister = async () => {
    setError(""); setSuccess("");
    if (!regForm.name || !regForm.email || !regForm.password) {
      setError("Please fill all fields."); return;
    }
    if (regForm.password !== regForm.confirm) {
      setError("Passwords do not match."); return;
    }
    if (regForm.password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/api/register`, {
        name: regForm.name,
        email: regForm.email,
        password: regForm.password,
      });
      setSuccess("Account created! Please login now. ✅");
      setRegForm({ name: "", email: "", password: "", confirm: "" });
      setTimeout(() => setTab(0), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      py: 4,
    }}>
      <Container maxWidth="sm">
        <Box sx={{
          background: "#fff",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}>

          {/* ── Header ── */}
          <Box sx={{
            background: "linear-gradient(135deg, #c72026, #e53935)",
            px: 4, py: 3, textAlign: "center",
          }}>
            <Box
              component={Link} to="/"
              sx={{ display: "inline-flex", alignItems: "center", gap: 1.5, textDecoration: "none", mb: 1 }}>
              <Box
                component="img" src="/logo.jpeg" alt="logo"
                onError={(e) => { e.target.style.display = "none"; }}
                sx={{ height: 44, width: 44, objectFit: "contain", borderRadius: 1 }}
              />
              <Box sx={{ textAlign: "left" }}>
                <Typography fontWeight={900} color="#fff" fontSize={16} lineHeight={1.1}>
                  Shivkumar Light House
                </Typography>
                <Typography fontSize={11} color="rgba(255,255,255,0.8)">
                  ⚡ Trusted Electrical Store
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ── Tabs ── */}
          <Tabs
            value={tab}
            onChange={(_, v) => { setTab(v); setError(""); setSuccess(""); }}
            variant="fullWidth"
            sx={{
              borderBottom: "1px solid #f0f0f0",
              "& .MuiTab-root": { fontWeight: 700, fontSize: 14, py: 2 },
              "& .Mui-selected": { color: "#c72026 !important" },
              "& .MuiTabs-indicator": { background: "#c72026", height: 3 },
            }}>
            <Tab label="👤 Login" />
            <Tab label="📝 Register" />
          </Tabs>

          <Box sx={{ px: { xs: 3, sm: 4 }, py: 4 }}>

            {/* ── Alerts ── */}
            {error && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }} onClose={() => setError("")}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
                {success}
              </Alert>
            )}

            {/* ══ LOGIN FORM ══ */}
            {tab === 0 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth sx={fx}
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">✉️</InputAdornment>,
                  }}
                />
                <TextField
                  label="Password"
                  type={showPass ? "text" : "password"}
                  fullWidth sx={fx}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)} edge="end" size="small">
                          <Typography fontSize={16}>{showPass ? "🙈" : "👁️"}</Typography>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    background: "linear-gradient(135deg, #c72026, #e53935)",
                    fontWeight: 800, borderRadius: "10px", py: 1.6, fontSize: 15,
                    "&:hover": { background: "linear-gradient(135deg, #a51a1a, #c62828)" },
                    "&:disabled": { background: "#ccc" },
                  }}>
                  {loading ? <CircularProgress size={22} color="inherit" /> : "Login →"}
                </Button>

                <Divider sx={{ my: 0.5 }}>OR</Divider>

                <Button
                  component="a"
                  href={`https://wa.me/919503423737?text=Hi! I need help with my account.`}
                  target="_blank"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: "#25D366", color: "#25D366",
                    fontWeight: 700, borderRadius: "10px", py: 1.3,
                    "&:hover": { background: "#f0fff4", borderColor: "#25D366" },
                  }}>
                  💬 Need help? WhatsApp Us
                </Button>

                <Typography textAlign="center" variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Box
                    component="span"
                    onClick={() => setTab(1)}
                    sx={{ color: "#c72026", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                    Register here
                  </Box>
                </Typography>
              </Box>
            )}

            {/* ══ REGISTER FORM ══ */}
            {tab === 1 && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  label="Full Name"
                  fullWidth sx={fx}
                  value={regForm.name}
                  onChange={(e) => setRegForm(f => ({ ...f, name: e.target.value }))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">👤</InputAdornment>,
                  }}
                />
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth sx={fx}
                  value={regForm.email}
                  onChange={(e) => setRegForm(f => ({ ...f, email: e.target.value }))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">✉️</InputAdornment>,
                  }}
                />
                <TextField
                  label="Password"
                  type={showPass ? "text" : "password"}
                  fullWidth sx={fx}
                  value={regForm.password}
                  onChange={(e) => setRegForm(f => ({ ...f, password: e.target.value }))}
                  helperText="Minimum 6 characters"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)} edge="end" size="small">
                          <Typography fontSize={16}>{showPass ? "🙈" : "👁️"}</Typography>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  type={showPass ? "text" : "password"}
                  fullWidth sx={fx}
                  value={regForm.confirm}
                  onChange={(e) => setRegForm(f => ({ ...f, confirm: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
                  }}
                />

                <Button
                  onClick={handleRegister}
                  disabled={loading}
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    background: "linear-gradient(135deg, #c72026, #e53935)",
                    fontWeight: 800, borderRadius: "10px", py: 1.6, fontSize: 15,
                    "&:hover": { background: "linear-gradient(135deg, #a51a1a, #c62828)" },
                    "&:disabled": { background: "#ccc" },
                  }}>
                  {loading ? <CircularProgress size={22} color="inherit" /> : "Create Account →"}
                </Button>

                <Typography textAlign="center" variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Box
                    component="span"
                    onClick={() => setTab(0)}
                    sx={{ color: "#c72026", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                    Login here
                  </Box>
                </Typography>
              </Box>
            )}
          </Box>

          {/* ── Footer ── */}
          <Box sx={{
            px: 4, py: 2, background: "#f9f9f9",
            borderTop: "1px solid #f0f0f0", textAlign: "center",
          }}>
            <Typography variant="caption" color="text.secondary">
              🔒 Your data is safe with us · Est. 1999 · Kadegaon, Sangli
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}