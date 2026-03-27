import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../bg_images/Jobra_hospital_logo.png';
import '../../styles/navbar.css';

const PatientNavbar = () => {
  const {logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Jobra Hospital Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <NavLink to="/patient">Home</NavLink>
        <NavLink to="/patient/report">My Reports</NavLink>
        <NavLink to="/patient/doctors">Doctor List</NavLink>
        <NavLink to="/patient/book">Book Appointment</NavLink>
        <NavLink to="/patient/complaint">Give Complaint</NavLink>
      </div>

      <div className="navbar-right">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default PatientNavbar;
