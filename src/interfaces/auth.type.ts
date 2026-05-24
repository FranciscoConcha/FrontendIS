export interface DecodedToken {
    //
    role?: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
    [key: string]: unknown;
}

export interface RoleProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}
