import mongoose from "mongoose";

const viewingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  scheduledAt: { type: Date, required: true },
  status: { type: String, enum: ["scheduled", "completed", "no-show"], default: "scheduled" }
}, { timestamps: true });

export default mongoose.model("Viewing", viewingSchema);
