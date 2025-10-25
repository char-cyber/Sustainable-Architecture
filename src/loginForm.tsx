import React, { useState } from "react";

interface Props { onLogin: (userId: string) => void; }
const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok && data.userId) {
      setMessage("Success!");
      onLogin(data.userId);
    } else {
      setMessage(data.error || "Login failed");
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username}
        onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password}
        onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <div className="message">{message}</div>
    </form>
  );
};

export default LoginForm;
