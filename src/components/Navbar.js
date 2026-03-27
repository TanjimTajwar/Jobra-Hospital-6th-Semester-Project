import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminNavbar from './navbars/AdminNavbar';
import DoctorNavbar from './navbars/DoctorNavbar';
import PatientNavbar from './navbars/PatientNavbar';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  if (user.role === 'admin') return <AdminNavbar />;
  if (user.role === 'doctor') return <DoctorNavbar />;
  if (user.role === 'patient') return <PatientNavbar />;

  return null;
};

export default Navbar;
