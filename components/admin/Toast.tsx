"use client";
import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<{ id: string; message: string; variant: "success" | "error" | "info" }[]>([]);

  const showToast = useCallback((message: string, variant: "success" | "error" | "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const ToastContainer = () => (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999, display: "flex", flexDirection: "column", gap: "0.75rem", pointerEvents: "none" }}>
      {toasts.map(toast => (
        <div key={toast.id} style={{
          background: "#1a1a1a", color: "#fff", padding: "1rem 1.5rem", borderRadius: "8px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          borderLeft: `4px solid ${toast.variant === "success" ? "#22c55e" : toast.variant === "error" ? "#ef4444" : "#8b5cf6"}`,
          display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.95rem", fontWeight: 500,
          animation: "slideInRight 0.3s ease-out", pointerEvents: "auto"
        }}>
          <span>{toast.variant === "success" ? "✓" : toast.variant === "error" ? "✕" : "ℹ"}</span>
          <span>{toast.message}</span>
        </div>
      ))}
      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );

  return { showToast, ToastContainer };
}
