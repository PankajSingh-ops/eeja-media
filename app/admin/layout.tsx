"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import AuthProvider from "@/components/admin/AuthProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  return (
    <AuthProvider>
      <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0a" }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: "240px", padding: "1.5rem 2rem", minHeight: "100vh" }}>
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
