require('dotenv').config();        // 👈 IMPORTANT: env load

const mysql = require('mysql2');

// Create connection using ENV variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connection check
db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        console.log("👉 Check .env file values and MySQL service");
    } else {
        console.log("✅ Connected to Jobra Hospital Database");
    }
});

module.exports = db;
