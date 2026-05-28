import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

async function getOrCreateSettings() {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  return settings;
}

export async function GET() {
  try {
    await connectDB();
    const settings = await getOrCreateSettings();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const settings = await getOrCreateSettings();

    if (body.launchDate !== undefined) settings.launchDate = body.launchDate;
    if (body.siteStatus !== undefined) settings.siteStatus = body.siteStatus;
    if (body.adminDisplayName !== undefined) settings.adminDisplayName = body.adminDisplayName;
    settings.updatedAt = new Date();

    await settings.save();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
