"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ title, message, confirmLabel = "Confirm", onConfirm, onCancel }: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#1a1a1a", padding: "2rem", borderRadius: "12px", width: "400px", maxWidth: "90vw", border: "1px solid #333", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
        <h3 style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h3>
        <p style={{ color: "#9ca3af", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: 1.5 }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button onClick={onCancel} style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", background: "transparent", border: "1px solid #333", color: "#fff", cursor: "pointer", fontWeight: 500, fontSize: "0.9rem" }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>{confirmLabel}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
