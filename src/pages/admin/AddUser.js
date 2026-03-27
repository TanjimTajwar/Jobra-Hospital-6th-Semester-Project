import { useState } from 'react';
import API from '../../services/api';
import '../../styles/main.css';
import '../../styles/admin.css';

export default function AddUser() {
  const [role, setRole] = useState('patient');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    department: '',
  });

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      alert('Name, email and password are required');
      return;
    }

    try {
      const url =
        role === 'patient'
          ? '/auth/register/patient'
          : '/auth/register/doctor';

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      const res = await API.post(url, payload);
      alert(res.data.message || 'User created successfully');

      setForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        department: '',
      });
    } catch {
      alert('Failed to create user');
    }
  };

  return (
    <div className="admin-page">
        <div className="admin-card">
          <h2 className="admin-title">Create New User</h2>

          <div className="admin-form">
            <div className="admin-field">
              <label>User Role</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div className="admin-field">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                placeholder="Enter full name"
                onChange={handle}
              />
            </div>

            <div className="admin-field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                placeholder="Enter email"
                onChange={handle}
              />
            </div>

            <div className="admin-field">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                placeholder="Temporary password"
                onChange={handle}
              />
            </div>

            <div className="admin-field">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                placeholder="Phone number"
                onChange={handle}
              />
            </div>

            {role === 'patient' && (
              <div className="admin-field">
                <label>Address</label>
                <input
                  name="address"
                  value={form.address}
                  placeholder="Patient address"
                  onChange={handle}
                />
              </div>
            )}

            {role === 'doctor' && (
              <div className="admin-field">
                <label>Department</label>
                <input
                  name="department"
                  value={form.department}
                  placeholder="Doctor department"
                  onChange={handle}
                />
              </div>
            )}

            <button className="admin-btn btn btn-primary" onClick={submit}>
              Create Account
            </button>
          </div>
        </div>
      </div>
  );
}
