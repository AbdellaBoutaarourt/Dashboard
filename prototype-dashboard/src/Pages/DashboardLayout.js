import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };
    return (
        <div className="flex bg-gray-100">

            <aside className="w-64 text-white flex flex-col" style={{
                background: "linear-gradient(90deg, rgba(0 61 57) 0%, rgba(0,39,255,1) 100%)"
            }}>
                <div className="p-4 text-2xl font-bold">School Dashboard</div>
                <nav className="mt-4 flex-grow">
                    <ul>
                        <li>
                            <Link to="/" className="block p-4 hover:bg-blue-600">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/students" className="block p-4 hover:bg-blue-600">Studenten</Link>
                        </li>
                        <li>
                            <Link to="/vakken" className="block p-4 hover:bg-blue-600">Vakken</Link>
                        </li>
                        <li>
                            <Link to="/statistieken" className="block p-4 hover:bg-blue-600">Statistieken</Link>
                        </li>
                        <li>
                            <Link to="/login" className="block p-4 hover:bg-blue-600">Inloggen</Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className=" shadow-md p-4 flex justify-between items-center border-blue-950 border-b-2" style={{
                    background: "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(45, 76, 175, 1) 100%)"
                }}>
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <button className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleLogout}
                    >Uitloggen</button>
                </header>

                <main className="flex-grow p-6" style={{
                    background: "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(45, 76, 175, 1) 100%)"
                }}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
