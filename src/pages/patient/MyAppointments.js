import { useEffect, useState } from 'react';
import { myAppointments, cancelAppointment } from '../../services/appointmentService';
import '../../styles/main.css';
import '../../styles/patient.css';

const MyAppointments = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const res = await myAppointments();
        setList(res.data);
    };

    const cancel = async (id) => {
        await cancelAppointment(id);
        load();
    };

    return (
        <div className="patient-bg patient-myappointments-page">
            <div className="page-title" style={{color: "white"}}>My Appointments</div>

            <div className="card appointment-card">
                <table className="appointment-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(a => (
                            <tr key={a.appointment_id}>
                                <td>{a.doctor_name}</td>
                                <td>{a.appointment_date}</td>
                                <td>{a.appointment_time}</td>
                                <td>{a.status}</td>
                                <td>
                                    {a.status !== 'cancelled' && (
                                        <button className="btn btn-cancel" onClick={() => cancel(a.appointment_id)}>
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;
