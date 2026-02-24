import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function StudyTimeChart({ data = [] }) {
  return (
    <div className="card">
      <h3>Study Time (This Week)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
