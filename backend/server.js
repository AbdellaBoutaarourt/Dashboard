require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 5000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.use(bodyParser.json());
app.use(cors());


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json({ message: 'Inloggen succesvol!', user: data });
    } catch (error) {
        res.status(500).json({ error: 'Error when login' });
    }
});


app.get('/students', async (req, res) => {
    try {
        const { data: students, error: studentsError } = await supabase
            .from('students')
            .select('*');

        if (studentsError) {
            return res.status(400).json({ error: studentsError.message });
        }

        const { data: studentSubjects, error: studentSubjectsError } = await supabase
            .from('student_subjects')
            .select('*');

        if (studentSubjectsError) {
            return res.status(400).json({ error: studentSubjectsError.message });
        }

        const { data: subjects, error: subjectsError } = await supabase
            .from('subjects')
            .select('*');

        if (subjectsError) {
            return res.status(400).json({ error: subjectsError.message });
        }

        const combinedData = students.map((student) => ({
            ...student,
            subjects: studentSubjects
                .filter((ss) => ss.student_id === student.id)
                .map((ss) => ({
                    ...subjects.find((subject) => subject.id === ss.subject_id),
                    grade: ss.grade,
                })),
        }));

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ error: 'eroor data' });
    }
});

app.post('/add-point', async (req, res) => {
    const { student_id, subject_id, point } = req.body;

    if (!student_id || !subject_id || point === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await supabase
            .from('student_subjects')
            .upsert([
                {
                    student_id: student_id,
                    subject_id: subject_id,
                    grade: point,
                },
            ]);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ message: 'Point added successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the point.' });
    }
});


app.delete('/students/:id/subjects/:subject', async (req, res) => {
    const { id, subject } = req.params;

    try {
        const { data: subjectData, error: subjectError } = await supabase
            .from('subjects')
            .select('id')
            .eq('name', subject)
            .single();

        if (subjectError || !subjectData) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        const subjectId = subjectData.id;

        // Delete record from student_subjects
        const { data, error } = await supabase
            .from('student_subjects')
            .delete()
            .match({ student_id: id, subject_id: subjectId });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json({ message: 'Student successfully removed from subject' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during deletion' });
    }
});



app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
