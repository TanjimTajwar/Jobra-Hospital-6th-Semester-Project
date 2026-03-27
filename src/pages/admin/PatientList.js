import { useEffect, useState } from 'react';
import { allUsers, deleteUser } from '../../services/adminService';
import '../../styles/main.css';
import '../../styles/admin.css';

const PatientList = () => {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await allUsers();
      const patients = res.data.filter(u => u.role === "patient");
      setList(patients);
    } catch {
      setMsg("Failed to load patients");
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this patient?')) return;
    try {
      await deleteUser(id);
      setMsg('Patient deleted');
      load();
    } catch {
      setMsg('Delete failed');
    }
  };

  return (
    <div className="admin-bg admin-patientlist-page">
      <div className="page-title">Patient Profiles</div>

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
                list.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.email}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => remove(p.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>
                    No patients found.
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

export default PatientList;
