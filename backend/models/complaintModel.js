const db = require('../config/db');

// add new complaint / review
exports.addComplaint = (data, callback) => {

    const sql = `
        INSERT INTO jh_complaints
        (patient_id, doctor_id, message, complaint_type)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.patient_id,
            data.doctor_id || null,
            data.complaint_text,          // keep frontend field name
            data.complaint_type || null
        ],
        callback
    );
};

// get complaints of logged in patient
exports.getMyComplaints = (patientId, callback) => {

    const sql = `
        SELECT
            complaint_id,
            patient_id,
            doctor_id,
            message AS complaint_text,
            complaint_type,
            complaint_date AS created_at,
            status
        FROM jh_complaints
        WHERE patient_id = ?
        ORDER BY complaint_date DESC
    `;

    db.query(sql, [patientId], callback);
};

// for doctor → only complaints about him
exports.getDoctorComplaints = (doctorId, callback) => {

    const sql = `
        SELECT
            complaint_id,
            patient_id,
            doctor_id,
            message AS complaint_text,
            complaint_type,
            complaint_date AS created_at,
            status
        FROM jh_complaints
        WHERE doctor_id = ?
        ORDER BY complaint_date DESC
    `;

    db.query(sql, [doctorId], callback);
};

// admin → all
exports.getAllComplaints = (callback) => {

    const sql = `
        SELECT
            complaint_id,
            patient_id,
            doctor_id,
            message AS complaint_text,
            complaint_type,
            complaint_date AS created_at,
            status
        FROM jh_complaints
        ORDER BY complaint_date DESC
    `;

    db.query(sql, callback);
};
