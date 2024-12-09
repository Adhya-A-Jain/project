const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Replace with your MySQL user
  password: '1234',       // Replace with your MySQL password
  database: 'food_delivery_app'  // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // The plain password to be hashed
  const plainPassword = 'abc';  // Replace this with the actual password you want to hash

  // Hash the password using bcrypt
  bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }
    console.log('Hashed password:', hashedPassword);

    // Insert the hashed password into the users table
    const email = 'abc@gmail.com';  // Replace with the desired email

    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
      } else {
        console.log('User inserted into database:', result);
      }

      // Close the database connection
      db.end();
    });
  });
});
