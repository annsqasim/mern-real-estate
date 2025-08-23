import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  type: { type: String, enum: ["rent", "sale"] },
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  amenities: [String],
  images: [String],
  status: { type: String, default: "active" }
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);
