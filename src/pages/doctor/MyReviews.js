import { useEffect, useState } from 'react';
import API from '../../services/api';
import '../../styles/main.css';
import '../../styles/doctor.css';

const MyReviews = () => {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await API.get('/complaint/doctor');
      setList(res.data);
    } catch {
      setMsg("Failed to load reviews");
    }
  };

  return (
    <div>
      <div className="page-title">Reviews About Me</div>

      {msg && <div className="alert alert-error">{msg}</div>}

      <div className="doctor-reviews">
        {list.length > 0 ? (
          list.map(c => (
            <div className="card review-card" key={c.complaint_id}>
              <div className="review-header">
                <span className="patient-id">Patient ID: {c.patient_id}</span>
                <span className="review-date">{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              <p className="review-text">{c.complaint_text}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '1rem' }}>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
