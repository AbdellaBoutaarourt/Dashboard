import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
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

    useEffect(() => {
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => {
                setStudents(data.students);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleStudentClick = (studentId) => {
        setSelectedStudentId(selectedStudentId === studentId ? null : studentId);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Studenten</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {students.map((student) => {
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
