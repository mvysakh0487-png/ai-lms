import { useState } from "react";
import API from "../../services/api";

export default function CreateCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const submit = async () => {
    await API.post("/courses", form);
    alert("Course created!");
  };

  return (
    <div className="page">
      <h2>Create Course</h2>

      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <button onClick={submit}>Create</button>
    </div>
  );
}
