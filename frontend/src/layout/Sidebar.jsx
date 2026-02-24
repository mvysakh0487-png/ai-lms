import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ role }) {
  const menus = {
    student: [
      { label: "Dashboard", path: "/student" },
      { label: "My Courses", path: "/student/courses" },
      { label: "Progress", path: "/student/progress" },
      { label: "Settings", path: "/student/settings" }
    ],
    instructor: [
      { label: "Dashboard", path: "/instructor" },
      { label: "Manage Courses", path: "/instructor/courses" },
      { label: "Upload Content", path: "/instructor/upload" },
      { label: "Students", path: "/instructor/students" },
      { label: "Analytics", path: "/instructor/analytics" }
    ],
    admin: [
      { label: "Dashboard", path: "/admin" },
      { label: "Users", path: "/admin/users" },
      { label: "Analytics", path: "/admin/analytics" },
      { label: "Settings", path: "/admin/settings" },
      { label: "Create User", path: "/admin/create-user" }
    ]
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">AI-LMS</div>

      <nav className="sidebar-menu">
        {menus[role]?.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
