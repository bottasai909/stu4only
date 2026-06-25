import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { dark, setDark, C, page, nav, user, setUser, setAuthPage } = useApp();

  const navItems = user
    ? [["Dashboard","dashboard"],["Subjects","subjects"],["EAMCET","eamcet"],["Demo","demo"]]
    : [["Home","landing"],["Subjects","subjects"],["EAMCET","eamcet"],["Demo","demo"],["Contact","contact"]];

  const styles = {
    navbar: {
      background: C.card,
      borderBottom: `1px solid ${C.border}`,
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    },
    logo: {
      fontSize: 22,
      fontWeight: 800,
      background: C.hero,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      cursor: "pointer",
    },
    navBtn: (active) => ({
      background: active ? C.primary : "transparent",
      color: active ? "#fff" : C.text,
      border: "none",
      padding: "8px 16px",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: active ? 600 : 400,
      fontSize: 14,
    }),
    btn: (variant, size = "sm") => ({
      background: variant === "primary" ? C.primary : variant === "danger" ? C.danger : "transparent",
      color: variant === "ghost" ? C.primary : "#fff",
      border: variant === "ghost" ? `2px solid ${C.primary}` : "none",
      padding: size === "sm" ? "6px 14px" : "10px 20px",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 13,
    }),
    badge: {
      background: C.primary + "20",
      color: C.primary,
      padding: "8px 12px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
    },
  };

  const handleContact = () => {
    nav("landing");
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo} onClick={() => nav("landing")}>stu4only</div>

      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {navItems.map(([label, pg]) => (
          <button
            key={pg}
            style={styles.navBtn(page === pg)}
            onClick={() => pg === "contact" ? handleContact() : nav(pg)}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {user ? (
          <>
            <div style={styles.badge}>👤 {user.name}</div>
            <button
              style={styles.btn("danger")}
              onClick={() => { setUser(null); nav("landing"); }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button style={styles.btn("ghost")} onClick={() => { setAuthPage("login"); nav("auth"); }}>Login</button>
            <button style={styles.btn("primary")} onClick={() => { setAuthPage("register"); nav("auth"); }}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
}