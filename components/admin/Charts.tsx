"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";

const COLORS = ["#8b5cf6", "#FBCF0F", "#14b8a6", "#ec4899", "#6366f1", "#22c55e", "#ef4444", "#06b6d4", "#f97316", "#a855f7", "#84cc16", "#64748b"];

const tooltipStyle = { contentStyle: { background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", color: "#fff", fontSize: "0.85rem" } };

export function NicheBarChart({ data }: { data: { name: string; count: number }[] }) {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem" }}>
      <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Registrations by Niche</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}><XAxis dataKey="name" stroke="#6b7280" fontSize={11} angle={-30} textAnchor="end" height={60} /><YAxis stroke="#6b7280" fontSize={11} /><Tooltip {...tooltipStyle} /><Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} /></BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RolePieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem" }}>
      <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Role Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart><Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11} fill="#8b5cf6">{data.map((_, i) => <Cell key={i} fill={["#8b5cf6", "#FBCF0F", "#14b8a6"][i] || COLORS[i]} />)}</Pie><Tooltip {...tooltipStyle} /></PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TimeLineChart({ data }: { data: { date: string; count: number }[] }) {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem" }}>
      <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Registrations Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}><XAxis dataKey="date" stroke="#6b7280" fontSize={11} /><YAxis stroke="#6b7280" fontSize={11} /><Tooltip {...tooltipStyle} /><Line type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6", r: 3 }} /></LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PlatformPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem" }}>
      <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Platform Popularity</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart><Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>{data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip {...tooltipStyle} /></PieChart>
      </ResponsiveContainer>
    </div>
  );
}



export function TopNicheChargeChart({ data }: { data: { name: string; avg: number }[] }) {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem" }}>
      <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Top Niches by Avg Post Charge</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical"><XAxis type="number" stroke="#6b7280" fontSize={11} /><YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={11} width={80} /><Tooltip {...tooltipStyle} /><Bar dataKey="avg" fill="#FBCF0F" radius={[0, 4, 4, 0]} /></BarChart>
      </ResponsiveContainer>
    </div>
  );
}
