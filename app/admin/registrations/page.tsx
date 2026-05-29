"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import TopBar from "@/components/admin/TopBar";
import CreatorDrawer from "@/components/admin/CreatorDrawer";

interface Creator {
  _id: string; fullName: string; role: string; niche: string[]; primaryPlatform?: string;
  perPostCharge: number; bio?: string; location?: string;
  additionalPageUrl?: string; socialLinks?: Record<string, string>; createdAt: string;
}

const NICHES = ["Fashion", "Tech", "Fitness", "Food", "Travel", "Gaming", "Beauty", "Finance", "Education", "Lifestyle", "Entertainment", "Other"];
const PLATFORMS = ["Instagram", "YouTube", "TikTok", "Twitter/X", "Facebook", "LinkedIn", "Other"];
const PAGE_SIZE = 20;

const inputStyle: React.CSSProperties = { padding: "0.5rem 0.75rem", background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", color: "#fff", fontSize: "0.85rem" };
const selectStyle: React.CSSProperties = { ...inputStyle, cursor: "pointer", appearance: "none" as const, paddingRight: "1.5rem", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%239ca3af' d='M5 7L0 2h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center" };



const roleBadge = (role: string) => {
  const c: Record<string, string> = { creator: "#8b5cf6", influencer: "#f59e0b" };
  return <span style={{ background: c[role] || "#666", color: "#fff", padding: "2px 10px", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, textTransform: "capitalize" }}>{role}</span>;
};

export default function RegistrationsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [search, setSearch] = useState(""); const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); const [nicheFilter, setNicheFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [minCharge, setMinCharge] = useState(""); const [maxCharge, setMaxCharge] = useState("");
  const [dateFrom, setDateFrom] = useState(""); const [dateTo, setDateTo] = useState("");
  const [sortKey, setSortKey] = useState<string>("createdAt"); const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Creator | null>(null);

  const fetchCreators = useCallback(() => { axios.get("/api/creators").then(r => setCreators(r.data)).catch(() => {}); }, []);
  useEffect(() => { fetchCreators(); }, [fetchCreators]);

  useEffect(() => { const t = setTimeout(() => setDebouncedSearch(search), 300); return () => clearTimeout(t); }, [search]);

  const filtered = useMemo(() => {
    let data = [...creators];
    if (debouncedSearch) data = data.filter(c => c.fullName.toLowerCase().includes(debouncedSearch.toLowerCase()));
    if (roleFilter) data = data.filter(c => c.role === roleFilter);
    if (nicheFilter) data = data.filter(c => Array.isArray(c.niche) ? c.niche.includes(nicheFilter) : c.niche === nicheFilter);
    if (platformFilter) data = data.filter(c => c.primaryPlatform === platformFilter);
    if (minCharge) data = data.filter(c => c.perPostCharge >= Number(minCharge));
    if (maxCharge) data = data.filter(c => c.perPostCharge <= Number(maxCharge));
    if (dateFrom) data = data.filter(c => new Date(c.createdAt) >= new Date(dateFrom));
    if (dateTo) data = data.filter(c => new Date(c.createdAt) <= new Date(dateTo + "T23:59:59"));

    data.sort((a, b) => {
      const aVal = (a as unknown as Record<string, unknown>)[sortKey];
      const bVal = (b as unknown as Record<string, unknown>)[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      return sortDir === "asc" ? String(aVal || "").localeCompare(String(bVal || "")) : String(bVal || "").localeCompare(String(aVal || ""));
    });
    return data;
  }, [creators, debouncedSearch, roleFilter, nicheFilter, platformFilter, minCharge, maxCharge, dateFrom, dateTo, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: string) => { if (sortKey === key) { setSortDir(d => d === "asc" ? "desc" : "asc"); } else { setSortKey(key); setSortDir("asc"); } };
  const sortArrow = (key: string) => sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  const clearFilters = () => { setSearch(""); setRoleFilter(""); setNicheFilter(""); setPlatformFilter(""); setMinCharge(""); setMaxCharge(""); setDateFrom(""); setDateTo(""); setPage(1); };

  const handleDelete = useCallback(async (id: string) => {
    try { await axios.delete(`/api/creators/${id}`); setCreators(prev => prev.filter(c => c._id !== id)); setSelected(null); } catch { alert("Failed to delete"); }
  }, []);

  return (
    <>
      <TopBar title="Registrations" />

      {/* Filters */}
      <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1rem 1.25rem", marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "flex-end" }}>
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <span style={{ position: "absolute", left: "0.6rem", top: "50%", transform: "translateY(-50%)", color: "#6b7280" }}>🔍</span>
          <input placeholder="Search name..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} style={{ ...inputStyle, width: "100%", paddingLeft: "2rem" }} />
        </div>
        <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }} style={selectStyle}><option value="">All Roles</option>{["creator", "influencer"].map(r => <option key={r} value={r} style={{ textTransform: "capitalize" }}>{r}</option>)}</select>
        <select value={nicheFilter} onChange={e => { setNicheFilter(e.target.value); setPage(1); }} style={selectStyle}><option value="">All Niches</option>{NICHES.map(n => <option key={n} value={n}>{n}</option>)}</select>
        <select value={platformFilter} onChange={e => { setPlatformFilter(e.target.value); setPage(1); }} style={selectStyle}><option value="">All Platforms</option>{PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}</select>
        <input type="number" placeholder="Min ₹" value={minCharge} onChange={e => { setMinCharge(e.target.value); setPage(1); }} style={{ ...inputStyle, width: "90px" }} />
        <input type="number" placeholder="Max ₹" value={maxCharge} onChange={e => { setMaxCharge(e.target.value); setPage(1); }} style={{ ...inputStyle, width: "90px" }} />
        <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }} style={{ ...inputStyle, colorScheme: "dark" }} />
        <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }} style={{ ...inputStyle, colorScheme: "dark" }} />
        <button onClick={clearFilters} style={{ padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid #333", background: "transparent", color: "#9ca3af", cursor: "pointer", fontSize: "0.8rem" }}>Clear</button>
      </div>

      {/* Table */}
      <div style={{ background: "#1a1a1a", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "1px solid #333" }}>
              {[{ k: "fullName", l: "Name" }, { k: "role", l: "Role" }, { k: "niche", l: "Niche" }, { k: "primaryPlatform", l: "Platform" }, { k: "perPostCharge", l: "Per Post" }, { k: "location", l: "Location" }, { k: "createdAt", l: "Joined" }].map(col => (
                <th key={col.k} onClick={() => toggleSort(col.k)} style={{ padding: "0.75rem", textAlign: "left", color: "#9ca3af", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", userSelect: "none" }}>{col.l}{sortArrow(col.k)}</th>
              ))}
            </tr></thead>
            <tbody>
              {pageData.map((c, i) => (
                <tr key={c._id} onClick={() => setSelected(c)} style={{ borderBottom: "1px solid #1f1f1f", cursor: "pointer", background: "transparent", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1c1c1c")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "0.7rem 0.75rem", color: "#fff", fontSize: "0.9rem" }}>{(page - 1) * PAGE_SIZE + i + 1}. {c.fullName}</td>
                  <td style={{ padding: "0.7rem 0.75rem" }}>{roleBadge(c.role)}</td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "#9ca3af", fontSize: "0.85rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "150px" }}>{Array.isArray(c.niche) ? c.niche.join(", ") : c.niche}</td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "#9ca3af", fontSize: "0.85rem" }}>{c.primaryPlatform || "—"}</td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "#9ca3af", fontSize: "0.85rem" }}>₹{c.perPostCharge?.toLocaleString()}</td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "#9ca3af", fontSize: "0.85rem" }}>{c.location || "—"}</td>
                  <td style={{ padding: "0.7rem 0.75rem", color: "#6b7280", fontSize: "0.8rem" }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {pageData.length === 0 && <tr><td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>No creators found</td></tr>}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", borderTop: "1px solid #222" }}>
            <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{filtered.length} total</span>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: "0.4rem 0.75rem", borderRadius: "6px", border: "1px solid #333", background: "transparent", color: page === 1 ? "#444" : "#fff", cursor: page === 1 ? "default" : "pointer", fontSize: "0.85rem" }}>Previous</button>
              <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: "0.4rem 0.75rem", borderRadius: "6px", border: "1px solid #333", background: "transparent", color: page === totalPages ? "#444" : "#fff", cursor: page === totalPages ? "default" : "pointer", fontSize: "0.85rem" }}>Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Drawer */}
      {selected && <CreatorDrawer creator={selected} onClose={() => setSelected(null)} onDelete={handleDelete} onUpdate={() => { setSelected(null); fetchCreators(); }} />}
    </>
  );
}
