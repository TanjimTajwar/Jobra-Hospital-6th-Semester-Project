import { useEffect, useState } from 'react';
import { doctorAppointments, changeStatus } from '../../services/appointmentService';
import '../../styles/main.css';
import '../../styles/doctor.css';

const DoctorAppointments = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await doctorAppointments();
    setList(res.data);
  };

  const update = async (id, s) => {
    await changeStatus(id, { status: s });
    load();
  };

  return (
    <div className="doctor-bg doctor-appointments-page">
      <div className="page-title">Appointment Requests</div>

      <div className="card table-card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map(a => (
                  <tr key={a.appointment_id}>
                    <td>{a.patient_name}</td>
                    <td>{a.appointment_date}</td>
                    <td>{a.appointment_time}</td>
                    <td>{a.status}</td>
                    <td className="action-buttons">
                      <button className="btn btn-success" onClick={() => update(a.appointment_id, 'accepted')}>
                        Accept
                      </button>
                      <button className="btn btn-danger" onClick={() => update(a.appointment_id, 'rejected')}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                    No appointment requests.
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

export default DoctorAppointments;
