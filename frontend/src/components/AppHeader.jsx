import { CheckSquare, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl">
            <CheckSquare className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold">TaskFlow</h1>
            <p className="text-xs text-muted-foreground">
              Manage your tasks efficiently
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg border hover:bg-muted transition"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
