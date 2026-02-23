// src/pages/ContactPage.js
import React, { useState } from "react";
import {
  Box, Container, Typography, Grid, Card, CardContent,
  TextField, Button, Divider, Snackbar, Alert,
} from "@mui/material";

const PHONE = "9503423737";
const WA_LINK = `https://wa.me/91${PHONE}`;
const EMAIL = "shivkumarlighthouse@gmail.com";
const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d74.3307349!3d17.2968224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc17bc72314408f%3A0x23d96422f80ca521!2sShivkumar%20Light%20House!5e0!3m2!1sen!2sin!4v1234567890";
const MAPS_LINK = "https://www.google.com/maps/place/Shivkumar+Light+House/@17.2968224,74.3307349,17z";

const CONTACT_INFO = [
  {
    icon: "📍",
    title: "Our Address",
    lines: ["Main Road, Kadegaon,", "Sangli, Maharashtra, India"],
    action: { label: "Get Directions", href: MAPS_LINK },
    color: "#c72026",
  },
  {
    icon: "📞",
    title: "Phone",
    lines: [PHONE],
    action: { label: "Call Now", href: `tel:${PHONE}` },
    color: "#1565c0",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    lines: [PHONE, "Quick replies on WhatsApp"],
    action: { label: "Chat on WhatsApp", href: WA_LINK },
    color: "#25D366",
  },
  {
    icon: "✉️",
    title: "Email",
    lines: [EMAIL],
    action: { label: "Send Email", href: `mailto:${EMAIL}` },
    color: "#f57f17",
  },
];

const HOURS = [
  { day: "Monday", time: "9:30 AM – 8:30 PM" },
  { day: "Tuesday", time: "9:30 AM – 8:30 PM" },
  { day: "Wednesday", time: "9:30 AM – 8:30 PM" },
  { day: "Thursday", time: "9:30 AM – 8:30 PM" },
  { day: "Friday", time: "9:30 AM – 8:30 PM" },
  { day: "Saturday", time: "9:30 AM – 8:30 PM" },
  { day: "Sunday", time: "9:30 AM – 8:30 PM" },
];

const fx = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": { borderColor: "#c72026" },
    "&.Mui-focused fieldset": { borderColor: "#c72026" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#c72026" },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleWhatsApp = () => {
    if (!form.name || !form.message) return;
    const text = encodeURIComponent(
      `Hello! My name is *${form.name}*.\n📞 ${form.phone}\n\n${form.message}`
    );
    window.open(`https://wa.me/91${PHONE}?text=${text}`, "_blank");
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <Box sx={{ background: "#f9f9f9", minHeight: "100vh" }}>

      {/* Hero */}
      <Box sx={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #c72026 100%)",
        color: "#fff", py: { xs: 5, md: 7 }, textAlign: "center",
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={900} gutterBottom sx={{ fontSize: { xs: 26, md: 38 } }}>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, fontSize: { xs: 14, md: 17 } }}>
            We're here to help — visit us, call, or WhatsApp anytime
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>

        {/* Contact Info Cards */}
        <Grid container spacing={3} mb={5}>
          {CONTACT_INFO.map((c) => (
            <Grid item xs={12} sm={6} md={3} key={c.title}>
              <Card sx={{
                borderRadius: 3, height: "100%",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                borderTop: `4px solid ${c.color}`,
                "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(0,0,0,0.1)" },
                transition: "all 0.2s",
              }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Typography fontSize={38} mb={1}>{c.icon}</Typography>
                  <Typography fontWeight={800} color="#1a1a2e" mb={1}>{c.title}</Typography>
                  {c.lines.map((l, i) => (
                    <Typography key={i} variant="body2" color="text.secondary" lineHeight={1.7}>{l}</Typography>
                  ))}
                  <Button
                    component="a" href={c.action.href} target="_blank"
                    size="small" variant="outlined" sx={{
                      mt: 2, borderColor: c.color, color: c.color, fontWeight: 700,
                      borderRadius: "8px", fontSize: 12,
                      "&:hover": { background: `${c.color}15` },
                    }}>
                    {c.action.label}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>

          {/* Left — Map + Hours */}
          <Grid item xs={12} md={7}>
            {/* Map */}
            <Typography variant="h5" fontWeight={800} color="#1a1a2e" mb={2}>
              📍 Find Us
            </Typography>
            <Box sx={{
              borderRadius: 3, overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              border: "2px solid #e0e0e0", mb: 3,
            }}>
              <iframe
                title="Shivkumar Light House Location"
                src={MAPS_EMBED}
                width="100%"
                height="300"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
            <Button
              component="a" href={MAPS_LINK} target="_blank"
              variant="contained" fullWidth
              sx={{
                background: "#c72026", fontWeight: 700, borderRadius: "10px", py: 1.5,
                "&:hover": { background: "#a51a1a" },
              }}>
              📍 Open in Google Maps
            </Button>

            {/* Business Hours */}
            <Typography variant="h5" fontWeight={800} color="#1a1a2e" mt={4} mb={2}>
              🕐 Business Hours
            </Typography>
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              {HOURS.map((h, i) => (
                <Box key={h.day} sx={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  px: 3, py: 1.5,
                  background: i % 2 === 0 ? "#fff" : "#fafafa",
                  borderBottom: i < HOURS.length - 1 ? "1px solid #f0f0f0" : "none",
                }}>
                  <Typography fontWeight={600} fontSize={14} color="#333">{h.day}</Typography>
                  <Typography fontSize={14} color="#c72026" fontWeight={700}>{h.time}</Typography>
                </Box>
              ))}
            </Card>
          </Grid>

          {/* Right — WhatsApp enquiry form */}
          <Grid item xs={12} md={5}>
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", overflow: "hidden" }}>
              <Box sx={{
                background: "linear-gradient(135deg, #1a1a2e, #c72026)",
                px: 3, py: 2.5,
              }}>
                <Typography fontWeight={900} color="#fff" fontSize={18}>
                  💬 Send us a Message
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  We'll reply on WhatsApp instantly
                </Typography>
              </Box>
              <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  label="Your Name *" size="small" fullWidth sx={fx}
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                />
                <TextField
                  label="Phone Number" size="small" fullWidth sx={fx}
                  value={form.phone}
                  onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                />
                <TextField
                  label="Your Message *" size="small" fullWidth multiline rows={5} sx={fx}
                  placeholder="Hi! I'm looking for ceiling fans / I need wires for..."
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                />
                <Button
                  onClick={handleWhatsApp}
                  variant="contained" fullWidth
                  disabled={!form.name || !form.message}
                  sx={{
                    background: "#25D366", fontWeight: 800, borderRadius: "10px",
                    py: 1.5, fontSize: 15,
                    "&:hover": { background: "#1ebe5d" },
                    "&:disabled": { background: "#ccc" },
                  }}>
                  💬 Send via WhatsApp
                </Button>
                <Divider>OR</Divider>
                <Button
                  component="a" href={`tel:${PHONE}`}
                  variant="outlined" fullWidth
                  sx={{
                    borderColor: "#c72026", color: "#c72026",
                    fontWeight: 700, borderRadius: "10px", py: 1.2,
                  }}>
                  📞 Call {PHONE}
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={sent} autoHideDuration={4000} onClose={() => setSent(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" onClose={() => setSent(false)}>
          Opening WhatsApp... We'll reply shortly! 🚀
        </Alert>
      </Snackbar>
    </Box>
  );
}