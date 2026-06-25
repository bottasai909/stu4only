import { useApp } from "../context/AppContext";

export default function Footer() {
  const { C } = useApp();

  return (
    <footer
      style={{
        background: C.card,
        borderTop: `1px solid ${C.border}`,
        padding: "40px 20px",
        marginTop: 60,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 32,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              background: C.hero,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}
          >
            stu4only
          </div>
          <p style={{ color: C.sub, fontSize: 13, lineHeight: 1.7 }}>
            AP Intermediate exam preparation platform built for MPC & BiPC
            students targeting EAMCET, NEET & JEE.
          </p>
        </div>

        {/* Subjects */}
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Subjects</div>
          {["Maths 1A & 1B", "Maths 2A & 2B", "Physics", "Chemistry"].map((s) => (
            <div key={s} style={{ color: C.sub, fontSize: 13, marginBottom: 6 }}>{s}</div>
          ))}
        </div>

        {/* Exams */}
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Exams</div>
          {["EAMCET Engineering", "EAMCET Agriculture", "NEET UG", "JEE Mains"].map((e) => (
            <div key={e} style={{ color: C.sub, fontSize: 13, marginBottom: 6 }}>{e}</div>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Contact</div>
          <div style={{ color: C.sub, fontSize: 13, lineHeight: 2 }}>
            📧 hello@stu4only.com<br />
            📱 +91 98765 43210<br />
            📍 Vijayawada, AP
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 32,
          color: C.sub,
          fontSize: 12,
          borderTop: `1px solid ${C.border}`,
          paddingTop: 20,
        }}
      >
        © 2026 stu4only — All rights reserved. Built with ❤️ for AP Intermediate Students.
      </div>
    </footer>
  );
}