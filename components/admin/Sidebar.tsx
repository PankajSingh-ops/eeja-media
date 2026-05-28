"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { label: "Registrations", href: "/admin/registrations", icon: "👥" },
  { label: "Analytics", href: "/admin/analytics", icon: "📈" },
  { label: "Export Data", href: "/admin/export", icon: "⬇️" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside style={{
      width: "240px", minHeight: "100vh", background: "#111111", borderRight: "1px solid #222",
      display: "flex", flexDirection: "column", flexShrink: 0, position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 30,
    }}>
      {/* Logo */}
      <div style={{ padding: "1.5rem", borderBottom: "1px solid #222" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>Eeja</span>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, color: "#8b5cf6" }}>Media</span>
          <span style={{ background: "#8b5cf6", color: "#fff", fontSize: "0.6rem", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1.5rem",
              color: isActive ? "#a78bfa" : "#9ca3af", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500,
              background: isActive ? "#1a1a1a" : "transparent", borderLeft: isActive ? "3px solid #8b5cf6" : "3px solid transparent",
              transition: "all 0.2s ease",
            }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom — user + sign out */}
      <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #222" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{session?.user?.name || "admin"}</p>
        <button onClick={() => signOut({ callbackUrl: "/admin/login" })} style={{
          width: "100%", padding: "0.5rem", borderRadius: "8px", border: "1px solid #333",
          background: "transparent", color: "#ef4444", fontSize: "0.85rem", cursor: "pointer", transition: "background 0.2s",
        }}>Sign Out</button>
      </div>
    </aside>
  );
}
