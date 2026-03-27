import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updateUser, getUserById } from '../../services/adminService';
import '../../styles/main.css';
import '../../styles/admin.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("patient");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getUserById(id);
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);
      } catch {
        setMsg("Failed to load user");
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setMsg("Name & Email required");
      return;
    }
    try {
      await updateUser(id, { name, email, role });
      setMsg("Updated Successfully");
      setTimeout(() => navigate('/admin/users'), 1000);
    } catch {
      setMsg("Update Failed");
    }
  };

  return (
    <div>
      <div className="admin-page">
        <div className="admin-card">
          <h2 className="admin-title">Edit User</h2>
          <Link to="/admin/users" className="back-link">← Back to Users</Link>

          {msg && <div className={`alert ${msg.includes('Successfully') ? 'alert-success' : 'alert-error'}`}>{msg}</div>}

          <form className="admin-form" onSubmit={submit}>
            <div className="admin-field">
              <label>Name</label>
              <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="admin-btn btn btn-primary" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
