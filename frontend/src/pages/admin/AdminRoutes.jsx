import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

import Dashboard from "./Dashboard";
import Users from "./Users";
import Analytics from "./Analytics";
import CreateUser from "./CreateUser";
import Settings from "./Settings";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout role="admin" />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="create-user" element={<CreateUser />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
