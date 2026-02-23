// src/pages/AboutPage.js
import React from "react";
import {
  Box, Container, Typography, Grid, Card, CardContent, Divider,
} from "@mui/material";

const STATS = [
  { value: "25+", label: "Years of Experience", icon: "🏆" },
  { value: "1999", label: "Established", icon: "📅" },
  { value: "50+", label: "Brands Available", icon: "🏷️" },
  { value: "10K+", label: "Happy Customers", icon: "😊" },
];

const BRANDS = [
  "Polycab", "Legrand", "GM", "Goldmedal", "Vinay",
  "Racold", "Usha", "Havells", "Anchor", "Finolex",
];

const VALUES = [
  { icon: "✅", title: "Quality Products", desc: "We stock only genuine, branded products from trusted manufacturers." },
  { icon: "💰", title: "Best Prices", desc: "Competitive pricing on all electrical items — no compromise on quality." },
  { icon: "🤝", title: "Expert Guidance", desc: "25+ years of expertise to help you choose the right product for your needs." },
  { icon: "🚀", title: "All Brands", desc: "From switches to geysers — we keep every major electrical brand under one roof." },
];

export default function AboutPage() {
  return (
    <Box sx={{ background: "#f9f9f9", minHeight: "100vh" }}>

      {/* ── Hero banner ── */}
      <Box sx={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #c72026 100%)",
        color: "#fff", py: { xs: 6, md: 8 }, textAlign: "center",
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={900} gutterBottom sx={{ fontSize: { xs: 28, md: 40 } }}>
            About Shivkumar Light House
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.85, fontWeight: 400, fontSize: { xs: 15, md: 18 } }}>
            Kadegaon's Most Trusted Electrical Store Since 1999
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>

        {/* ── Stats row ── */}
        <Grid container spacing={3} mb={6}>
          {STATS.map((s) => (
            <Grid item xs={6} md={3} key={s.label}>
              <Card sx={{
                textAlign: "center", borderRadius: 3, p: 2,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                borderTop: "4px solid #c72026",
              }}>
                <Typography fontSize={36}>{s.icon}</Typography>
                <Typography variant="h4" fontWeight={900} color="#c72026">{s.value}</Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={600}>{s.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ── Our Story ── */}
        <Grid container spacing={5} alignItems="center" mb={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={900} color="#1a1a2e" mb={2}>
              Our Story
            </Typography>
            <Divider sx={{ borderColor: "#c72026", borderWidth: 2, width: 60, mb: 3 }} />
            <Typography variant="body1" color="text.secondary" lineHeight={1.9} mb={2}>
              Shivkumar Light House was founded in <strong>1999</strong> by{" "}
              <strong>Nilkanth Mahajan</strong> with a simple mission — to provide
              the people of Kadegaon and surrounding areas with high-quality electrical
              products at fair prices.
            </Typography>
            <Typography variant="body1" color="text.secondary" lineHeight={1.9} mb={2}>
              What started as a small shop on Main Road has grown into one of the most
              trusted electrical stores in Sangli district. Over <strong>25+ years</strong>,
              we have built lasting relationships with thousands of customers — homeowners,
              electricians, builders, and businesses alike.
            </Typography>
            <Typography variant="body1" color="text.secondary" lineHeight={1.9}>
              We take pride in stocking <strong>all major brands</strong> under one roof —
              from ceiling fans and LED bulbs to inverters, MCBs, geysers and wires.
              When you walk into Shivkumar Light House, you walk out with exactly what you need.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
              borderRadius: 4, p: 4, color: "#fff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Box sx={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "#c72026",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, flexShrink: 0,
                }}>
                  👨‍💼
                </Box>
                <Box>
                  <Typography fontWeight={900} fontSize={18}>Nilkanth Mahajan</Typography>
                  <Typography fontSize={13} sx={{ opacity: 0.7 }}>Founder, Shivkumar Light House</Typography>
                </Box>
              </Box>
              <Typography sx={{ opacity: 0.85, lineHeight: 1.8, fontStyle: "italic", fontSize: 15 }}>
                "Our goal has always been simple — give every customer the right product
                at the right price, with honest advice. That's how we've earned trust
                for 25 years and that's how we'll continue."
              </Typography>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", my: 2.5 }} />
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box>
                  <Typography fontWeight={900} fontSize={22} color="#ffd700">1999</Typography>
                  <Typography fontSize={12} sx={{ opacity: 0.6 }}>Founded</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={900} fontSize={22} color="#ffd700">25+</Typography>
                  <Typography fontSize={12} sx={{ opacity: 0.6 }}>Years</Typography>
                </Box>
                <Box>
                  <Typography fontWeight={900} fontSize={22} color="#ffd700">50+</Typography>
                  <Typography fontSize={12} sx={{ opacity: 0.6 }}>Brands</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* ── Why Choose Us ── */}
        <Box mb={6}>
          <Typography variant="h4" fontWeight={900} color="#1a1a2e" textAlign="center" mb={1}>
            Why Choose Us?
          </Typography>
          <Divider sx={{ borderColor: "#c72026", borderWidth: 2, width: 60, mx: "auto", mb: 4 }} />
          <Grid container spacing={3}>
            {VALUES.map((v) => (
              <Grid item xs={12} sm={6} md={3} key={v.title}>
                <Card sx={{
                  borderRadius: 3, p: 1, height: "100%",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  "&:hover": { boxShadow: "0 6px 24px rgba(0,0,0,0.12)", transform: "translateY(-2px)" },
                  transition: "all 0.2s",
                }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography fontSize={40} mb={1}>{v.icon}</Typography>
                    <Typography fontWeight={800} color="#1a1a2e" mb={1}>{v.title}</Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>{v.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── Brands we carry ── */}
        <Box>
          <Typography variant="h4" fontWeight={900} color="#1a1a2e" textAlign="center" mb={1}>
            Brands We Carry
          </Typography>
          <Divider sx={{ borderColor: "#c72026", borderWidth: 2, width: 60, mx: "auto", mb: 4 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
            {BRANDS.map((b) => (
              <Box key={b} sx={{
                px: 3, py: 1.5, borderRadius: 2,
                border: "1.5px solid #e0e0e0",
                background: "#fff",
                fontWeight: 700, fontSize: 14, color: "#1a1a2e",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                "&:hover": { border: "1.5px solid #c72026", color: "#c72026" },
                transition: "all 0.2s",
              }}>
                {b}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}