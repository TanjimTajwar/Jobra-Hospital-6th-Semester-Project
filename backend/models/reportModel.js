const db = require('../config/db');

// doctor writes report
exports.addReport = (data, callback) => {

    const sql = `
        INSERT INTO jh_reports
        (doctor_id, patient_id, diagnosis, prescription, medical_test, advice)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.doctor_id,
            data.patient_id,
            data.diagnosis,
            data.prescription,
            data.medical_test || null,
            data.advice || null
        ],
        callback
    );
};

// patient view own reports
exports.getPatientReports = (patientId, callback) => {

    const sql = `
        SELECT
            r.*,
            d.doctor_name,
            d.department
        FROM jh_reports r
        JOIN jh_doctors d ON r.doctor_id = d.doctor_id
        WHERE r.patient_id = ?
        ORDER BY r.report_date DESC
    `;

    db.query(sql, [patientId], callback);
};

// doctor see his given reports
exports.getDoctorReports = (doctorId, callback) => {

    const sql = `
        SELECT
            r.*,
            p.patient_name,
            p.patient_phone
        FROM jh_reports r
        JOIN jh_patients p ON r.patient_id = p.patient_id
        WHERE r.doctor_id = ?
        ORDER BY r.report_date DESC
    `;

    db.query(sql, [doctorId], callback);
};
