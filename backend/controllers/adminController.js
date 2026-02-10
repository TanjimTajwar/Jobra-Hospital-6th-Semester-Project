const db = require('../config/db');
const util = require('util');

// Local promisified query helper
const query = util.promisify(db.query).bind(db);


// =====================================================
//  VIEW ALL USERS (Admin + Doctor + Patient Together)
// =====================================================
exports.allUsers = async (req, res) => {
    try {
        // Each query returns an array of rows
        const admins = await query(`
            SELECT 
                admin_id AS id,
                admin_name AS name,
                admin_email AS email,
                role
            FROM jh_admins
        `);

        const doctors = await query(`
            SELECT 
                doctor_id AS id,
                doctor_name AS name,
                doctor_email AS email,
                role
            FROM jh_doctors
        `);

        const patients = await query(`
            SELECT 
                patient_id AS id,
                patient_name AS name,
                patient_email AS email,
                role
            FROM jh_patients
        `);

        res.json([
            ...admins,
            ...doctors,
            ...patients
        ]);
    } catch (err) {
        res.status(500).json({
            msg: "error",
            error: err.message
        });
    }
};



// =====================================================
//  DELETE USER (Role Wise)
// =====================================================
exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        // First, detect which table this id belongs to
        const rows = await query(`
            SELECT 'admin' AS role, admin_id AS id
            FROM jh_admins WHERE admin_id = ?
            UNION ALL
            SELECT 'doctor' AS role, doctor_id AS id
            FROM jh_doctors WHERE doctor_id = ?
            UNION ALL
            SELECT 'patient' AS role, patient_id AS id
            FROM jh_patients WHERE patient_id = ?
        `, [id, id, id]);

        if (!rows || rows.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        const role = rows[0].role;

        if (role === "doctor") {
            await query(
                "DELETE FROM jh_doctors WHERE doctor_id=?",
                [id]
            );
        } else if (role === "patient") {
            await query(
                "DELETE FROM jh_patients WHERE patient_id=?",
                [id]
            );
        } else if (role === "admin") {
            await query(
                "DELETE FROM jh_admins WHERE admin_id=?",
                [id]
            );
        }

        res.json({ msg: "deleted" });
    } catch (err) {
        res.status(500).json({
            msg: "error",
            error: err.message
        });
    }
};



// =====================================================
//  UPDATE BASIC USER INFO (Name + Email)
// =====================================================
exports.updateUser = async (req, res) => {
    const { name, email, role } = req.body;
    const id = req.params.id;

    try {
        // -------- DOCTOR --------
        if (role === "doctor") {
            await query(`
                UPDATE jh_doctors
                SET doctor_name=?, doctor_email=?
                WHERE doctor_id=?
            `, [name, email, id]);
        }

        // -------- PATIENT --------
        else if (role === "patient") {
            await query(`
                UPDATE jh_patients
                SET patient_name=?, patient_email=?
                WHERE patient_id=?
            `, [name, email, id]);
        }

        // -------- ADMIN --------
        else if (role === "admin") {
            await query(`
                UPDATE jh_admins
                SET admin_name=?, admin_email=?
                WHERE admin_id=?
            `, [name, email, id]);
        }

        res.json({ msg: "updated" });
    } catch (err) {
        res.status(500).json({
            msg: "error",
            error: err.message
        });
    }
};



// =====================================================
//  EDIT DOCTOR FULL PROFILE
// =====================================================
exports.editDoctor = (req, res) => {

    const id = req.params.id;

    const sql = `
        UPDATE jh_doctors
        SET ?
        WHERE doctor_id=?
    `;

    db.query(sql, [req.body, id], err => {

        if (err)
            return res.status(500).send(err);

        res.send({ msg: "Doctor Updated" });
    });
};



// =====================================================
//  EDIT PATIENT FULL PROFILE
// =====================================================
exports.editPatient = (req, res) => {

    const id = req.params.id;

    const sql = `
        UPDATE jh_patients
        SET ?
        WHERE patient_id=?
    `;

    db.query(sql, [req.body, id], err => {

        if (err)
            return res.status(500).send(err);

        res.send({ msg: "Patient Updated" });
    });
};


// =====================================================
//  GET SINGLE USER BY ID (for EditUser page)
// =====================================================
exports.getUserById = (req, res) => {

    const id = req.params.id;

    const sql = `
        SELECT
            admin_id AS id,
            admin_name AS name,
            admin_email AS email,
            role
        FROM jh_admins
        WHERE admin_id = ?

        UNION ALL

        SELECT
            doctor_id AS id,
            doctor_name AS name,
            doctor_email AS email,
            role
        FROM jh_doctors
        WHERE doctor_id = ?

        UNION ALL

        SELECT
            patient_id AS id,
            patient_name AS name,
            patient_email AS email,
            role
        FROM jh_patients
        WHERE patient_id = ?
    `;

    db.query(sql, [id, id, id], (err, rows) => {

        if (err)
            return res.status(500).json({
                msg: "error",
                error: err.message
            });

        if (!rows || rows.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(rows[0]);
    });
};
