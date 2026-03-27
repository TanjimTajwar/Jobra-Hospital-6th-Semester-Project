import { useEffect, useState } from 'react';
import { myProfile, updateProfile } from '../../services/profileService';
import '../../styles/main.css';
import '../../styles/admin.css';

const EditInfo = () => {
  const [formData, setFormData] = useState({
    admin_name: '',
    admin_email: '',
    admin_phone: ''
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
          admin_name: profile.admin_name || '',
          admin_email: profile.admin_email || '',
          admin_phone: profile.admin_phone || ''
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
    // Clear messages when user starts typing
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
            <label htmlFor="admin_name">Name</label>
            <input
              type="text"
              id="admin_name"
              name="admin_name"
              value={formData.admin_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="admin_email">Email</label>
            <input
              type="email"
              id="admin_email"
              name="admin_email"
              value={formData.admin_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="admin_phone">Phone</label>
            <input
              type="tel"
              id="admin_phone"
              name="admin_phone"
              value={formData.admin_phone}
              onChange={handleChange}
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
