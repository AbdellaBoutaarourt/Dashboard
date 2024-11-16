import React, { useState, useEffect } from "react";
import { Bar, Bubble, PolarArea, Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    BubbleController,
    PointElement,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, BubbleController, PointElement, ArcElement, RadialLinearScale, Tooltip, Legend);

const StatisticsPage = () => {
    const [subjectsStats, setSubjectsStats] = useState([]);
    const [studentCounts, setStudentCounts] = useState([]);
    const [classCounts, setClassCounts] = useState([]);
    const [ageCounts, setAgeCounts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/students")
            .then((response) => {
                let students = response.data
                const subjectGrades = {};
                const subjectStudentCounts = {};
                const classStudentCounts = {};
                const ageStudentCounts = {};

                //  aantal studenten per vak
                students.forEach((student) => {
                    student.subjects.forEach((subject) => {
                        if (!subjectGrades[subject.name]) {
                            subjectGrades[subject.name] = { total: 0, count: 0 };
                            subjectStudentCounts[subject.name] = 0;
                        }
                        subjectGrades[subject.name].total += subject.grade;
                        subjectGrades[subject.name].count += 1;
                        subjectStudentCounts[subject.name] += 1;
                    });

                    // Telling van studenten per klas
                    if (!classStudentCounts[student.class]) {
                        classStudentCounts[student.class] = 0;
                    }
                    classStudentCounts[student.class] += 1;

                    // Tel studenten per leeftijd
                    const age = student.age;
                    if (!ageStudentCounts[age]) {
                        ageStudentCounts[age] = 0;
                    }
                    ageStudentCounts[age] += 1;


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
                setClassCounts(Object.entries(classStudentCounts).map(([name, count]) => ({ name, count })));
                setAgeCounts(Object.entries(ageStudentCounts).map(([age, count]) => ({ age, count })));

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
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],

            },
        ],
    };

    const bubbleChartData = {
        labels: ageCounts.map((item) => item.age),
        datasets: [
            {
                label: "Aantal Studenten per Leeftijd",
                data: ageCounts.map((item) => ({
                    x: item.age,
                    y: item.count,
                    r: Math.sqrt(item.count) * 5,
                })),
                backgroundColor: "blue",
            },
        ],
    };


    //aantal studenten per vak
    const polarChartData = {
        labels: studentCounts.map((subject) => subject.name),
        datasets: [
            {
                label: "Aantal Studenten",
                data: studentCounts.map((subject) => subject.count),
                backgroundColor: ["blue", "red", "green", "yellow", "orange", "purple", "white", "black"],
            },
        ],
    };


    // Aantal studenten per klas
    const DoughnutChartData = {
        labels: classCounts.map((classItem) => classItem.name),
        datasets: [
            {
                label: "Aantal Studenten per Klas",
                data: classCounts.map((classItem) => classItem.count),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'black',
                    'green'
                ],
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
                    <h2 className="text-xl font-semibold mb-4">Aantal Studenten per Leeftijd</h2>
                    <Bubble data={bubbleChartData} options={{ responsive: true }} />
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg flex-1 min-w-[350px] max-w-[450px]">
                    <h2 className="text-xl font-semibold mb-4">Aantal Studenten per vak</h2>

                    <PolarArea data={polarChartData} options={{ responsive: true }} />
                </div>
                <div className="bg-white p-4 shadow-md rounded-lg flex-1 min-w-[350px] max-w-[450px]">
                    <h2 className="text-xl font-semibold mb-4">Aantal Studenten per klas</h2>

                    <Doughnut data={DoughnutChartData} options={{ responsive: true }} />
                </div>
            </div>
        </div>
    );

};

export default StatisticsPage;
