import { useEffect, useState } from "react";
import API from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./InstructorDashboard.css";

export default function InstructorAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/analytics/instructor")
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <p>Failed to load analytics</p>;

  const chartData = [
    { name: "Students", value: data.totalStudents },
    { name: "Content", value: data.totalContent }
  ];

  return (
    <div className="instructor-dashboard">
      <h2>Analytics</h2>

      <div className="chart-card">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}