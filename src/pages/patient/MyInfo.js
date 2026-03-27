import { useEffect, useState } from 'react';
import { myProfile } from '../../services/profileService';
import '../../styles/main.css';
import '../../styles/patient.css';

const MyInfo = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await myProfile();
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const formatKey = (key) => {
    if (key.includes('password')) return null;
    
    return key
      .replace(/_/g, ' ')
      .replace(/admin|doctor|patient/gi, '')
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase());
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

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2 className="admin-title">My Info</h2>
        
        {profile && (
          <dl className="info-list">
            {Object.entries(profile)
              .filter(([key]) => formatKey(key) !== null)
              .map(([key, value]) => (
                <div key={key} className="info-item">
                  <dt className="info-label">{formatKey(key)}:</dt>
                  <dd className="info-value">{String(value ?? '—')}</dd>
                </div>
              ))}
          </dl>
        )}
      </div>
    </div>
  );
};

export default MyInfo;
