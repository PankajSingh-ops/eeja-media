import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  launchDate: Date;
  siteStatus: "coming_soon" | "live";
  adminDisplayName: string;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>({
  launchDate: { type: Date, default: new Date("2026-06-03T00:00:00") },
  siteStatus: { type: String, enum: ["coming_soon", "live"], default: "coming_soon" },
  adminDisplayName: { type: String, default: "Admin" },
  updatedAt: { type: Date, default: Date.now },
});

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
