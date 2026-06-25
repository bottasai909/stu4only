import { useApp } from "../context/AppContext";

export default function DemoPage() {
  const { C, nav, setAuthPage } = useApp();
  const card = (p=24) => ({ background:C.card, borderRadius:16, padding:p, border:`1px solid ${C.border}`, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" });

  const features = [
    { icon:"🔐", title:"Secure Auth System",    desc:"Email OTP signup, JWT login, forgot password — Node.js & MongoDB.",   color:"#2563EB" },
    { icon:"📚", title:"6 Subject Modules",      desc:"Maths 1A, 1B, 2A, 2B, Physics, Chemistry — AP State Board.",         color:"#7C3AED" },
    { icon:"🧠", title:"Smart Quiz Engine",      desc:"Chapter-wise MCQs with timers, instant explanations, retry mode.",    color:"#10B981" },
    { icon:"🎯", title:"EAMCET Mock Test",       desc:"160-question full-length mock with palette, timer, score analysis.",   color:"#F59E0B" },
    { icon:"📊", title:"Analytics Dashboard",    desc:"Track scores, identify weak areas, see visual progress charts.",       color:"#EF4444" },
    { icon:"🌓", title:"Dark / Light Mode",      desc:"Comfortable studying any time — toggle themes instantly.",            color:"#06B6D4" },
    { icon:"📱", title:"Mobile Responsive",      desc:"Works on phones, tablets, and desktops seamlessly.",                  color:"#8B5CF6" },
    { icon:"🏆", title:"Leaderboards",           desc:"Compete statewide and track your rank on every quiz.",               color:"#EC4899" },
  ];

  return (
    <div style={{ maxWidth:1000, margin:"0 auto", padding:"40px 20px" }}>
      <h1 style={{ fontSize:32, fontWeight:900, textAlign:"center", marginBottom:8 }}>Platform Demo</h1>
      <p style={{ textAlign:"center", color:C.sub, marginBottom:40 }}>See what stu4only offers for AP Intermediate students</p>
      {features.map(f => (
        <div key={f.title} style={{ ...card(), display:"flex", gap:20, marginBottom:16, alignItems:"flex-start" }}>
          <div style={{ fontSize:40, flexShrink:0 }}>{f.icon}</div>
          <div style={{ flex:1 }}>
            <h3 style={{ margin:"0 0 6px", color:f.color, fontWeight:700 }}>{f.title}</h3>
            <p style={{ margin:0, color:C.sub, lineHeight:1.6 }}>{f.desc}</p>
          </div>
          <span style={{ background:C.success+"20", color:C.success, padding:"4px 10px", borderRadius:20, fontSize:12, fontWeight:600, flexShrink:0 }}>✓ Built</span>
        </div>
      ))}
      <div style={{ textAlign:"center", marginTop:40 }}>
        <button style={{ background:C.primary, color:"#fff", border:"none", padding:"14px 28px", borderRadius:10, cursor:"pointer", fontWeight:600, fontSize:16 }}
          onClick={() => { setAuthPage("register"); nav("auth"); }}>Get Started Free →</button>
      </div>
    </div>
  );
}