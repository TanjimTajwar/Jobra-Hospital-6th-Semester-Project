import { Navigate } from 'react-router-dom';

export default function Protected({ children, role }) {
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (_) {}
    const token = user?.token;
    const userRole = user?.role;

    if (!token) {
        return <Navigate to="/" />;
    }
    if (role && role !== userRole) {
        return <Navigate to="/" />;
    }
    return children;
}
