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
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = calculateTimeLeft();
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsLive(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  if (isLive) {
    return (
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "2.5rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "#fff" }}>
          We Are Live! 🚀
        </p>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem" }}>
      {units.map((unit, i) => (
        <div key={unit.label} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <div style={{ textAlign: "center", minWidth: "60px" }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 300,
                color: "#fff",
                fontFamily: "var(--font-heading)",
                lineHeight: 1.2,
                letterSpacing: "0.05em",
              }}
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginTop: "0.35rem",
                fontWeight: 500,
              }}
            >
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 200,
                color: "rgba(255,255,255,0.25)",
                alignSelf: "flex-start",
                marginTop: "0.15rem",
                padding: "0 0.15rem",
              }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
