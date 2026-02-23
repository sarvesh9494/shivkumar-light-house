// src/pages/AdminPage.js
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box, Container, Typography, TextField, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Dialog,
  DialogTitle, DialogContent, DialogActions, MenuItem, Select,
  InputLabel, FormControl, IconButton, Chip, InputAdornment,
  Snackbar, Alert, Tabs, Tab, Card, CardContent, Grid,
  Tooltip, CircularProgress, Pagination, Switch, FormControlLabel,
} from "@mui/material";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const PRODUCT_CATEGORIES = [
  "Fans", "Bulbs", "Switches", "Wires", "Inverters",
  "Table Fans", "MCBs", "Mixers", "Geysers", "Tubelights", "Batteries",
];

const emptyProduct = {
  name: "", price: "", mrp: "", description: "", category: "", image: "", features: "", stock: 0, rating: 4,
};

const fx = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": { borderColor: "#c72026" },
    "&.Mui-focused fieldset": { borderColor: "#c72026" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#c72026" },
};

// ── Fit options (how image fills the banner box) ──────────────────────────
const FIT_OPTIONS = [
  { value: "cover",   label: "Cover — fills box, crops edges (best for most photos)" },
  { value: "contain", label: "Contain — shows full image with blank sides" },
  { value: "fill",    label: "Fill — stretches to fit (may distort)" },
];

