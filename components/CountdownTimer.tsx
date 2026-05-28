"use client";

import { useState, useEffect, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-06-03T00:00:00").getTime();

export default function CountdownTimer() {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = Date.now();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [isLive, setIsLive] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);

      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsLive(true);
        clearInterval(interval);
      }

      // Trigger pulse animation
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  if (isLive) {
    return (
      <div className="animate-fade-in-up" style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            fontFamily: "var(--font-heading)",
            color: "#fff",
          }}
        >
          We Are Live! 🚀
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {units.map((unit) => (
        <div
          key={unit.label}
          className={pulse ? "animate-countdown-pulse" : ""}
          style={{
            background: "#1a1a1a",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "16px",
            padding: "1.5rem 2rem",
            minWidth: "100px",
            textAlign: "center",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(139, 92, 246, 0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(139, 92, 246, 0.3)";
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#fff",
              fontFamily: "var(--font-heading)",
              lineHeight: 1.1,
            }}
          >
            {String(unit.value).padStart(2, "0")}
          </span>
          <span
            style={{
              display: "block",
              fontSize: "0.75rem",
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: "0.5rem",
            }}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
