import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/dashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarOpen && window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.querySelector('.sidebar-toggle');
        if (sidebar && !sidebar.contains(e.target) && !toggleBtn?.contains(e.target)) {
          setSidebarOpen(false);
        }
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [sidebarOpen]);

  // Don't show sidebar if user is not logged in
  if (!user || !user.role) {
    return children;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      {/* Old Navbar with Sidebar Toggle */}
      <div className="navbar-wrapper">
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className={`hamburger ${sidebarOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <Navbar />
      </div>

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        role={user.role}
      />

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
