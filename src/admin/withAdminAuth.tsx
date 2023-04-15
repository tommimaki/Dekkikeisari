import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const withAdminAuth = <P extends object>(Component: ComponentType<P>) => {
    const WrappedComponent: React.FC<P> = (props) => {
        // using redux state to get the user role set in signin
        const userRole = useSelector((state: RootState) => state.user.user.role);

        const isAdmin = userRole === 'admin';

        if (isAdmin) {
            return <Component {...props} />;
        }

        // Redirect non-admin users to landingpage
        return <Navigate to="/" />;
    };

    return WrappedComponent;
};

export default withAdminAuth;
