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
        res.status(500).json({ error: 'Er is een fout opgetreden bij inloggen.' });
    }
});


app.get('/students', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('students')
            .select('*');

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Er is een fout opgetreden bij het ophalen van studenten.' });
    }
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
