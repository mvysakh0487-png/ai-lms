import "../../styles/table.css";

export default function UsersTable({ users }) {
  return (
    <div className="table-card">
      <h3 className="table-title">Platform Users</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <span className={`badge ${u.active ? "low" : "medium"}`}>
                  {u.active ? "Active" : "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
