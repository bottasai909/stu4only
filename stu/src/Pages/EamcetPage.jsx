import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { EAMCET_QUESTIONS } from "../Constants/data";

export default function EamcetPage() {
  const { C, nav, user } = useApp();
  const [started,   setStarted]   = useState(false);
  const [current,   setCurrent]   = useState(0);
  const [answers,   setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timer,     setTimer]     = useState(160*60);
  const [isMobile,  setIsMobile]  = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const timerRef = useRef(null);

  useEffect(() => {
    if (started && !submitted) {
      timerRef.current = setInterval(() => setTimer(t => { if(t<=0){clearInterval(timerRef.current);setSubmitted(true);return 0;} return t-1; }),1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started]);

  const hrs  = Math.floor(timer/3600);
  const mins = Math.floor((timer%3600)/60);
  const secs = timer%60;
  const q    = EAMCET_QUESTIONS[current];

  const card = (p=24) => ({ background:C.card, borderRadius:16, padding:p, border:`1px solid ${C.border}`, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" });
  const btn  = (v="primary", size="md") => ({
    background: v==="primary"?C.primary:v==="accent"?C.accent:v==="danger"?C.danger:"transparent",
    color: v==="ghost"?C.primary:"#fff",
    border: v==="ghost"?`2px solid ${C.primary}`:"none",
    padding: size==="lg"?"14px 28px":size==="sm"?"6px 14px":"10px 20px",
    borderRadius:10, cursor:"pointer", fontWeight:600, fontSize:size==="sm"?13:14,
  });

  const sectionColors = { Mathematics:"#2563EB", Physics:"#7C3AED", Chemistry:"#10B981" };

  // Intro screen
  if (!started) return (
    <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 20px" }}>
      <div style={card()}>
        <h2 style={{ textAlign:"center", fontSize:28, fontWeight:900, marginBottom:8 }}>🎯 EAMCET Engineering Mock Test</h2>
        <p style={{ textAlign:"center", color:C.sub, marginBottom:28 }}>AP & Telangana EAMCET Pattern — Full Length</p>
        <div style={{ display:"grid", gridTemplateColumns:isMobile ? "1fr" : "1fr 1fr", gap:16, marginBottom:24 }}>
          {[["Questions","160 (Demo: 20)"],["Duration","160 Minutes"],["Sections","Maths + Physics + Chemistry"],["Marking","+1 Correct, 0 Wrong"]].map(([l,v]) => (
            <div key={l} style={{ ...card(16), textAlign:"center" }}>
              <div style={{ fontWeight:700, fontSize:16 }}>{v}</div>
              <div style={{ color:C.sub, fontSize:12, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background:C.accent+"15", borderLeft:`4px solid ${C.accent}`, borderRadius:10, padding:16, marginBottom:24 }}>
          <strong>📌 Instructions</strong>
          <ul style={{ margin:"8px 0 0", paddingLeft:20, color:C.sub, fontSize:14, lineHeight:2 }}>
            <li>Read each question carefully</li>
            <li>Navigate between questions freely</li>
            <li>No negative marking — attempt all</li>
            <li>Demo: 20 questions (real exam: 160)</li>
          </ul>
        </div>
        <button style={{ ...btn("primary","lg"), width:"100%" }} onClick={() => setStarted(true)}>Start Mock Test →</button>
      </div>
    </div>
  );

  // Results
  if (submitted) {
    const correct  = Object.entries(answers).filter(([i,a]) => a===EAMCET_QUESTIONS[i]?.correct).length;
    const total    = EAMCET_QUESTIONS.length;
    const estimated = Math.round((correct/total)*160);
    return (
      <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 20px", textAlign:"center" }}>
        <div style={card()}>
          <div style={{ fontSize:60 }}>📊</div>
          <h2 style={{ fontSize:28, fontWeight:900, margin:"16px 0 4px" }}>EAMCET Mock Results</h2>
          <p style={{ color:C.sub }}>AP EAMCET Engineering Pattern</p>
          <div style={{ fontSize:72, fontWeight:900, color:C.primary, margin:"24px 0 8px" }}>{correct}/{total}</div>
          <p style={{ color:C.sub }}>Estimated full-test score: <strong style={{ color:C.text }}>{estimated}/160</strong></p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, margin:"24px 0" }}>
            {["Mathematics","Physics","Chemistry"].map(subj => {
              const qs  = EAMCET_QUESTIONS.filter(q => q.subject===subj);
              const cor = qs.filter(q => answers[EAMCET_QUESTIONS.indexOf(q)]===q.correct).length;
              return (
                <div key={subj} style={{ ...card(16), textAlign:"center" }}>
                  <div style={{ fontWeight:700, color:sectionColors[subj] }}>{cor}/{qs.length}</div>
                  <div style={{ fontSize:12, color:C.sub, marginTop:4 }}>{subj}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button style={btn("primary")} onClick={() => { setCurrent(0);setAnswers({});setSubmitted(false);setTimer(160*60); }}>Retry Test</button>
            <button style={btn("ghost")}   onClick={() => nav(user?"dashboard":"landing")}>Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  // Exam
  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:20 }}>
      {/* Timer bar */}
      <div style={{ ...card(16), display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:12 }}>
        <div style={{ fontWeight:700, fontSize:16 }}>🎯 EAMCET Engineering Mock</div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ background:(timer<600?C.danger:C.primary)+"20", color:timer<600?C.danger:C.primary, padding:"8px 16px", borderRadius:20, fontSize:15, fontWeight:700 }}>
            ⏱ {hrs}:{mins.toString().padStart(2,"0")}:{secs.toString().padStart(2,"0")}
          </div>
          <button style={btn("danger","sm")} onClick={() => setSubmitted(true)}>Submit</button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:isMobile ? "1fr" : "1fr 200px", gap:16 }}>
        {/* Question */}
        <div style={card()}>
          <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
            <span style={{ background:sectionColors[q.subject]+"20", color:sectionColors[q.subject], padding:"4px 10px", borderRadius:20, fontSize:12, fontWeight:600 }}>{q.subject}</span>
            <span style={{ color:C.sub, fontSize:14 }}>Question {current+1} of {EAMCET_QUESTIONS.length}</span>
          </div>
          <h3 style={{ margin:"0 0 20px", fontSize:17, lineHeight:1.6 }}>{q.q}</h3>
          <div style={{ display:"grid", gap:10 }}>
            {q.options.map((opt,i) => (
              <button key={i} onClick={() => setAnswers({...answers,[current]:i})} style={{
                background: answers[current]===i?C.primary+"20":C.bg,
                border:`2px solid ${answers[current]===i?C.primary:C.border}`,
                color: answers[current]===i?C.primary:C.text,
                padding:"12px 16px", borderRadius:10, textAlign:"left", cursor:"pointer", fontSize:14, fontWeight:answers[current]===i?600:400,
              }}>
                <span style={{ fontWeight:700, marginRight:8 }}>{["A","B","C","D"][i]}.</span>{opt}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:20, flexWrap:"wrap", gap:10 }}>
            <button style={btn("ghost","sm")} onClick={() => setCurrent(Math.max(0,current-1))} disabled={current===0}>← Prev</button>
            <button style={btn("primary","sm")} onClick={() => current<EAMCET_QUESTIONS.length-1?setCurrent(current+1):setSubmitted(true)}>
              {current<EAMCET_QUESTIONS.length-1?"Next →":"Submit Test"}
            </button>
          </div>
        </div>

        {/* Palette */}
        <div style={card(16)}>
          <div style={{ fontWeight:700, fontSize:13, marginBottom:10 }}>Question Palette</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6 }}>
            {EAMCET_QUESTIONS.map((_,i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                width:36, height:36, borderRadius:6,
                border: current===i?`2px solid ${C.primary}`:`1px solid ${C.border}`,
                background: answers[i]!==undefined?C.success:current===i?C.primary:C.bg,
                color: answers[i]!==undefined||current===i?"#fff":C.sub,
                fontSize:12, fontWeight:600, cursor:"pointer",
              }}>{i+1}</button>
            ))}
          </div>
          <div style={{ marginTop:12, fontSize:11, color:C.sub }}>
            <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:4 }}>
              <div style={{ width:12, height:12, borderRadius:3, background:C.success }} /> Answered ({Object.keys(answers).length})
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <div style={{ width:12, height:12, borderRadius:3, background:C.border }} /> Not Answered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}