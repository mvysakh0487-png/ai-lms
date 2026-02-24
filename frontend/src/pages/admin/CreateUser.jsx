import { useState } from "react";
import API from "../../services/api";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "student"
  });
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setResult(null);

    try {
      const res = await API.post("/auth/create-user", form);
      setResult(res.data);
      setForm({ name: "", email: "", role: "student" });
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    }
  };

  return (
    <div className="card">
      <h2>Create User</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />

        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>

        <button className="btn btn-primary">Create User</button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p><b>Temporary Password:</b> {result.tempPassword}</p>
        </div>
      )}
    </div>
  );
}
