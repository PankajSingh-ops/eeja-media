import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Creator from "@/models/Creator";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const updateData = await req.json();

    if (!updateData.fullName || !updateData.role || !updateData.niche || !updateData.primaryPlatform || updateData.totalFollowers == null || updateData.perPostCharge == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    const updated = await Creator.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updated) {
      return NextResponse.json({ error: "Creator not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
