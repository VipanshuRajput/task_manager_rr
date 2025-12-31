import { LogOut, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header style={{
      background: "#ffffff",
      borderBottom: "1px solid #e5e7eb",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{
          background: "#4f46e5",
          padding: 8,
          borderRadius: 8,
          display: "flex"
        }}>
          <CheckSquare size={20} color="white" />
        </div>
        <div>
          <h3 style={{ margin: 0 }}>TaskFlow</h3>
          <small style={{ color: "#666" }}>Stay organized. Get things done.</small>
        </div>
      </div>

      {user && (
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ color: "#555" }}>
            Hi <strong>{user.name}</strong> 👋
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 14px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "#f9fafb",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      )}
    </header>
  );
}
