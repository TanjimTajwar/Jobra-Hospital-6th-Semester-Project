import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import DoctorList from './pages/patient/DoctorList';
import WriteComplaint from './pages/patient/WriteComplaint';
import MyReport from './pages/patient/MyReport';
import MyReviews from './pages/doctor/MyReviews';
import ComplaintList from './pages/admin/ComplaintList';
import AdminDoctorList from './pages/admin/DoctorList';
import AdminPatientList from './pages/admin/PatientList';
import Protected from './components/Protected';
import DashboardLayout from './components/DashboardLayout';
import AddUser from './pages/admin/AddUser';
import Profile from './pages/Profile';
import MyPatients from './pages/doctor/MyPatients';

import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import MyAppointments from './pages/patient/MyAppointments';

import DoctorAppointments from './pages/doctor/DoctorAppointments';
import WriteReport from './pages/doctor/WriteReport';
import AdminAppointments from './pages/admin/AdminAppointments';

// New My Info and Edit Info pages
import AdminMyInfo from './pages/admin/MyInfo';
import AdminEditInfo from './pages/admin/EditInfo';
import DoctorMyInfo from './pages/doctor/MyInfo';
import DoctorEditInfo from './pages/doctor/EditInfo';
import PatientMyInfo from './pages/patient/MyInfo';
import PatientEditInfo from './pages/patient/EditInfo';



// 🔐 If already logged in → don’t show login page
function PublicOnly({ children }) {

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (_) {}
  if (user?.token && user?.role) {
    return <Navigate to={'/' + user.role} />;
  }

  return children;
}



function App() {

  return (
    <AuthProvider>
    <BrowserRouter>

      <Routes>
        {/* ============ PUBLIC ROUTES (No Layout) ============ */}
        <Route path="/" element={
          <PublicOnly>
            <Login />
          </PublicOnly>
        } />
        <Route path="/register" element={
          <PublicOnly>
            <Register />
          </PublicOnly>
        } />

        {/* ============ PATIENT ROUTES (With DashboardLayout) ============ */}
        <Route path="/patient" element={
          <Protected role="patient">
            <DashboardLayout>
              <PatientDashboard />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/patient/info" element={
          <Protected role="patient">
            <DashboardLayout>
              <PatientMyInfo />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/patient/edit" element={
          <Protected role="patient">
            <DashboardLayout>
              <PatientEditInfo />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/patient/book" element={
          <Protected role="patient">
            <DashboardLayout>
              <BookAppointment />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/patient/appointments" element={
          <Protected role="patient">
            <DashboardLayout>
              <MyAppointments />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/patient/doctors" element={
          <Protected role="patient">
            <DashboardLayout>
              <DoctorList />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/patient/complaint" element={
          <Protected role="patient">
            <DashboardLayout>
              <WriteComplaint />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/patient/report" element={
          <Protected role="patient">
            <DashboardLayout>
              <MyReport />
            </DashboardLayout>
          </Protected>
        } />

        {/* ============ DOCTOR ROUTES (With DashboardLayout) ============ */}
        <Route path="/doctor" element={
          <Protected role="doctor">
            <DashboardLayout>
              <DoctorDashboard />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/doctor/info" element={
          <Protected role="doctor">
            <DashboardLayout>
              <DoctorMyInfo />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/doctor/edit" element={
          <Protected role="doctor">
            <DashboardLayout>
              <DoctorEditInfo />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/doctor/patients" element={
          <Protected role="doctor">
            <DashboardLayout>
              <MyPatients />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/doctor/appointments" element={
          <Protected role="doctor">
            <DashboardLayout>
              <DoctorAppointments />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/doctor/reviews" element={
          <Protected role="doctor">
            <DashboardLayout>
              <MyReviews />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/doctor/write-report" element={
          <Protected role="doctor">
            <DashboardLayout>
              <WriteReport />
            </DashboardLayout>
          </Protected>
        } />

        {/* ============ ADMIN ROUTES (With DashboardLayout) ============ */}
        <Route path="/admin" element={
          <Protected role="admin">
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/admin/info" element={
          <Protected role="admin">
            <DashboardLayout>
              <AdminMyInfo />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/admin/edit" element={
          <Protected role="admin">
            <DashboardLayout>
              <AdminEditInfo />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/admin/appointments" element={
          <Protected role="admin">
            <DashboardLayout>
              <AdminAppointments />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/admin/add" element={
          <Protected role="admin">
            <DashboardLayout>
              <AddUser />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/admin/doctors" element={
          <Protected role="admin">
            <DashboardLayout>
              <AdminDoctorList />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/admin/patients" element={
          <Protected role="admin">
            <DashboardLayout>
              <AdminPatientList />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/admin/complaints" element={
          <Protected role="admin">
            <DashboardLayout>
              <ComplaintList />
            </DashboardLayout>
          </Protected>
        } />

        {/* ============ LEGACY PROFILE ROUTES (With DashboardLayout) ============ */}
        <Route path="/profile" element={
          <Protected role="admin">
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/doctor/profile" element={
          <Protected role="doctor">
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </Protected>
        } />

        <Route path="/patient/profile" element={
          <Protected role="patient">
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </Protected>
        } />




        {/* ============ WRONG URL ============ */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
