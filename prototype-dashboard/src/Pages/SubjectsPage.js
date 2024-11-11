import React from 'react';

const SubjectsPage = () => {
    const subjects = ["Wiskunde", "Nederlands", "Biologie"];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Vakken Overzicht</h1>
            <div className="grid gap-4">
                {subjects.map((subject) => (
                    <div key={subject} className="bg-white shadow-md rounded p-4">
                        <h2 className="text-lg font-semibold">{subject}</h2>
                        <button className="mt-2 text-blue-600 hover:underline">Bekijk Klassen</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubjectsPage;
