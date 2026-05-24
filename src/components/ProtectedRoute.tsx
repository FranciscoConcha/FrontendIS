import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken, RoleProtectedRouteProps } from '../interfaces/auth.type';

export default function RoleProtectedRoute({ 
    children, 
    allowedRoles 
}: RoleProtectedRouteProps) {
    const token = Cookies.get('token');
    
    if (!token || token === 'undefined') {
        return <Navigate to="/login" />;
    }
    try {
        const decoded: DecodedToken = jwtDecode(token);
        const userRole = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        
        if (!userRole || !allowedRoles.includes(userRole)) {
            // eslint-disable-next-line react-hooks/error-boundaries
            return <Navigate to="/unauthorized" />;
        }
        
        // eslint-disable-next-line react-hooks/error-boundaries
        return <>{children}</>;
    } catch {
        return <Navigate to="/login" />;
    }
}
