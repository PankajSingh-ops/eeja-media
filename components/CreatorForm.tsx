"use client";

import { useState, FormEvent } from "react";
import axios from "axios";

const ROLES = ["creator", "influencer"] as const;
const PLATFORMS = ["Instagram", "YouTube", "TikTok", "Twitter/X", "Facebook", "LinkedIn", "Other"] as const;
const NICHES = ["Fashion", "Tech", "Fitness", "Food", "Travel", "Gaming", "Beauty", "Finance", "Education", "Lifestyle", "Entertainment", "Other"] as const;
const FORMATS = ["Reels", "Long-form", "Blogs", "Graphics", "Shorts", "Photos", "Other"] as const;

const DEFAULT_SOCIALS = [
  { key: "instagram", label: "Instagram", icon: "📸" },
  { key: "youtube", label: "YouTube", icon: "▶️" },
  { key: "twitter", label: "Twitter/X", icon: "𝕏" },
  { key: "tiktok", label: "TikTok", icon: "🎵" },
];

interface ExtraPlatform { name: string; url: string; followers?: string; }

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.75rem 1rem", background: "#1a1a1a",
  border: "1px solid #333", borderRadius: "10px", color: "#fff",
  fontSize: "0.95rem", transition: "all 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block", marginBottom: "0.4rem", color: "#9ca3af",
  fontSize: "0.85rem", fontWeight: 500,
};

