import { useEffect, useState } from 'react';
import API from '../../services/api';
import '../../styles/main.css';
import '../../styles/admin.css';

const ComplaintList = () => {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get('/complaint/all');
      setList(res.data);
    } catch {
      setMsg("Failed to load complaints");
    }
  };

  return (
    <div className="admin-bg admin-complaints-page">
      <div className="page-title">All Complaints</div>

      {msg && <div className="alert alert-error">{msg}</div>}

      <div className="dashboard-grid">
        {list.length > 0 ? (
          list.map(c => (
            <div className="card complaint-card" key={c.complaint_id}>
              <p><strong>Patient:</strong> {c.patient_id}</p>
              <p><strong>Doctor:</strong> {c.doctor_id}</p>
              <p className="complaint-text">{c.complaint_text}</p>
              <small className="complaint-date">{new Date(c.created_at).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '1rem' }}>No complaints found.</p>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;
