"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { username, password, redirect: false });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", background: "#1a1a1a",
    border: "1px solid #333", borderRadius: "10px", color: "#fff", fontSize: "0.95rem",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "420px", background: "#111", borderRadius: "20px", padding: "2.5rem", border: "1px solid #222" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Eeja Media</h1>
          <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>Admin Portal</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", color: "#9ca3af", fontSize: "0.85rem", marginBottom: "0.4rem" }}>Username</label>
            <input style={inputStyle} value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required />
          </div>
          <div>
            <label style={{ display: "block", color: "#9ca3af", fontSize: "0.85rem", marginBottom: "0.4rem" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPw ? "text" : "password"} style={{ ...inputStyle, paddingRight: "3rem" }} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "0.8rem" }}>
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "0.85rem", borderRadius: "12px", border: "none", cursor: loading ? "wait" : "pointer",
            background: "linear-gradient(135deg, #7c3aed, #8b5cf6)", color: "#fff", fontSize: "1rem", fontWeight: 700,
            opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          }}>
            {loading ? <><span style={{ display: "inline-block", width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 1s linear infinite" }} /> Signing in...</> : "Sign In"}
          </button>
          {error && <p style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
