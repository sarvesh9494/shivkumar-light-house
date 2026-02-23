// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    price:       { type: Number, required: true },        // selling price
    mrp:         { type: Number, default: null },         // original MRP (for discount %)
    description: { type: String, default: "" },
    category:    { type: String, required: true },
    image:       { type: String, default: "" },           // primary image
    images:      [{ type: String }],                      // additional images for gallery
    features:    [{ type: String }],                      // bullet point key features
    stock:       { type: Number, default: 0 },
    rating:      { type: Number, default: 4 },
  },
  { timestamps: true }  // auto createdAt (used for "New" badge) + updatedAt
);

const Product = mongoose.model("Product", productSchema);
export default Product;