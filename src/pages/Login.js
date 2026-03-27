import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import logo from '../bg_images/Jobra_hospital_logo.png';
import loginDoctor from '../bg_images/login_doctor.png';
import '../styles/auth.css';
import '../styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(email, password);
      const data = res.data;

      if (!data?.token) {
        setError(data?.message || 'Login failed');
        return;
      }

      const user = { token: data.token, role: data.role, id: data.id };
      login(user);

      if (data.role === 'admin') navigate('/admin');
      else if (data.role === 'doctor') navigate('/doctor');
      else if (data.role === 'patient') navigate('/patient');
      else navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="login-container">
        <div className="login-image-section">
          <img src={loginDoctor} alt="Healthcare" className="login-image" />
        </div>

        <div className="login-form-section">
          <div className="login-form-inner">
            <div className="login-logo-wrap">
              <div className="login-logo-box">
                <img src={logo} alt="Jobra Hospital Logo" className="login-logo" />
              </div>
              <h1 className="login-brand">Jobra Hospital</h1>
            </div>

            <h2 className="login-heading">Sign In</h2>
            <p className="login-subtitle">
              welcome to Jobra Hospital. Now enter your credentials for login successfully.
            </p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={submit} className="auth-form login-form">
              <div className="auth-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="auth-btn login-btn" disabled={loading}>
                {loading ? 'Logging in…' : 'Sign In'}
              </button>
            </form>

            <p className="login-footer">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
