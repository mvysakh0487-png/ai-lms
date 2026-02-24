import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", submissions: 3, grades: 2 },
  { day: "Tue", submissions: 4, grades: 3 },
  { day: "Wed", submissions: 2, grades: 2 },
  { day: "Thu", submissions: 5, grades: 4 },
  { day: "Fri", submissions: 4, grades: 3 },
  { day: "Sat", submissions: 6, grades: 5 },
  { day: "Sun", submissions: 3, grades: 4 },
];

export default function WeeklyActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="day" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Bar dataKey="submissions" fill="#a855f7" radius={[6, 6, 0, 0]} />
        <Bar dataKey="grades" fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
