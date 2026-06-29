import { useApp } from "../context/AppContext";
import { SUBJECTS } from "../Constants/data";
import QuizCard from "../Components/Quizcard";

export default function Dashboard() {
  const { C, nav, user, setActiveSubject } = useApp();

  const card = (p=24) => ({ background:C.card, borderRadius:16, padding:p, border:`1px solid ${C.border}`, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" });
  const btn  = (v="primary", size="md") => ({
    background: v==="primary"?C.primary:v==="ghost"?"transparent":C.danger,
    color: v==="ghost"?C.primary:"#fff",
    border: v==="ghost"?`2px solid ${C.primary}`:"none",
    padding: size==="lg"?"14px 28px":"10px 20px",
    borderRadius:10, cursor:"pointer", fontWeight:600, fontSize:15,
  });

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 20px" }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ margin:0, fontSize:28, fontWeight:800 }}>Welcome back, {user?.name}! 👋</h1>
        <p style={{ color:C.sub, margin:"4px 0 0" }}>Ready to study? Pick up where you left off.</p>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px,1fr))", gap:16, marginBottom:32 }}>
        {[["📝","Quizzes Done","12"],["✅","Avg Score","74%"],["🔥","Day Streak","5"],["🏆","AP Rank","#1,204"]].map(([ic,l,v]) => (
          <div key={l} style={{ ...card(20), textAlign:"center" }}>
            <div style={{ fontSize:28, marginBottom:4 }}>{ic}</div>
            <div style={{ fontSize:24, fontWeight:800, color:C.primary }}>{v}</div>
            <div style={{ fontSize:12, color:C.sub }}>{l}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontWeight:800, marginBottom:16 }}>Your Subjects — MPC Group</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px,1fr))", gap:16, marginBottom:32 }}>
        {SUBJECTS.MPC.map(s => (
          <QuizCard key={s.id} subject={s} onClick={() => { setActiveSubject(s); nav("subject"); }} />
        ))}
      </div>

      <h2 style={{ fontWeight:800, marginBottom:16 }}>Quick Actions</h2>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        <button style={btn("primary","lg")} onClick={() => nav("eamcet")}>🎯 Start EAMCET Mock</button>
        <button style={btn("ghost","lg")} onClick={() => nav("subjects")}>📚 Browse Subjects</button>
      </div>
    </div>
  );
}