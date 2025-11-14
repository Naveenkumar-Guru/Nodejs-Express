import mongoose from "mongoose";

const connectDB = async (mongoURL) => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
