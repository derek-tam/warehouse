import { useState } from "react";
import { forgotPassword } from "../api/authApi";

export default function ForgotPasswordPage({ onSwitch }) {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(username);
      alert("Password reset link sent to your email.");
      onSwitch("login");
    } catch {
      alert("Failed to send reset link");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <button type="submit">Send Reset Link</button>
      </form>

      <button onClick={() => onSwitch("login")}>Back to Login</button>
    </div>
  );
}
