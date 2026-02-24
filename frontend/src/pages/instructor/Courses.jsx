import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Courses.css";

export default function InstructorCourses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadCourses = async () => {
    const res = await API.get("/courses/instructor");
    setCourses(res.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const createCourse = async () => {
    await API.post("/courses", { title, description });
    setTitle("");
    setDescription("");
    loadCourses();
  };

  return (
    <div className="courses-page">
      <h2>Create Course</h2>

      <div className="course-form">
        <input
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Course description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createCourse}>Create</button>
      </div>

      <h2>Your Courses</h2>

      {courses.map((course) => (
        <CourseCard key={course._id} course={course} refresh={loadCourses} />
      ))}
    </div>
  );
}

function CourseCard({ course, refresh }) {
  const [file, setFile] = useState(null);
  const [contentTitle, setContentTitle] = useState("");
  const [type, setType] = useState("pdf");

  const uploadContent = async () => {
    const form = new FormData();
    form.append("title", contentTitle);
    form.append("type", type);
    form.append("file", file);

    await API.post(`/courses/${course._id}/content`, form);
    refresh();
  };

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>

      <div className="upload-box">
        <input
          placeholder="Content title"
          onChange={(e) => setContentTitle(e.target.value)}
        />
        <select onChange={(e) => setType(e.target.value)}>
          <option value="pdf">PDF</option>
          <option value="video">Video</option>
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadContent}>Upload</button>
      </div>

      <ul>
        {course.contents.map((c) => (
          <li key={c._id}>
            {c.type.toUpperCase()} – {c.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
