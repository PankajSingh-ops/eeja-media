import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICreator extends Document {
  fullName: string;
  stageName?: string;
  email: string;
  phoneNumber: string;
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
    instagram?: { url: string; followers?: number };
    facebook?: { url: string; followers?: number };
    twitter?: { url: string; followers?: number };
    youtube?: { url: string; followers?: number };
    tiktok?: { url: string; followers?: number };
    linkedin?: { url: string; followers?: number };
    other?: string;
  };
  totalFollowers: number;
  additionalPageUrl?: string;
  perPostCharge?: number;
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
  contentFormat?: string;
  createdAt: Date;
}

const CreatorSchema = new Schema<ICreator>({
  fullName: { type: String, required: true },
  stageName: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
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
    instagram: { url: String, followers: Number },
    facebook: { url: String, followers: Number },
    twitter: { url: String, followers: Number },
    youtube: { url: String, followers: Number },
    tiktok: { url: String, followers: Number },
    linkedin: { url: String, followers: Number },
    other: { type: String },
  },
  totalFollowers: { type: Number, required: true },
  additionalPageUrl: { type: String },
  perPostCharge: { type: Number },
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
  contentFormat: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Creator: Model<ICreator> =
  mongoose.models.Creator || mongoose.model<ICreator>("Creator", CreatorSchema);

export default Creator;
