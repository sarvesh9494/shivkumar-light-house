// models/SiteConfig.js
import mongoose from "mongoose";

// ✅ FIX: Use strict:false so Mongoose doesn't block Mixed type updates
// ✅ FIX: Removed 'required' on value — Mixed type + required causes validation errors on update
const siteConfigSchema = new mongoose.Schema(
  {
    key:   { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed },
  },
  {
    strict: false,       // allow any shape of value to be saved
    timestamps: true,    // auto createdAt + updatedAt (replaces manual updatedAt field)
  }
);

const SiteConfig = mongoose.model("SiteConfig", siteConfigSchema);
export default SiteConfig;