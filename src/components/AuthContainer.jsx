import { useState } from "react";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

export default function AuthContainer({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | signup | forgot

  const switchMode = (newMode) => setMode(newMode);

  return (
    <div>
      {mode === "login" && <LoginPage onLogin={onLogin} onSwitch={switchMode} />}
      {mode === "signup" && <SignupPage onSwitch={switchMode} />}
      {mode === "forgot" && <ForgotPasswordPage onSwitch={switchMode} />}
    </div>
  );
}
