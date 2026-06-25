import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AuthPage() {
  const { C, nav, setUser, authPage, setAuthPage } = useApp();
  const [form, setForm]   = useState({ name:"", email:"", password:"", otp:"" });
  const [step, setStep]   = useState("form");   // form | otp | success
  const [forgot, setForgot] = useState("email"); // email | otp | reset
  const [loading, setLoading] = useState(false);

  const styles = {
    input: {
      width:"100%", padding:"12px 16px", borderRadius:10,
      border:`1.5px solid ${C.border}`, background:C.bg,
      color:C.text, fontSize:14, outline:"none",
      boxSizing:"border-box", marginBottom:16,
    },
    btn: (v="primary", size="lg") => ({
      background: v==="primary"?C.primary:v==="success"?C.success:"transparent",
      color: v==="ghost"?C.primary:"#fff",
      border: v==="ghost"?`2px solid ${C.primary}`:"none",
      padding: size==="lg"?"14px 28px":"8px 18px",
      borderRadius:10, cursor:"pointer", fontWeight:600,
      fontSize:15, width:"100%",
    }),
    card: { background:C.card, borderRadius:16, padding:36, border:`1px solid ${C.border}`, boxShadow:"0 4px 24px rgba(0,0,0,0.08)" },
  };

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (authPage==="register") setStep("otp");
      else if (authPage==="forgot") setForgot("otp");
      else { setUser({ name: form.email.split("@")[0]||"Student", email:form.email, group:"MPC" }); nav("dashboard"); }
    }, 1200);
  };

  const verifyOTP = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (authPage==="register") setStep("success");
      else setForgot("reset");
    }, 1000);
  };

  return (
    <div style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ width:"100%", maxWidth:440 }}>
        <div style={styles.card}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:40, marginBottom:8 }}>🎓</div>
            <h2 style={{ margin:0, fontSize:24, fontWeight:800 }}>
              {authPage==="login"?"Welcome Back!":authPage==="register"?"Create Account":"Reset Password"}
            </h2>
            <p style={{ color:C.sub, margin:"8px 0 0", fontSize:14 }}>stu4only — Your AP Exam Partner</p>
          </div>

          {/* Success */}
          {step==="success" && (
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:60, marginBottom:16 }}>✅</div>
              <h3>Account Created!</h3>
              <p style={{ color:C.sub }}>Email verified successfully.</p>
              <button style={{ ...styles.btn(), marginTop:16 }} onClick={() => { setUser({ name:form.name||"Student", email:form.email, group:"MPC" }); nav("dashboard"); }}>Go to Dashboard</button>
            </div>
          )}

          {/* OTP for register */}
          {step==="otp" && (
            <>
              <p style={{ color:C.sub, textAlign:"center", marginBottom:20, fontSize:14 }}>📧 OTP sent to <strong>{form.email}</strong></p>
              <input style={styles.input} placeholder="Enter 6-digit OTP" maxLength={6} onChange={e=>setForm({...form,otp:e.target.value})} />
              <button style={styles.btn()} onClick={verifyOTP} disabled={loading}>{loading?"Verifying...":"Verify Email"}</button>
              <p style={{ textAlign:"center", marginTop:16, fontSize:13, color:C.sub }}>Didn't receive? <span style={{ color:C.primary, cursor:"pointer" }}>Resend OTP</span></p>
            </>
          )}

          {/* Forgot OTP */}
          {step==="form" && forgot==="otp" && (
            <>
              <input style={styles.input} placeholder="Enter OTP" maxLength={6} />
              <button style={styles.btn()} onClick={verifyOTP}>Verify OTP</button>
            </>
          )}

          {/* Reset password */}
          {step==="form" && forgot==="reset" && (
            <>
              <input style={styles.input} type="password" placeholder="New Password" />
              <input style={styles.input} type="password" placeholder="Confirm Password" />
              <button style={styles.btn("success")} onClick={() => { setAuthPage("login"); setForgot("email"); }}>Reset Password</button>
            </>
          )}

          {/* Main form */}
          {step==="form" && forgot==="email" && (
            <>
              {authPage==="register" && <input style={styles.input} placeholder="Full Name" onChange={e=>setForm({...form,name:e.target.value})} />}
              <input style={styles.input} placeholder="Email Address" type="email" onChange={e=>setForm({...form,email:e.target.value})} />
              {authPage!=="forgot" && <input style={styles.input} placeholder="Password" type="password" onChange={e=>setForm({...form,password:e.target.value})} />}
              {authPage==="register" && (
                <>
                  <input style={styles.input} placeholder="Confirm Password" type="password" />
                  <select style={{ ...styles.input }}>
                    <option>Select Group</option>
                    <option>MPC (Maths, Physics, Chemistry)</option>
                    <option>BiPC (Biology, Physics, Chemistry)</option>
                    <option>MEC (Maths, Economics, Commerce)</option>
                    <option>CEC (Commerce, Economics, Civics)</option>
                  </select>
                  <select style={{ ...styles.input }}>
                    <option>Select Year</option>
                    <option>1st Year Intermediate</option>
                    <option>2nd Year Intermediate</option>
                  </select>
                </>
              )}
              {authPage==="login" && (
                <div style={{ textAlign:"right", marginTop:-12, marginBottom:16 }}>
                  <span style={{ color:C.primary, fontSize:13, cursor:"pointer" }} onClick={()=>setAuthPage("forgot")}>Forgot Password?</span>
                </div>
              )}
              <button style={styles.btn()} onClick={submit} disabled={loading}>
                {loading?"Please wait...":authPage==="login"?"Login":authPage==="register"?"Create Account":"Send OTP"}
              </button>
              <p style={{ textAlign:"center", marginTop:20, fontSize:14, color:C.sub }}>
                {authPage==="login"?"New here? ":"Already have an account? "}
                <span style={{ color:C.primary, fontWeight:600, cursor:"pointer" }} onClick={()=>setAuthPage(authPage==="login"?"register":"login")}>
                  {authPage==="login"?"Create Account":"Login"}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}