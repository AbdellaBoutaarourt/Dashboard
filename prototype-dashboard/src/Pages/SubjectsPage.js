import React, { useState, useEffect } from 'react';
import axios from "axios";

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [studentsForSubject, setStudentsForSubject] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/students")
            .then((response) => {
                const studentsData = response.data;
                setStudents(studentsData);

                const uniqueSubjects = new Set();
                const uniqueClasses = new Set();
                studentsData.forEach(student => {
                    student.subjects.forEach(subject => {
                        uniqueSubjects.add(subject.name);
                    });
                    uniqueClasses.add(student.class);
                });

                setSubjects(Array.from(uniqueSubjects));
                setClasses(Array.from(uniqueClasses));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubjectClick = (subjectName) => {
        setSelectedSubject(subjectName);

        const studentsInSubject = students.filter(student =>
            student.subjects.some(subject => subject.name === subjectName)
        );

        const filteredStudents = selectedClass
            ? studentsInSubject.filter(student => student.class === selectedClass)
            : studentsInSubject;

        setStudentsForSubject(filteredStudents);
    };

    const handleClassChange = (event) => {
        const selectedClass = event.target.value;
        setSelectedClass(selectedClass);

        if (selectedSubject) {
            const studentsInSubject = students.filter(student =>
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

                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {subjects.length === 0 ? (
                        <p className="text-gray-600">Loading...</p>
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

                {selectedSubject && (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold mb-2">Selecteer Klas</h2>
                        <select
                            className="p-2 border rounded"
                            onChange={handleClassChange}
                            value={selectedClass || ""}
                        >
                            <option value="">Alle klassen</option>
                            {classes.map((className) => (
                                <option key={className} value={className}>
                                    {className}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

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
