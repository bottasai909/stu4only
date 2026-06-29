import { AppProvider, useApp } from "./context/AppContext";
import Navbar      from "./Components/Navbar";
import Footer      from "./Components/Footer";
import LandingPage from "./Pages/LandingPage";
import AuthPage    from "./Pages/AuthPage";
import Dashboard   from "./Pages/Dashboard";
import SubjectsPage from "./Pages/SubjectsPage";
import SubjectPage from "./Pages/SubjectPage";
import QuizPage    from "./Pages/QuizPage";
import EamcetPage  from "./Pages/EamcetPage";
import DemoPage    from "./Pages/DemoPage";

function AppInner() {
  const { C, page, user } = useApp();
  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", background:C.bg, color:C.text, minHeight:"100vh", transition:"all 0.3s" }}>
      <Navbar />
      {page === "landing"   && <LandingPage />}
      {page === "auth"      && <AuthPage />}
      {page === "dashboard" && (user ? <Dashboard /> : <AuthPage />)}
      {page === "subjects"  && <SubjectsPage />}
      {page === "subject"   && <SubjectPage />}
      {page === "quiz"      && <QuizPage />}
      {page === "eamcet"    && <EamcetPage />}
      {page === "demo"      && <DemoPage />}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}