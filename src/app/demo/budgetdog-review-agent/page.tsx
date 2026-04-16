"use client";

import { useState, useEffect, useCallback } from "react";

const TOTAL_SLIDES = 10;

export default function BudgetdogDemo() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => {
      if (prev < TOTAL_SLIDES - 1) return prev + 1;
      setAutoplay(false);
      return prev;
    });
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [autoplay, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "p") setAutoplay((a) => !a);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch support
  useEffect(() => {
    let touchStartX = 0;
    const onStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  return (
    <div style={{ background: "#0a0a0f", color: "#e8e8f0", fontFamily: "'Inter', -apple-system, sans-serif", height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Progress Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, background: "linear-gradient(90deg, #6c5ce7, #a29bfe)", zIndex: 1000, transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)", width: `${(current / (TOTAL_SLIDES - 1)) * 100}%` }} />

      {/* Keyboard hint */}
      <div style={{ position: "fixed", top: 16, left: 16, fontSize: 11, color: "#5a5a70", zIndex: 100, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>&larr;</span>
        <span style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>&rarr;</span>
        or click arrows
      </div>

      {/* Autoplay button */}
      <button onClick={() => setAutoplay((a) => !a)} style={{ position: "fixed", top: 16, right: 16, display: "flex", alignItems: "center", gap: 8, background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "#8888a0", zIndex: 100, cursor: "pointer" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {autoplay ? <><line x1="6" y1="4" x2="6" y2="20" /><line x1="18" y1="4" x2="18" y2="20" /></> : <polygon points="5 3 19 12 5 21 5 3" />}
        </svg>
        {autoplay ? "Pause" : "Autoplay"}
      </button>

      {/* Slides */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Slide active={current === 0}><TitleSlide /></Slide>
        <Slide active={current === 1}><ProblemSlide /></Slide>
        <Slide active={current === 2}><PipelineSlide /></Slide>
        <Slide active={current === 3}><IntakeSlide /></Slide>
        <Slide active={current === 4}><AnalysisSlide /></Slide>
        <Slide active={current === 5}><DraftSlide /></Slide>
        <Slide active={current === 6}><DashboardSlide /></Slide>
        <Slide active={current === 7}><DetailSlide /></Slide>
        <Slide active={current === 8}><ROISlide /></Slide>
        <Slide active={current === 9}><CTASlide /></Slide>
      </div>

      {/* Navigation */}
      <div style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 12, zIndex: 100, background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 16, padding: "8px 16px", backdropFilter: "blur(20px)" }}>
        <button onClick={prev} style={{ background: "#22222f", color: "white", border: "none", padding: "8px 20px", borderRadius: 10, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        </button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: i === current ? 4 : "50%", background: i === current ? "#6c5ce7" : "#3a3a4f", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        <span style={{ fontSize: 12, color: "#8888a0", fontWeight: 500, minWidth: 60, textAlign: "center" }}>{current} / {TOTAL_SLIDES - 1}</span>
        <button onClick={next} style={{ background: "#6c5ce7", color: "white", border: "none", padding: "8px 20px", borderRadius: 10, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

function Slide({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(30px)", transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", pointerEvents: active ? "auto" : "none", padding: "60px 40px" }}>
      {children}
    </div>
  );
}

function AnimatedCard({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ animation: `cardIn 0.5s ${delay}s both`, ...style }}>
      <style>{`@keyframes cardIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {children}
    </div>
  );
}

/* ── SLIDE COMPONENTS ── */

function TitleSlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, textAlign: "center", alignItems: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 100, padding: "8px 20px", fontSize: 13, color: "#8888a0", fontWeight: 500 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00b894", animation: "pulse 2s infinite" }} />
        Product Demo
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      </div>
      <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>
        <span style={{ background: "linear-gradient(135deg, #e8e8f0 0%, #8888a0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Budgetdog</span>
        <br />
        <span style={{ background: "linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Review Agent</span>
      </h1>
      <p style={{ fontSize: 18, color: "#8888a0", maxWidth: 600, lineHeight: 1.6, margin: 0 }}>AI-powered financial review pipeline. Your framework, your templates, your voice — at 10x the speed.</p>
      <div style={{ display: "flex", gap: 48, marginTop: 16 }}>
        {[["3,000+", "FAMILIES SERVED"], ["80%", "TIME SAVED"], ["~$100", "MONTHLY COST"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#a29bfe" }}>{num}</div>
            <div style={{ fontSize: 12, color: "#5a5a70", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemSlide() {
  const cards = [
    { icon: "⏰", stat: "25 min", title: "Per Review", desc: "Each student check-in requires a Success Manager to cross-reference forms, spreadsheets, and your framework.", color: "#ff6b6b" },
    { icon: "📈", stat: "500+", title: "Monthly Reviews", desc: "With 3,000+ active families, check-in reviews consume your team's highest-value hours.", color: "#fdcb6e" },
    { icon: "👥", stat: "~7", title: "Team Members", desc: "A lean team stretched across coaching, community, content, and the new tax advisory.", color: "#74b9ff" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "center" }}>
      <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a29bfe", fontWeight: 600 }}>The Problem</span>
      <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", textAlign: "center", maxWidth: 700, margin: 0 }}>Your team reviews 3,000+ families manually. That doesn&apos;t scale.</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 900, width: "100%" }}>
        {cards.map((c, i) => (
          <AnimatedCard key={c.title} delay={0.2 + i * 0.15}>
            <div style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 28, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, background: `${c.color}15` }}>{c.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.stat}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "#8888a0", lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}

function PipelineSlide() {
  const steps = [
    { icon: "📋", label: "Form + Sheet Submitted" },
    { icon: "⚙️", label: "Rules Engine Checks" },
    { icon: "🤖", label: "AI Analysis & Flagging", active: true },
    { icon: "✍️", label: "Draft Response Generated" },
    { icon: "✅", label: "Human Reviews & Approves" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
      <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a29bfe", fontWeight: 600 }}>How It Works</span>
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Five steps. Fully automated. Human at the gate.</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 0, maxWidth: 1100, width: "100%" }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: "contents" }}>
            <AnimatedCard delay={0.15 + i * 0.2} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: `2px solid ${s.active ? "#6c5ce7" : "#2a2a3a"}`, background: "#12121a", boxShadow: s.active ? "0 0 24px rgba(108, 92, 231, 0.3)" : "none", position: "relative", zIndex: 2 }}>{s.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#8888a0", textAlign: "center", maxWidth: 100 }}>{s.label}</div>
            </AnimatedCard>
            {i < steps.length - 1 && (
              <div style={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "#3a3a4f", flexShrink: 0, marginTop: -24 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AppWindow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 16, overflow: "hidden", maxWidth: 1000, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", background: "#1a1a26", borderBottom: "1px solid #2a2a3a" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#5a5a70", fontWeight: 500 }}>{title}</div>
      </div>
      <div style={{ padding: 24 }}>{children}</div>
    </div>
  );
}

function IntakeSlide() {
  const rows = [
    ["Housing", "$2,400", "$2,400", "$0", "green"],
    ["Groceries", "$800", "$1,140", "+$340", "red"],
    ["Dining Out", "$200", "$485", "+$285", "red"],
    ["Car Payment", "$450", "$450", "$0", "green"],
    ["Emergency Fund", "$1,000", "$200", "-$800", "red"],
    ["Medical", "$100", "$3,300", "+$3,200", "yellow"],
    ["Subscriptions", "$150", "$287", "+$137", "yellow"],
    ["Savings Rate", "18%", "4.2%", "-13.8%", "red"],
  ];
  const colors: Record<string, string> = { green: "#00b894", red: "#ff6b6b", yellow: "#fdcb6e" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a29bfe", fontWeight: 600 }}>Step 1 — Intake</span>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "8px 0" }}>Data flows in automatically</h2>
        <p style={{ color: "#8888a0", fontSize: 15, margin: 0 }}>Student submits check-in form. Agent pulls their spreadsheet via Google Sheets API.</p>
      </div>
      <AppWindow title="Budgetdog Review Agent — New Submission">
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>📋 Form Submission</div>
            {[["STUDENT", "Sarah & Mike Thompson"], ["CHECK-IN TYPE", "Monthly Review (Month 3 of 6)"], ["COMBINED INCOME", "$187,000 / year", true], ["GOALS THIS MONTH", "Pay off car loan, build emergency fund to $15K"], ["NOTES", "Unexpected $3,200 medical bill. Had to pause extra debt payments."]].map(([label, val, hl]) => (
              <div key={label as string} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#5a5a70", fontWeight: 600 }}>{label}</div>
                <div style={{ background: hl ? "rgba(108, 92, 231, 0.05)" : "#1a1a26", border: `1px solid ${hl ? "#6c5ce7" : "#2a2a3a"}`, borderRadius: 10, padding: "10px 14px", fontSize: 14 }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#22222f", borderBottom: "1px solid #2a2a3a", fontSize: 12, color: "#8888a0", fontWeight: 600 }}>
              <div style={{ width: 18, height: 18, background: "#0f9d58", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", fontWeight: 700 }}>S</div>
              Thompson_Budget_March2026.gsheet
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "140px repeat(3, 1fr)", fontSize: 12 }}>
              {["Category", "Budget", "Actual", "Diff"].map((h) => (
                <div key={h} style={{ padding: "8px 12px", borderBottom: "1px solid #2a2a3a", borderRight: "1px solid #2a2a3a", background: "#22222f", fontWeight: 600, color: "#8888a0", fontSize: 11 }}>{h}</div>
              ))}
              {rows.map(([cat, budget, actual, diff, flag]) => (
                <div key={cat} style={{ display: "contents" }}>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid #2a2a3a", borderRight: "1px solid #2a2a3a", fontWeight: 500, color: "#8888a0" }}>{cat}</div>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid #2a2a3a", borderRight: "1px solid #2a2a3a" }}>{budget}</div>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid #2a2a3a", borderRight: "1px solid #2a2a3a" }}>{actual}</div>
                  <div style={{ padding: "8px 12px", borderBottom: "1px solid #2a2a3a", borderRight: "1px solid #2a2a3a", color: colors[flag as string], fontWeight: 600 }}>{diff}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

function AnalysisSlide() {
  const rules = [
    { status: "pass", text: "Housing ≤ 28% of income", detail: "$2,400/mo = 15.4% — well under" },
    { status: "critical", text: "Savings rate ≥ 15%", detail: "4.2% this month (was 17.8% last month)" },
    { status: "flag", text: "Food spend ≤ $1,200/mo", detail: "Groceries + dining = $1,625 (+35% over)" },
    { status: "critical", text: "Emergency fund on track", detail: "$200 of $1,000 target — 80% shortfall" },
    { status: "pass", text: "Debt payments current", detail: "Car loan: on time, $12,400 remaining" },
    { status: "flag", text: "Subscriptions ≤ $150/mo", detail: "$287/mo — 7 active subscriptions detected" },
  ];
  const statusStyles: Record<string, { bg: string; color: string; icon: string }> = {
    pass: { bg: "rgba(0, 184, 148, 0.1)", color: "#00b894", icon: "✓" },
    flag: { bg: "rgba(253, 203, 110, 0.1)", color: "#fdcb6e", icon: "⚠" },
    critical: { bg: "rgba(255, 107, 107, 0.1)", color: "#ff6b6b", icon: "!" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a29bfe", fontWeight: 600 }}>Step 2 — Rules + AI Analysis</span>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "8px 0" }}>Your framework, applied instantly</h2>
        <p style={{ color: "#8888a0", fontSize: 15, margin: 0 }}>Deterministic rules check the numbers. AI interprets the context and priorities.</p>
      </div>
      <AppWindow title="Analysis — Sarah & Mike Thompson">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5a5a70", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: 8, borderBottom: "1px solid #2a2a3a" }}>Rules Engine — 7 checks</div>
            {rules.map((r, i) => (
              <AnimatedCard key={r.text} delay={0.2 + i * 0.12}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#1a1a26", borderRadius: 10, border: "1px solid #2a2a3a", fontSize: 13 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, background: statusStyles[r.status].bg, color: statusStyles[r.status].color }}>{statusStyles[r.status].icon}</div>
                  <div>
                    <div>{r.text}</div>
                    <div style={{ fontSize: 11, color: "#5a5a70" }}>{r.detail}</div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5a5a70", textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: 8, borderBottom: "1px solid #2a2a3a" }}>AI Contextual Insights</div>
            <AnimatedCard delay={0.4}>
              <div style={{ background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a29bfe", background: "rgba(108, 92, 231, 0.1)", padding: "4px 10px", borderRadius: 6, width: "fit-content" }}>⚡ Context Detected</div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#8888a0", margin: 0 }}>The $3,200 medical bill explains this month&apos;s savings drop. This is a <strong style={{ color: "#e8e8f0" }}>one-time event</strong>, not a spending pattern. Last 2 months were on track (17.8% and 16.2% savings rate).</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: "rgba(253, 203, 110, 0.1)", color: "#fdcb6e", width: "fit-content" }}>● Medium — Temporary setback</span>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.6}>
              <div style={{ background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a29bfe", background: "rgba(108, 92, 231, 0.1)", padding: "4px 10px", borderRadius: 6, width: "fit-content" }}>🚨 Priority Issue</div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#8888a0", margin: 0 }}>Food spending has trended up for 3 consecutive months: $980 → $1,280 → $1,625. This is the <strong style={{ color: "#e8e8f0" }}>real pattern to address</strong>, independent of the medical bill.</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: "rgba(255, 107, 107, 0.1)", color: "#ff6b6b", width: "fit-content" }}>● High — Recurring trend</span>
              </div>
            </AnimatedCard>
            <AnimatedCard delay={0.8}>
              <div style={{ background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a29bfe", background: "rgba(108, 92, 231, 0.1)", padding: "4px 10px", borderRadius: 6, width: "fit-content" }}>🏆 Progress Note</div>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#8888a0", margin: 0 }}>Despite the setback, they&apos;ve paid down $4,200 in debt over 3 months and their net worth increased $8,400 since enrollment. Frame the response around <strong style={{ color: "#e8e8f0" }}>momentum, not the miss</strong>.</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: "rgba(0, 184, 148, 0.1)", color: "#00b894", width: "fit-content" }}>● Positive — Reinforce</span>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

function DraftSlide() {
  const templates = [
    { name: "Monthly Check-in Review", desc: "Standard monthly feedback with wins + areas to improve", vars: ["first_name", "month_num", "debt_paid", "net_worth_change"], active: true },
    { name: "Unexpected Expense Handler", desc: "Acknowledge one-time expenses, reframe as non-pattern", vars: ["expense_amount", "prior_savings_rate"] },
    { name: "Spending Trend Alert", desc: "3-month upward spending trend with action items", vars: ["category", "trend_values", "over_budget_amount"] },
    { name: "Subscription Audit Nudge", desc: "When subscriptions exceed threshold", vars: ["sub_count", "sub_total"] },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a29bfe", fontWeight: 600 }}>Step 3 — Response Drafted</span>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "8px 0" }}>Your templates, filled with their data</h2>
        <p style={{ color: "#8888a0", fontSize: 15, margin: 0 }}>AI assembles from your canned messages — never freestyles financial advice.</p>
      </div>
      <AppWindow title="Draft Response — Ready for Review">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
          <div style={{ background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 12, padding: 24, fontSize: 14, lineHeight: 1.7, color: "#8888a0" }}>
            <p style={{ marginTop: 0 }}>Hey <Var>Sarah & Mike</Var>! 👋</p>
            <p>Great job staying on top of your monthly check-in. Let&apos;s dig into month <Var>3</Var>.</p>
            <p><strong style={{ color: "#e8e8f0" }}>The wins:</strong> You&apos;ve paid down <Var>$4,200</Var> in debt since starting and your net worth is up <Var>$8,400</Var>. That&apos;s real momentum — don&apos;t lose sight of that.</p>
            <p><strong style={{ color: "#e8e8f0" }}>The medical bill:</strong> I see the <Var>$3,200</Var> unexpected expense hit hard this month. Life happens. Your prior months (17-18% savings rate) show this isn&apos;t your pattern — it&apos;s a speed bump.</p>
            <p><strong style={{ color: "#e8e8f0" }}>The area to focus on:</strong> Your food spending has crept up 3 months in a row — <Var>$980 → $1,280 → $1,625</Var>. That&apos;s <Var>$625/mo</Var> above budget.</p>
            <div style={{ paddingLeft: 16, borderLeft: "2px solid #6c5ce7", margin: "8px 0" }}>
              1. Audit subscriptions — you have <Var>7 active</Var> totaling <Var>$287/mo</Var><br />
              2. Set a dining-out cap of <Var>$250/mo</Var><br />
              3. Resume emergency fund contributions at <Var>$500/mo</Var> minimum next month
            </div>
            <p>You&apos;re in month 3 of 6 — this is the messy middle where most people quit. You&apos;re not quitting. 💪</p>
            <p style={{ marginBottom: 0 }}>Talk soon,<br /><Var>{"{{coach_name}}"}</Var></p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5a5a70", textTransform: "uppercase", letterSpacing: "0.08em" }}>Templates Used</div>
            {templates.map((t) => (
              <div key={t.name} style={{ background: "#1a1a26", border: `1px solid ${t.active ? "#6c5ce7" : "#2a2a3a"}`, borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "#5a5a70" }}>{t.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
                  {t.vars.map((v) => (
                    <span key={v} style={{ fontSize: 10, background: "#22222f", padding: "2px 8px", borderRadius: 4, color: "#5a5a70", fontFamily: "monospace" }}>{v}</span>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: 12, background: "rgba(108,92,231,0.08)", borderRadius: 10, fontSize: 12, color: "#a29bfe", lineHeight: 1.5 }}>
              <strong>Confidence: 94%</strong><br />
              <span style={{ color: "#5a5a70" }}>4 templates combined. All variables resolved. No manual input needed.</span>
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

function Var({ children }: { children: React.ReactNode }) {
  return <span style={{ background: "rgba(108, 92, 231, 0.15)", color: "#a29bfe", padding: "2px 8px", borderRadius: 4, fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12 }}>{children}</span>;
}

function DashboardSlide() {
  const rows = [
    { initials: "ST", name: "Sarah & Mike Thompson", month: "Month 3 / 6", flags: [{ n: "2", c: "red" }, { n: "2", c: "yellow" }], conf: 94, confColor: "#00b894", action: "review", bg: "rgba(255, 107, 107, 0.1)", fg: "#ff6b6b", highlighted: true },
    { initials: "JR", name: "James Rodriguez", month: "Month 5 / 6", flags: [{ n: "0", c: "green" }], conf: 98, confColor: "#00b894", action: "approve", bg: "rgba(0, 184, 148, 0.1)", fg: "#00b894" },
    { initials: "LP", name: "Lisa Park", month: "Month 1 / 6", flags: [{ n: "1", c: "yellow" }], conf: 92, confColor: "#00b894", action: "approve", bg: "rgba(116, 185, 255, 0.1)", fg: "#74b9ff" },
    { initials: "DW", name: "David & Emma Watson", month: "Month 4 / 6", flags: [{ n: "1", c: "red" }, { n: "3", c: "yellow" }], conf: 76, confColor: "#fdcb6e", action: "review", bg: "rgba(253, 203, 110, 0.1)", fg: "#fdcb6e" },
    { initials: "AN", name: "Aisha Nkemdirim", month: "Month 6 / 6", flags: [{ n: "0", c: "green" }], conf: 99, confColor: "#00b894", action: "approve", bg: "#6c5ce7", fg: "white" },
  ];
  const flagColors: Record<string, { bg: string; color: string }> = { red: { bg: "rgba(255,107,107,0.1)", color: "#ff6b6b" }, yellow: { bg: "rgba(253,203,110,0.1)", color: "#fdcb6e" }, green: { bg: "rgba(0,184,148,0.1)", color: "#00b894" } };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a29bfe", fontWeight: 600 }}>Step 4 — Review Queue</span>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "8px 0" }}>Your team&apos;s new command center</h2>
        <p style={{ color: "#8888a0", fontSize: 15, margin: 0 }}>All pending reviews in one place. High-confidence drafts can be bulk-approved.</p>
      </div>
      <AppWindow title="Review Dashboard — 12 Pending">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
          {[["12", "Pending Review", "#a29bfe"], ["47", "Approved Today", "#00b894"], ["2:14", "Avg. Review Time", "#fdcb6e"], ["91%", "Auto-approve Rate", "#74b9ff"]].map(([val, lbl, color]) => (
            <div key={lbl} style={{ background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color }}>{val}</div>
              <div style={{ fontSize: 11, color: "#5a5a70", marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "44px 1.2fr 0.8fr 0.6fr 0.6fr 0.5fr 100px", padding: "8px 16px", fontSize: 11, color: "#5a5a70", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          <div></div><div>Student</div><div>Check-in</div><div>Flags</div><div>Confidence</div><div></div><div></div>
        </div>
        {rows.map((r, i) => (
          <AnimatedCard key={r.name} delay={0.1 + i * 0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "44px 1.2fr 0.8fr 0.6fr 0.6fr 0.5fr 100px", padding: "12px 16px", background: r.highlighted ? "rgba(108, 92, 231, 0.05)" : "#1a1a26", border: `1px solid ${r.highlighted ? "#6c5ce7" : "#2a2a3a"}`, borderRadius: 10, alignItems: "center", fontSize: 13, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: r.fg }}>{r.initials}</div>
              <div style={{ fontWeight: 500 }}>{r.name}</div>
              <div style={{ color: "#8888a0", fontSize: 12 }}>{r.month}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {r.flags.map((f, fi) => (
                  <span key={fi} style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: flagColors[f.c].bg, color: flagColors[f.c].color }}>{f.n}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ height: 6, background: "#22222f", borderRadius: 3, overflow: "hidden", width: "80%" }}>
                  <div style={{ height: "100%", borderRadius: 3, width: `${r.conf}%`, background: r.confColor }} />
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#8888a0" }}>{r.conf}%</div>
              <div>
                <button style={{ padding: "6px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", ...(r.action === "approve" ? { background: "#00b894", color: "#000" } : { background: "#22222f", color: "#8888a0", border: "1px solid #2a2a3a" }) }}>{r.action === "approve" ? "Approve" : "Review"}</button>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </AppWindow>
    </div>
  );
}

function DetailSlide() {
  const flags = [
    { color: "#ff6b6b", title: "Savings rate dropped to 4.2%", desc: "Target: 15%. Caused by medical bill. Prior months averaged 17%. AI recommends framing as temporary." },
    { color: "#ff6b6b", title: "Emergency fund contribution: $200 of $1,000", desc: "80% shortfall. Recommend resuming at $500/mo minimum next month after medical bill is absorbed." },
    { color: "#fdcb6e", title: "Food spending: 3-month upward trend", desc: "$980 → $1,280 → $1,625. This is the structural issue to address, separate from the medical event." },
    { color: "#fdcb6e", title: "Subscriptions over budget", desc: "7 active subscriptions at $287/mo vs $150 budget. Quick win: audit and cut 2-3 unused services." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a29bfe", fontWeight: 600 }}>Step 5 — Approve or Edit</span>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: "8px 0" }}>Human always has final say</h2>
        <p style={{ color: "#8888a0", fontSize: 15, margin: 0 }}>Edit the draft, escalate, or approve with one click. Full audit trail.</p>
      </div>
      <AppWindow title="Review — Sarah & Mike Thompson — Month 3">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div style={{ background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", background: "#22222f", borderBottom: "1px solid #2a2a3a", fontSize: 12, fontWeight: 600, color: "#8888a0", display: "flex", justifyContent: "space-between" }}>
              <span>Flagged Issues (4)</span>
              <span style={{ fontSize: 11, color: "#a29bfe", cursor: "pointer" }}>View spreadsheet →</span>
            </div>
            <div style={{ padding: 16 }}>
              {flags.map((f, i) => (
                <div key={f.title} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < flags.length - 1 ? "1px solid #2a2a3a" : "none" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: f.color, marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, margin: 0, marginBottom: 4 }}>{f.title}</h4>
                    <p style={{ fontSize: 12, color: "#5a5a70", lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#1a1a26", border: "1px solid #2a2a3a", borderRadius: 12, overflow: "hidden", flex: 1 }}>
              <div style={{ padding: "12px 16px", background: "#22222f", borderBottom: "1px solid #2a2a3a", fontSize: 12, fontWeight: 600, color: "#8888a0", display: "flex", justifyContent: "space-between" }}>
                <span>Draft Response</span>
                <span style={{ fontSize: 11, color: "#00b894" }}>● 94% confidence</span>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ width: "100%", minHeight: 200, background: "#0a0a0f", border: "1px solid #2a2a3a", borderRadius: 10, padding: 14, fontFamily: "inherit", fontSize: 13, color: "#e8e8f0", lineHeight: 1.7 }}>
                  Hey Sarah & Mike! 👋<br /><br />
                  Great job staying on top of your monthly check-in. Let&apos;s dig into month 3.<br /><br />
                  The wins: You&apos;ve paid down $4,200 in debt since starting and your net worth is up $8,400. That&apos;s real momentum.<br /><br />
                  The medical bill: Life happens. Your prior months show this isn&apos;t your pattern — it&apos;s a speed bump.<br /><br />
                  The area to focus on: Food spending has crept up 3 months in a row — $980 → $1,280 → $1,625. That&apos;s $625/mo above budget.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "10px 24px", borderRadius: 10, border: "none", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "#00b894", color: "#000", flex: 1 }}>✓ Approve & Send</button>
              <button style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid #2a2a3a", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "#22222f", color: "#8888a0", flex: 1 }}>✎ Edit & Approve</button>
              <button style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid rgba(255,107,107,0.2)", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "rgba(255,107,107,0.1)", color: "#ff6b6b", flex: 1 }}>⚠ Escalate</button>
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  );
}

function ROISlide() {
  const cards = [
    { before: "25 min per review", after: "2-3 min", label: "Average review time (approve or edit)", color: "#00b894" },
    { before: "$45K-65K / year (1 FTE)", after: "~$100/mo", label: "Operating cost for unlimited reviews", color: "#74b9ff" },
    { before: "Manual + inconsistent", after: "100%", label: "Framework rules applied consistently", color: "#a29bfe" },
    { before: "Limited by headcount", after: "3,000+", label: "Families served without new hires", color: "#fdcb6e" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, alignItems: "center", textAlign: "center" }}>
      <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#a29bfe", fontWeight: 600 }}>The Impact</span>
      <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>What changes for your team</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 700, width: "100%" }}>
        {cards.map((c, i) => (
          <AnimatedCard key={c.label} delay={0.15 + i * 0.15}>
            <div style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 16, padding: 28, textAlign: "left", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, color: "#5a5a70", textDecoration: "line-through" }}>{c.before}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: c.color }}>{c.after}</div>
              <div style={{ fontSize: 13, color: "#8888a0" }}>{c.label}</div>
            </div>
          </AnimatedCard>
        ))}
      </div>
      <div style={{ display: "flex", gap: 32, alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#00b894" }}>$12K-15K</div>
          <div style={{ fontSize: 12, color: "#5a5a70" }}>One-time build cost</div>
        </div>
        <div style={{ fontSize: 14, color: "#5a5a70", fontWeight: 600 }}>+</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#74b9ff" }}>~$100/mo</div>
          <div style={{ fontSize: 12, color: "#5a5a70" }}>Operating cost</div>
        </div>
        <div style={{ fontSize: 14, color: "#5a5a70", fontWeight: 600 }}>=</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fdcb6e" }}>ROI in &lt;2 months</div>
          <div style={{ fontSize: 12, color: "#5a5a70" }}>vs. one Success Manager&apos;s time saved</div>
        </div>
      </div>
    </div>
  );
}

function CTASlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, textAlign: "center", alignItems: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 100, padding: "8px 20px", fontSize: 13, color: "#8888a0", fontWeight: 500 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00b894", animation: "pulse 2s infinite" }} />
        Ready to Build
      </div>
      <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
        Your framework.<br />Your voice.<br />
        <span style={{ background: "linear-gradient(135deg, #00b894, #55efc4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>10x the speed.</span>
      </h2>
      <p style={{ fontSize: 18, color: "#8888a0", maxWidth: 600, lineHeight: 1.6, margin: 0 }}>4-5 week build. Fixed price. Your team trained and running on day one.</p>
      <div style={{ display: "flex", gap: 40, marginTop: 8 }}>
        {[["4-5 weeks", "Build timeline"], ["$12-15K", "Fixed price"], ["~$100/mo", "To operate"], ["30 days", "Post-launch support"]].map(([val, lbl]) => (
          <div key={lbl} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{val}</div>
            <div style={{ fontSize: 12, color: "#5a5a70" }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
