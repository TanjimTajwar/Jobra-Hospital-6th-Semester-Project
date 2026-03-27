import { Link } from 'react-router-dom';
import '../../styles/main.css';
import '../../styles/doctor.css';

const DoctorDashboard = () => {
  return (
    <div className="doctor-bg doctor-dashboard-page">
      <div className="doctor-page">
        <div className="card dashboard-card">
          <h2 className="dashboard-title">Doctor Dashboard</h2>

          <ul className="dashboard-links">
            <li><Link to="/doctor/appointments">📅 Appointments</Link></li>
            <li><Link to="/doctor/patients">🧑 My Patients</Link></li>
            <li><Link to="/doctor/write-report">📝 Write Report</Link></li>
            <li><Link to="/doctor/reviews">⭐ My Reviews</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
