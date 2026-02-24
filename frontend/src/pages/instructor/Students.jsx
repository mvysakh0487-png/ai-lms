import { useEffect, useState } from "react";
import API from "../../services/api";
import "./Students.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await API.get("/analytics/instructor/students");
        if (mounted) setStudents(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false; // ✅ VALID CLEANUP
    };
  }, []);

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="students-page">
      <h2>Students</h2>

      {students.length === 0 ? (
        <p>No students enrolled yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.course}</td>
                <td>{s.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
