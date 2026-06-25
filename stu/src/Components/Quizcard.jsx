import { useApp } from "../context/AppContext";

// Reusable card that shows a subject — used on Dashboard & Subjects page
export default function QuizCard({ subject, onClick }) {
  const { C } = useApp();

  const styles = {
    card: {
      background: C.card,
      borderRadius: 16,
      padding: 20,
      border: `1px solid ${C.border}`,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      cursor: "pointer",
      transition: "transform 0.2s",
      textAlign: "center",
    },
    badge: {
      background: C.primary + "20",
      color: C.primary,
      padding: "4px 10px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      display: "inline-block",
      marginTop: 10,
    },
  };

  return (
    <div
      style={styles.card}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{subject.icon}</div>
      <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>{subject.name}</div>
      <div style={{ color: C.sub, fontSize: 12, marginTop: 4 }}>
        {subject.chapters.length} Chapters • {subject.year} Year
      </div>
      <div style={styles.badge}>Start Quiz →</div>
    </div>
  );
}