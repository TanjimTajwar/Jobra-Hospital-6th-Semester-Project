import { useEffect, useState } from 'react';
import { myProfile, updateProfile } from '../../services/profileService';
import '../../styles/main.css';
import '../../styles/doctor.css';

const EditInfo = () => {
  const [formData, setFormData] = useState({
    doctor_name: '',
    doctor_email: '',
    doctor_phone: '',
    department: '',
    qualification: '',
    experience: '',
    chamber_time: ''
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
          doctor_name: profile.doctor_name || '',
          doctor_email: profile.doctor_email || '',
          doctor_phone: profile.doctor_phone || '',
          department: profile.department || '',
          qualification: profile.qualification || '',
          experience: profile.experience || '',
          chamber_time: profile.chamber_time || ''
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
            <label htmlFor="doctor_name">Name</label>
            <input
              type="text"
              id="doctor_name"
              name="doctor_name"
              value={formData.doctor_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="doctor_email">Email</label>
            <input
              type="email"
              id="doctor_email"
              name="doctor_email"
              value={formData.doctor_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="doctor_phone">Phone</label>
            <input
              type="tel"
              id="doctor_phone"
              name="doctor_phone"
              value={formData.doctor_phone}
              onChange={handleChange}
            />
          </div>

          <div className="admin-field">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="admin-field">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </div>

          <div className="admin-field">
            <label htmlFor="experience">Experience (years)</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="chamber_time">Chamber Time</label>
            <input
              type="text"
              id="chamber_time"
              name="chamber_time"
              value={formData.chamber_time}
              onChange={handleChange}
              placeholder="e.g., 9:00 AM - 5:00 PM"
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
