import express from "express";
import OTP from "../models/otp.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";

const router = express.Router();

//SEND OTP

router.post("/send", async (req, resp) => {
  try {
    const { email } = req.body;

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP with 5-min expiry
    const otpEntry = new OTP({
      email,
      code: otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      //       1 minute = 60 seconds 1 second = 1000 millisecondsSo,
      // 5 * 60 * 1000 = 300000 milliseconds
      // Adds 5 minutes to the current time.
      // So if the current time is 12:00:00, this becomes the timestamp for 12:05:00.
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
      subject: "your OTP code",
      text: `Your OTP code is ${otp}`, // It will expire in 5 minutes.
    });
    resp.json({ msg: "OTP send to email" });
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
});

// VERIFY OTP
router.post("/verify", async (req, resp) => {
  try {
    const { email, code } = req.body;

    // Check OTP
    const otpData = await OTP.findOne({ email, code });
    if (!otpData) {
      return resp.status(400).json({ msg: "invalid OTP" });
    }

    // Check expiry
    if (otpData.expiresAt < new Date()) {
      return resp.status(400).json({ msg: "OTP expired" });
    }

    // Mark user as verified
    await User.updateOne({ email }, { verified: true });
    await OTP.deleteMany({ email });
    
    resp.json({ msg: "OTP verified successfully" });
  } catch (error) {
    resp.status(500).json({ msg: error.message });
  }
});

export default router;
