"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: isScrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          padding: isScrolled ? "1rem 1.5rem" : "1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div
            onClick={() => scrollToSection("top")}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ color: "#fff" }}>Eeja</span>
            <span style={{ color: "#8b5cf6" }}>Media</span>
          </div>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <button 
              onClick={() => scrollToSection("top")}
              style={{ background: "none", border: "none", color: "#ededed", fontSize: "0.95rem", fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#a78bfa"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#ededed"}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("join")}
              style={{ background: "none", border: "none", color: "#ededed", fontSize: "0.95rem", fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#a78bfa"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#ededed"}
            >
              Join Us
            </button>
            <button
              onClick={() => scrollToSection("join")}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
                border: "none",
                borderRadius: "999px",
                color: "#fff",
                padding: "0.5rem 1.25rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(139, 92, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "0.5rem",
              display: "none", // Hidden by default, shown via CSS media query
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 10, 10, 0.98)",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          <button 
            onClick={() => scrollToSection("top")}
            style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", fontWeight: 600, cursor: "pointer" }}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("join")}
            style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", fontWeight: 600, cursor: "pointer" }}
          >
            Join Us
          </button>
          <button
            onClick={() => scrollToSection("join")}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
              border: "none",
              borderRadius: "999px",
              color: "#fff",
              padding: "1rem 2rem",
              fontSize: "1.25rem",
              fontWeight: 700,
              cursor: "pointer",
              marginTop: "1rem"
            }}
          >
            Get Started
          </button>
        </div>
      )}

      {/* CSS for responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
