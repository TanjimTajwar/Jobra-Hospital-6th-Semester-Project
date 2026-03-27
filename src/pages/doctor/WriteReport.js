import { useEffect, useState } from 'react';
import { addReport } from '../../services/reportService';
import { patientList } from '../../services/doctorService';
import '../../styles/main.css';
import '../../styles/doctor.css';

const WriteReport = () => {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [medicalTest, setMedicalTest] = useState("");
  const [advice, setAdvice] = useState("");
  const [msg, setMsg] = useState("");

  // Load patients
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await patientList();
      setPatients(res.data);
    } catch {
      setMsg("Failed to load patients");
    }
  };

  // Submit report
  const submit = async (e) => {
    e.preventDefault();
    try {
      await addReport({
        patient_id: patientId,
        diagnosis,
        prescription,
        medical_test: medicalTest,
        advice
      });
      setMsg("Report Saved Successfully");
      setDiagnosis("");
      setPrescription("");
      setMedicalTest("");
      setAdvice("");
      setPatientId("");
    } catch {
      setMsg("Failed to Save");
    }
  };

  return (
    <div className="doctor-bg doctor-writereport-page">
      <div className="page-title">Write Patient Report</div>

      {msg && <div className="alert alert-success">{msg}</div>}

      <div className="card report-card">
        <form onSubmit={submit} className="report-form">

          <div className="form-group">
            <label>Select Patient</label>
            <select value={patientId} onChange={e => setPatientId(e.target.value)} required>
              <option value="">-- Select Patient --</option>
              {patients.map(p => (
                <option key={p.patient_id} value={p.patient_id}>
                  {p.patient_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Diagnosis</label>
            <textarea
              placeholder="Enter diagnosis"
              value={diagnosis}
              onChange={e => setDiagnosis(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Prescription</label>
            <textarea
              placeholder="Enter prescription"
              value={prescription}
              onChange={e => setPrescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Medical Test</label>
            <textarea
              placeholder="Enter medical test"
              value={medicalTest}
              onChange={e => setMedicalTest(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Advice</label>
            <textarea
              placeholder="Enter advice"
              value={advice}
              onChange={e => setAdvice(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Save Report
          </button>

        </form>
      </div>
    </div>
  );
};

export default WriteReport;
