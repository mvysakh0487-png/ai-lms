import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Dashboard.css";

export default function StudentDashboard() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    API.get("/content/student").then(res => {
      setContent(res.data);
    });
  }, []);

  return (
    <div className="student-dashboard">
      <h1 className="welcome">Welcome Back 👋</h1>
      <p className="subtitle">Your learning materials</p>

      {/* STATS */}
      <div className="stats-grid">
        <Stat label="Enrolled Courses" value={content.length} />
        <Stat label="Hours Learned" value="124" />
        <Stat label="Completed" value="5" />
        <Stat label="Avg Progress" value="68%" />
      </div>

      {/* COURSES */}
      <h2 className="section-title">Continue Learning</h2>

      <div className="course-grid">
        {content.map(item => (
          <div className="course-card" key={item._id}>
            <div className="course-thumb">
              <span className="course-type">{item.type.toUpperCase()}</span>
            </div>

            <h3>{item.title}</h3>
            <p className="course-name">{item.courseTitle}</p>

            <div className="progress">
              <div className="progress-bar" style={{ width: "70%" }} />
            </div>

            {item.type === "pdf" && (
              <a
                href={`http://localhost:5000${item.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                View PDF
              </a>
            )}

            {item.type === "video" && (
              <a href={item.fileUrl} target="_blank" rel="noreferrer" className="btn">
                Continue Watching
              </a>
            )}

            {item.type === "link" && (
              <a href={item.fileUrl} target="_blank" rel="noreferrer" className="btn">
                Open Resource
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ACTIVITY */}
      <div className="activity-card">
        <h3>Recent Activity</h3>
        <ul>
          {content.slice(0, 3).map(c => (
            <li key={c._id}>
              Uploaded: <b>{c.title}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div className="stat-card">
    <h2>{value}</h2>
    <p>{label}</p>
  </div>
);
