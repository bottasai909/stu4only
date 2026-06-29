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
      <div 
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} 
        onClick={() => nav("landing")}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 36 36" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ filter: "drop-shadow(0 2px 8px rgba(139, 92, 246, 0.3))" }}
        >
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="32" height="32" rx="9" fill="url(#logo-grad)" fillOpacity="0.1" stroke="url(#logo-grad)" strokeWidth="2" />
          <path d="M18 8L26 12V24L18 28L10 24V12L18 8Z" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M14 14.5C14 13 16 12.5 18 12.5C20.5 12.5 22 13.5 22 15.5C22 18.5 14 17.5 14 20.5C14 22.5 15.5 23.5 18 23.5C20.5 23.5 22 22.5 22 21" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={styles.logo}>stu4only</span>
      </div>

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