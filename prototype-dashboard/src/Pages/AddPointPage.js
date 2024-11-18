import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPointPage = () => {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [point, setPoint] = useState('');
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://dashboard-ne19.onrender.com/students');
                const data = response.data;

                setStudents(data.map((student) => ({
                    id: student.id,
                    name: student.name,
                })));

                const uniqueSubjects = [];
                const subjectSet = new Set();
                data.forEach((student) => {
                    student.subjects.forEach((subject) => {
                        if (!subjectSet.has(subject.id)) {
                            uniqueSubjects.push({
                                id: subject.id,
                                name: subject.name,
                            });
                            subjectSet.add(subject.id);
                        }
                    });
                });

                setSubjects(uniqueSubjects);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://dashboard-ne19.onrender.com/add-point', {
                student_id: studentId,
                subject_id: subjectId,
                point: point,
            });

            if (response.status === 201) {
                setAlert('Punt succesvol toegevoegd!');
                setStudentId('');
                setSubjectId('');
                setPoint('');

                setTimeout(() => setAlert(''), 3000);

            }
        } catch (error) {
            console.error(error);
            alert('Er is een fout.');
        }
    };

    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Punt Toevoegen</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-lg">Student</label>
                    <select
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">-- Selecteer een student --</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-lg">Vak</label>
                    <select
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">-- Selecteer een vak --</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-lg">Punt</label>
                    <input
                        type="number"
                        value={point}
                        onChange={(e) => setPoint(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Voer een punt in (0-10)"
                        min="0"
                        max="10"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Punt Toevoegen
                </button>
            </form>
            {alert && (
                <div
                    className="mb-4 mt-5 p-4 rounded bg-green-100 text-green-800 border-green-300 border"
                >
                    {alert}
                </div>
            )}
        </div>
    );
};

export default AddPointPage;
