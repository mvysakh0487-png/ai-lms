import { useNavigate } from "react-router-dom";
import "./Topbar.css";

export default function Topbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login and prevent back navigation
    navigate("/login", { replace: true });
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h3 className="topbar-title">Dashboard</h3>
      </div>

      <div className="topbar-right">
        <span className="role-badge">
          {role ? role.toUpperCase() : "USER"}
        </span>

        <div className="profile">
          <div className="avatar">
            {role ? role.charAt(0).toUpperCase() : "U"}
          </div>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
