import { useState } from "react";
import { API_BASE } from "./api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e?.preventDefault();
    if (!email.trim() || !password) {
      setMessage("Please enter email and password.");
      return;
    }
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage(data.message || "Login successful.");
      } else {
        setMessage(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setMessage("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={login} className="auth-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        autoComplete="current-password"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in…" : "Login"}
      </button>
      {message && <p className="auth-message">{message}</p>}
    </form>
  );
}

export default Login;
