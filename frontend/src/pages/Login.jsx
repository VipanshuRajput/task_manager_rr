import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, CheckSquare } from "lucide-react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoBox}>
          <CheckSquare size={34} />
        </div>

        <h1 style={styles.title}>TaskFlow</h1>
        <p style={styles.subtitle}>Welcome back! Sign in to continue.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputBox}>
            <Mail size={16} style={styles.icon} />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputBox}>
            <Lock size={16} style={styles.icon} />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing in..." : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <p style={styles.footer}>Manage your tasks with ease and boost productivity.</p>
      </div>
    </div>
  );
}
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f3f4f6"
  },
  card: {
    width: 380,
    padding: 30,
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  logoBox: {
    width: 60,
    height: 60,
    margin: "0 auto 10px",
    borderRadius: 14,
    background: "#4f46e5",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  title: { fontSize: 28, fontWeight: 700 },
  subtitle: { color: "#6b7280", marginBottom: 24 },
  form: { display: "flex", flexDirection: "column", gap: 14 },
  inputBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: "10px 12px",
    gap: 10
  },
  input: { border: "none", outline: "none", flex: 1, fontSize: 14 },
  icon: { color: "#6b7280" },
  button: {
    marginTop: 10,
    height: 44,
    borderRadius: 10,
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  footer: { marginTop: 20, fontSize: 13, color: "#6b7280" }
};
