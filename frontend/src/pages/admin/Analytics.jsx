import { useEffect, useState } from "react";
import API from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./AdminDashboard.css";

export default function AdminAnalytics() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    API.get("/admin/analytics")
      .then(res => setRoles(res.data.roleStats))
      .catch(err => console.error(err));
  }, []);

  if (!roles.length) return <p className="loading">Loading analytics...</p>;

  return (
    <div className="admin-dashboard">
      <div className="chart-card">
        <h3>User Role Analysis</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roles}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}