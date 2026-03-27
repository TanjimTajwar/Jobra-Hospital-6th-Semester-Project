import { useEffect, useState } from 'react';
import { myReports } from '../../services/reportService';
import '../../styles/main.css';
import '../../styles/patient.css';

const MyReport = () => {
    const [list, setList] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const res = await myReports();
            setList(res.data);
        } catch {
            setMsg("Failed to load reports");
        }
    };

    return (
        <div className="patient-bg patient-myreports-page">
            <div className="page-title" style={{color: "white"}} >My Medical Reports</div>

            {msg && <div className="alert alert-error">{msg}</div>}

            <div className="card report-list-card">
                {list.map(r => (
                    <div className="report-card" key={r.report_id}>
                        <h4 className="report-doctor">
                            Doctor: {r.doctor_name} ({r.department})
                        </h4>
                        <p className="report-date">
                            <b>Date:</b> {new Date(r.report_date).toLocaleString()}
                        </p>
                        <p><b>Diagnosis:</b><br />{r.diagnosis}</p>
                        <p><b>Prescription:</b><br />{r.prescription}</p>
                        <p><b>Medical Test:</b><br />{r.medical_test}</p>
                        <p><b>Advice:</b><br />{r.advice}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyReport;
