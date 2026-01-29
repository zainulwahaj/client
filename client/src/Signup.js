import { useState } from "react";
import { API_BASE } from "./api";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async (e) => {
    e?.preventDefault();
    if (!email.trim() || !password) {
      setMessage("Please enter email and password.");
      return;
    }
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage(data.message || "Signup successful.");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (err) {
      setMessage("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={signup} className="auth-form">
      <h2>Signup</h2>
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
        autoComplete="new-password"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Signing up…" : "Signup"}
      </button>
      {message && <p className="auth-message">{message}</p>}
    </form>
  );
}

export default Signup;
