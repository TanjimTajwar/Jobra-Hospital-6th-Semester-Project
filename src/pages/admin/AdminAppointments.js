import { useEffect, useState } from 'react';
import { allAppointments, deleteAppointment } from '../../services/appointmentService';
import '../../styles/main.css';
import '../../styles/admin.css'; // dedicated admin styles

const AdminAppointments = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await allAppointments();
    setList(res.data);
  };

  const del = async (id) => {
    await deleteAppointment(id);
    load();
  };

  return (
    <div className="admin-bg admin-appointments-page">
      <div className="page-title">All Appointments</div>

      <div className="card table-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => (
                <tr key={a.appointment_id}>
                  <td>{a.doctor_name}</td>
                  <td>{a.patient_name}</td>
                  <td>{a.appointment_date}</td>
                  <td>{a.appointment_time}</td>
                  <td>{a.status}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => del(a.appointment_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
