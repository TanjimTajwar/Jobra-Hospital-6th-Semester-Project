import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../bg_images/Jobra_hospital_logo.png';
import '../../styles/navbar.css';

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-admin">
      <div className="navbar-left">
        <img src={logo} alt="Jobra Hospital Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/doctors">Doctors</NavLink>
        <NavLink to="/admin/patients">Patients</NavLink>
        <NavLink to="/admin/appointments">Appointments</NavLink>
        <NavLink to="/admin/complaints">Complaints</NavLink>
      </div>

      <div className="navbar-right">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
