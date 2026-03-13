import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
 
function useVisible() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
 
const courses = [
  "Data Structures", "Web & Network Programming", "Advanced Programming",
  "Database Systems", "Fundamental Programming", "Computer Organization",
  "ODE", "Discrete Mathematics",
];
 
const languages = [
  { name: "Arabic",   level: "Native",  percent: 100, color: "#c084fc" },
  { name: "English",  level: "Fluent",  percent: 85,  color: "#818cf8" },
  { name: "Japanese", level: "Basic",   percent: 30,  color: "#38bdf8" },
];
 
const funFacts = [
  { emoji: "🌍", fact: "I speak 3 languages",           sub: "Arabic, English & Japanese" },
  { emoji: "💻", fact: "Built first website at 16",     sub: "And never stopped coding since" },
  { emoji: "☕", fact: "I drink coffee while coding",   sub: "Fuel for every project" },
  { emoji: "♟️", fact: "I play chess in my free time",  sub: "Strategy on and off the board" },
  { emoji: "📚", fact: "I read more than I watch TV",   sub: "Books > Netflix" },
];
 
// ── Cartoon reader (SVG inline) ───────────────────────────────────────────────
function CartoonReader() {
  return (
    <svg viewBox="0 0 140 200" width="140" height="200" style={{ overflow: "visible" }}>
      {/* Body / chair */}
      <rect x="30" y="120" width="80" height="55" rx="12" fill="#2a1a4a" />
      {/* Legs */}
      <rect x="40" y="165" width="14" height="28" rx="6" fill="#1a0f35" />
      <rect x="86" y="165" width="14" height="28" rx="6" fill="#1a0f35" />
      {/* Feet */}
      <ellipse cx="47" cy="193" rx="10" ry="5" fill="#c084fc" />
      <ellipse cx="93" cy="193" rx="10" ry="5" fill="#c084fc" />
      {/* Arms holding book */}
      <rect x="18" y="118" width="14" height="38" rx="7" fill="#2a1a4a" />
      <rect x="108" y="118" width="14" height="38" rx="7" fill="#2a1a4a" />
      {/* Book */}
      <rect x="22" y="130" width="96" height="62" rx="6" fill="#818cf8" />
      <rect x="22" y="130" width="46" height="62" rx="4" fill="#6d5fd4" />
      <line x1="68" y1="132" x2="68" y2="190" stroke="#c084fc" strokeWidth="2" />
      {/* Book lines (text illusion) */}
      {[142, 152, 162, 172, 180].map((y, i) => (
        <line key={i} x1="30" y1={y} x2="60" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      ))}
      {[142, 152, 162, 172, 180].map((y, i) => (
        <line key={i} x1="76" y1={y} x2="108" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      ))}
      {/* Neck */}
      <rect x="58" y="95" width="24" height="18" rx="8" fill="#e8b88a" />
      {/* Head */}
      <ellipse cx="70" cy="80" rx="30" ry="28" fill="#e8b88a" />
      {/* Hair */}
      <ellipse cx="70" cy="56" rx="30" ry="14" fill="#2a1a4a" />
      <rect x="40" y="56" width="60" height="14" fill="#2a1a4a" />
      {/* Eyes (reading — looking down) */}
      <ellipse cx="58" cy="83" rx="6" ry="4" fill="white" />
      <ellipse cx="82" cy="83" rx="6" ry="4" fill="white" />
      <circle cx="58" cy="85" r="3" fill="#2a1a4a" />
      <circle cx="82" cy="85" r="3" fill="#2a1a4a" />
      {/* Glasses */}
      <rect x="50" y="79" width="14" height="10" rx="4" fill="none" stroke="#c084fc" strokeWidth="1.5" />
      <rect x="76" y="79" width="14" height="10" rx="4" fill="none" stroke="#c084fc" strokeWidth="1.5" />
      <line x1="64" y1="84" x2="76" y2="84" stroke="#c084fc" strokeWidth="1.5" />
      {/* Smile */}
      <path d="M62 92 Q70 98 78 92" fill="none" stroke="#b06040" strokeWidth="1.5" strokeLinecap="round" />
      {/* Floating sparkles */}
      <text x="108" y="72" fontSize="14" opacity="0.8">✨</text>
      <text x="10" y="85" fontSize="12" opacity="0.6">💡</text>
    </svg>
  );
}
 
