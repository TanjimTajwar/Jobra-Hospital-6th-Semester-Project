import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allUsers, deleteUser } from '../../services/adminService';
import '../../styles/main.css';
import '../../styles/admin.css';

const AdminUserList = () => {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await allUsers();
      setList(res.data);
    } catch {
      setMsg("Failed to load users");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete User?")) return;
    await deleteUser(id);
    setMsg("User deleted");
    load();
  };

  return (
    <div className="admin-bg admin-userlist-page">
      <div className="page-title">Manage Users</div>

      {msg && <div className="alert alert-success">{msg}</div>}

      <div className="dashboard-grid">
        {list.length > 0 ? (
          list.map(u => (
            <div className="card user-card" key={u.id}>
              <h4>{u.name}</h4>
              <p>{u.email}</p>
              <p><strong>Role:</strong> {u.role}</p>

              <div className="user-card-buttons">
                <button className="btn btn-danger" onClick={() => remove(u.id)}>
                  Delete
                </button>
                <Link className="btn btn-primary" to={`/admin/edit/${u.id}`}>
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '1rem' }}>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUserList;
