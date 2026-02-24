import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminRoutes from "./pages/admin/AdminRoutes";
import StudentRoutes from "./pages/student/StudentRoutes";
import InstructorRoutes from "./pages/instructor/InstructorRoutes";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/*"
          element={
            <ProtectedRoute role="student">
              <StudentRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/*"
          element={
            <ProtectedRoute role="instructor">
              <InstructorRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
