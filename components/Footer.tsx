"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#111111",
        borderTop: "1px solid #222",
        padding: "2.5rem 1.5rem",
        textAlign: "center",
      }}
    >

      <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        Eeja Media © 2026
      </p>
      <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
        Built for creators, by creators. designed by{" "}
        <a href="https://www.digiyuni.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(178, 192, 16, 0.8)", textDecoration: "none" }}>
          digiyuni
        </a>
      </p>
    </footer>
  );
}
