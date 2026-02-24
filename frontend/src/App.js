import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./auth/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

import StudentRoutes from "./pages/student/StudentRoutes";
import InstructorRoutes from "./pages/instructor/InstructorRoutes";
import AdminRoutes from "./pages/admin/AdminRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE */}
        <Route path="/" element={<Landing />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* STUDENT */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute role="student">
              <StudentRoutes />
            </ProtectedRoute>
          }
        />

        {/* INSTRUCTOR */}
        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute role="instructor">
              <InstructorRoutes />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
