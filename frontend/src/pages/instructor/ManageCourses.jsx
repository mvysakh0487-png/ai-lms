import { useEffect, useState } from "react";
import API from "../../services/api";
import "./ManageCourses.css";

export default function ManageCourses() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    API.get("/content/instructor")
      .then(res => setContent(res.data))
      .catch(() => setContent([]));
  }, []);

  return (
    <div className="manage-courses">
      <h1 className="page-title">Manage Courses</h1>
      <p className="page-subtitle">
        View and manage all uploaded learning materials
      </p>

      {content.length === 0 ? (
        <div className="empty-state">
          No content uploaded yet
        </div>
      ) : (
        <div className="content-grid">
          {content.map(item => (
            <div key={item._id} className="content-card">
              <div className="content-header">
                <span className={`badge ${item.type}`}>
                  {item.type.toUpperCase()}
                </span>
              </div>

              <h3 className="content-title">{item.title}</h3>

              <a
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="view-btn"
              >
                View Content →
              </a>

              <div className="content-footer">
                Uploaded on{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
