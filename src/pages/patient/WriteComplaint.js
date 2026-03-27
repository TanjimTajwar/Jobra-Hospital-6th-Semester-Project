import { useEffect, useState } from 'react';
import { getDoctors } from '../../services/doctorService';
import { sendComplaint } from '../../services/complaintService';
import '../../styles/main.css';
import '../../styles/patient.css';

const WriteComplaint = () => {
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState("");
    const [text, setText] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            const res = await getDoctors();
            setDoctors(res.data);
        } catch {
            setMsg("Failed to load doctors");
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!doctorId || !text.trim()) {
            setMsg("Please select a doctor and write a complaint");
            return;
        }
        try {
            await sendComplaint({ doctor_id: doctorId, complaint_text: text });
            setMsg("Complaint Submitted Successfully");
            setText("");
            setDoctorId("");
        } catch {
            setMsg("Failed to submit complaint");
        }
    };

    return (
        <div className="patient-bg patient-writecomplaint-page">
            <div
  className="page-title" style={{color: "white"}}> Write Complaint / Review</div>


            {msg && (
                <div className={msg.includes('Failed') ? 'alert alert-error' : 'alert alert-success'}>
                    {msg}
                </div>
            )}

            <div className="card complaint-card">
                <form onSubmit={submit}>
                    <label>Select Doctor</label>
                    <select value={doctorId} onChange={e => setDoctorId(e.target.value)} required>
                        <option value="">Select Doctor</option>
                        {doctors.map(d => (
                            <option key={d.doctor_id} value={d.doctor_id}>
                                {d.doctor_name} – {d.department}
                            </option>
                        ))}
                    </select>

                    <label>Complaint / Review</label>
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Write here..."
                        required
                    />

                    <button type="submit" className="btn btn-submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default WriteComplaint;
