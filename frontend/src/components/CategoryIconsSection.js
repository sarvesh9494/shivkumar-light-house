// src/components/CategoryIconsSection.js
import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ✅ Your original local category list — used as fallback if MongoDB is unreachable
const LOCAL_FALLBACK = [
  { name: "Fans",       icon: "/icons/fan.png"        },
  { name: "Bulbs",      icon: "/icons/bulb.png"       },
  { name: "Switches",   icon: "/icons/switch.png"     },
  { name: "Wires",      icon: "/icons/wire.png"       },
  { name: "Inverters",  icon: "/icons/inverter.png"   },
  { name: "Table Fans", icon: "/icons/tablefan.png"   },
  { name: "MCBs",       icon: "/icons/mcb.png"        },
  { name: "Mixers",     icon: "/icons/mixer.png"      },
  { name: "Geysers",    icon: "/icons/geyser.png"     },
  { name: "Tubelights", icon: "/icons/tubelights.png" },
  { name: "Batteries",  icon: "/icons/battery.png"    },
];

// ✅ Still accepts onClickCategory prop from HomePage — no breaking change
function CategoryIconsSection({ onClickCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/api/config/categories`)
      .then((res) => {
        // Only show categories toggled ON in admin, with a valid icon
        const active = (res.data?.value || []).filter((c) => c.active && c.name);
        setCategories(active.length > 0 ? active : LOCAL_FALLBACK);
      })
      .catch(() => setCategories(LOCAL_FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (name) => {
    if (onClickCategory) onClickCategory(name);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <CircularProgress size={28} sx={{ color: "#c72026" }} />
      </Box>
    );
  }

  // ✅ Exact same scrollable row layout as your original CategoryIconsSection
  return (
    <Box sx={{
      display: "flex",
      overflowX: "auto",
      scrollbarWidth: "none",           // Firefox
      "&::-webkit-scrollbar": { display: "none" }, // Chrome
      gap: 3,
      px: 2,
      py: 2,
    }}>
      {categories.map((category) => (
        <Box
          key={category.name}
          onClick={() => handleClick(category.name)}
          sx={{
            minWidth: 120,
            maxWidth: 140,
            flex: "0 0 auto",
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <Box
            component="img"
            src={category.icon}
            alt={category.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/80?text=${category.name.charAt(0)}`;
            }}
            sx={{
              width: "100%",
              height: 100,             // ✅ your original height
              objectFit: "contain",
              mb: 1,
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {category.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default CategoryIconsSection;