import { useState } from "react";
import { login } from "../api/authApi";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Warehouse Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username}
          onChange={e => setUsername(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} /><br /><br />
        <button>Login</button>
      </form>
    </div>
  );
}
