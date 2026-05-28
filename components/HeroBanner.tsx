"use client";

import CountdownTimer from "./CountdownTimer";

const orbs = [
  { size: 180, top: "8%", left: "-3%", delay: "0s", dur: "7s" },
  { size: 120, top: "55%", left: "2%", delay: "1.5s", dur: "9s" },
  { size: 80, top: "30%", left: "6%", delay: "3s", dur: "6s" },
  { size: 200, top: "12%", right: "-4%", delay: "2s", dur: "8s" },
  { size: 100, top: "60%", right: "3%", delay: "0.5s", dur: "10s" },
  { size: 60, top: "42%", right: "8%", delay: "4s", dur: "7.5s" },
  { size: 50, top: "78%", left: "10%", delay: "2.5s", dur: "6.5s" },
  { size: 140, top: "75%", right: "1%", delay: "1s", dur: "8.5s" },
];

export default function HeroBanner() {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#0d1033",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* ── Floating orbs ── */}
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="hero-orb"
          style={{
            position: "absolute",
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(79,125,247,0.12) 0%, rgba(79,125,247,0.03) 60%, transparent 100%)`,
            border: "1px solid rgba(79,125,247,0.08)",
            top: orb.top,
            left: orb.left,
            right: orb.right,
            animationName: "orbFloat",
            animationDuration: orb.dur,
            animationDelay: orb.delay,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Center content ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 5,
          padding: "0 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          className="animate-fade-in-up"
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          Something great is on the way
        </p>

        <h1
          className="animate-fade-in-up-delay-1"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 300,
            color: "#ffffff",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            lineHeight: 1.15,
            marginBottom: "2.5rem",
          }}
        >
          Coming Soon
        </h1>

        <div className="animate-fade-in-up-delay-2">
          <CountdownTimer />
        </div>
      </div>

      {/* ── Wavy SVG bottom ── */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "auto", minHeight: "80px" }}
        >
          <path
            d="M0,120 C360,180 720,60 1080,120 C1260,150 1380,100 1440,110 L1440,180 L0,180 Z"
            fill="#141a50"
            opacity="0.6"
          />
          <path
            d="M0,140 C320,100 640,170 960,130 C1200,100 1360,150 1440,140 L1440,180 L0,180 Z"
            fill="#1a2570"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* ── Scroll down ── */}
      <div
        className="animate-fade-in-up-delay-3"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Scroll Down
        </span>
        <svg
          className="hero-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6 L8 11 L13 6" />
        </svg>
      </div>

      {/* ── Scoped CSS keyframes ── */}
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        @keyframes chevronBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(6px); opacity: 1; }
        }
        .hero-chevron {
          animation: chevronBounce 2s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .hero-orb { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
