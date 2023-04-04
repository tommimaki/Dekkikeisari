import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { loadUser } from '../../features/userAuth/userSlice';
import { RootState, AppDispatch } from '../../store';

const Welcome = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.user);

    // useEffect(() => {
    //     dispatch(loadUser());
    // }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null; // don't render anything if user is not authenticated
    }

    return (
        <div>
            <h1>Welcome {user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
        </div>
    );
};

export default Welcome;
