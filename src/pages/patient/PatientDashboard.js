import { Link } from 'react-router-dom';
import '../../styles/main.css';
import '../../styles/patient.css';

const PatientDashboard = () => {
    return (
        <div className="patient-bg patient-dashboard-page">
            <div className="card dashboard-card">
                <h2 className="dashboard-title">Patient Dashboard</h2>
                <ul className="dashboard-links">
                    <li><Link to="/patient/doctors">👨‍⚕️ View Doctors</Link></li>
                    <li><Link to="/patient/book">📅 Book Appointment</Link></li>
                    <li><Link to="/patient/appointments">🗓 My Appointments</Link></li>
                    <li><Link to="/patient/report">📄 My Reports</Link></li>
                    <li><Link to="/patient/complaint">✉️ Write Complaint</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default PatientDashboard;
