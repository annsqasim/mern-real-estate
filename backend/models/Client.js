import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true }
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);
