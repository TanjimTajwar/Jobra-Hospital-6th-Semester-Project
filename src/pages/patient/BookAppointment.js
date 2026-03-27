import { useState, useEffect } from 'react';
import { book } from '../../services/appointmentService';
import { getDoctors } from '../../services/doctorService';
import '../../styles/main.css';
import '../../styles/patient.css';

const BookAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getDoctors();
                setDoctors(res.data || []);
            } catch {
                setMsg('Failed to load doctors');
            }
        };
        load();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!doctorId || !date || !time) {
            setMsg('Please select doctor, date and time');
            return;
        }
        setMsg('');
        setLoading(true);
        try {
            await book({
                doctor_id: Number(doctorId),
                appointment_date: date,
                appointment_time: time
            });
            setMsg('Appointment requested successfully');
            setDoctorId('');
            setDate('');
            setTime('');
        } catch (err) {
            setMsg(err.response?.data?.msg || err.response?.data?.message || 'Failed to book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="patient-bg patient-book-page">
            <div className="page-title" style={{color: "white"}}>Book Appointment</div>
            <div className="card appointment-card">
                {msg && (
                    <div className={msg.includes('Failed') ? 'alert alert-error' : 'alert alert-success'}>
                        {msg}
                    </div>
                )}

                <form onSubmit={submit} className="appointment-form">
                    <div className="form-group">
                        <label>Doctor</label>
                        <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
                            <option value="">Select doctor</option>
                            {doctors.map(d => (
                                <option key={d.doctor_id} value={d.doctor_id}>
                                    {d.doctor_name} – {d.department}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Time</label>
                        <input type="text" placeholder="e.g. 10:00 AM" value={time} onChange={e => setTime(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Booking…' : 'Book Appointment'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
