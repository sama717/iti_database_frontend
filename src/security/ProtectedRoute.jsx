import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRole }) {
    const userRole = localStorage.getItem("userRole"); 
    if (!userRole) {
        return <Navigate to="/" replace />;
    }

    if (userRole !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;