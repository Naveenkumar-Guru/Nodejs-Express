import express from "express";
import OTP from "../models/otp.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";

const router = express.Router();

// SEND OTP
router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP
    const otpEntry = new OTP({
      email,
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    await otpEntry.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });

    res.json({ msg: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VERIFY OTP
router.post("/verify", async (req, res) => {
  try {
    const { email, code } = req.body;

    const otpData = await OTP.findOne({ email, code });
    if (!otpData) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (otpData.expiresAt < new Date()) {
      await OTP.deleteMany({ email });
      return res.status(400).json({ msg: "OTP expired" });
    }

    await User.updateOne({ email }, { verified: true });
    await OTP.deleteMany({ email });

    res.json({ msg: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;
