import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState({});

  useEffect(() => {
    API.get("/content/student")
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="courses-page">
      <h1 className="page-title">My Courses</h1>
      <p className="page-subtitle">
        Manage and track your enrolled courses
      </p>

      <div className="stats-row">
        <div className="stat-card purple">
          <h2>{Object.keys(courses).length}</h2>
          <span>Total Courses</span>
        </div>

        <div className="stat-card blue">
          <h2>
            {Object.keys(courses).filter(
              c => courses[c].length > 0
            ).length}
          </h2>
          <span>In Progress</span>
        </div>

        <div className="stat-card green">
          <h2>0</h2>
          <span>Completed</span>
        </div>
      </div>

      <div className="course-grid">
        {Object.keys(courses).map(course => {
          const items = courses[course];
          const progress = Math.min(items.length * 25, 100);
          const first = items[0];

          return (
            <div className="course-card" key={course}>
              <img
                src="https://images.unsplash.com/featured/?technology"
                alt={course}
              />

              <div className="course-body">
                <h3>{course}</h3>
                <p>{items.length} learning items</p>

                <div className="progress-wrap">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="progress-text">
                  Progress {progress}%
                </span>

                {first?.type === "pdf" ? (
                  <a
                    href={`http://localhost:5000${first.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="action-btn"
                  >
                    📄 View PDF
                  </a>
                ) : (
                  <button className="action-btn">
                    ▶ Continue Learning
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
