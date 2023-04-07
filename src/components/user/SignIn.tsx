import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// import { loginSuccess } from '../../features/userAuth/userSlice';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../../features/userAuth/userSlice';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //         const response = await fetch('http://localhost:3001/auth/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email, password }),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Login successful:', data);
    //             localStorage.setItem('token', data.token); // Store the token in local storage
    //             dispatch(login());
    //             dispatch(setUser(data.user));
    //             navigate('/'); // redirect to dashboard page
    //         }
    //         else {
    //             const error = await response.json();
    //             console.log('Login failed:', error);
    //         }
    //     } catch (error) {
    //         console.error('Error during login:', error);
    //     }
    // };

    const fetchUserData = async (token: string) => {
        try {
            const response = await fetch('http://localhost:3001/users/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('User data:', userData);
                return userData;
            } else {
                const error = await response.json();
                console.log('Fetching user data failed:', error);
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token); // Store the token in local storage
                dispatch(login());

                const userData = await fetchUserData(data.token);
                if (userData) {
                    dispatch(setUser(userData));
                }

                navigate('/'); // redirect to dashboard page
            } else {
                const error = await response.json();
                console.log('Login failed:', error);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Kirjaudu sisään</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Sähköposti</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2">Salasana</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full" type="submit">Kirjaudu sisään</button>
            </form>
        </div>
    );
};

export default SignIn;