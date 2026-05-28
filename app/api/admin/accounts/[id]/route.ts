import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    
    await connectDB();

    const loggedInAdmin = await Admin.findOne({ username: session.user?.name });
    if (loggedInAdmin && loggedInAdmin._id.toString() === id) {
      return NextResponse.json({ error: "Cannot delete yourself" }, { status: 403 });
    }

    const adminCount = await Admin.countDocuments();
    if (adminCount <= 1) {
      return NextResponse.json({ error: "Cannot delete the last admin account" }, { status: 400 });
    }

    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
