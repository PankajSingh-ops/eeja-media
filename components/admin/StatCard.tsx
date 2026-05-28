export default function StatCard({ title, value, accent }: { title: string; value: string | number; accent?: string }) {
  return (
    <div style={{
      background: "#1a1a1a", borderRadius: "14px", padding: "1.5rem",
      borderTop: `3px solid ${accent || "#8b5cf6"}`, flex: "1 1 0",
    }}>
      <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</p>
      <p style={{ color: "#fff", fontSize: "1.75rem", fontWeight: 700, fontFamily: "var(--font-heading)" }}>{value}</p>
    </div>
  );
}