// ── 9 focus point positions laid out as a 3×3 grid ───────────────────────
const FOCUS_POINTS = [
  { value: "left top",      label: "↖ Top Left"     },
  { value: "center top",    label: "↑ Top Center"   },
  { value: "right top",     label: "↗ Top Right"    },
  { value: "left center",   label: "← Left Middle"  },
  { value: "center center", label: "✛ Center"       },
  { value: "right center",  label: "→ Right Middle" },
  { value: "left bottom",   label: "↙ Bottom Left"  },
  { value: "center bottom", label: "↓ Bottom Center"},
  { value: "right bottom",  label: "↘ Bottom Right" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Focus Point Picker — 3×3 grid of clickable buttons
// ─────────────────────────────────────────────────────────────────────────────
function FocusPointPicker({ value, onChange }) {
  return (
    <Box>
      <Typography variant="caption" fontWeight={700} color="text.secondary"
        sx={{ display: "block", mb: 0.8, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Focus Point (what to keep in view when cropped)
      </Typography>
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "4px",
        width: "138px",
      }}>
        {FOCUS_POINTS.map((point) => {
          const isActive = value === point.value;
          return (
            <Tooltip key={point.value} title={point.label} placement="top">
              <Box
                onClick={() => onChange(point.value)}
                sx={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "6px",
                  border: isActive ? "2px solid #c72026" : "2px solid #ddd",
                  background: isActive ? "#ffebee" : "#f9f9f9",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  transition: "all 0.15s",
                  "&:hover": {
                    border: "2px solid #c72026",
                    background: "#fff3f3",
                    transform: "scale(1.08)",
                  },
                }}
              >
                {point.label.split(" ")[0]}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
        Selected: <strong>{FOCUS_POINTS.find(p => p.value === value)?.label || "Center"}</strong>
      </Typography>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Banner Preview — full width, 3:1 aspect ratio, loading states
// ─────────────────────────────────────────────────────────────────────────────
function BannerPreview({ image, fit, position }) {
  const [status, setStatus] = useState("idle");
  useEffect(() => { setStatus(image ? "loading" : "idle"); }, [image]);

  if (!image) {
    return (
      <Box sx={{
        width: "100%", paddingTop: "33%", position: "relative",
        borderRadius: "10px", border: "2px dashed #ddd", background: "#fafafa",
      }}>
        <Box sx={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 0.8,
        }}>
          <Typography fontSize={32}>🖼️</Typography>
          <Typography variant="caption" color="text.secondary" textAlign="center">
            Paste an image URL above to see a live preview
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Label row */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="caption" fontWeight={700} color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}>
          🔍 Live Preview
        </Typography>
        <Chip
          label={`${fit || "cover"} · ${position || "center center"}`}
          size="small"
          sx={{ fontSize: 10, background: "#f0f0f0", color: "#555", fontWeight: 600 }}
        />
      </Box>

      {/* Aspect ratio container — 3:1 matches your real banner */}
      <Box sx={{
        width: "100%",
        paddingTop: "33%",
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        border: "2px solid #e0e0e0",
        background: "#f0f0f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <Box sx={{ position: "absolute", inset: 0 }}>
          {/* Loading overlay */}
          {status === "loading" && (
            <Box sx={{
              position: "absolute", inset: 0, zIndex: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "#f5f5f5",
            }}>
              <CircularProgress size={28} sx={{ color: "#c72026" }} />
            </Box>
          )}
          {/* Error state */}
          {status === "error" ? (
            <Box sx={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 0.5, p: 2,
            }}>
              <Typography fontSize={28}>⚠️</Typography>
              <Typography variant="caption" color="error" fontWeight={700}>Could not load image</Typography>
              <Typography variant="caption" color="text.secondary"
                sx={{ wordBreak: "break-all", textAlign: "center", maxWidth: "90%" }}>
                {image}
              </Typography>
            </Box>
          ) : (
            <Box
              component="img"
              src={image}
              alt="Banner preview"
              onLoad={() => setStatus("ok")}
              onError={() => setStatus("error")}
              sx={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: fit || "cover",
                objectPosition: position || "center center",
                display: "block",
              }}
            />
          )}
        </Box>
      </Box>

      {/* Status below */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.8 }}>
        {status === "ok" && (
          <Chip label="✅ Loaded" size="small"
            sx={{ background: "#e8f5e9", color: "#2e7d32", fontWeight: 700, fontSize: 10 }} />
        )}
        <Typography variant="caption" color="text.secondary">
          Matches the actual banner proportions on your homepage
        </Typography>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Banner Row — full editor card for one banner
// ─────────────────────────────────────────────────────────────────────────────
function BannerRow({ item, onChange, onDelete }) {
  return (
    <Box sx={{
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      mb: 2,
      overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      background: "#fff",
    }}>
      {/* Header bar */}
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 2, py: 1.2, background: "#fafafa", borderBottom: "1px solid #eee",
      }}>
        <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
          🖼️ {item.title || `Banner ${item.id}`}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={item.active}
                size="small"
                onChange={(e) => onChange({ ...item, active: e.target.checked })}
                sx={{
                  "& .Mui-checked": { color: "#c72026" },
                  "& .Mui-checked + .MuiSwitch-track": { backgroundColor: "#c72026" },
                }}
              />
            }
            label={
              <Chip
                label={item.active ? "Visible" : "Hidden"}
                size="small"
                sx={{
                  background: item.active ? "#e8f5e9" : "#ffebee",
                  color: item.active ? "#2e7d32" : "#c62828",
                  fontWeight: 700, fontSize: 11,
                }}
              />
            }
          />
          <Tooltip title="Remove banner">
            <IconButton size="small" onClick={onDelete}
              sx={{ color: "#c72026", border: "1px solid #ffcdd2", "&:hover": { background: "#ffebee" } }}>
              🗑️
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ p: 2.5 }}>
        {/* Row 1: Title + Image URL */}
        <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
          <TextField
            label="Banner Title"
            value={item.title || ""}
            size="small"
            sx={{ ...fx, width: 160 }}
            onChange={(e) => onChange({ ...item, title: e.target.value })}
          />
          <TextField
            label="Image URL or /path/to/image.jpg"
            value={item.image}
            size="small"
            sx={{ ...fx, flex: 1 }}
            placeholder="https://... or /images/banner1.jpg"
            onChange={(e) => onChange({ ...item, image: e.target.value })}
          />
        </Box>

        {/* Row 2: Fit selector + Focus point picker — side by side */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", alignItems: "flex-start", mb: 2.5 }}>
          {/* Fit type */}
          <Box sx={{ minWidth: 220 }}>
            <Typography variant="caption" fontWeight={700} color="text.secondary"
              sx={{ display: "block", mb: 0.8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Image Fit
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              {FIT_OPTIONS.map((opt) => (
                <Box
                  key={opt.value}
                  onClick={() => onChange({ ...item, fit: opt.value })}
                  sx={{
                    px: 1.5, py: 1, borderRadius: "8px", cursor: "pointer",
                    border: (item.fit || "cover") === opt.value
                      ? "2px solid #c72026" : "2px solid #eee",
                    background: (item.fit || "cover") === opt.value ? "#ffebee" : "#fafafa",
                    transition: "all 0.15s",
                    "&:hover": { border: "2px solid #c72026", background: "#fff3f3" },
                  }}
                >
                  <Typography variant="caption" fontWeight={700} fontSize={12}
                    color={(item.fit || "cover") === opt.value ? "#c72026" : "text.primary"}>
                    {opt.label.split(" — ")[0]}
                  </Typography>
                  <Typography variant="caption" color="text.secondary"
                    sx={{ display: "block", fontSize: 11 }}>
                    {opt.label.split(" — ")[1]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Focus Point picker — only shown when fit=cover */}
          {(item.fit || "cover") === "cover" && (
            <FocusPointPicker
              value={item.position || "center center"}
              onChange={(pos) => onChange({ ...item, position: pos })}
            />
          )}
        </Box>

        {/* Row 3: Live preview — FULL WIDTH below controls */}
        <BannerPreview
          image={item.image}
          fit={item.fit || "cover"}
          position={item.position || "center center"}
        />
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Remaining shared components (unchanged)
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({ label, value, color, icon }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", borderLeft: `4px solid ${color}` }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 2.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={700}
            textTransform="uppercase" letterSpacing={1}>{label}</Typography>
          <Typography variant="h4" fontWeight={900} sx={{ color, mt: 0.3 }}>{value}</Typography>
        </Box>
        <Box sx={{ fontSize: 40, opacity: 0.12 }}>{icon}</Box>
      </CardContent>
    </Card>
  );
}

function ImgPreview({ src, size = 50 }) {
  const [err, setErr] = useState(false);
  useEffect(() => setErr(false), [src]);
  return (
    <Box component="img"
      src={err || !src ? `https://via.placeholder.com/${size}?text=?` : src}
      onError={() => setErr(true)}
      sx={{ width: size, height: size, objectFit: "contain", borderRadius: 1,
        border: "1px solid #eee", p: 0.5, background: "#fafafa", flexShrink: 0 }}
    />
  );
}

function ProductFormDialog({ open, onClose, onSave, initialData, mode }) {
  const [form, setForm] = useState({ ...emptyProduct });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData ? { ...initialData } : { ...emptyProduct });
    setErrors({});
  }, [initialData, open]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Valid price required";
    if (!form.category) e.category = "Category is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSaving(true);
    await onSave({
      ...form,
      price: Number(form.price),
      mrp: form.mrp ? Number(form.mrp) : null,
      stock: Number(form.stock || 0),
      features: typeof form.features === "string"
        ? form.features.split(",").map(f => f.trim()).filter(Boolean)
        : (form.features || []),
    });
    setSaving(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 24px 48px rgba(0,0,0,0.2)" } }}>
      <DialogTitle sx={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #c72026 100%)",
        color: "#fff", fontWeight: 800, fontSize: 18, py: 2.5,
      }}>
        {mode === "add" ? "➕ Add New Product" : "✏️ Edit Product"}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 0.5 }}>
          <TextField label="Product Name *" value={form.name} onChange={set("name")}
            fullWidth size="small" sx={fx} error={!!errors.name} helperText={errors.name} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField label="Price (₹) *" value={form.price} onChange={set("price")}
              type="number" fullWidth size="small" sx={fx}
              error={!!errors.price} helperText={errors.price}
              InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
            <TextField label="Stock" value={form.stock} onChange={set("stock")}
              type="number" fullWidth size="small" sx={fx} inputProps={{ min: 0 }} />
          </Box>
          <FormControl fullWidth size="small" sx={fx} error={!!errors.category}>
            <InputLabel>Category *</InputLabel>
            <Select value={form.category} label="Category *" onChange={set("category")}>
              {PRODUCT_CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
            {errors.category && (
              <Typography variant="caption" color="error" sx={{ ml: 1.5, mt: 0.3 }}>
                {errors.category}
              </Typography>
            )}
          </FormControl>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField label="MRP (₹)" value={form.mrp || ""} onChange={set("mrp")}
              type="number" fullWidth size="small" sx={fx}
              helperText="Optional — shows discount % if MRP > Price"
              InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
          </Box>
          <TextField label="Image URL / Path" value={form.image} onChange={set("image")}
            fullWidth size="small" sx={fx} placeholder="/images/product.jpg" />
          {form.image && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box component="img" src={form.image} alt="preview"
                onError={(e) => { e.target.style.display = "none"; }}
                sx={{ maxHeight: 100, maxWidth: "100%", objectFit: "contain",
                  border: "1px solid #eee", borderRadius: 1, p: 1 }} />
            </Box>
          )}
          <TextField label="Description" value={form.description} onChange={set("description")}
            fullWidth multiline rows={3} size="small" sx={fx} />
          <TextField label="Key Features (comma separated)"
            value={Array.isArray(form.features) ? form.features.join(", ") : (form.features || "")}
            onChange={(e) => setForm(f => ({ ...f, features: e.target.value }))}
            fullWidth multiline rows={2} size="small" sx={fx}
            placeholder="Energy saving, 5 star rated, BEE certified, Rust proof body"
            helperText="Separate each feature with a comma — shows as bullet points on product page" />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2.5 }}>
        <Button onClick={onClose} sx={{ color: "#666", fontWeight: 600 }}>Cancel</Button>
        <Button onClick={submit} variant="contained" disabled={saving} sx={{
          background: "linear-gradient(135deg, #c72026, #e53935)", fontWeight: 700, px: 4, borderRadius: 2,
          "&:hover": { background: "linear-gradient(135deg, #a51a1a, #c62828)" },
        }}>
          {saving ? <CircularProgress size={18} color="inherit" /> : (mode === "add" ? "Add Product" : "Save Changes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DeleteDialog({ open, onClose, onConfirm, name }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 800, color: "#c72026" }}>🗑️ Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete <strong>"{name}"</strong>? This cannot be undone.</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderColor: "#ccc", color: "#666" }}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained"
          sx={{ background: "#c72026", "&:hover": { background: "#a51a1a" }, fontWeight: 700 }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const rowStyle = {
  display: "flex", gap: 2, alignItems: "center", p: 1.5,
  borderRadius: 2, background: "#fafafa", border: "1px solid #eee", mb: 1.5,
};

const switchSx = {
  "& .Mui-checked": { color: "#c72026" },
  "& .Mui-checked + .MuiSwitch-track": { backgroundColor: "#c72026" },
};

function ActiveSwitch({ checked, onChange }) {
  return (
    <FormControlLabel
      control={<Switch checked={checked} size="small" onChange={onChange} sx={switchSx} />}
      label={<Typography variant="caption" fontWeight={600}>{checked ? "On" : "Off"}</Typography>}
    />
  );
}

function DeleteBtn({ onClick }) {
  return (
    <Tooltip title="Remove">
      <IconButton size="small" onClick={onClick}
        sx={{ color: "#c72026", border: "1px solid #ffcdd2", "&:hover": { background: "#ffebee" } }}>
        🗑️
      </IconButton>
    </Tooltip>
  );
}

function BrandRow({ item, onChange, onDelete }) {
  return (
    <Box sx={rowStyle}>
      <ImgPreview src={item.image} size={60} />
      <TextField label="Brand Name" value={item.name} size="small" sx={{ ...fx, width: 130 }}
        onChange={(e) => onChange({ ...item, name: e.target.value })} />
      <TextField label="Image URL / Path" value={item.image} size="small" sx={{ ...fx, flex: 1 }}
        onChange={(e) => onChange({ ...item, image: e.target.value })} />
      <FormControl size="small" sx={{ ...fx, width: 100 }}>
        <InputLabel>Row</InputLabel>
        <Select value={item.row} label="Row"
          onChange={(e) => onChange({ ...item, row: Number(e.target.value) })}>
          <MenuItem value={1}>Row 1</MenuItem>
          <MenuItem value={2}>Row 2</MenuItem>
        </Select>
      </FormControl>
      <ActiveSwitch checked={item.active} onChange={(e) => onChange({ ...item, active: e.target.checked })} />
      <DeleteBtn onClick={onDelete} />
    </Box>
  );
}

function CategoryRow({ item, onChange, onDelete }) {
  return (
    <Box sx={rowStyle}>
      <ImgPreview src={item.icon} size={50} />
      <TextField label="Category Name" value={item.name} size="small" sx={{ ...fx, width: 150 }}
        onChange={(e) => onChange({ ...item, name: e.target.value })} />
      <TextField label="Icon URL / Path" value={item.icon} size="small" sx={{ ...fx, flex: 1 }}
        onChange={(e) => onChange({ ...item, icon: e.target.value })} />
      <ActiveSwitch checked={item.active} onChange={(e) => onChange({ ...item, active: e.target.checked })} />
      <DeleteBtn onClick={onDelete} />
    </Box>
  );
}

function EditorSection({ title, icon, children, onSave, saving, unsaved }) {
  return (
    <Paper sx={{ borderRadius: 3, overflow: "hidden", mb: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <Box sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        px: 3, py: 2, background: unsaved ? "#fff8e1" : "#fff",
        borderBottom: "1px solid #eee", transition: "background 0.3s",
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography fontSize={22}>{icon}</Typography>
          <Typography variant="h6" fontWeight={800}>{title}</Typography>
          {unsaved && (
            <Chip label="Unsaved changes" size="small"
              sx={{ background: "#fff3cd", color: "#856404", fontWeight: 700, fontSize: 11 }} />
          )}
        </Box>
        <Button variant="contained" onClick={onSave} disabled={saving || !unsaved} sx={{
          background: unsaved ? "#c72026" : "#bbb", fontWeight: 700, borderRadius: 2, px: 3,
          "&:hover": { background: unsaved ? "#a51a1a" : "#bbb" },
        }}>
          {saving ? <CircularProgress size={16} color="inherit" /> : "💾 Save Changes"}
        </Button>
      </Box>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Paper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HomepageEditor
// ─────────────────────────────────────────────────────────────────────────────
function HomepageEditor({ notify }) {
  const [banners, setBanners] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({ banners: false, brands: false, categories: false });
  const originalRef = useRef({ banners: [], brands: [], categories: [] });

  const isDirty = (key, current) =>
    JSON.stringify(current) !== JSON.stringify(originalRef.current[key]);

  useEffect(() => {
    axios.get(`${API}/api/config`)
      .then((res) => {
        const d = res.data;
        const b = d.banners || [];
        const br = d.brands || [];
        const c = d.categories || [];
        setBanners(b);
        setBrands(br);
        setCategories(c);
        originalRef.current = {
          banners: JSON.parse(JSON.stringify(b)),
          brands: JSON.parse(JSON.stringify(br)),
          categories: JSON.parse(JSON.stringify(c)),
        };
        setLoading(false);
      })
      .catch(() => {
        notify("Failed to load homepage config", "error");
        setLoading(false);
      });
  }, [notify]);

  const saveKey = async (key, value) => {
    setSaving((s) => ({ ...s, [key]: true }));
    try {
      await axios.put(`${API}/api/config/${key}`, { value });
      originalRef.current = {
        ...originalRef.current,
        [key]: JSON.parse(JSON.stringify(value)),
      };
      notify(`${key.charAt(0).toUpperCase() + key.slice(1)} saved! ✅`);
    } catch {
      notify(`Failed to save ${key}`, "error");
    }
    setSaving((s) => ({ ...s, [key]: false }));
  };

  const nextId = (arr) => Math.max(0, ...arr.map((i) => i.id || 0)) + 1;
  const updateItem = (setter, arr, index, updated) => setter(arr.map((x, i) => (i === index ? updated : x)));
  const removeItem = (setter, arr, index) => setter(arr.filter((_, i) => i !== index));

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress sx={{ color: "#c72026" }} />
      </Box>
    );
  }

  return (
    <Box>
      {/* ── BANNERS ── */}
      <EditorSection
        title="Hero Banner Slides" icon="🖼️"
        onSave={() => saveKey("banners", banners)}
        saving={saving.banners} unsaved={isDirty("banners", banners)}
      >
        <Typography variant="body2" color="text.secondary" mb={2.5}>
          Add image URLs, choose how each image fits the banner, and use the
          <strong> Focus Point</strong> grid to pick which part of the image
          stays visible when it's cropped on smaller screens.
        </Typography>
        {banners.map((b, i) => (
          <BannerRow
            key={b.id}
            item={b}
            onChange={(updated) => updateItem(setBanners, banners, i, updated)}
            onDelete={() => removeItem(setBanners, banners, i)}
          />
        ))}
        <Button variant="outlined"
          onClick={() => setBanners((arr) => [...arr, {
            id: nextId(arr), image: "", title: `Banner ${nextId(arr)}`,
            active: true, fit: "cover", position: "center center",
          }])}
          sx={{ borderColor: "#c72026", color: "#c72026", fontWeight: 700, mt: 1 }}>
          + Add Banner
        </Button>
      </EditorSection>

      {/* ── BRANDS ── */}
      <EditorSection
        title="Brands Section" icon="🏷️"
        onSave={() => saveKey("brands", brands)}
        saving={saving.brands} unsaved={isDirty("brands", brands)}
      >
        <Typography variant="body2" color="text.secondary" mb={2}>
          Row 1 shows 3 large banners. Row 2 shows up to 5 smaller brand cards.
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} mb={1} sx={{ color: "#555" }}>ROW 1 — Large</Typography>
        {brands.filter((b) => b.row === 1).map((b) => {
          const i = brands.findIndex((x) => x.id === b.id);
          return <BrandRow key={b.id} item={b}
            onChange={(u) => updateItem(setBrands, brands, i, u)}
            onDelete={() => removeItem(setBrands, brands, i)} />;
        })}
        <Typography variant="subtitle2" fontWeight={700} mb={1} mt={2} sx={{ color: "#555" }}>ROW 2 — Small</Typography>
        {brands.filter((b) => b.row === 2).map((b) => {
          const i = brands.findIndex((x) => x.id === b.id);
          return <BrandRow key={b.id} item={b}
            onChange={(u) => updateItem(setBrands, brands, i, u)}
            onDelete={() => removeItem(setBrands, brands, i)} />;
        })}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="outlined"
            onClick={() => setBrands((arr) => [...arr, { id: nextId(arr), name: "New Brand", image: "", row: 1, active: true }])}
            sx={{ borderColor: "#c72026", color: "#c72026", fontWeight: 700 }}>+ Add to Row 1</Button>
          <Button variant="outlined"
            onClick={() => setBrands((arr) => [...arr, { id: nextId(arr), name: "New Brand", image: "", row: 2, active: true }])}
            sx={{ borderColor: "#1565c0", color: "#1565c0", fontWeight: 700 }}>+ Add to Row 2</Button>
        </Box>
      </EditorSection>

      {/* ── CATEGORIES ── */}
      <EditorSection
        title="Category Icons" icon="🗂️"
        onSave={() => saveKey("categories", categories)}
        saving={saving.categories} unsaved={isDirty("categories", categories)}
      >
        <Typography variant="body2" color="text.secondary" mb={2}>
          These icons appear in the "Shop By Category" scrollable row.
        </Typography>
        {categories.map((c, i) => (
          <CategoryRow key={c.id} item={c}
            onChange={(u) => updateItem(setCategories, categories, i, u)}
            onDelete={() => removeItem(setCategories, categories, i)} />
        ))}
        <Button variant="outlined"
          onClick={() => setCategories((arr) => [...arr, { id: nextId(arr), name: "New Category", icon: "", active: true }])}
          sx={{ borderColor: "#c72026", color: "#c72026", fontWeight: 700, mt: 1 }}>
          + Add Category
        </Button>
      </EditorSection>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main AdminPage
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [sortField, setSortField] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;
  const [addOpen, setAddOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  const notify = useCallback(
    (msg, severity = "success") => setSnack({ open: true, msg, severity }),
    []
  );

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/products`);
      setProducts(res.data || []);
    } catch {
      notify("Failed to load products", "error");
    }
    setLoading(false);
  }, [notify]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const totalValue = products.reduce((s, p) => s + (p.price || 0), 0);
  const inStock = products.filter((p) => (p.stock || 0) > 0).length;
  const uniqueCats = [...new Set(products.map((p) => p.category))].length;

  const filtered = products
    .filter((p) => {
      const q = search.toLowerCase();
      return (
        (p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)) &&
        (filterCat === "All" || p.category === filterCat)
      );
    })
    .sort((a, b) => {
      let va = a[sortField] ?? "", vb = b[sortField] ?? "";
      if (typeof va === "string") { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      return sortDir === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSort = (f) => {
    if (sortField === f) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(f); setSortDir("asc"); }
  };

  const handleAdd = async (data) => {
    try { await axios.post(`${API}/api/products`, data); notify("Product added! ✅"); fetchProducts(); setAddOpen(false); }
    catch { notify("Failed to add product", "error"); }
  };
  const handleEdit = async (data) => {
    try { await axios.put(`${API}/api/products/${editData._id}`, data); notify("Product updated! ✅"); fetchProducts(); setEditData(null); }
    catch { notify("Failed to update product", "error"); }
  };
  const handleDelete = async () => {
    try { await axios.delete(`${API}/api/products/${deleteTarget._id}`); notify("Product deleted! 🗑️"); fetchProducts(); setDeleteTarget(null); }
    catch { notify("Failed to delete", "error"); }
  };

  const SortArrow = ({ f }) => (
    <span style={{ opacity: sortField === f ? 1 : 0.25, fontSize: 11 }}>
      {sortField === f ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕"}
    </span>
  );

  const TH = ({ label, field }) => (
    <TableCell onClick={() => field && toggleSort(field)}
      sx={{ color: "#fff", fontWeight: 700, fontSize: 12, cursor: field ? "pointer" : "default",
        userSelect: "none", "&:hover": field ? { color: "#ffcdd2" } : {} }}>
      {label}{field && <SortArrow f={field} />}
    </TableCell>
  );

  return (
    <Box sx={{ minHeight: "100vh", background: "#f0f2f7" }}>
      <Box sx={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
        color: "#fff", px: 4, py: 3,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}>
        <Box>
          <Typography variant="h5" fontWeight={900} letterSpacing={0.5}>⚡ Admin Panel</Typography>
          <Typography variant="body2" sx={{ opacity: 0.55, mt: 0.3 }}>Shivkumar Light House</Typography>
        </Box>
        <Button variant="contained" onClick={() => setAddOpen(true)} sx={{
          background: "#c72026", fontWeight: 700, borderRadius: 2, px: 3,
          "&:hover": { background: "#a51a1a" },
        }}>+ Add Product</Button>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3} mb={4}>
          <Grid item xs={6} sm={3}><StatCard label="Total Products" value={products.length} color="#c72026" icon="📦" /></Grid>
          <Grid item xs={6} sm={3}><StatCard label="Categories" value={uniqueCats} color="#1565c0" icon="🏷️" /></Grid>
          <Grid item xs={6} sm={3}><StatCard label="In Stock" value={inStock} color="#2e7d32" icon="✅" /></Grid>
          <Grid item xs={6} sm={3}><StatCard label="Catalog Value" value={`₹${totalValue.toLocaleString()}`} color="#f57f17" icon="💰" /></Grid>
        </Grid>

        <Paper sx={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
          <Box sx={{ borderBottom: "1px solid #eee", px: 2, background: "#fff" }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{
              "& .MuiTab-root": { fontWeight: 700, fontSize: 13 },
              "& .Mui-selected": { color: "#c72026" },
              "& .MuiTabs-indicator": { background: "#c72026" },
            }}>
              <Tab label={`📦 Products (${products.length})`} />
              <Tab label="🏠 Homepage Editor" />
            </Tabs>
          </Box>

          {tab === 0 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
                <TextField placeholder="🔍 Search products..." value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  size="small" sx={{ minWidth: 240, ...fx }} />
                <FormControl size="small" sx={{ minWidth: 160, ...fx }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={filterCat} label="Category"
                    onChange={(e) => { setFilterCat(e.target.value); setPage(1); }}>
                    <MenuItem value="All">All Categories</MenuItem>
                    {PRODUCT_CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 130, ...fx }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sortField} label="Sort By" onChange={(e) => setSortField(e.target.value)}>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                    <MenuItem value="stock">Stock</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined" onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
                  sx={{ borderColor: "#c72026", color: "#c72026", fontWeight: 700, minWidth: 90 }}>
                  {sortDir === "asc" ? "↑ Asc" : "↓ Desc"}
                </Button>
                {(search || filterCat !== "All") && (
                  <Button size="small" onClick={() => { setSearch(""); setFilterCat("All"); setPage(1); }}
                    sx={{ color: "#999", textDecoration: "underline" }}>Clear</Button>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
                  <strong>{paginated.length}</strong> / <strong>{filtered.length}</strong> shown
                </Typography>
              </Box>

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "#c72026" }} />
                </Box>
              ) : (
                <TableContainer sx={{ borderRadius: 2, border: "1px solid #eee" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ background: "#1a1a2e" }}>
                        <TH label="Image" /><TH label="Name" field="name" />
                        <TH label="Category" field="category" /><TH label="Price" field="price" />
                        <TH label="Stock" field="stock" /><TH label="Actions" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginated.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 6, color: "#aaa" }}>
                            No products match your filters.
                          </TableCell>
                        </TableRow>
                      ) : paginated.map((p, i) => (
                        <TableRow key={p._id} sx={{
                          background: i % 2 === 0 ? "#fff" : "#fafafa",
                          "&:hover": { background: "#fff3f3" }, transition: "background 0.15s",
                        }}>
                          <TableCell><ImgPreview src={p.image} /></TableCell>
                          <TableCell>
                            <Typography fontWeight={600} fontSize={13}>{p.name}</Typography>
                            <Typography variant="caption" color="text.secondary"
                              sx={{ display: "block", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {p.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={p.category} size="small"
                              sx={{ background: "#fff3e0", color: "#e65100", fontWeight: 600, fontSize: 11 }} />
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight={800} color="#c72026">₹{p.price?.toLocaleString()}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={(p.stock || 0) > 0 ? `${p.stock} in stock` : "Out of Stock"}
                              size="small"
                              sx={{
                                background: (p.stock || 0) > 0 ? "#e8f5e9" : "#ffebee",
                                color: (p.stock || 0) > 0 ? "#2e7d32" : "#c62828",
                                fontWeight: 600, fontSize: 11,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", gap: 0.8 }}>
                              <Tooltip title="Edit">
                                <IconButton size="small" onClick={() => setEditData(p)}
                                  sx={{ color: "#1565c0", border: "1px solid #bbdefb", "&:hover": { background: "#e3f2fd" } }}>✏️</IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" onClick={() => setDeleteTarget(p)}
                                  sx={{ color: "#c72026", border: "1px solid #ffcdd2", "&:hover": { background: "#ffebee" } }}>🗑️</IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)}
                    sx={{ "& .MuiPaginationItem-root.Mui-selected": { background: "#c72026", color: "#fff" } }} />
                </Box>
              )}
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ p: 3 }}>
              <HomepageEditor notify={notify} />
            </Box>
          )}
        </Paper>
      </Container>

      <ProductFormDialog open={addOpen} onClose={() => setAddOpen(false)} onSave={handleAdd} initialData={emptyProduct} mode="add" />
      <ProductFormDialog open={!!editData} onClose={() => setEditData(null)} onSave={handleEdit} initialData={editData} mode="edit" />
      <DeleteDialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} name={deleteTarget?.name} />

      <Snackbar open={snack.open} autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snack.severity} variant="filled"
          onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}