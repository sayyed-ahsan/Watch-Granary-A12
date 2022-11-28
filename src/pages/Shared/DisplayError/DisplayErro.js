import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Header from '../Header/Header';

const DisplayErro = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <Header></Header>
            <div className='text-center'>
                <p className='text-red-500 text-3xl'>Something went wrong!!!</p>
                <p className='text-red-400 text-3xl'>{error.statusText || error.message}</p>
                <h4 className="text-3xl"> Please <button className='btn btn-error btn-outline' onClick={handleLogOut}>Sign out</button> and log back in</h4>
            </div>
        </div>
    );
};

export default DisplayErro;