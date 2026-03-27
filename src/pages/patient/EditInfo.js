import { useEffect, useState } from 'react';
import { myProfile, updateProfile } from '../../services/profileService';
import '../../styles/main.css';
import '../../styles/patient.css';

const EditInfo = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    age: '',
    gender: '',
    blood_group: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await myProfile();
        const profile = res.data;
        setFormData({
          patient_name: profile.patient_name || '',
          patient_email: profile.patient_email || '',
          patient_phone: profile.patient_phone || '',
          age: profile.age || '',
          gender: profile.gender || '',
          blood_group: profile.blood_group || '',
          address: profile.address || ''
        });
      } catch (err) {
        setError('Failed to load profile information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <p className="text-center">Loading profile information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2 className="admin-title">Edit Info</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-field">
            <label htmlFor="patient_name">Name</label>
            <input
              type="text"
              id="patient_name"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="patient_email">Email</label>
            <input
              type="email"
              id="patient_email"
              name="patient_email"
              value={formData.patient_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="patient_phone">Phone</label>
            <input
              type="tel"
              id="patient_phone"
              name="patient_phone"
              value={formData.patient_phone}
              onChange={handleChange}
            />
          </div>

          <div className="admin-field">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="150"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="admin-field">
            <label htmlFor="blood_group">Blood Group</label>
            <select
              id="blood_group"
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div className="admin-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditInfo;
