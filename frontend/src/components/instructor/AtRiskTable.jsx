import "../../styles/table.css";

export default function AtRiskTable({ students }) {
  return (
    <div className="table-card">
      <h3 className="table-title">AI-Detected At-Risk Students</h3>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Risk</th>
            <th>Attendance</th>
            <th>Avg Score</th>
          </tr>
        </thead>

        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>
                <span className={`badge ${s.risk.toLowerCase()}`}>
                  {s.risk}
                </span>
              </td>
              <td>{s.attendance}%</td>
              <td>{s.score}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
