import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/eeja_media";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const AdminModel = mongoose.models.Admin || mongoose.model("Admin", new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }));

  const existing = await AdminModel.findOne({ username: "admin" });
  if (existing) {
    console.log("Admin user already exists, skipping seed.");
    await mongoose.disconnect();
    return;
  }

  const hashed = await bcrypt.hash("eeja@2026", 12);
  await AdminModel.create({ username: "admin", password: hashed });
  console.log("✅ Admin user created: username=admin, password=eeja@2026");

  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
