import { useApp } from "../context/AppContext";
import { SUBJECTS } from "../Constants/data";

export default function SubjectsPage() {
  const { C, nav, setActiveSubject } = useApp();

  const card = (p=24) => ({ background:C.card, borderRadius:16, padding:p, border:`1px solid ${C.border}`, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" });
  const btn  = (v="primary",size="sm") => ({
    background: v==="primary"?C.primary:"transparent",
    color: v==="ghost"?C.primary:"#fff",
    border: v==="ghost"?`2px solid ${C.primary}`:"none",
    padding: size==="sm"?"6px 14px":"10px 20px",
    borderRadius:10, cursor:"pointer", fontWeight:600, fontSize:13,
  });

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 20px" }}>
      <h1 style={{ fontSize:28, fontWeight:800, marginBottom:8 }}>All Subjects</h1>
      <p style={{ color:C.sub, marginBottom:28 }}>AP State Board — Intermediate Syllabus</p>
      <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap" }}>
        {["All Groups","MPC","BiPC","MEC","CEC"].map(g => (
          <span key={g} style={{ background:C.primary+"20", color:C.primary, padding:"8px 16px", borderRadius:20, fontSize:13, fontWeight:600, cursor:"pointer" }}>{g}</span>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px,1fr))", gap:20 }}>
        {SUBJECTS.MPC.map(s => (
          <div key={s.id} style={{ ...card(), cursor:"pointer", transition:"transform 0.2s" }}
            onClick={() => { setActiveSubject(s); nav("subject"); }}
            onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
            <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:16 }}>
              <div style={{ fontSize:40 }}>{s.icon}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:18 }}>{s.name}</div>
                <div style={{ color:C.sub, fontSize:13 }}>{s.year} Year • MPC Group</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {s.chapters.slice(0,4).map(ch => (
                <span key={ch} style={{ background:C.sub+"20", color:C.sub, padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:600 }}>{ch}</span>
              ))}
              {s.chapters.length>4 && <span style={{ background:C.sub+"20", color:C.sub, padding:"4px 10px", borderRadius:20, fontSize:11, fontWeight:600 }}>+{s.chapters.length-4} more</span>}
            </div>
            <button style={{ ...btn("primary","sm"), marginTop:16 }}>Start Chapter Quiz →</button>
          </div>
        ))}
      </div>
    </div>
  );
}