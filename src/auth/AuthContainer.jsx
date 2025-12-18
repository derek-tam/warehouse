import { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ForgotPasswordPage from "./ForgotPasswordPage";

export default function AuthContainer({ onLogin }) {
  const [mode, setMode] = useState("login");

  return (
    <>
      {mode === "login" && (
        <LoginPage onLogin={onLogin} onSwitch={setMode} />
      )}
      {mode === "signup" && (
        <SignupPage onSwitch={setMode} />
      )}
      {mode === "forgot" && (
        <ForgotPasswordPage onSwitch={setMode} />
      )}
    </>
  );
}
