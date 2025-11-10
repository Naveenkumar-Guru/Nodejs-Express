import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  code: String,
  expiresAt: 12,
});

export default mongoose.model("otp", otpSchema);
