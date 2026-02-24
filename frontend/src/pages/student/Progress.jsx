import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Progress.css";

export default function Progress() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/progress/student")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  return (
    <div className="progress-page">
      <h1>Your Progress</h1>
      <p className="subtitle">
        Track your learning journey and achievements
      </p>

      {/* STAT CARDS */}
      <div className="stats-grid">
        <Stat icon="📈" value={`${data.avgProgress}%`} label="Average Progress" />
        <Stat icon="🏆" value={data.completedCount} label="Courses Completed" />
        <Stat icon="⏱" value={data.totalHours} label="Total Hours" />
        <Stat icon="🔥" value={data.dayStreak} label="Day Streak" />
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        <ChartCard title="Weekly Study Time">
          {data.weeklyStudy.map((v, i) => (
            <div key={i} className="bar" style={{ height: `${v * 20}px` }} />
          ))}
        </ChartCard>

        <ChartCard title="Course Completion Trend">
          <svg viewBox="0 0 200 100">
            {data.completionTrend.map((v, i) => (
              <circle
                key={i}
                cx={i * 35 + 10}
                cy={100 - v * 10}
                r="4"
              />
            ))}
          </svg>
        </ChartCard>
      </div>

      {/* ACHIEVEMENTS */}
      <div className="achievement-box">
        <h3>Achievements</h3>
        <div className="achievement">🏅 Fast Learner</div>
        <div className="achievement">🎯 Consistent</div>
        <div className="achievement">📚 Knowledge Seeker</div>
      </div>

      {/* COMPLETED COURSES */}
      <div className="completed-box">
        <h3>Recently Completed Courses</h3>
        {data.completedCourses.map(c => (
          <div key={c} className="completed-row">
            {c}
            <button>View Certificate</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div className="stat-card">
      <span className="icon">{icon}</span>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <div className="chart">{children}</div>
    </div>
  );
}
