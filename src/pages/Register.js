import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerPatient, registerDoctor, registerAdmin } from '../services/authService';
import logo from '../bg_images/Jobra_hospital_logo.png';
import '../styles/auth.css';

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState('patient');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    blood_group: '',
    address: '',
    department: '',
    qualification: '',
    experience: '',
    chamber_time: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, password } = form;

    if (!name.trim() || !email.trim() || !password) {
      setError('Name, email and password are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      if (role === 'patient') {
        const payload = {
          patient_name: form.name.trim(),
          patient_email: form.email.trim(),
          patient_password: form.password,
          patient_phone: form.phone || null,
          age: form.age ? Number(form.age) : null,
          gender: form.gender || null,
          blood_group: form.blood_group || null,
          address: form.address || null,
          role: 'patient',
        };
        await registerPatient(payload);
      } else if (role === 'doctor') {
        const payload = {
          doctor_name: form.name.trim(),
          doctor_email: form.email.trim(),
          doctor_password: form.password,
          doctor_phone: form.phone || null,
          department: form.department || null,
          qualification: form.qualification || null,
          experience: form.experience ? Number(form.experience) : null,
          chamber_time: form.chamber_time || null,
        };
        await registerDoctor(payload);
      } else if (role === 'admin') {
        const payload = {
          admin_name: form.name.trim(),
          admin_email: form.email.trim(),
          admin_password: form.password,
          admin_phone: form.phone || null,
          role: 'admin',
        };
        await registerAdmin(payload);
      }

      setSuccess('Account created successfully. Redirecting to login…');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-card">
        <img src={logo} alt="Jobra Hospital Logo" className="auth-logo" />
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Jobra Hospital Registration</p>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={submit} className="auth-form">
          <div className="auth-field">
            <label>Register As</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="auth-field">
            <label>
              {role === 'patient' && 'Patient Name'}
              {role === 'doctor' && 'Doctor Name'}
              {role === 'admin' && 'Admin Name'}
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>
              {role === 'patient' && 'Patient Email'}
              {role === 'doctor' && 'Doctor Email'}
              {role === 'admin' && 'Admin Email'}
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>
              {role === 'patient' && 'Patient Phone (optional)'}
              {role === 'doctor' && 'Doctor Phone (optional)'}
              {role === 'admin' && 'Admin Phone (optional)'}
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {role === 'patient' && (
            <>
              <div className="auth-field">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Patient age"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="auth-field">
                <label>Blood Group</label>
                <input
                  type="text"
                  name="blood_group"
                  placeholder="e.g. A+, O-, B+"
                  value={form.blood_group}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Address</label>
                <textarea
                  name="address"
                  placeholder="Full address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {role === 'doctor' && (
            <>
              <div className="auth-field">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  placeholder="e.g. Cardiology"
                  value={form.department}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="e.g. MBBS, MD"
                  value={form.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of experience"
                  value={form.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="auth-field">
                <label>Chamber Time</label>
                <input
                  type="text"
                  name="chamber_time"
                  placeholder="e.g. 5 PM - 8 PM"
                  value={form.chamber_time}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="auth-field">
            <label>
              {role === 'patient' && 'Patient Password'}
              {role === 'doctor' && 'Doctor Password'}
              {role === 'admin' && 'Admin Password'}
            </label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating…' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
