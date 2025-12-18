import { useState } from "react";
import { signup } from "../api/authApi";

export default function SignupPage({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("WAREHOUSE_STAFF");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(username, password, role);
      alert("Account created. Please login.");
      onSwitch("login");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="WAREHOUSE_STAFF">Warehouse Staff</option>
          <option value="WAREHOUSE_MANAGER">Warehouse Manager</option>
        </select><br /><br />
        <button type="submit">Create Account</button>
      </form>

      <button onClick={() => onSwitch("login")}>Back to Login</button>
    </div>
  );
}
