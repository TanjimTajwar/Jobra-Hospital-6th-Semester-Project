const db = require('../config/db');

// Find user by email based on role
// role: 'admin' | 'doctor' | 'patient'
exports.findUserByEmailAndRole = (email, role, callback) => {
    let table, emailField;

    if (role === 'doctor') {
        table = 'jh_doctors';
        emailField = 'doctor_email';
    } else if (role === 'patient') {
        table = 'jh_patients';
        emailField = 'patient_email';
    } else {
        table = 'jh_admins';
        emailField = 'admin_email';
    }

    const sql = `SELECT * FROM ${table} WHERE ${emailField} = ?`;
    db.query(sql, [email], callback);
};

exports.insertUser = (table, data, callback) => {
    const sql = `INSERT INTO ${table} SET ?`;
    db.query(sql, data, callback);
};