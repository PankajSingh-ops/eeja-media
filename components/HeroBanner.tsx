"use client";

import CountdownTimer from "./CountdownTimer";

export default function HeroBanner() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "2rem 1.5rem",
      }}
    >
      {/* Background radial gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 15% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 85% 80%, rgba(245, 158, 11, 0.12) 0%, transparent 70%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        {/* Launching Soon Badge */}
        <div className="animate-fade-in-up" style={{ marginBottom: "2.5rem" }}>
          <span
            className="animate-glow-pulse"
            style={{
              display: "inline-block",
              padding: "0.6rem 1.75rem",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(124, 58, 237, 0.3))",
              border: "1px solid rgba(167, 139, 250, 0.6)",
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
            }}
          >
            ✦ Launching Soon
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="gradient-text animate-fade-in-up-delay-1"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Eeja Media
        </h1>

        {/* Subheading */}
        <p
          className="animate-fade-in-up-delay-2"
          style={{
            color: "#9ca3af",
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            maxWidth: "500px",
            margin: "0 auto 3rem",
            lineHeight: 1.6,
          }}
        >
          Where Creators & Influencers Unite
        </p>

        {/* Countdown Timer */}
        <div className="animate-fade-in-up-delay-3">
          <CountdownTimer />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in-up-delay-3"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "40px",
            border: "2px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "8px",
          }}
        >
          <div
            style={{
              width: "3px",
              height: "8px",
              background: "#8b5cf6",
              borderRadius: "2px",
              animation: "fadeInUp 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
