import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const StatisticsPage = () => {
    const [subjectsStats, setSubjectsStats] = useState([]);
    const [studentCounts, setStudentCounts] = useState([]);

    useEffect(() => {
        fetch("../data.json")
            .then((response) => response.json())
            .then((data) => {
                const subjectGrades = {};
                const subjectStudentCounts = {};

                //  aantal studenten per vak
                data.students.forEach((student) => {
                    student.subjects.forEach((subject) => {
                        if (!subjectGrades[subject.name]) {
                            subjectGrades[subject.name] = { total: 0, count: 0 };
                            subjectStudentCounts[subject.name] = 0;
                        }
                        subjectGrades[subject.name].total += subject.grade;
                        subjectGrades[subject.name].count += 1;
                        subjectStudentCounts[subject.name] += 1;
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
                setStudentCounts(Object.entries(subjectStudentCounts).map(([name, count]) => ({ name, count })));
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    //gemiddeld cijfer per vak
    const barChartData = {
        labels: subjectsStats.map((subject) => subject.name),
        datasets: [
            {
                label: "Gemiddeld Cijfer",
                data: subjectsStats.map((subject) => subject.average),
                backgroundColor: "green",
            },
        ],
    };

    // (gemiddeld cijfer per vak
    const lineChartData = {
        labels: subjectsStats.map((subject) => subject.name),
        datasets: [
            {
                label: "Gemiddeld Cijfer",
                data: subjectsStats.map((subject) => subject.average),
                borderColor: "blue",
                fill: false,
            },
        ],
    };

    //aantal studenten per vak
    const pieChartData = {
        labels: studentCounts.map((subject) => subject.name),
        datasets: [
            {
                label: "Aantal Studenten",
                data: studentCounts.map((subject) => subject.count),
                backgroundColor: ["blue", "red", "green", "yellow", "orange", "purple", "white", "black"],
            },
        ],
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-4">Statistieken</h1>

            <div className="flex flex-wrap gap-6">
                <div className="bg-white p-4 shadow-md rounded-lg flex-1 min-w-[350px]">
                    <h2 className="text-xl font-semibold mb-4">Gemiddeld Cijfer per Vak</h2>

                    <Bar data={barChartData} options={{ responsive: true }} />
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg flex-1 min-w-[550px]">
                    <h2 className="text-xl font-semibold mb-4">Gemiddeld Cijfer per Vak</h2>
                    <Line data={lineChartData} options={{ responsive: true }} />
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg flex-1 min-w-[350px] max-w-[450px]">
                    <h2 className="text-xl font-semibold mb-4">Aantal Studenten per vak</h2>

                    <Pie data={pieChartData} options={{ responsive: true }} />
                </div>

            </div>
        </div>
    );

};

export default StatisticsPage;
