import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

import StudentDashboard from "./Dashboard";
import MyCourses from "./Courses";
import Progress from "./Progress";
import Settings from "./Settings";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout role="student" />}>
        <Route index element={<StudentDashboard />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="progress" element={<Progress />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
