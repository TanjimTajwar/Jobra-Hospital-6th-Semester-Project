import { useEffect, useState } from 'react';
import { patientList } from '../../services/doctorService';
import '../../styles/main.css';
import '../../styles/doctor.css';

const MyPatients = () => {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await patientList();
      setList(res.data);
    } catch {
      setMsg("Failed to load patients");
    }
  };

  return (
    <div className="doctor-bg doctor-mypatients-page">
      <div className="page-title">My Patients</div>

      {msg && <div className="alert alert-error">{msg}</div>}

      <div className="card table-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Blood</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map(p => (
                  <tr key={p.patient_id}>
                    <td>{p.patient_name}</td>
                    <td>{p.age}</td>
                    <td>{p.gender}</td>
                    <td>{p.patient_phone}</td>
                    <td>{p.blood_group}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
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

export default MyPatients;
