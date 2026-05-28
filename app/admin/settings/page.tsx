"use client";

import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import TopBar from "@/components/admin/TopBar";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", background: "#1a1a1a",
  border: "1px solid #333", borderRadius: "10px", color: "#fff", fontSize: "0.95rem",
};
const labelStyle: React.CSSProperties = { display: "block", color: "#9ca3af", fontSize: "0.85rem", marginBottom: "0.4rem" };

export default function SettingsPage() {
  // Password form
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  // Site settings
  const [launchDate, setLaunchDate] = useState("2026-06-03");
  const [siteStatus, setSiteStatus] = useState<"coming_soon" | "live">("coming_soon");
  const [displayName, setDisplayName] = useState("Admin");
  const [settingsMsg, setSettingsMsg] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);

  useEffect(() => {
    axios.get("/api/admin/settings").then(r => {
      const d = r.data;
      if (d.launchDate) setLaunchDate(new Date(d.launchDate).toISOString().split("T")[0]);
      if (d.siteStatus) setSiteStatus(d.siteStatus);
      if (d.adminDisplayName) setDisplayName(d.adminDisplayName);
    }).catch(() => {});
  }, []);

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPwMsg("");
    if (newPw !== confirmPw) { setPwMsg("Passwords don't match"); return; }
    if (newPw.length < 6) { setPwMsg("Password must be at least 6 characters"); return; }
    setPwLoading(true);
    try {
      await axios.put("/api/admin/password", { currentPassword: currentPw, newPassword: newPw });
      setPwMsg("✅ Password updated successfully");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } catch (err) {
      const errMsg = axios.isAxiosError(err) && err.response?.data?.error ? err.response.data.error : "Failed to update";
      setPwMsg(errMsg);
    }
    setPwLoading(false);
  };

  const handleSettingsSave = async () => {
    setSettingsLoading(true); setSettingsMsg("");
    try {
      await axios.put("/api/admin/settings", { launchDate, siteStatus, adminDisplayName: displayName });
      setSettingsMsg("✅ Settings saved");
    } catch { setSettingsMsg("Failed to save"); }
    setSettingsLoading(false);
  };

  return (
    <>
      <TopBar title="Settings" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", maxWidth: "900px" }}>
        {/* Password */}
        <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem" }}>
          <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: "1.25rem" }}>Change Password</h3>
          <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div><label style={labelStyle}>Current Password</label><input type="password" style={inputStyle} value={currentPw} onChange={e => setCurrentPw(e.target.value)} required /></div>
            <div><label style={labelStyle}>New Password</label><input type="password" style={inputStyle} value={newPw} onChange={e => setNewPw(e.target.value)} required /></div>
            <div><label style={labelStyle}>Confirm New Password</label><input type="password" style={inputStyle} value={confirmPw} onChange={e => setConfirmPw(e.target.value)} required /></div>
            <button type="submit" disabled={pwLoading} style={{ padding: "0.75rem", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff", fontWeight: 700, cursor: "pointer", opacity: pwLoading ? 0.7 : 1 }}>
              {pwLoading ? "Updating..." : "Update Password"}
            </button>
            {pwMsg && <p style={{ color: pwMsg.includes("✅") ? "#22c55e" : "#ef4444", fontSize: "0.85rem" }}>{pwMsg}</p>}
          </form>
        </div>

        {/* Site Settings */}
        <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem" }}>
          <h3 style={{ color: "#fff", fontWeight: 600, marginBottom: "1.25rem" }}>Site Settings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div><label style={labelStyle}>Launch Date</label><input type="date" style={{ ...inputStyle, colorScheme: "dark" }} value={launchDate} onChange={e => setLaunchDate(e.target.value)} /></div>
            <div>
              <label style={labelStyle}>Site Status</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {(["coming_soon", "live"] as const).map(s => (
                  <button key={s} type="button" onClick={() => setSiteStatus(s)} style={{
                    flex: 1, padding: "0.6rem", borderRadius: "10px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem",
                    border: siteStatus === s ? "1px solid #8b5cf6" : "1px solid #333",
                    background: siteStatus === s ? "#8b5cf6" : "#111", color: siteStatus === s ? "#fff" : "#9ca3af",
                  }}>{s === "coming_soon" ? "Coming Soon" : "Live"}</button>
                ))}
              </div>
            </div>
            <div><label style={labelStyle}>Admin Display Name</label><input style={inputStyle} value={displayName} onChange={e => setDisplayName(e.target.value)} /></div>
            <button onClick={handleSettingsSave} disabled={settingsLoading} style={{ padding: "0.75rem", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff", fontWeight: 700, cursor: "pointer", opacity: settingsLoading ? 0.7 : 1 }}>
              {settingsLoading ? "Saving..." : "Save Settings"}
            </button>
            {settingsMsg && <p style={{ color: settingsMsg.includes("✅") ? "#22c55e" : "#ef4444", fontSize: "0.85rem" }}>{settingsMsg}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
