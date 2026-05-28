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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          marginBottom: "1.25rem",
        }}
      >
        {/* Instagram */}
        <a href="#" aria-label="Instagram" style={{ color: "#9ca3af", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#8b5cf6")}
          onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </a>
        {/* Twitter */}
        <a href="#" aria-label="Twitter" style={{ color: "#9ca3af", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#8b5cf6")}
          onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        {/* YouTube */}
        <a href="#" aria-label="YouTube" style={{ color: "#9ca3af", transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#8b5cf6")}
          onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
      </div>

      <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
        Eeja Media © 2026
      </p>
      <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
        Built for creators, by creators.
      </p>
    </footer>
  );
}
