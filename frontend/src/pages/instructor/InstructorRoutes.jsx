import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout";

import Dashboard from "./Dashboard";
import ManageCourses from "./ManageCourses";
import UploadContent from "./UploadContent";
import Students from "./Students";
import Analytics from "./Analytics";

export default function InstructorRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout role="instructor" />}>
        <Route index element={<Dashboard />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="upload" element={<UploadContent />} />
        <Route path="students" element={<Students />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}
