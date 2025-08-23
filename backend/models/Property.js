import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ["rent", "sale"], required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  area: { type: Number, default: 0 },
  amenities: [{ type: String }],
  images: [String],
  status: { type: String, default: "active" }
}, { timestamps: true });

// 🔑 Indexes for fast filtering/sorting
propertySchema.index({ status: 1, type: 1, location: 1 });
propertySchema.index({ price: 1, bedrooms: 1, bathrooms: 1, area: 1 });
propertySchema.index({ createdAt: -1 });
// Optional text search (title/location/amenities)
propertySchema.index({ title: "text", location: "text" });

export default mongoose.model("Property", propertySchema);
