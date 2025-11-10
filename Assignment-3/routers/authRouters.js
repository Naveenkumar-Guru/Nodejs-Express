import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return resp.status(400).json({ msg: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();
    resp.json({ msg: "User registered successfully" });
  } catch (err) {
    resp.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, resp) => {
  // ✅ removed comma after async
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // ✅ fixed "await.user" to "await User"
    if (!user) {
      return resp.status(404).json({ msg: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return resp.status(404).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // ✅ fixed "password.env.jwt_SECRET" to correct syntax
      { expiresIn: "1h" } // optional but good practice
    );

    resp.json({ msg: "Login successful", token });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

export default router;
