// src/components/HeroSection.js
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, CircularProgress } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const LOCAL_FALLBACK = [
  { image: "/images/banner1.jpg", fit: "cover", position: "center center" },
  { image: "/images/banner2.jpg", fit: "cover", position: "center center" },
  { image: "/images/banner3.jpg", fit: "cover", position: "center center" },
];

const BANNER_HEIGHT = { xs: "200px", sm: "320px", md: "480px" };

function HeroSection() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/api/config/banners`)
      .then((res) => {
        const active = (res.data?.value || []).filter((b) => b.active && b.image);
        setBanners(active.length > 0 ? active : LOCAL_FALLBACK);
      })
      .catch(() => setBanners(LOCAL_FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  if (loading) {
    return (
      <Box sx={{
        width: "100vw", position: "relative", left: "50%", right: "50%",
        ml: "-50vw", mr: "-50vw",
        height: BANNER_HEIGHT,
        display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "#e8e8e8",
      }}>
        <CircularProgress sx={{ color: "#c72026" }} />
      </Box>
    );
  }

  return (
    <Box sx={{
      width: "100vw", position: "relative",
      left: "50%", right: "50%", ml: "-50vw", mr: "-50vw",
      overflow: "hidden",
      "& .slick-dots": {
        bottom: "14px",
        "& li button:before": { color: "#fff", fontSize: "10px", opacity: 0.75 },
        "& li.slick-active button:before": { color: "#fff", opacity: 1 },
      },
      "& .slick-prev, & .slick-next": {
        zIndex: 10,
        "&:before": { fontSize: "28px", color: "#fff", textShadow: "0 0 6px rgba(0,0,0,0.7)" },
      },
      "& .slick-prev": { left: "16px" },
      "& .slick-next": { right: "16px" },
    }}>
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <Box key={idx} sx={{ height: BANNER_HEIGHT, overflow: "hidden" }}>
            <Box
              component="img"
              src={banner.image}
              alt={`Banner ${idx + 1}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/1400x480?text=Banner+Image";
              }}
              sx={{
                width: "100%",
                height: "100%",
                // ✅ Each banner uses its own fit + position set in admin panel
                objectFit: banner.fit || "cover",
                objectPosition: banner.position || "center center",
                display: "block",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default HeroSection;