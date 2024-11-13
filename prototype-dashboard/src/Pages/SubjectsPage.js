import React, { useState, useEffect } from 'react';
import data from '../data.json'; // Je data-bestand importeren

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);  // Klassen state toevoegen
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [studentsForSubject, setStudentsForSubject] = useState([]);

    useEffect(() => {
        const uniqueSubjects = new Set();
        const uniqueClasses = new Set();

        data.students.forEach(student => {
            student.subjects.forEach(subject => {
                uniqueSubjects.add(subject.name);
            });
            uniqueClasses.add(student.class);  // Voeg ook klassen toe aan de set
        });

        setSubjects(Array.from(uniqueSubjects));
        setClasses(Array.from(uniqueClasses));  // Zet de klassen in de state
    }, []);

    const handleSubjectClick = (subjectName) => {
        setSelectedSubject(subjectName);

        // Filter studenten die het geselecteerde vak volgen
        const studentsInSubject = data.students.filter(student =>
            student.subjects.some(subject => subject.name === subjectName)
        );

        // Als er ook een klas is geselecteerd, filteren we op de klas
        const filteredStudents = selectedClass
            ? studentsInSubject.filter(student => student.class === selectedClass)
            : studentsInSubject;

        setStudentsForSubject(filteredStudents);
    };

    const handleClassChange = (event) => {
        const selectedClass = event.target.value;
        setSelectedClass(selectedClass);

        // Als er een vak is geselecteerd, filteren we opnieuw op vak en klas
        if (selectedSubject) {
            const studentsInSubject = data.students.filter(student =>
                student.subjects.some(subject => subject.name === selectedSubject)
            );

            const filteredStudents = selectedClass
                ? studentsInSubject.filter(student => student.class === selectedClass)
                : studentsInSubject;

            setStudentsForSubject(filteredStudents);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Vakken Overzicht</h1>

                {/* Subject selectie */}
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {subjects.length === 0 ? (
                        <p className="text-gray-600">Geen vakken beschikbaar...</p>
                    ) : (
                        subjects.map((subject) => (
                            <div key={subject} className="bg-white shadow-md rounded p-4">
                                <h2 className="text-lg font-semibold">{subject}</h2>
                                <button
                                    className="mt-2 text-blue-600 hover:underline"
                                    onClick={() => handleSubjectClick(subject)}
                                >
                                    Bekijk Klassen
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Dropdown voor klas selectie */}
                {selectedSubject && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Selecteer Klas</h2>
                        <select
                            className="p-2 border rounded"
                            onChange={handleClassChange}
                            value={selectedClass || ""}
                        >
                            <option value="">Alle klassen</option>
                            {classes.map((className) => (  // Gebruik 'classes' state hier
                                <option key={className} value={className}>
                                    {className}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Toon studenten voor geselecteerd vak en klas */}
                {selectedSubject && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Studenten in {selectedSubject}</h2>
                        {studentsForSubject.length === 0 ? (
                            <p className="text-gray-600">Geen studenten voor dit vak in deze klas.</p>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {studentsForSubject.map((student) => (
                                    <div key={student.id} className="bg-white shadow-md rounded p-4">
                                        <h3 className="text-lg font-semibold">{student.name}</h3>
                                        <p>Klas: {student.class}</p>
                                        <p>Leeftijd: {student.age}</p>
                                        {/* Je kunt hier meer studenten details toevoegen */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectsPage;
