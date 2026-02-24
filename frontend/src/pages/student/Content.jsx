import { useEffect, useState } from "react";
import API from "../../services/api";

export default function StudentContent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/content/student").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Learning Materials</h2>

      {data.map(c => (
        <div className="card" key={c._id}>
          <h4>{c.title}</h4>

          {c.type === "text" && <p>{c.textContent}</p>}
          {c.type === "link" && <a href={c.textContent} target="_blank">Open</a>}
          {c.fileUrl && (
            <a href={`http://localhost:5000${c.fileUrl}`} target="_blank">
              Download
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
