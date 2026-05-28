"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "@/components/admin/TopBar";
import { PlatformPieChart, FollowerDistChart, TopNicheChargeChart, RolePieChart } from "@/components/admin/Charts";

interface Creator {
  role: string; niche: string; primaryPlatform?: string; totalFollowers: number; perPostCharge: number;
}

export default function AnalyticsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => { axios.get("/api/creators").then(r => setCreators(r.data)).catch(() => {}); }, []);

  // Platform pie
  const platformCounts: Record<string, number> = {};
  creators.forEach(c => { if (c.primaryPlatform) platformCounts[c.primaryPlatform] = (platformCounts[c.primaryPlatform] || 0) + 1; });
  const platformData = Object.entries(platformCounts).map(([name, value]) => ({ name, value }));

  // Follower distribution
  const buckets = [
    { name: "0-10K", min: 0, max: 10000 },
    { name: "10K-100K", min: 10000, max: 100000 },
    { name: "100K-1M", min: 100000, max: 1000000 },
    { name: "1M+", min: 1000000, max: Infinity },
  ];
  const followerData = buckets.map(b => ({ name: b.name, count: creators.filter(c => c.totalFollowers >= b.min && c.totalFollowers < b.max).length }));

  // Top 5 niches by avg charge
  const nicheCharges: Record<string, number[]> = {};
  creators.forEach(c => { (nicheCharges[c.niche] = nicheCharges[c.niche] || []).push(c.perPostCharge); });
  const nicheAvgData = Object.entries(nicheCharges)
    .map(([name, charges]) => ({ name, avg: Math.round(charges.reduce((a, b) => a + b, 0) / charges.length) }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5);

  // Role pie
  const roleCounts: Record<string, number> = {};
  creators.forEach(c => { roleCounts[c.role] = (roleCounts[c.role] || 0) + 1; });
  const roleData = Object.entries(roleCounts).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

  return (
    <>
      <TopBar title="Analytics" />
      {creators.length === 0 ? (
        <p style={{ color: "#6b7280", textAlign: "center", marginTop: "3rem" }}>No data yet. Creators need to register first.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <TopNicheChargeChart data={nicheAvgData} />
          <PlatformPieChart data={platformData} />
          <FollowerDistChart data={followerData} />
          <RolePieChart data={roleData} />
        </div>
      )}
    </>
  );
}
