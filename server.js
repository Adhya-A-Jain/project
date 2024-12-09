const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Replace with your MySQL user
    password: '1234',           // Replace with your MySQL password
    database: 'food_delivery_app'  // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Could not connect to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// POST route for login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
        return res.status(400).send('Please provide both email and password.');
    }

    // Query to find user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database error.');
        }

        if (result.length === 0) {
            return res.status(400).send('Invalid email or password.');
        }

        const user = result[0];

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Error comparing passwords.');
            }

            if (!isMatch) {
                return res.status(400).send('Invalid email or password.');
            }

            // Successful login
            res.send('Login successful');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
