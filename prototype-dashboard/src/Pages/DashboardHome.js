import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardHome = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/students")
            .then((response) => {
                setStudents(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch((err) => {
                setError("Error fetching data");
                setLoading(false);
            });
    }, []);

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleMissingGrade = (grade) => {
        return grade === null ? (
            <span className="text-red-500">Geen cijfer</span>
        ) : (
            grade
        );
    };

    const handleOutlier = (grade) => {
        return grade === 10.0 ? (
            <span className="text-yellow-500 font-bold">{grade}</span>
        ) : (
            grade
        );
    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6">Dashboard Studenten</h1>

            <input
                type="text"
                placeholder="Zoek student..."
                className="p-2 border border-gray-300 rounded mb-4 w-full max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {filteredStudents.length === 0 && !loading ? (
                <p>Geen gegevens beschikbaar...</p>
            ) : (
                filteredStudents.map((student) => (
                    <div key={student.id} className="mb-8 p-4 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-medium">{student.name}</h2>
                        <p className="text-gray-600">Leeftijd: {student.age}</p>
                        <p className="text-gray-600">Klas: {student.class}</p>

                        <table className="min-w-full mt-4 table-auto">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left border-b">Vak</th>
                                    <th className="px-4 py-2 text-left border-b">Cijfer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(student.subjects || []).map((subject) => (
                                    <tr key={subject.id} className="odd:bg-gray-50">
                                        <td className="px-4 py-2 border-b">{subject.name}</td>
                                        <td className="px-4 py-2 border-b">
                                            {handleOutlier(handleMissingGrade(subject.grade))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            )}
        </div>
    );
};

export default DashboardHome;
