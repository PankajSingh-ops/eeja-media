"use client";

import { useSession } from "next-auth/react";

export default function TopBar({ title }: { title: string }) {
  const { data: session } = useSession();
  const initials = (session?.user?.name || "A").charAt(0).toUpperCase();

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.25rem 0", marginBottom: "1.5rem", borderBottom: "1px solid #1a1a1a",
    }}>
      <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>{title}</h1>
      <div style={{
        width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
        display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.9rem",
      }}>{initials}</div>
    </div>
  );
}