// ── Kanji / Hiragana / Katakana panel ─────────────────────────────────────────
function KanjiPanel() {
  const chars = [
    { char: "学", reading: "まな(ぶ)", meaning: "learn" },
    { char: "夢", reading: "ゆめ",     meaning: "dream" },
    { char: "力", reading: "ちから",   meaning: "power" },
    { char: "未来", reading: "みらい",  meaning: "future" },
    { char: "コード", reading: "katakana", meaning: "code" },
    { char: "技術", reading: "ぎじゅつ",  meaning: "tech" },
  ];
  const [hovered, setHovered] = useState(null);
 
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <p style={{ color: "rgb(155,126,172)", fontSize: "0.8rem", margin: 0, letterSpacing: "0.1em" }}>
        日本語 — Japanese
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {chars.map((c, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.07)",
              border: `1px solid ${hovered === i ? "rgba(56,189,248,0.7)" : "rgba(56,189,248,0.25)"}`,
              borderRadius: "10px",
              padding: "10px 14px",
              textAlign: "center",
              cursor: "default",
              transition: "all 0.3s ease",
              transform: hovered === i ? "translateY(-4px) scale(1.08)" : "none",
              minWidth: "60px",
            }}
          >
            <div style={{ fontSize: "1.8rem", color: "#38bdf8", lineHeight: 1.2 }}>{c.char}</div>
            <div style={{ fontSize: "0.65rem", color: "rgb(155,126,172)", marginTop: "4px" }}>{c.reading}</div>
            {hovered === i && (
              <div style={{ fontSize: "0.7rem", color: "#38bdf8", marginTop: "2px", fontStyle: "italic" }}>
                {c.meaning}
              </div>
            )}
          </div>
        ))}
      </div>
      <p style={{ color: "rgba(56,189,248,0.5)", fontSize: "0.72rem", margin: 0 }}>
        hover to reveal meaning
      </p>
    </div>
  );
}
 
// ── Confetti ──────────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const colors = ["#c084fc", "#818cf8", "#38bdf8", "#6fda44", "#f7df1e", "#e25a1c", "#f472b6"];
  if (!active) return null;
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999 }}>
      {Array.from({ length: 50 }).map((_, i) => {
        const left     = Math.random() * 100;
        const delay    = Math.random() * 1.5;
        const size     = Math.random() * 12 + 6;
        const color    = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 2 + 2;
        return (
          <div key={i} style={{
            position: "absolute", left: `${left}%`, top: "-20px",
            width: `${size}px`, height: `${size}px`, background: color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `fall ${duration}s ${delay}s ease-in forwards`,
          }} />
        );
      })}
      <style>{`@keyframes fall { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }`}</style>
    </div>
  );
}
 
