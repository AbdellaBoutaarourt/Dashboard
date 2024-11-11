import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsPage = () => {
    const [subjectsStats, setSubjectsStats] = useState([]);

    useEffect(() => {
        // Laad de data uit het JSON-bestand
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => {
                const subjectGrades = {};

                data.students.forEach((student) => {
                    student.subjects.forEach((subject) => {
                        if (!subjectGrades[subject.name]) {
                            subjectGrades[subject.name] = { total: 0, count: 0 };
                        }
                        subjectGrades[subject.name].total += subject.grade;
                        subjectGrades[subject.name].count += 1;
                    });
                });

                const stats = Object.keys(subjectGrades).map((subjectName) => {
                    const { total, count } = subjectGrades[subjectName];
                    return {
                        name: subjectName,
                        average: total / count,
                    };
                });

                setSubjectsStats(stats);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const chartData = {
        labels: subjectsStats.map((subject) => subject.name),
        datasets: [
            {
                label: "Gemiddeld Cijfer",
                data: subjectsStats.map((subject) => subject.average),
                backgroundColor: "green",
            },
        ],
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Statistieken</h1>

                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Gemiddeld Cijfer per Vak</h2>
                    {subjectsStats.length === 0 ? (
                        <p>Geen statistieken beschikbaar...</p>
                    ) : (
                        <Bar data={chartData} options={{ responsive: true }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
