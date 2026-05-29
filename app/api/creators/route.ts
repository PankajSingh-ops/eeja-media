import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Creator from "@/models/Creator";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ["fullName", "email", "phoneNumber", "role", "niche", "totalFollowers"];
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const creator = new Creator(body);
    const savedCreator = await creator.save();

    return NextResponse.json(savedCreator, { status: 201 });
  } catch (error) {
    console.error("Error creating creator:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const creators = await Creator.find({}).sort({ createdAt: -1 });
    return NextResponse.json(creators, { status: 200 });
  } catch (error) {
    console.error("Error fetching creators:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