// ── Grad Cap + Decorations ────────────────────────────────────────────────────
function GradSection() {
  const [popped, setPopped]           = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [capRef, capVisible]          = useVisible();
 
  const handleClick = () => {
    setPopped(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
    setTimeout(() => setPopped(false), 500);
  };
 
  return (
    <>
      <Confetti active={showConfetti} />
      <div ref={capRef} style={{
        opacity:   capVisible ? 1 : 0,
        transform: capVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        marginBottom: "40px",
      }}>
        <Row style={{ justifyContent: "center", alignItems: "center", gap: "0" }}>
 
          {/* ── Kanji panel (left) ── */}
          <Col md={3} style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            padding: "20px",
            background: "rgba(56,189,248,0.04)",
            border: "1px solid rgba(56,189,248,0.15)",
            borderRadius: "16px",
            margin: "10px",
          }}>
            <KanjiPanel />
          </Col>
 
          {/* ── Grad cap (center) ── */}
          <Col md={4} style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ color: "rgb(155,126,172)", fontSize: "0.9rem", marginBottom: "8px" }}>
              Click the cap to celebrate! 🎉
            </p>
            <div
              onClick={handleClick}
              style={{
                fontSize:   "5.5rem",
                cursor:     "pointer",
                display:    "inline-block",
                transform:  popped ? "scale(1.5) rotate(-20deg)" : "scale(1)",
                transition: "transform 0.3s ease",
                filter:     "drop-shadow(0 0 14px rgba(200,137,230,0.7))",
                userSelect: "none",
                animation:  "float 3s ease-in-out infinite",
              }}
            >
              🎓
            </div>
            <p style={{ color: "rgb(200,137,230)", marginTop: "12px", fontSize: "0.85rem", letterSpacing: "0.06em" }}>
              Class of 2028 — E-JUST
            </p>
          </Col>
 
          {/* ── Cartoon reader (right) ── */}
          <Col md={3} style={{
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "20px",
            background: "rgba(200,137,230,0.04)",
            border: "1px solid rgba(200,137,230,0.15)",
            borderRadius: "16px",
            margin: "10px",
          }}>
            <CartoonReader />
            <p style={{ color: "rgb(155,126,172)", fontSize: "0.75rem", marginTop: "8px", textAlign: "center" }}>
              Mohamed on a regular Friday 📖
            </p>
          </Col>
 
        </Row>
      </div>
 
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}
 
// ── Fun Fact Card ─────────────────────────────────────────────────────────────
function FactCard({ fact, index, visible }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Col xs={12} sm={6} md={4} style={{
      marginBottom: "20px",
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
    }}>
      <div onClick={() => setFlipped(!flipped)} style={{
        background:   flipped ? "rgba(200,137,230,0.15)" : "rgba(255,255,255,0.05)",
        border:       `1px solid ${flipped ? "rgba(200,137,230,0.6)" : "rgba(200,137,230,0.25)"}`,
        borderRadius: "14px", padding: "24px 20px", textAlign: "center",
        cursor: "pointer", transition: "all 0.35s ease", minHeight: "130px",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(200,137,230,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <div style={{ fontSize: "2.2rem", marginBottom: "10px" }}>{fact.emoji}</div>
        <p style={{ color: "white", fontWeight: "600", margin: 0, fontSize: "0.95rem" }}>{fact.fact}</p>
        {flipped
          ? <p style={{ color: "rgb(155,126,172)", fontSize: "0.82rem", marginTop: "8px", marginBottom: 0 }}>{fact.sub}</p>
          : <p style={{ color: "rgba(200,137,230,0.5)", fontSize: "0.75rem", marginTop: "6px", marginBottom: 0 }}>tap to reveal ✨</p>
        }
      </div>
    </Col>
  );
}
 
// ── Language Bar ──────────────────────────────────────────────────────────────
function LangBar({ lang, animate }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: "white", fontWeight: "600" }}>{lang.name}</span>
        <span style={{ color: lang.color, fontSize: "0.85rem", fontWeight: "600" }}>{lang.level}</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "20px", height: "8px", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "20px",
          background: `linear-gradient(90deg, ${lang.color}, rgba(200,137,230,0.5))`,
          width: animate ? `${lang.percent}%` : "0%",
          transition: "width 1.2s ease", boxShadow: `0 0 8px ${lang.color}`,
        }} />
      </div>
    </div>
  );
}
 
