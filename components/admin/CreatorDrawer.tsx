"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "./Toast";
import ConfirmModal from "./ConfirmModal";

interface Creator {
  _id: string;
  fullName: string;
  stageName?: string;
  email?: string;
  phoneNumber?: string;
  role: string;
  niche: string;
  primaryPlatform?: string;
  contentFormat?: string;
  totalFollowers: number;
  perPostCharge?: number;
  bio?: string;
  location?: string;
  additionalPageUrl?: string;
  socialLinks?: Record<string, any>;
  exclusiveManagement?: boolean;
  previousBrandCollab?: boolean;
  createdAt: string;
}

const PLATFORMS = ["Instagram", "YouTube", "TikTok", "Twitter/X", "Facebook", "LinkedIn", "Other"];
const NICHES = ["Fashion", "Tech", "Fitness", "Food", "Travel", "Gaming", "Beauty", "Finance", "Education", "Lifestyle", "Entertainment", "Other"];
const FORMATS = ["Reels", "Long-form", "Blogs", "Graphics", "Shorts", "Photos", "Other"];

export default function CreatorDrawer({ creator, onClose, onDelete, onUpdate }: { creator: Creator | null; onClose: () => void; onDelete: (id: string) => void; onUpdate: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Creator>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { showToast, ToastContainer } = useToast();

  if (!creator) return null;

  const handleEditClick = () => {
    setIsEditing(true);
    setEditData({ ...creator, socialLinks: { ...creator.socialLinks } });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.put(`/api/creators/${creator._id}`, editData);
      showToast("Changes saved", "success");
      setIsEditing(false);
      onUpdate(); // Call parent to re-fetch/update local state
    } catch (error) {
      showToast("Failed to save changes, please try again", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(creator._id);
  };

  const initials = creator.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const roleBg: Record<string, string> = { creator: "#8b5cf6", influencer: "#FBCF0F" };
  const socialIcons: Record<string, string> = { instagram: "📸", youtube: "▶️", twitter: "𝕏", tiktok: "🎵", facebook: "📘", linkedin: "💼", other: "🔗" };

  const inputStyle = { width: "100%", padding: "0.6rem", background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", color: "#fff", fontSize: "0.9rem" };
  const labelStyle = { display: "block", marginBottom: "0.3rem", color: "#9ca3af", fontSize: "0.8rem", textTransform: "uppercase" as any };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 50 }} />
      <ToastContainer />
      {showDeleteModal && (
        <ConfirmModal
          title="Delete Creator"
          message={`Are you sure you want to delete ${creator.fullName}? This cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "450px", maxWidth: "100vw", background: "#111",
        borderLeft: "1px solid #222", zIndex: 51, overflowY: "auto", animation: "slideInRight 0.3s ease-out",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: "1px solid #222" }}>
          <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "1.1rem" }}>{isEditing ? "Edit Creator" : "Creator Details"}</h3>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {!isEditing && (
              <button onClick={handleEditClick} style={{ background: "transparent", border: "1px solid #8b5cf6", color: "#fff", padding: "0.3rem 0.8rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                ✏️ Edit
              </button>
            )}
            <button onClick={onClose} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "1.5rem", lineHeight: 1 }}>×</button>
          </div>
        </div>

        <div style={{ padding: "1.5rem", flex: 1 }}>
          {isEditing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} value={editData.fullName || ""} onChange={e => setEditData({ ...editData, fullName: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Stage Name</label>
                <input style={inputStyle} value={editData.stageName || ""} onChange={e => setEditData({ ...editData, stageName: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" style={inputStyle} value={editData.email || ""} onChange={e => setEditData({ ...editData, email: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" style={inputStyle} value={editData.phoneNumber || ""} onChange={e => setEditData({ ...editData, phoneNumber: e.target.value })} />
              </div>
              
              <div>
                <label style={labelStyle}>Role</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {["creator", "influencer"].map(r => (
                    <button key={r} onClick={() => setEditData({ ...editData, role: r })} style={{
                      flex: 1, padding: "0.5rem", borderRadius: "8px", textTransform: "capitalize", fontSize: "0.85rem", cursor: "pointer",
                      background: editData.role === r ? "#8b5cf6" : "#1a1a1a", border: editData.role === r ? "none" : "1px solid #333", color: "#fff"
                    }}>{r}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Primary Platform</label>
                <select style={inputStyle} value={editData.primaryPlatform || ""} onChange={e => setEditData({ ...editData, primaryPlatform: e.target.value })}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Niche</label>
                <select style={inputStyle} value={editData.niche || ""} onChange={e => setEditData({ ...editData, niche: e.target.value })}>
                  {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Content Format</label>
                <select style={inputStyle} value={editData.contentFormat || ""} onChange={e => setEditData({ ...editData, contentFormat: e.target.value })}>
                  <option value="">Select format</option>
                  {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Total Followers</label>
                <input type="number" style={inputStyle} value={editData.totalFollowers || 0} onChange={e => setEditData({ ...editData, totalFollowers: Number(e.target.value) })} />
              </div>

              <div>
                <label style={labelStyle}>Per Post Charge ($/₹)</label>
                <input type="number" style={inputStyle} value={editData.perPostCharge || ""} onChange={e => setEditData({ ...editData, perPostCharge: Number(e.target.value) || undefined })} />
              </div>

              <div>
                <label style={labelStyle}>Location</label>
                <input style={inputStyle} value={editData.location || ""} onChange={e => setEditData({ ...editData, location: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Website / Additional URL</label>
                <input style={inputStyle} value={editData.additionalPageUrl || ""} onChange={e => setEditData({ ...editData, additionalPageUrl: e.target.value })} />
              </div>

              <div>
                <label style={labelStyle}>Bio</label>
                <textarea rows={4} maxLength={500} style={{ ...inputStyle, resize: "vertical" }} value={editData.bio || ""} onChange={e => setEditData({ ...editData, bio: e.target.value })} />
                <div style={{ textAlign: "right", color: "#6b7280", fontSize: "0.75rem", marginTop: "0.2rem" }}>{(editData.bio || "").length}/500</div>
              </div>

              <div>
                <label style={labelStyle}>Social Links</label>
                {["instagram", "youtube", "twitter", "tiktok", "facebook", "linkedin"].map(platform => {
                  const val = (editData.socialLinks || {})[platform] || { url: "", followers: "" };
                  const url = typeof val === "string" ? val : val.url;
                  const followers = typeof val === "object" ? val.followers : "";
                  return (
                    <div key={platform} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ width: "20px" }}>{socialIcons[platform] || "🔗"}</span>
                      <input style={{ ...inputStyle, flex: 1, minWidth: "120px" }} placeholder={`${platform} URL`} value={url || ""} onChange={e => setEditData({ ...editData, socialLinks: { ...(editData.socialLinks || {}), [platform]: { url: e.target.value, followers } } })} />
                      <input type="number" style={{ ...inputStyle, width: "8rem" }} placeholder="Followers" value={followers || ""} onChange={e => setEditData({ ...editData, socialLinks: { ...(editData.socialLinks || {}), [platform]: { url, followers: Number(e.target.value) || undefined } } })} />
                    </div>
                  );
                })}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ width: "20px" }}>🔗</span>
                  <input style={inputStyle} placeholder="Other Links (e.g. Name: URL)" value={(editData.socialLinks || {}).other || ""} onChange={e => setEditData({ ...editData, socialLinks: { ...(editData.socialLinks || {}), other: e.target.value } })} />
                </div>
              </div>
              
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af", fontSize: "0.9rem", cursor: "pointer", marginTop: "0.5rem" }}>
                  <input type="checkbox" checked={editData.previousBrandCollab || false} onChange={e => setEditData({ ...editData, previousBrandCollab: e.target.checked })} style={{ width: "1.2rem", height: "1.2rem", accentColor: "#8b5cf6" }} />
                  Previous brand collab?
                </label>
              </div>

              <div>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af", fontSize: "0.9rem", cursor: "pointer", marginBottom: "0.5rem" }}>
                  <input type="checkbox" checked={editData.exclusiveManagement || false} onChange={e => setEditData({ ...editData, exclusiveManagement: e.target.checked })} style={{ width: "1.2rem", height: "1.2rem", accentColor: "#8b5cf6" }} />
                  Exclusive management?
                </label>
              </div>
              
            </div>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `linear-gradient(135deg, ${roleBg[creator.role] || "#8b5cf6"}, #4c1d95)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem", color: "#fff", fontWeight: 700, fontSize: "1.25rem" }}>{initials}</div>
                <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", marginBottom: "0.25rem" }}>{creator.fullName} {creator.stageName ? `(${creator.stageName})` : ""}</h4>
                <span style={{ background: roleBg[creator.role] || "#666", color: "#fff", padding: "2px 12px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize" }}>{creator.role}</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {[
                  { label: "Email", value: creator.email || "—" },
                  { label: "Phone", value: creator.phoneNumber || "—" },
                  { label: "Niche", value: creator.niche },
                  { label: "Format", value: creator.contentFormat || "—" },
                  { label: "Platform", value: creator.primaryPlatform || "—" },
                  { label: "Followers", value: creator.totalFollowers?.toLocaleString() },
                  { label: "Per Post", value: creator.perPostCharge ? `₹${creator.perPostCharge}` : "—" },
                  { label: "Location", value: creator.location || "—" },
                  { label: "Joined", value: new Date(creator.createdAt).toLocaleDateString() },
                ].map(s => (
                  <div key={s.label} style={{ background: "#1a1a1a", borderRadius: "10px", padding: "0.75rem" }}>
                    <p style={{ color: "#6b7280", fontSize: "0.7rem", textTransform: "uppercase", marginBottom: "0.25rem" }}>{s.label}</p>
                    <p style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500, overflowWrap: "anywhere" }}>{s.value}</p>
                  </div>
                ))}
              </div>

              {creator.bio && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem", textTransform: "uppercase" }}>Bio</p>
                  <p style={{ color: "#d1d5db", fontSize: "0.9rem", lineHeight: 1.5, background: "#1a1a1a", borderRadius: "10px", padding: "0.75rem" }}>{creator.bio}</p>
                </div>
              )}

              {creator.socialLinks && Object.entries(creator.socialLinks).some(([, v]) => v) && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>Social Links</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {Object.entries(creator.socialLinks).filter(([, v]) => v).map(([key, value]) => {
                      if (key === "other") {
                        return <div key={key} style={{ color: "#a78bfa", fontSize: "0.85rem", overflowWrap: "anywhere", background: "#1a1a1a", padding: "0.4rem 0.75rem", borderRadius: "8px" }}>🔗 {value as string}</div>;
                      }
                      const url = typeof value === 'string' ? value : value?.url;
                      const followers = typeof value === 'object' && value?.followers ? ` (${value.followers.toLocaleString()} followers)` : '';
                      if (!url) return null;
                      return (
                        <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "#a78bfa", fontSize: "0.85rem", textDecoration: "none", padding: "0.4rem 0.75rem", background: "#1a1a1a", borderRadius: "8px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span>{socialIcons[key] || "🔗"}</span>
                            <span style={{ textTransform: "capitalize" }}>{key}</span>
                          </span>
                          <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{followers}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {creator.additionalPageUrl && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.4rem", textTransform: "uppercase" }}>Website</p>
                  <a href={creator.additionalPageUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#a78bfa", fontSize: "0.85rem", overflowWrap: "anywhere" }}>{creator.additionalPageUrl}</a>
                </div>
              )}
            </>
          )}
        </div>

        {isEditing ? (
          <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #222", display: "flex", gap: "1rem" }}>
            <button onClick={handleCancel} disabled={isSaving} style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #333", background: "transparent", color: "#fff", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
            <button onClick={handleSave} disabled={isSaving} style={{ flex: 1, padding: "0.75rem", borderRadius: "8px", border: "none", background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", color: "#fff", cursor: isSaving ? "wait" : "pointer", fontWeight: 600, opacity: isSaving ? 0.7 : 1 }}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #222" }}>
            <button onClick={handleDelete} style={{ width: "100%", padding: "0.75rem", borderRadius: "10px", border: "1px solid #ef4444", background: "transparent", color: "#ef4444", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>Delete Creator</button>
          </div>
        )}

        <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
      </div>
    </>
  );
}
