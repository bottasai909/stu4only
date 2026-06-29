import { useApp } from "../context/AppContext";
import { QUIZ_QUESTIONS } from "../Constants/data";

export default function SubjectPage() {
  const { C, nav, user, activeSubject, setQuizState } = useApp();

  const card = (p=24) => ({ background:C.card, borderRadius:16, padding:p, border:`1px solid ${C.border}`, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" });
  const btn  = (v="primary", size="md") => ({
    background: v==="primary"?C.primary:v==="ghost"?"transparent":C.success,
    color: v==="ghost"?C.primary:"#fff",
    border: v==="ghost"?`2px solid ${C.primary}`:"none",
    padding: size==="lg"?"14px 28px":size==="sm"?"6px 14px":"10px 20px",
    borderRadius:10, cursor:"pointer", fontWeight:600, fontSize:size==="sm"?13:14,
  });

  if (!activeSubject) return (
    <div style={{ padding:40, textAlign:"center" }}>
      No subject selected.
      <button style={{ ...btn(), marginLeft:12 }} onClick={() => nav("subjects")}>Browse Subjects</button>
    </div>
  );

  const qs = QUIZ_QUESTIONS[activeSubject.id] || QUIZ_QUESTIONS.physics;

  const startQuiz = (chapter) => {
    setQuizState({ subject:activeSubject, chapter, questions:qs, current:0, answers:{}, submitted:false, timeLeft:300 });
    nav("quiz");
  };

  return (
    <div style={{ maxWidth:1000, margin:"0 auto", padding:"32px 20px" }}>
      <button style={{ ...btn("ghost","sm"), marginBottom:20 }} onClick={() => nav(user?"dashboard":"landing")}>← Back</button>
      <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:28 }}>
        <div style={{ fontSize:52 }}>{activeSubject.icon}</div>
        <div>
          <h1 style={{ margin:0, fontSize:28, fontWeight:800 }}>{activeSubject.name}</h1>
          <p style={{ margin:"4px 0 0", color:C.sub }}>{activeSubject.year} Year • {activeSubject.chapters.length} Chapters</p>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px,1fr))", gap:20 }}>
        {/* Chapter list */}
        <div style={card()}>
          <h3 style={{ margin:"0 0 16px", fontWeight:700 }}>📖 Chapters</h3>
          {activeSubject.chapters.map((ch, i) => (
            <div key={ch} style={{ padding:"10px 0", borderBottom: i<activeSubject.chapters.length-1?`1px solid ${C.border}`:"none", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:14 }}>{i+1}. {ch}</span>
              <button style={btn("primary","sm")} onClick={() => startQuiz(ch)}>Quiz</button>
            </div>
          ))}
        </div>

        <div>
          {/* Full quiz */}
          <div style={{ ...card(), marginBottom:16 }}>
            <h3 style={{ margin:"0 0 16px", fontWeight:700 }}>🚀 Full Subject Quiz</h3>
            <p style={{ color:C.sub, fontSize:14, marginBottom:16 }}>Test yourself on all chapters at once</p>
            <button style={{ ...btn("primary","lg"), width:"100%" }} onClick={() => startQuiz("Full Subject")}>
              Start Quiz ({qs.length} Questions)
            </button>
          </div>
          {/* Progress */}
          <div style={card()}>
            <h3 style={{ margin:"0 0 12px", fontWeight:700 }}>📊 Your Progress</h3>
            <div style={{ color:C.sub, fontSize:14 }}>Quizzes attempted: <strong style={{ color:C.text }}>3</strong></div>
            <div style={{ color:C.sub, fontSize:14, marginTop:4 }}>Best score: <strong style={{ color:C.success }}>82%</strong></div>
            <div style={{ color:C.sub, fontSize:14, marginTop:4 }}>Topics mastered: <strong style={{ color:C.text }}>4 / {activeSubject.chapters.length}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}