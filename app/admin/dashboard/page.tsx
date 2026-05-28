"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "@/components/admin/TopBar";
import StatCard from "@/components/admin/StatCard";
import { NicheBarChart, RolePieChart, TimeLineChart } from "@/components/admin/Charts";
import Link from "next/link";

interface Stats {
  total: number;
  byRole: { creator: number; influencer: number };
  byNiche: Record<string, number>;
  byPlatform: Record<string, number>;
  recentWeek: number;
  avgCharge: number;
  byDate: { date: string; count: number }[];
}

interface Creator {
  _id: string;
  fullName: string;
  role: string;
  niche: string;
  primaryPlatform: string;
  totalFollowers: number;
  createdAt: string;
}

const roleBadge = (role: string) => {
  const colors: Record<string, string> = { creator: "#8b5cf6", influencer: "#f59e0b" };
  return (
    <span style={{ background: colors[role] || "#666", color: "#fff", padding: "2px 10px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize" }}>
      {role}
    </span>
  );
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Creator[]>([]);

  useEffect(() => {
    axios.get("/api/creators/stats").then(r => setStats(r.data)).catch(() => {});
    axios.get("/api/creators").then(r => setRecent(r.data.slice(0, 10))).catch(() => {});
  }, []);

  const nicheData = stats ? Object.entries(stats.byNiche).map(([name, count]) => ({ name, count })) : [];
  const roleData = stats ? [
    { name: "Creator", value: stats.byRole.creator },
    { name: "Influencer", value: stats.byRole.influencer },
  ] : [];

  return (
    <>
      <TopBar title="Dashboard" />
      {/* Stats row */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <StatCard title="Total Registrations" value={stats?.total ?? "—"} />
        <StatCard title="Creators" value={stats?.byRole.creator ?? "—"} />
        <StatCard title="Influencers" value={stats?.byRole.influencer ?? "—"} accent="#f59e0b" />
        <StatCard title="Avg Post Charge" value={stats ? `₹${stats.avgCharge}` : "—"} accent="#ec4899" />
        <StatCard title="New This Week" value={stats?.recentWeek ?? "—"} accent="#22c55e" />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <NicheBarChart data={nicheData} />
        <RolePieChart data={roleData} />
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <TimeLineChart data={stats?.byDate ?? []} />
      </div>

      {/* Recent table */}
      <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 600 }}>Recent Registrations</h3>
          <Link href="/admin/registrations" style={{ color: "#8b5cf6", fontSize: "0.85rem", textDecoration: "none" }}>View All →</Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "1px solid #333" }}>
              {["Name", "Role", "Niche", "Platform", "Followers", "Joined"].map(h => (
                <th key={h} style={{ padding: "0.65rem 0.75rem", textAlign: "left", color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {recent.map(c => (
                <tr key={c._id} style={{ borderBottom: "1px solid #1f1f1f" }}>
                  <td style={{ padding: "0.65rem 0.75rem", color: "#fff", fontSize: "0.9rem" }}>{c.fullName}</td>
                  <td style={{ padding: "0.65rem 0.75rem" }}>{roleBadge(c.role)}</td>
                  <td style={{ padding: "0.65rem 0.75rem", color: "#9ca3af", fontSize: "0.85rem" }}>{c.niche}</td>
                  <td style={{ padding: "0.65rem 0.75rem", color: "#9ca3af", fontSize: "0.85rem" }}>{c.primaryPlatform || "—"}</td>
                  <td style={{ padding: "0.65rem 0.75rem", color: "#9ca3af", fontSize: "0.85rem" }}>{c.totalFollowers?.toLocaleString()}</td>
                  <td style={{ padding: "0.65rem 0.75rem", color: "#6b7280", fontSize: "0.8rem" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {recent.length === 0 && <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>No registrations yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