export default function CreatorForm() {
  const [fullName, setFullName] = useState("");
  const [stageName, setStageName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<string>("");
  const [primaryPlatform, setPrimaryPlatform] = useState("");
  const [niche, setNiche] = useState("");
  const [contentFormat, setContentFormat] = useState("");
  const [socials, setSocials] = useState<Record<string, { url: string; followers?: string }>>({ instagram: { url: "" }, youtube: { url: "" }, twitter: { url: "" }, tiktok: { url: "" } });
  const [extraPlatforms, setExtraPlatforms] = useState<ExtraPlatform[]>([]);
  const [totalFollowers, setTotalFollowers] = useState("");
  const [perPostCharge, setPerPostCharge] = useState("");
  const [additionalPageUrl, setAdditionalPageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [exclusiveManagement, setExclusiveManagement] = useState(false);
  const [previousBrandCollab, setPreviousBrandCollab] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) e.email = "Valid email is required";
    if (!phoneNumber.trim()) e.phoneNumber = "Phone number is required";
    if (!role) e.role = "Please select a role";
    if (!niche) e.niche = "Please select a niche";
    if (!totalFollowers || Number(totalFollowers) < 0) e.totalFollowers = "Enter valid follower count";
    if (perPostCharge && Number(perPostCharge) < 0) e.perPostCharge = "Enter valid charge";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post("/api/creators", {
        fullName: fullName.trim(), stageName: stageName.trim() || undefined,
        email: email.trim(), phoneNumber: phoneNumber.trim(),
        role, niche, primaryPlatform: primaryPlatform || undefined,
        contentFormat: contentFormat || undefined,
        socialLinks: { 
          ...Object.fromEntries(Object.entries(socials).filter(([_, v]) => v.url).map(([k, v]) => [k, { url: v.url, followers: v.followers ? Number(v.followers) : undefined }])),
          ...(extraPlatforms.length ? { other: extraPlatforms.map(p => `${p.name}: ${p.url}${p.followers ? ` (${p.followers} followers)` : ''}`).join(", ") } : {}) 
        },
        totalFollowers: Number(totalFollowers), perPostCharge: perPostCharge ? Number(perPostCharge) : undefined,
        additionalPageUrl: additionalPageUrl || undefined, bio: bio || undefined, location: location || undefined,
        exclusiveManagement, previousBrandCollab,
      });
      setSuccess(true);
    } catch {
      setToast("Something went wrong. Please try again.");
      setTimeout(() => setToast(""), 4000);
    } finally { setLoading(false); }
  };

  if (success) {
    return (
      <div style={{ background: "#111", borderRadius: "20px", padding: "3rem 2rem", textAlign: "center", border: "1px solid rgba(251,207,15,0.2)" }}>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ margin: "0 auto 1.5rem" }}>
          <circle cx="32" cy="32" r="30" fill="none" stroke="#FBCF0F" strokeWidth="2" opacity="0.3" />
          <circle cx="32" cy="32" r="30" fill="none" stroke="#FBCF0F" strokeWidth="2" strokeDasharray="188" strokeDashoffset="188" style={{ animation: "checkmark 0.8s ease-out forwards" }} />
          <path d="M20 33 L28 41 L44 25" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-checkmark" style={{ strokeDasharray: 50, strokeDashoffset: 50 }} />
        </svg>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>Welcome to Eeja Media! 🎉</h3>
        <p style={{ color: "#9ca3af", marginBottom: "0.5rem" }}>Thank you, <strong style={{ color: "#fbbf24" }}>{fullName}</strong></p>
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>We&apos;ll be in touch before June 3rd.</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Full Name */}
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input style={inputStyle} placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} />
          {errors.fullName && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>{errors.fullName}</p>}
        </div>

        {/* Stage Name */}
        <div>
          <label style={labelStyle}>Stage Name (if any)</label>
          <input style={inputStyle} placeholder="Your stage name or alias" value={stageName} onChange={e => setStageName(e.target.value)} />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email *</label>
          <input type="email" style={inputStyle} placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
          {errors.email && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input type="tel" style={inputStyle} placeholder="Your phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          {errors.phoneNumber && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>{errors.phoneNumber}</p>}
        </div>

           {/* Location */}
        <div>
          <label style={labelStyle}>Location</label>
          <input style={inputStyle} placeholder="City, Country (optional)" value={location} onChange={e => setLocation(e.target.value)} />
        </div>

        {/* Role */}
        <div>
          <label style={labelStyle}>I am a *</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {ROLES.map(r => (
              <button type="button" key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: "0.65rem", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
                border: role === r ? "1px solid #FBCF0F" : "1px solid #333", textTransform: "capitalize",
                background: role === r ? "#FBCF0F" : "#1a1a1a", color: role === r ? "#fff" : "#9ca3af",
                transition: "all 0.2s ease",
              }}>{r}</button>
            ))}
          </div>
          {errors.role && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>{errors.role}</p>}
        </div>

        {/* Primary Platform */}
        <div>
          <label style={labelStyle}>Primary Platform</label>
          <select value={primaryPlatform} onChange={e => setPrimaryPlatform(e.target.value)} style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}>
            <option value="">Select platform</option>
            {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Niche */}
        <div>
          <label style={labelStyle}>Primary Niche/Category *</label>
          <select value={niche} onChange={e => setNiche(e.target.value)} style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}>
            <option value="">Select niche</option>
            {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          {errors.niche && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>{errors.niche}</p>}
        </div>

        {/* Content Format */}
        <div>
          <label style={labelStyle}>Content Format</label>
          <select value={contentFormat} onChange={e => setContentFormat(e.target.value)} style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}>
            <option value="">Select format</option>
            {FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {/* Social Links */}
        <div>
          <label style={labelStyle}>Social Handles/Links</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {DEFAULT_SOCIALS.map(s => (
              <div key={s.key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ width: "2rem", textAlign: "center", fontSize: "1.1rem" }}>{s.icon}</span>
                <span style={{ width: "5rem", color: "#9ca3af", fontSize: "0.85rem" }}>{s.label}</span>
                <input style={{ ...inputStyle, flex: 1, minWidth: "120px" }} placeholder={`${s.label} URL`} value={socials[s.key]?.url || ""} onChange={e => setSocials(prev => ({ ...prev, [s.key]: { ...prev[s.key], url: e.target.value } }))} />
                <input type="number" style={{ ...inputStyle, width: "8rem", flex: "none" }} placeholder="Followers" value={socials[s.key]?.followers || ""} onChange={e => setSocials(prev => ({ ...prev, [s.key]: { ...prev[s.key], followers: e.target.value } }))} />
              </div>
            ))}
            {extraPlatforms.map((ep, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ width: "2rem", textAlign: "center" }}>🔗</span>
                <input style={{ ...inputStyle, width: "5rem", flex: "none" }} placeholder="Name" value={ep.name} onChange={e => { const arr = [...extraPlatforms]; arr[i].name = e.target.value; setExtraPlatforms(arr); }} />
                <input style={{ ...inputStyle, flex: 1, minWidth: "120px" }} placeholder="URL" value={ep.url} onChange={e => { const arr = [...extraPlatforms]; arr[i].url = e.target.value; setExtraPlatforms(arr); }} />
                <input type="number" style={{ ...inputStyle, width: "8rem", flex: "none" }} placeholder="Followers" value={ep.followers || ""} onChange={e => { const arr = [...extraPlatforms]; arr[i].followers = e.target.value; setExtraPlatforms(arr); }} />
                <button type="button" onClick={() => setExtraPlatforms(prev => prev.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1.2rem" }}>×</button>
              </div>
            ))}
            <button type="button" onClick={() => setExtraPlatforms(prev => [...prev, { name: "", url: "" }])} style={{ background: "none", border: "1px dashed #333", borderRadius: "10px", padding: "0.5rem", color: "#FBCF0F", cursor: "pointer", fontSize: "0.85rem", transition: "border-color 0.2s" }}>+ Add another platform</button>
          </div>
        </div>

        {/* Total Followers */}
        <div>
          <label style={labelStyle}>Total Followers *</label>
          <input type="number" style={inputStyle} placeholder="Combined followers across all platforms" value={totalFollowers} onChange={e => setTotalFollowers(e.target.value)} />
          {errors.totalFollowers && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>{errors.totalFollowers}</p>}
        </div>

        {/* Per Post Charge */}
        <div>
          <label style={labelStyle}>Base Charge (INR)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#FBCF0F", fontWeight: 700 }}>₹</span>
            <input type="number" style={{ ...inputStyle, paddingLeft: "2rem" }} placeholder="Your rate per sponsored post" value={perPostCharge} onChange={e => setPerPostCharge(e.target.value)} />
          </div>
          {errors.perPostCharge && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.3rem" }}>{errors.perPostCharge}</p>}
        </div>

        {/* Additional URL */}
        <div>
          <label style={labelStyle}>Additional Page URL</label>
          <input style={inputStyle} placeholder="Personal website, blog, or portfolio link (optional)" value={additionalPageUrl} onChange={e => setAdditionalPageUrl(e.target.value)} />
        </div>

        {/* Bio */}
        <div>
          <label style={labelStyle}>Bio / About You</label>
          <div style={{ position: "relative" }}>
            <textarea rows={4} maxLength={500} style={{ ...inputStyle, resize: "vertical" }} placeholder="Tell us about yourself..." value={bio} onChange={e => setBio(e.target.value)} />
            <span style={{ position: "absolute", bottom: "0.5rem", right: "0.75rem", color: "#6b7280", fontSize: "0.75rem" }}>{bio.length}/500</span>
          </div>
        </div>

     

        {/* Previous Brand Collab */}
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af", fontSize: "0.95rem", cursor: "pointer" }}>
            <input type="checkbox" checked={previousBrandCollab} onChange={e => setPreviousBrandCollab(e.target.checked)} style={{ width: "1.2rem", height: "1.2rem", accentColor: "#FBCF0F", cursor: "pointer" }} />
            Have you done any previous brand collaboration?
          </label>
        </div>

        {/* Exclusive Management */}
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af", fontSize: "0.95rem", cursor: "pointer" }}>
            <input type="checkbox" checked={exclusiveManagement} onChange={e => setExclusiveManagement(e.target.checked)} style={{ width: "1.2rem", height: "1.2rem", accentColor: "#FBCF0F", cursor: "pointer" }} />
            Do you want us to manage your profile exclusively?
          </label>
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} style={{
          width: "100%", padding: "1rem", borderRadius: "12px", border: "none", cursor: loading ? "wait" : "pointer",
          background: "linear-gradient(135deg, #D6AF0A, #FBCF0F)", color: "#fff", fontSize: "1.1rem", fontWeight: 700,
          transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(251,207,15,0.4)"; } }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          {loading ? (<><span className="animate-spin-slow" style={{ display: "inline-block", width: "20px", height: "20px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} /> Submitting...</>) : "Join Eeja Media →"}
        </button>
      </form>

      {/* Toast */}
      {toast && (
        <div className="animate-slide-up" style={{ position: "fixed", bottom: "2rem", left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", border: "1px solid #ef4444", color: "#ef4444", padding: "0.75rem 1.5rem", borderRadius: "12px", fontSize: "0.9rem", zIndex: 10000, boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}>
          {toast}
        </div>
      )}
    </>
  );
}
