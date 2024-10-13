import mongoose from "mongoose";

const WaterDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
});

export default mongoose.models.WaterData ||
  mongoose.model("WaterData", WaterDataSchema);
