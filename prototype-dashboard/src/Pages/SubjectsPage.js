import React, { useState, useEffect } from 'react';
import axios from "axios";

const SubjectsPage = () => {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [studentsForSubject, setStudentsForSubject] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState({ show: false, studentId: null, studentName: "" });
    const [deleteMessage, setDeleteMessage] = useState("");

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

    const confirmStudentDeletion = (studentId, studentName) => {
        setConfirmDelete({ show: true, studentId, studentName });
    };

    const handleDeleteStudent = async () => {
        try {
            await axios.delete(`http://localhost:5000/students/${confirmDelete.studentId}/subjects/${selectedSubject}`);
            setStudentsForSubject(prev => prev.filter(student => student.id !== confirmDelete.studentId));
            setDeleteMessage(`${confirmDelete.studentName} is succesvol verwijderd.`);
            setConfirmDelete({ show: false, studentId: null, studentName: "" });

            setTimeout(() => setDeleteMessage(""), 3000);
        } catch (error) {
            console.error("Error deleting student:", error);
            setDeleteMessage("Er is een fout opgetreden bij het verwijderen van de student.");
        }
    };
    const cancelDelete = () => {
        setConfirmDelete({ show: false, studentId: null, studentName: "" });
    };


    return (
        <div className=" min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Vakken Overzicht</h1>
                {deleteMessage && (
                    <div className="p-4 mb-4 bg-green-100 text-green-800 rounded border border-green-300">
                        {deleteMessage}
                    </div>
                )}
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
                                        <button
                                            className="mt-2 text-red-600 hover:underline"
                                            onClick={() => confirmStudentDeletion(student.id, student.name)}
                                        >
                                            Verwijder Uit {selectedSubject}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {confirmDelete.show && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-md text-center">
                            <p className="mb-4">Weet je zeker dat je {confirmDelete.studentName} wilt verwijderen uit {selectedSubject}?</p>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded mr-2"
                                onClick={handleDeleteStudent}
                            >
                                Verwijder
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={cancelDelete}
                            >
                                Annuleer
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default SubjectsPage;
