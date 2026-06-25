import { createContext, useContext, useState } from "react";
// Make sure this path points to wherever your COLORS object is stored
import { COLORS } from "../Constants/colors"; 

// 1. Create the context
const AppContext = createContext();

// 2. Create the Provider component
export function AppProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");
  const [quizState, setQuizState] = useState(null);
  const [activeSubject, setActiveSubject] = useState(null);

  const C = dark ? COLORS.dark : COLORS.light;

  const nav = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <AppContext.Provider value={{
      dark, setDark, C,
      page, nav, 
      user, setUser,
      authPage, setAuthPage,
      quizState, setQuizState,
      activeSubject, setActiveSubject
    }}>
      {children}
    </AppContext.Provider>
  );
}

// 3. Export the custom hook EXACTLY ONCE at the very bottom
export function useApp() {
  return useContext(AppContext);
}