import { useApp } from "../context/AppContext";
import { SUBJECTS } from "../Constants/data";
import QuizCard from "../Components/Quizcard";

export default function LandingPage() {
  const { C, nav, user, setAuthPage } = useApp();

  const goSubject = (s) => {
    if (!user) { setAuthPage("login"); nav("auth"); }
    else nav("subject");
  };

  const styles = {
    btn: (variant, size = "md") => ({
      background: variant === "primary" ? C.primary : variant === "accent" ? C.accent : "rgba(255,255,255,0.15)",
      color: "#fff",
      border: variant === "ghost-white" ? "2px solid rgba(255,255,255,0.5)" : "none",
      padding: size === "lg" ? "14px 28px" : "10px 20px",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: size === "lg" ? 16 : 14,
    }),
    card: (p = 24) => ({
      background: C.card,
      borderRadius: 16,
      padding: p,
      border: `1px solid ${C.border}`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    }),
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 },
    input: {
      width: "100%", padding: "12px 16px", borderRadius: 10,
      border: `1.5px solid ${C.border}`, background: C.bg,
      color: C.text, fontSize: 14, outline: "none",
      boxSizing: "border-box", marginBottom: 16,
    },
  };

  return (
    <div>
      {/* ── Hero ── */}
      <div style={{ background: C.hero, padding: "80px 20px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", display: "inline-block", padding: "6px 18px", borderRadius: 30, fontSize: 13, marginBottom: 20 }}>
            🎓 Andhra Pradesh State Board — Intermediate Excellence
          </div>
          <h1 style={{ fontSize: "clamp(32px,6vw,56px)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15 }}>
            Study Smarter.<br />Score Higher.
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 36, lineHeight: 1.6 }}>
            AP Intermediate quizzes, EAMCET mock tests & subject mastery — built for <strong>MPC & BiPC</strong> students.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={styles.btn("accent","lg")} onClick={() => { setAuthPage("register"); nav("auth"); }}>Start Learning Free</button>
            <button style={styles.btn("ghost-white","lg")} onClick={() => nav("demo")}>View Demo →</button>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            {[["10,000+","Questions"],["6+","Subjects"],["160 Q","EAMCET Mock"],["AP Board","Syllabus"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900 }}>{v}</div>
                <div style={{ fontSize: 13, opacity: 0.75 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Everything You Need to Crack EAMCET</h2>
        <p style={{ textAlign: "center", color: C.sub, marginBottom: 40 }}>Built specifically for AP & Telangana Intermediate students</p>
        <div style={styles.grid2}>
          {[
            { icon:"📚", title:"Subject-wise Quizzes", desc:"Chapter-wise & topic-wise quizzes for Maths 1A, 1B, 2A, 2B, Physics & Chemistry", color:"#2563EB" },
            { icon:"🎯", title:"EAMCET Mock Tests", desc:"160-question full-length mock exams replicating the exact AP EAMCET pattern", color:"#7C3AED" },
            { icon:"📊", title:"Performance Analytics", desc:"Detailed score tracking, chapter-wise weak area analysis and improvement tips", color:"#10B981" },
            { icon:"⏱️", title:"Timed Practice Mode", desc:"Practice under exam conditions with configurable timers and instant explanations", color:"#F59E0B" },
            { icon:"📱", title:"Mobile Friendly", desc:"Fully responsive across all devices from phone to desktop", color:"#EF4444" },
            { icon:"🏆", title:"Leaderboard & Ranks", desc:"Compete with students across AP and track your rank on every quiz", color:"#06B6D4" },
          ].map(f => (
            <div key={f.title} style={{ ...styles.card(), display:"flex", gap:16, alignItems:"flex-start" }}>
              <div style={{ fontSize:36, flexShrink:0 }}>{f.icon}</div>
              <div>
                <h3 style={{ margin:"0 0 8px", fontWeight:700, color:f.color }}>{f.title}</h3>
                <p style={{ margin:0, color:C.sub, fontSize:14, lineHeight:1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Subjects Strip ── */}
      <div style={{ background:C.card, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"40px 20px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 style={{ textAlign:"center", fontSize:28, fontWeight:800, marginBottom:32 }}>AP Board Subjects Covered</h2>
          <div style={styles.grid3}>
            {SUBJECTS.MPC.map(s => (
              <QuizCard key={s.id} subject={s} onClick={() => goSubject(s)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── EAMCET CTA ── */}
      <div style={{ background:C.hero, padding:"60px 20px", textAlign:"center", color:"#fff" }}>
        <h2 style={{ fontSize:36, fontWeight:900, margin:"0 0 16px" }}>Ready for EAMCET?</h2>
        <p style={{ fontSize:18, opacity:0.9, marginBottom:28 }}>Take a 160-question full-length mock exam with AP EAMCET pattern</p>
        <button style={styles.btn("accent","lg")} onClick={() => { if(!user){setAuthPage("login");nav("auth");}else nav("eamcet"); }}>
          Start EAMCET Mock Test →
        </button>
      </div>

      {/* ── Contact ── */}
      <div id="contact" style={{ maxWidth:700, margin:"0 auto", padding:"60px 20px", textAlign:"center" }}>
        <h2 style={{ fontSize:28, fontWeight:800, marginBottom:8 }}>Get in Touch</h2>
        <p style={{ color:C.sub, marginBottom:32 }}>Questions about stu4only? We'd love to hear from you.</p>
        <div style={styles.card()}>
          <input style={styles.input} placeholder="Your Name" />
          <input style={styles.input} placeholder="Email Address" />
          <textarea style={{ ...styles.input, height:100, resize:"vertical", fontFamily:"inherit" }} placeholder="Your message..." />
          <button style={{ ...styles.btn("primary","lg"), width:"100%" }}>Send Message</button>
        </div>
        <div style={{ marginTop:32, display:"flex", justifyContent:"center", gap:32, flexWrap:"wrap", color:C.sub, fontSize:14 }}>
          <span>📧 hello@stu4only.com</span>
          <span>📱 +91 98765 43210</span>
          <span>📍 Vijayawada, AP</span>
        </div>
      </div>
    </div>
  );
}