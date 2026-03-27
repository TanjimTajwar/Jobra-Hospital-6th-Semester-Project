import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../bg_images/Jobra_hospital_logo.png';
import '../../styles/navbar.css';

const DoctorNavbar = () => {
  const {logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-doctor">
      <div className="navbar-left">
        <img src={logo} alt="Jobra Hospital Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <NavLink to="/doctor">Dashboard</NavLink>
        <NavLink to="/doctor/appointments">Appointments</NavLink>
        <NavLink to="/doctor/patients">Patients</NavLink>
        <NavLink to="/doctor/write-report">Write Report</NavLink>
        <NavLink to="/doctor/reviews">Reviews</NavLink>
      </div>

      <div className="navbar-right">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
