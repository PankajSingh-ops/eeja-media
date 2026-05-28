"use client";

interface Creator {
  _id: string;
  fullName: string;
  role: string;
  niche: string;
  primaryPlatform?: string;
  totalFollowers: number;
  perPostCharge: number;
  bio?: string;
  location?: string;
  additionalPageUrl?: string;
  socialLinks?: Record<string, string>;
  createdAt: string;
}

export default function CreatorDrawer({ creator, onClose, onDelete }: { creator: Creator | null; onClose: () => void; onDelete: (id: string) => void }) {
  if (!creator) return null;

  const initials = creator.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const roleBg: Record<string, string> = { creator: "#8b5cf6", influencer: "#f59e0b", brand: "#14b8a6" };

  const handleDelete = () => {
    if (confirm(`Delete ${creator.fullName}? This cannot be undone.`)) {
      onDelete(creator._id);
    }
  };

  const socialIcons: Record<string, string> = { instagram: "📸", youtube: "▶️", twitter: "𝕏", tiktok: "🎵", facebook: "📘", linkedin: "💼", other: "🔗" };

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50 }} />
      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "400px", maxWidth: "90vw", background: "#111",
        borderLeft: "1px solid #222", zIndex: 51, overflowY: "auto", animation: "slideInRight 0.3s ease-out",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #222" }}>
          <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}>Creator Details</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "1.5rem" }}>×</button>
        </div>

        <div style={{ padding: "1.5rem", flex: 1 }}>
          {/* Avatar + Name */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `linear-gradient(135deg, ${roleBg[creator.role] || "#8b5cf6"}, #4c1d95)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", color: "#fff", fontWeight: 700, fontSize: "1.25rem" }}>{initials}</div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.25rem" }}>{creator.fullName}</h4>
            <span style={{ background: roleBg[creator.role] || "#666", color: "#fff", padding: "2px 12px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize" }}>{creator.role}</span>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Niche", value: creator.niche },
              { label: "Platform", value: creator.primaryPlatform || "—" },
              { label: "Followers", value: creator.totalFollowers?.toLocaleString() },
              { label: "Per Post", value: `₹${creator.perPostCharge}` },
              { label: "Location", value: creator.location || "—" },
              { label: "Joined", value: new Date(creator.createdAt).toLocaleDateString() },
            ].map(s => (
              <div key={s.label} style={{ background: "#1a1a1a", borderRadius: "10px", padding: "0.75rem" }}>
                <p style={{ color: "#6b7280", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: "0.25rem" }}>{s.label}</p>
                <p style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          {creator.bio && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem", textTransform: "uppercase" }}>Bio</p>
              <p style={{ color: "#d1d5db", fontSize: "0.9rem", lineHeight: 1.5, background: "#1a1a1a", borderRadius: "10px", padding: "0.75rem" }}>{creator.bio}</p>
            </div>
          )}

          {/* Social Links */}
          {creator.socialLinks && Object.entries(creator.socialLinks).some(([, v]) => v) && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>Social Links</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {Object.entries(creator.socialLinks).filter(([, v]) => v).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#a78bfa", fontSize: "0.85rem", textDecoration: "none", padding: "0.4rem 0.75rem", background: "#1a1a1a", borderRadius: "8px" }}>
                    <span>{socialIcons[key] || "🔗"}</span>
                    <span style={{ textTransform: "capitalize" }}>{key}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Additional URL */}
          {creator.additionalPageUrl && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem", textTransform: "uppercase" }}>Website</p>
              <a href={creator.additionalPageUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#a78bfa", fontSize: "0.85rem" }}>{creator.additionalPageUrl}</a>
            </div>
          )}
        </div>

        {/* Delete */}
        <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #222" }}>
          <button onClick={handleDelete} style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", border: "1px solid #ef4444", background: "transparent", color: "#ef4444", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>Delete Creator</button>
        </div>

        <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
      </div>
    </>
  );
}
