const db = require('../config/db');

exports.getAllDoctors = (callback) => {
    const sql = "SELECT doctor_id, doctor_name, department, qualification, experience, chamber_time FROM jh_doctors";
    db.query(sql, callback);
};