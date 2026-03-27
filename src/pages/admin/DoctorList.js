import { useEffect, useState } from 'react';
import { allUsers, deleteUser } from '../../services/adminService';
import '../../styles/main.css';
import '../../styles/admin.css';

const DoctorList = () => {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await allUsers();
      const doctors = res.data.filter(u => u.role === "doctor");
      setList(doctors);
    } catch {
      setMsg("Failed to load doctors");
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await deleteUser(id);
      setMsg('Doctor deleted');
      load();
    } catch {
      setMsg('Delete failed');
    }
  };

  return (
    <div className="admin-bg admin-doctorlist-page">
      <div className="page-title">Doctor Profiles</div>

      {msg && <div className="alert alert-success">{msg}</div>}

      <div className="card table-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map(d => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.email}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => remove(d.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>
                    No doctors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
