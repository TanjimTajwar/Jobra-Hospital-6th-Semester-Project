import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/sidebar.css';

const Sidebar = ({ isOpen, onClose, role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Define menu items based on role
  const getMenuItems = () => {
    const basePath = role === 'admin' ? '/admin' : role === 'doctor' ? '/doctor' : '/patient';
    
    return [
      {
        path: `${basePath}`,
        label: 'Dashboard',
        icon: '📊'
      },
      {
        path: `${basePath}/info`,
        label: 'My Info',
        icon: '👤'
      },
      {
        path: `${basePath}/edit`,
        label: 'Edit Info',
        icon: '✏️'
      }
    ];
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3 className="sidebar-title">Menu</h3>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
                            (item.path === `/${role}` && location.pathname === `/${role}`);
            
            return (
              <li key={item.path} className="sidebar-menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive: navIsActive }) => 
                    `sidebar-link ${navIsActive || isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
          
          <li className="sidebar-menu-item">
            <button 
              className="sidebar-link sidebar-logout"
              onClick={handleLogout}
            >
              <span className="sidebar-icon">🚪</span>
              <span className="sidebar-label">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
