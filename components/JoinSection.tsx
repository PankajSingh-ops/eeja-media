"use client";

import CreatorForm from "./CreatorForm";

const features = [
  { icon: "✦", title: "Get Discovered", desc: "Connect with top brands looking for authentic voices." },
  { icon: "✦", title: "Monetize Your Content", desc: "Set your rates and get paid for what you love." },
  { icon: "✦", title: "Join 10,000+ Creators", desc: "Be part of a thriving community of creators." },
  { icon: "✦", title: "Collaborate Globally", desc: "Work with brands and creators worldwide." },
];

export default function JoinSection() {
  return (
    <section
      id="join"
      style={{
        padding: "5rem 1.5rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
        }}
        className="join-grid"
      >
        {/* Left Column */}
        <div className="animate-fade-in-up" style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Purple gradient line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "3px",
              background: "linear-gradient(to bottom, #8b5cf6, rgba(139,92,246,0.1))",
              borderRadius: "2px",
            }}
          />
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "2.5rem",
            }}
          >
            Join Us
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span
                  style={{
                    color: "#8b5cf6",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {f.icon}
                </span>
                <div>
                  <h3 style={{ color: "#fff", fontWeight: 600, fontSize: "1.05rem", marginBottom: "0.25rem" }}>
                    {f.title}
                  </h3>
                  <p style={{ color: "#9ca3af", fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Form */}
        <div
          className="animate-fade-in-up-delay-1"
          style={{
            background: "rgba(17,17,17,0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "2rem",
            border: "1px solid #222",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            Create Your Profile
          </h3>
          <CreatorForm />
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .join-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
