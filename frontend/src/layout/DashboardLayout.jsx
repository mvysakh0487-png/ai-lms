import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./DashboardLayout.css";

export default function DashboardLayout({ role }) {
  return (
    <div className="dashboard-layout">
      <Sidebar role={role} />

      <div className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
