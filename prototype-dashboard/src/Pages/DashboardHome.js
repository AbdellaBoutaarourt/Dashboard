import React from 'react';

const DashboardHome = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard Overzicht</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Card for each subject overview */}
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-lg font-semibold">Wiskunde</h2>
                    <p>Gemiddeld cijfer: 7.8</p>
                    <p>Aantal studenten: 25</p>
                    <button className="mt-4 text-blue-600 hover:underline">Bekijk details</button>
                </div>
                {/* Repeat for other subjects */}
            </div>
        </div>
    );
};

export default DashboardHome;
