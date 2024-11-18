import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://dashboard-ne19.onrender.com/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const data = response.data.user;
                console.log(data)
                const authToken = data.session.access_token;

                localStorage.setItem('authToken', authToken);
                navigate('/');
            }
        } catch (error) {
            setError('Inloggen mislukt. Controleer je gegevens en probeer het opnieuw.');
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-gray-200"
            style={{
                background: "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(45, 76, 175, 1) 100%)"
            }}
        >
            <div className="bg-white p-6 rounded-md shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Inloggen</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="je@example.com"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Wachtwoord</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="*****"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Inloggen
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
