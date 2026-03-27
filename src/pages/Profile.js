import { useEffect, useState } from 'react';
import { myProfile } from '../services/profileService';
import '../styles/auth.css';

const formatKey = (k) => {
  if (k.includes('_password') || k === 'password') return null;
  return k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await myProfile();
        setProfile(res.data);
      } catch {
        setError('Failed to load profile information');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="profile-page">
        {loading && (
          <div className="profile-card">
            <p className="profile-loading">Loading profile…</p>
          </div>
        )}

        {error && (
          <div className="profile-card">
            <div className="auth-error">{error}</div>
          </div>
        )}

        {!loading && !error && profile && (
          <div className="profile-card">
            <h2 className="profile-title">My Profile</h2>

            <dl className="profile-dl">
              {Object.entries(profile)
                .filter(([k]) => formatKey(k) !== null)
                .map(([k, v]) => (
                  <div className="profile-row" key={k}>
                    <dt>{formatKey(k)}</dt>
                    <dd>{String(v ?? '—')}</dd>
                  </div>
                ))}
            </dl>
          </div>
        )}
      </div>
  );
};

export default Profile;
