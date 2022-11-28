import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useCurrectUser from '../../hooks/useCurrentUser';
import Loder from '../../pages/Shared/Loder/Loder';

const BuyerRout = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [currentUser, iscurrentUserLoading] = useCurrectUser(user?.email);
    const location = useLocation();

    console.log(user, currentUser)

    if (loading || iscurrentUserLoading) {
        return <Loder></Loder>
    }

    if (user || currentUser === 'buyer') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default BuyerRout;