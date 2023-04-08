import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../../features/userAuth/userSlice';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


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
                // console.log('User data:', userData);
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
        <div className=' min-h-screen'>


            <div className='flex justify-center mt-40'>

                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Kirjaudu sisään</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sähköposti</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salasana</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="flex items-start">
                            {/* ...rest of the template code */}
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-10 ">Kirjaudu sisään</button>
                        <Link
                            to="/signup">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered? <p className="text-blue-700 hover:underline dark:text-blue-500">Luo Käyttäjä</p>
                            </div>
                        </Link>
                    </form>
                </div>
            </div >
        </div >
    );
};

export default SignIn;
