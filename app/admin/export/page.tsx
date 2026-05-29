"use client";

import { useState } from "react";
import axios from "axios";
import TopBar from "@/components/admin/TopBar";

const CSV_HEADERS = ["Full Name", "Stage Name", "Email", "Phone Number", "Role", "Niche", "Primary Platform", "Content Format", "Instagram URL", "Instagram Followers", "YouTube URL", "YouTube Followers", "Twitter URL", "Twitter Followers", "TikTok URL", "TikTok Followers", "Facebook URL", "Facebook Followers", "LinkedIn URL", "LinkedIn Followers", "Other", "Total Followers", "Per Post Charge", "Bio", "Location", "Additional URL", "Joined Date"];

function toCSV(creators: Record<string, unknown>[]) {
  const rows = creators.map(c => {
    const sl = (c.socialLinks || {}) as Record<string, any>;
    const getSocial = (key: string) => {
        const val = sl[key];
        if (typeof val === 'string') return [val, ""];
        if (typeof val === 'object' && val !== null) return [val.url || "", val.followers || ""];
        return ["", ""];
    };
    
    const [igUrl, igFollowers] = getSocial("instagram");
    const [ytUrl, ytFollowers] = getSocial("youtube");
    const [twUrl, twFollowers] = getSocial("twitter");
    const [tkUrl, tkFollowers] = getSocial("tiktok");
    const [fbUrl, fbFollowers] = getSocial("facebook");
    const [liUrl, liFollowers] = getSocial("linkedin");

    return [
      c.fullName, c.stageName || "", c.email || "", c.phoneNumber || "", c.role, c.niche, c.primaryPlatform || "", c.contentFormat || "",
      igUrl, igFollowers, ytUrl, ytFollowers, twUrl, twFollowers, tkUrl, tkFollowers, fbUrl, fbFollowers, liUrl, liFollowers, sl.other || "",
      c.totalFollowers, c.perPostCharge || "", ((c.bio as string) || "").replace(/"/g, '""'),
      c.location || "", c.additionalPageUrl || "",
      c.createdAt ? new Date(c.createdAt as string).toLocaleDateString() : "",
    ].map(v => `"${v}"`).join(",");
  });
  return [CSV_HEADERS.join(","), ...rows].join("\n");
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleExportAll = async () => {
    setLoading(true); setMsg("");
    try {
      const res = await axios.get("/api/creators");
      const csv = toCSV(res.data);
      downloadCSV(csv, "eeja-media-creators.csv");
      setMsg(`Exported ${res.data.length} creators`);
    } catch { setMsg("Export failed"); }
    setLoading(false);
  };

  const btnStyle: React.CSSProperties = {
    padding: "1rem 2rem", borderRadius: "12px", border: "none", cursor: "pointer",
    background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff", fontSize: "1rem", fontWeight: 700,
    display: "flex", alignItems: "center", gap: "0.5rem", transition: "transform 0.2s, box-shadow 0.2s",
  };

  return (
    <>
      <TopBar title="Export Data" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh", gap: "2rem" }}>
        <div style={{ background: "#1a1a1a", borderRadius: "20px", padding: "3rem", textAlign: "center", maxWidth: "500px", width: "100%" }}>
          <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>⬇️</p>
          <h2 style={{ color: "#fff", fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Export Creators</h2>
          <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "2rem" }}>Download all registered creators as a CSV file with full details.</p>
          <button onClick={handleExportAll} disabled={loading} style={{ ...btnStyle, margin: "0 auto", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Exporting..." : "Export All as CSV"}
          </button>
          {msg && <p style={{ color: msg.includes("failed") ? "#ef4444" : "#22c55e", marginTop: "1rem", fontSize: "0.9rem" }}>{msg}</p>}
        </div>
      </div>
    </>
  );
}
