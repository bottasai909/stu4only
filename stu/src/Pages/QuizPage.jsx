import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

export default function QuizPage() {
  const { C, nav, user, quizState } = useApp();
  const [qs, setQs]           = useState(quizState);
  const [showExpl, setShowExpl] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer]     = useState(quizState?.timeLeft || 300);
  const timerRef              = useRef(null);

  useEffect(() => {
    if (qs && !qs.submitted) {
      timerRef.current = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, []);

  const btn = (v="primary", size="md") => ({
    background: v==="primary"?C.primary:v==="ghost"?"transparent":C.danger,
    color: v==="ghost"?C.primary:"#fff",
    border: v==="ghost"?`2px solid ${C.primary}`:"none",
    padding: size==="sm"?"6px 14px":"10px 20px",
    borderRadius:10, cursor:"pointer", fontWeight:600, fontSize:14,
  });

  if (!qs) return <div style={{ padding:40, textAlign:"center" }}>No quiz loaded.</div>;

  const q    = qs.questions[qs.current];
  const isLast = qs.current === qs.questions.length - 1;
  const mins = Math.floor(timer/60), secs = timer%60;

  const choose = (i) => {
    if (showExpl) return;
    setSelected(i);
    setShowExpl(true);
  };

  const next = () => {
    const newAnswers = { ...qs.answers, [qs.current]: selected };
    if (isLast) { setQs({ ...qs, answers:newAnswers, submitted:true }); }
    else        { setQs({ ...qs, current:qs.current+1, answers:newAnswers }); }
    setSelected(null);
    setShowExpl(false);
  };

  // Results screen
  if (qs.submitted) {
    const correct = Object.entries(qs.answers).filter(([i,a]) => a===qs.questions[i]?.correct).length;
    const pct = Math.round((correct/qs.questions.length)*100);
    return (
      <div style={{ maxWidth:600, margin:"0 auto", padding:"40px 20px", textAlign:"center" }}>
        <div style={{ background:C.card, borderRadius:16, padding:32, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:60, marginBottom:16 }}>{pct>=70?"🏆":pct>=50?"👍":"📖"}</div>
          <h2 style={{ fontSize:28, fontWeight:900, margin:"0 0 4px" }}>Quiz Complete!</h2>
          <p style={{ color:C.sub }}>{qs.subject.name} — {qs.chapter}</p>
          <div style={{ fontSize:64, fontWeight:900, color:pct>=70?C.success:pct>=50?C.accent:C.danger, margin:"24px 0" }}>{pct}%</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:24 }}>
            {[["Correct",correct,C.success],["Wrong",qs.questions.length-correct,C.danger],["Total",qs.questions.length,C.primary]].map(([l,v,c]) => (
              <div key={l} style={{ background:C.bg, borderRadius:12, padding:16, textAlign:"center" }}>
                <div style={{ fontSize:24, fontWeight:800, color:c }}>{v}</div>
                <div style={{ fontSize:12, color:C.sub }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button style={btn("primary")} onClick={() => { setQs({...quizState,current:0,answers:{},submitted:false}); setSelected(null); setShowExpl(false); }}>Retry Quiz</button>
            <button style={btn("ghost")} onClick={() => nav(user?"subject":"landing")}>Back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:720, margin:"0 auto", padding:"32px 20px" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontWeight:700, fontSize:16 }}>{qs.subject.name}</div>
          <div style={{ color:C.sub, fontSize:13 }}>{qs.chapter}</div>
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ background:(timer<60?C.danger:C.primary)+"20", color:timer<60?C.danger:C.primary, padding:"8px 16px", borderRadius:20, fontSize:14, fontWeight:700 }}>
            ⏱ {mins}:{secs.toString().padStart(2,"0")}
          </div>
          <div style={{ color:C.sub, fontSize:14 }}>{qs.current+1}/{qs.questions.length}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background:C.border, borderRadius:8, height:6, marginBottom:24 }}>
        <div style={{ background:C.primary, height:6, borderRadius:8, width:`${((qs.current+1)/qs.questions.length)*100}%`, transition:"width 0.3s" }} />
      </div>

      {/* Question card */}
      <div style={{ background:C.card, borderRadius:16, padding:24, border:`1px solid ${C.border}` }}>
        <h3 style={{ margin:"0 0 24px", fontSize:18, lineHeight:1.5, fontWeight:600 }}>
          <span style={{ color:C.primary, fontWeight:800 }}>Q{qs.current+1}. </span>{q.q}
        </h3>

        <div style={{ display:"grid", gap:10 }}>
          {q.options.map((opt, i) => {
            let bg = C.card, border = C.border, col = C.text;
            if (showExpl) {
              if (i===q.correct)               { bg=C.success+"20"; border=C.success; col=C.success; }
              else if (i===selected)           { bg=C.danger +"20"; border=C.danger;  col=C.danger;  }
            } else if (selected===i)           { bg=C.primary+"15"; border=C.primary; }
            return (
              <button key={i} onClick={() => choose(i)} style={{ background:bg, border:`2px solid ${border}`, color:col, padding:"14px 18px", borderRadius:10, textAlign:"left", cursor:showExpl?"default":"pointer", fontSize:14, fontWeight:selected===i||(showExpl&&i===q.correct)?600:400 }}>
                <span style={{ fontWeight:700, marginRight:8 }}>{["A","B","C","D"][i]}.</span>{opt}
                {showExpl&&i===q.correct&&" ✓"}{showExpl&&i===selected&&i!==q.correct&&" ✗"}
              </button>
            );
          })}
        </div>

        {showExpl && (
          <div style={{ marginTop:20, padding:16, background:C.success+"15", borderRadius:10, borderLeft:`4px solid ${C.success}` }}>
            <strong style={{ color:C.success }}>💡 Explanation:</strong>
            <p style={{ margin:"8px 0 0", fontSize:14 }}>{q.explanation}</p>
          </div>
        )}

        <div style={{ display:"flex", justifyContent:"space-between", marginTop:24, flexWrap:"wrap", gap:10 }}>
          <button style={btn("ghost","sm")} onClick={() => nav(user?"subject":"landing")}>Exit Quiz</button>
          {showExpl && <button style={btn("primary")} onClick={next}>{isLast?"See Results":"Next Question →"}</button>}
        </div>
      </div>
    </div>
  );
}