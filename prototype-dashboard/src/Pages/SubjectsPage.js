import React, { useState, useEffect } from 'react';
import data from '../data.json'; // Je data-bestand importeren

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const uniqueSubjects = new Set();
        data.students.forEach(student => {
            student.subjects.forEach(subject => {
                uniqueSubjects.add(subject.name);
            });
        });
        setSubjects(Array.from(uniqueSubjects));
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Vakken Overzicht</h1>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {subjects.length === 0 ? (
                        <p className="text-gray-600">Geen vakken beschikbaar...</p>
                    ) : (
                        subjects.map((subject) => (
                            <div key={subject} className="bg-white shadow-md rounded p-4">
                                <h2 className="text-lg font-semibold">{subject}</h2>
                                <button className="mt-2 text-blue-600 hover:underline">
                                    Bekijk Klassen
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubjectsPage;
