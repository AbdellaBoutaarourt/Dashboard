import React from 'react';

const StatisticsPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Statistieken</h1>
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-lg font-semibold">Gemiddelde cijfers per vak</h2>

                <p className="text-gray-600">Hier komen grafieken voor inzicht in trends</p>
            </div>
        </div>
    );
};

export default StatisticsPage;
