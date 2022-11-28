import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useCurrectUser from '../../hooks/useCurrentUser';
import Loder from '../../pages/Shared/Loder/Loder';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [currentUser, iscurrentUserLoading] = useCurrectUser(user?.email);
    const location = useLocation();

    console.log(currentUser)

    if (loading || iscurrentUserLoading) {
        return <Loder />
    }

    if (currentUser === 'admin') {
        return children;
    }

    // return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;