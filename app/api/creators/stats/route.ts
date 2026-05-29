import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Creator from "@/models/Creator";

export async function GET() {
  try {
    await connectDB();

    const total = await Creator.countDocuments();
    const byRole = {
      creator: await Creator.countDocuments({ role: "creator" }),
      influencer: await Creator.countDocuments({ role: "influencer" }),
    };

    const nicheAgg = await Creator.aggregate([
      { $unwind: { path: "$niche", preserveNullAndEmptyArrays: true } },
      { $group: { _id: "$niche", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const byNiche = nicheAgg.reduce((acc: Record<string, number>, n: { _id: string; count: number }) => {
      acc[n._id] = n.count;
      return acc;
    }, {});

    const platformAgg = await Creator.aggregate([
      { $match: { primaryPlatform: { $ne: null } } },
      { $group: { _id: "$primaryPlatform", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const byPlatform = platformAgg.reduce((acc: Record<string, number>, p: { _id: string; count: number }) => {
      acc[p._id] = p.count;
      return acc;
    }, {});

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentWeek = await Creator.countDocuments({ createdAt: { $gte: oneWeekAgo } });

    const avgAgg = await Creator.aggregate([
      { $group: { _id: null, avg: { $avg: "$perPostCharge" } } },
    ]);
    const avgCharge = avgAgg.length > 0 ? Math.round(avgAgg[0].avg) : 0;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dateAgg = await Creator.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const byDate = dateAgg.map((d: { _id: string; count: number }) => ({ date: d._id, count: d.count }));

    return NextResponse.json(
      { total, byRole, byNiche, byPlatform, recentWeek, avgCharge, byDate },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
