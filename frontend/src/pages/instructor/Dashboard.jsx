import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";
import "./InstructorDashboard.css";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b"];

export default function InstructorDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/analytics/instructor")
      .then(res => setStats(res.data))
      .catch(console.error);
  }, []);

  if (!stats) return <p className="loading">Loading dashboard...</p>;

  const pieData = [
    { name: "Students", value: stats.totalStudents },
    { name: "Content", value: stats.totalContent }
  ];

  return (
    <div className="instructor-dashboard">
      <h2>Instructor Dashboard</h2>

      {/* KPI */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <h3>Total Students</h3>
          <p>{stats.totalStudents}</p>
        </div>
        <div className="kpi-card green">
          <h3>Total Content</h3>
          <p>{stats.totalContent}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid">
        <div className="chart-card">
          <h3>Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}