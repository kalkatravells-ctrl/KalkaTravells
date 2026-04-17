import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-icon">🔐</div>
          <h1>Admin Login</h1>
          <p>Sign in to manage your travel website</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="al-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="al-field">
            <label htmlFor="password">Password</label>
            <div className="al-password-wrap">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="al-toggle-pw"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && <div className="al-error">{error}</div>}

          <button type="submit" className="al-submit-btn" disabled={loading}>
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                <span className="al-spinner" /> Signing in...
              </span>
            ) : "Sign In →"}
          </button>
        </form>

        <p className="al-note">
          Admin account must be set up in Firebase Authentication.
        </p>
      </div>
    </div>
  );
}