// ── Main ──────────────────────────────────────────────────────────────────────
function Education() {
  const [cardRef,   cardVisible]   = useVisible();
  const [langRef,   langVisible]   = useVisible();
  const [courseRef, courseVisible] = useVisible();
  const [factsRef,  factsVisible]  = useVisible();
 
  return (
    <Container fluid className="home-about-section" id="education">
      <Container>
        <h1 className="project-heading" style={{ textAlign: "center", paddingBottom: "10px" }}>
          My <strong className="purple">Education</strong>
        </h1>
 
        {/* University Card */}
        <Row style={{ justifyContent: "center", marginBottom: "20px" }}>
          <Col md={10} ref={cardRef} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,137,230,0.3)",
            borderRadius: "16px", padding: "30px", margin: "15px",
            opacity: cardVisible ? 1 : 0, transform: cardVisible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 35px rgba(200,137,230,0.2)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <Row style={{ alignItems: "center" }}>
              <Col md={3} style={{ textAlign: "center", marginBottom: "20px" }}>
                <img
                  src="https://ejust.edu.eg/sites/default/files/ejust_logo.png"
                  alt="EJUST Logo"
                  style={{ width: "120px", filter: "drop-shadow(0 0 10px rgba(200,137,230,0.4))" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </Col>
              <Col md={9}>
                <h3 style={{ color: "white", fontWeight: "700", marginBottom: "6px" }}>
                  Egypt-Japan University of Science and Technology
                  <span style={{ color: "rgb(200,137,230)", fontSize: "1rem", marginLeft: "10px" }}>E-JUST</span>
                </h3>
                <p style={{ color: "rgb(155,126,172)", marginBottom: "12px", fontSize: "1rem" }}>
                  🎓 B.Sc. in Computer Science
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(200,137,230,0.12)", border: "1px solid rgba(200,137,230,0.3)", borderRadius: "20px", padding: "4px 14px", color: "rgb(200,137,230)", fontSize: "0.85rem" }}>
                    📅 Expected 2028
                  </span>
                  <span style={{ background: "rgba(111,218,68,0.1)", border: "1px solid rgba(111,218,68,0.35)", borderRadius: "20px", padding: "4px 14px", color: "#6fda44", fontSize: "0.85rem" }}>
                    ⭐ GPA: 3.7 / 4.0
                  </span>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
 
        {/* Courses + Languages */}
        <Row style={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Col md={5} ref={courseRef} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,137,230,0.3)",
            borderRadius: "16px", padding: "30px", margin: "15px",
            opacity: courseVisible ? 1 : 0, transform: courseVisible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            <h4 style={{ color: "white", marginBottom: "20px", fontWeight: "700" }}>📚 Relevant Courses</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {courses.map((course, i) => (
                <span key={i} style={{
                  background: "rgba(200,137,230,0.1)", border: "1px solid rgba(200,137,230,0.35)",
                  borderRadius: "20px", padding: "8px 16px", color: "rgb(200,137,230)",
                  fontSize: "0.88rem", fontWeight: "500", transition: "all 0.3s ease", cursor: "default",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,137,230,0.25)"; e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(200,137,230,0.1)"; e.currentTarget.style.transform = "scale(1)"; }}
                >{course}</span>
              ))}
            </div>
          </Col>
 
          <Col md={5} ref={langRef} style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,137,230,0.3)",
            borderRadius: "16px", padding: "30px", margin: "15px",
            opacity: langVisible ? 1 : 0, transform: langVisible ? "translateX(0)" : "translateX(40px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}>
            <h4 style={{ color: "white", marginBottom: "20px", fontWeight: "700" }}>🌐 Languages</h4>
            {languages.map((lang, i) => <LangBar key={i} lang={lang} animate={langVisible} />)}
          </Col>
        </Row>
 
        {/* Fun Facts */}
        <h4 style={{ color: "white", textAlign: "center", marginBottom: "24px", fontWeight: "700" }}>
          ⚡ Fun Facts About Me
        </h4>
        <Row ref={factsRef} style={{ justifyContent: "center", paddingBottom: "30px" }}>
          {funFacts.map((fact, i) => <FactCard key={i} fact={fact} index={i} visible={factsVisible} />)}
        </Row>
 
        {/* Grad Cap + Kanji + Cartoon Reader */}
        <GradSection />
 
      </Container>
    </Container>
  );
}
 
export default Education;