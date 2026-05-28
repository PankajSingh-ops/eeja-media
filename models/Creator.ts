import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICreator extends Document {
  fullName: string;
  role: "creator" | "influencer";
  niche:
    | "Fashion"
    | "Tech"
    | "Fitness"
    | "Food"
    | "Travel"
    | "Gaming"
    | "Beauty"
    | "Finance"
    | "Education"
    | "Lifestyle"
    | "Entertainment"
    | "Other";
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
    linkedin?: string;
    other?: string;
  };
  totalFollowers: number;
  additionalPageUrl?: string;
  perPostCharge: number;
  currency: string;
  bio?: string;
  location?: string;
  exclusiveManagement: boolean;
  previousBrandCollab: boolean;
  primaryPlatform:
    | "Instagram"
    | "YouTube"
    | "TikTok"
    | "Twitter/X"
    | "Facebook"
    | "LinkedIn"
    | "Other";
  createdAt: Date;
}

const CreatorSchema = new Schema<ICreator>({
  fullName: { type: String, required: true },
  role: {
    type: String,
    enum: ["creator", "influencer"],
    required: true,
  },
  niche: {
    type: String,
    enum: [
      "Fashion",
      "Tech",
      "Fitness",
      "Food",
      "Travel",
      "Gaming",
      "Beauty",
      "Finance",
      "Education",
      "Lifestyle",
      "Entertainment",
      "Other",
    ],
    required: true,
  },
  socialLinks: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    youtube: { type: String },
    tiktok: { type: String },
    linkedin: { type: String },
    other: { type: String },
  },
  totalFollowers: { type: Number, required: true },
  additionalPageUrl: { type: String },
  perPostCharge: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  bio: { type: String, maxlength: 500 },
  location: { type: String },
  exclusiveManagement: { type: Boolean, default: false },
  previousBrandCollab: { type: Boolean, default: false },
  primaryPlatform: {
    type: String,
    enum: [
      "Instagram",
      "YouTube",
      "TikTok",
      "Twitter/X",
      "Facebook",
      "LinkedIn",
      "Other",
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

const Creator: Model<ICreator> =
  mongoose.models.Creator || mongoose.model<ICreator>("Creator", CreatorSchema);

export default Creator;
