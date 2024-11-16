import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedClass, setSelectedClass] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/students")
            .then((response) => {
                setStudents(response.data);
                console.log(response.data);
            })
    }, []);

    const handleStudentClick = (studentId) => {
        setSelectedStudentId(selectedStudentId === studentId ? null : studentId);
    };

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const filteredStudents = selectedClass
        ? students.filter((student) => student.class === selectedClass)
        : students;

    const classOptions = [...new Set(students.map((student) => student.class))];

    return (
        <div className=" min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Studenten</h1>

            <div className="mb-4">
                <label htmlFor="classFilter" className="mr-2">Selecteer Klas:</label>
                <select
                    id="classFilter"
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="">Alle Klassen</option>
                    {classOptions.map((className, index) => (
                        <option key={index} value={className}>
                            {className}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredStudents.map((student) => {
                    const isSelected = selectedStudentId === student.id;
                    const radarChartData = {
                        labels: student.subjects.map((subject) => subject.name),
                        datasets: [
                            {
                                label: "Grades",
                                data: student.subjects.map((subject) => subject.grade),
                                backgroundColor: "rgba(54, 162, 235, 0.2)",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                            },
                        ],
                    };

                    return (
                        <div
                            key={student.id}
                            onClick={() => handleStudentClick(student.id)}
                            className={`cursor-pointer bg-white p-4 shadow-md rounded-lg transition-all duration-300 transform ${isSelected ? "z-10" : ""
                                }`}
                            style={{
                                position: "relative",
                                height: isSelected ? "auto" : "150px",
                                overflow: "hidden",
                            }}
                        >
                            <h2 className="text-xl font-semibold">{student.name}</h2>
                            <p>Leeftijd: {student.age}</p>
                            <p>Klas: {student.class}</p>

                            {isSelected && (
                                <div className="mt-4 transition-all duration-500">
                                    <h3 className="text-xl font-semibold mb-2">Cijfers per Vak</h3>
                                    <div style={{ height: "300px" }}>
                                        <Radar
                                            data={radarChartData}
                                            options={{
                                                scales: {
                                                    r: {
                                                        beginAtZero: true,
                                                        min: 0,
                                                        max: 10,
                                                        ticks: { stepSize: 2 },
                                                    },
                                                },
                                                responsive: true,
                                                maintainAspectRatio: false,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentPage;
