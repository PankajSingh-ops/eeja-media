"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "@/components/admin/TopBar";
import { PlatformPieChart, TopNicheChargeChart, RolePieChart } from "@/components/admin/Charts";

interface Creator {
  role: string; niche: string[]; primaryPlatform?: string; perPostCharge?: number;
}

export default function AnalyticsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => { axios.get("/api/creators").then(r => setCreators(r.data)).catch(() => {}); }, []);

  // Platform pie
  const platformCounts: Record<string, number> = {};
  creators.forEach(c => { if (c.primaryPlatform) platformCounts[c.primaryPlatform] = (platformCounts[c.primaryPlatform] || 0) + 1; });
  const platformData = Object.entries(platformCounts).map(([name, value]) => ({ name, value }));

  // Top 5 niches by avg charge
  const nicheCharges: Record<string, number[]> = {};
  creators.forEach(c => { 
    if (c.perPostCharge !== undefined && c.perPostCharge !== null) {
      const niches = Array.isArray(c.niche) ? c.niche : [c.niche];
      niches.forEach(n => {
        if (n) {
          (nicheCharges[n] = nicheCharges[n] || []).push(c.perPostCharge!); 
        }
      });
    }
  });
  const nicheAvgData = Object.entries(nicheCharges)
    .filter(([_, charges]) => charges.length > 0)
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
          <RolePieChart data={roleData} />
        </div>
      )}
    </>
  );
}
