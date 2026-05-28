import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Creator from "@/models/Creator";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const creator = await Creator.findById(id);

    if (!creator) {
      return NextResponse.json(
        { error: "Creator not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(creator, { status: 200 });
  } catch (error) {
    console.error("Error fetching creator:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const deleted = await Creator.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Creator deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting creator:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

