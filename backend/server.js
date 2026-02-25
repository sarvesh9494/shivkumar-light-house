// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import SiteConfig from "./models/SiteConfig.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    "https://shivkumarlighthouse.in",
    "https://www.shivkumarlighthouse.in",
    "https://shivkumar-light-house9494.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true,
}));
app.use(express.json({ limit: "5mb" })); // ✅ allow larger payloads for banner arrays
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
mongoose.set("strictQuery", false);

// ── MongoDB Connection ──────────────────────────────────────────────────────
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true,
    });
    console.log("✅ Connected to MongoDB Atlas");
    await seedDefaultConfig();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// ── Seed default homepage config if not already in DB ─────────────────────
const seedDefaultConfig = async () => {
  const defaults = [
    {
      key: "banners",
      value: [
        { id: 1, image: "/images/banner1.jpg", title: "Banner 1", active: true },
        { id: 2, image: "/images/banner2.jpg", title: "Banner 2", active: true },
        { id: 3, image: "/images/banner3.jpg", title: "Banner 3", active: true },
      ],
    },
    {
      key: "brands",
      value: [
        { id: 1, name: "Polycab",   image: "/brands/polycab-banner.jpg",   row: 1, active: true },
        { id: 2, name: "Legrand",   image: "/brands/legrand-banner.jpg",   row: 1, active: true },
        { id: 3, name: "GM",        image: "/brands/gm-banner.jpg",        row: 1, active: true },
        { id: 4, name: "Goldmedal", image: "/brands/goldmedal-banner.jpg", row: 2, active: true },
        { id: 5, name: "Vinay",     image: "/brands/vinay-banner.jpg",     row: 2, active: true },
        { id: 6, name: "Racold",    image: "/brands/racold-banner.jpg",    row: 2, active: true },
        { id: 7, name: "Usha",      image: "/brands/usha-banner.jpg",      row: 2, active: true },
      ],
    },
    {
      key: "categories",
      value: [
        { id: 1,  name: "Fans",       icon: "/icons/fan.png",        active: true },
        { id: 2,  name: "Bulbs",      icon: "/icons/bulb.png",       active: true },
        { id: 3,  name: "Switches",   icon: "/icons/switch.png",     active: true },
        { id: 4,  name: "Wires",      icon: "/icons/wire.png",       active: true },
        { id: 5,  name: "Inverters",  icon: "/icons/inverter.png",   active: true },
        { id: 6,  name: "Table Fans", icon: "/icons/tablefan.png",   active: true },
        { id: 7,  name: "MCBs",       icon: "/icons/mcb.png",        active: true },
        { id: 8,  name: "Mixers",     icon: "/icons/mixer.png",      active: true },
        { id: 9,  name: "Geysers",    icon: "/icons/geyser.png",     active: true },
        { id: 10, name: "Tubelights", icon: "/icons/tubelights.png", active: true },
        { id: 11, name: "Batteries",  icon: "/icons/battery.png",    active: true },
      ],
    },
  ];

  for (const item of defaults) {
    const exists = await SiteConfig.findOne({ key: item.key });
    if (!exists) {
      await SiteConfig.create(item);
      console.log(`🌱 Default config seeded: ${item.key}`);
    }
  }
};

// ── AUTH ───────────────────────────────────────────────────────────────────
app.post("/api/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PRODUCTS ───────────────────────────────────────────────────────────────
app.get("/api/products", async (req, res) => {
  try {
    const { category, search, sortBy, sortDir } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };
    let query = Product.find(filter);
    if (sortBy) query = query.sort({ [sortBy]: sortDir === "desc" ? -1 : 1 });
    res.json(await query);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      stock: req.body.stock || 0,
      rating: req.body.rating || 4,
    });
    res.status(201).json(await product.save());
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── SITE CONFIG (Homepage Editor) ──────────────────────────────────────────

// GET all configs as flat object → { banners: [...], brands: [...], categories: [...] }
app.get("/api/config", async (req, res) => {
  try {
    const configs = await SiteConfig.find({});
    const result = {};
    configs.forEach((c) => { result[c.key] = c.value; });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single config by key
app.get("/api/config/:key", async (req, res) => {
  try {
    const config = await SiteConfig.findOne({ key: req.params.key });
    if (!config) return res.status(404).json({ message: "Config not found" });
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT — save updated config
// ✅ FIX: Use findOne + doc.set + doc.markModified + doc.save
//    instead of findOneAndUpdate — this is the ONLY reliable way to
//    update a Mongoose Mixed type field without it being silently ignored
app.put("/api/config/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const newValue = req.body.value;

    if (newValue === undefined) {
      return res.status(400).json({ message: "Missing 'value' in request body" });
    }

    let doc = await SiteConfig.findOne({ key });

    if (!doc) {
      // First time — create it
      doc = new SiteConfig({ key, value: newValue });
    } else {
      // ✅ KEY FIX: Must use set() + markModified() for Mixed type fields
      // Without markModified, Mongoose thinks nothing changed and skips the DB write
      doc.set("value", newValue);
      doc.markModified("value");
    }

    const saved = await doc.save();
    res.json({ success: true, key: saved.key, value: saved.value });
  } catch (err) {
    console.error("Config save error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ── START ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});