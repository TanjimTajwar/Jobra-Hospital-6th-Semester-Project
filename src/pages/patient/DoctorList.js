import { useEffect, useState } from 'react';
import { getDoctors } from '../../services/doctorService';
import '../../styles/main.css';
import '../../styles/patient.css';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            const res = await getDoctors();
            setDoctors(res.data);
        } catch (err) {
            setMsg("Failed to load doctors");
        }
    };

    return (
        <div className="patient-bg patient-doctorlist-page">
            <div className="page-title" style={{color: "white"}}>Available Doctors</div>

            {msg && <div className="alert alert-error">{msg}</div>}

            <div className="card doctor-card">
                <table className="doctor-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Qualification</th>
                            <th>Experience</th>
                            <th>Chamber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map(d => (
                            <tr key={d.doctor_id}>
                                <td>{d.doctor_name}</td>
                                <td>{d.department}</td>
                                <td>{d.qualification}</td>
                                <td>{d.experience} years</td>
                                <td>{d.chamber_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorList;
