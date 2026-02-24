import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from "recharts";
import "./AdminDashboard.css";

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b"];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/admin/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p className="loading">Loading dashboard...</p>;

  const pieData = [
    { name: "Students", value: stats.students },
    { name: "Instructors", value: stats.instructors },
    { name: "Admins", value: stats.admins }
  ];

  const barData = [
    { name: "Users", count: stats.totalUsers },
    { name: "Content", count: stats.contents }
  ];

  return (
    <div className="admin-dashboard">

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="kpi-card green">
          <h3>Students</h3>
          <p>{stats.students}</p>
        </div>
        <div className="kpi-card yellow">
          <h3>Instructors</h3>
          <p>{stats.instructors}</p>
        </div>
        <div className="kpi-card purple">
          <h3>Content</h3>
          <p>{stats.contents}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="chart-grid">

        <div className="chart-card">
          <h3>User Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>System Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}