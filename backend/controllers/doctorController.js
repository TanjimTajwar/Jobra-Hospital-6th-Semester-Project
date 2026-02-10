const doctorModel = require('../models/doctorModel');
const db = require('../config/db');

exports.getDoctors = (req, res) => {
    doctorModel.getAllDoctors((err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// Doctor view all patients (can be improved later to show only assigned patients)
exports.getPatients = (req, res) => {
    const sql = `
        SELECT
            patient_id,
            patient_name,
            patient_email,
            patient_phone,
            age,
            gender,
            blood_group,
            address
        FROM jh_patients
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send(result);
    });
};
