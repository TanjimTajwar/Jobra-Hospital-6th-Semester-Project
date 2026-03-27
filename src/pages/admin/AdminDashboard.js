import { Link } from 'react-router-dom';
import '../../styles/main.css';
import '../../styles/admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-bg admin-dashboard-page">
      <div className="admin-page">
        <div className="admin-card">
          <h2 className="admin-title">Admin Dashboard</h2>

          <div className="dashboard-grid">
            <Link to="/admin/add" className="dashboard-card">
              ➕ <span>Add User</span>
            </Link>
            <Link to="/admin/doctors" className="dashboard-card">
              👨‍⚕ <span>Doctor List</span>
            </Link>
            <Link to="/admin/patients" className="dashboard-card">
              🧑 <span>Patient List</span>
            </Link>
            <Link to="/admin/appointments" className="dashboard-card">
              📅 <span>Appointments</span>
            </Link>
            <Link to="/admin/complaints" className="dashboard-card">
              📩 <span>All Complaints</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
