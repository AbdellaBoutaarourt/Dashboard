import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex bg-gray-100">

            <aside className="w-64 bg-blue-800 text-white flex flex-col">
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
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">Uitloggen</button>
                </header>

                <main className="flex-grow p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
