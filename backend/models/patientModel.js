const db = require('../config/db');

exports.getAllPatients = (callback) => {

    const sql = `
        SELECT patient_id, patient_name, age, gender, address
        FROM jh_patients
    `;

    db.query(sql, callback);
};
