require('dotenv').config();

const mysql = require('mysql2');

// Railway provides MYSQL_URL / DATABASE_URL when MySQL is linked; local .env can use DB_*.
const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

const db = connectionUrl
    ? mysql.createConnection(connectionUrl)
    : mysql.createConnection({
          host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
          user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
          password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
          database: process.env.DB_NAME || process.env.MYSQLDATABASE,
          port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
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
