const db = require('../config/db');
const util = require('util');

// Local promisified query helper (does not change db for other modules)
const query = util.promisify(db.query).bind(db);

// PATIENT BOOK
exports.book = async (req, res) => {

    const {
        doctor_id,
        appointment_date,
        appointment_time
    } = req.body;

    try {

        await query(`
            INSERT INTO jh_appointments
            (doctor_id, patient_id, appointment_date, appointment_time)
            VALUES (?,?,?,?)
        `, [
            doctor_id,
            req.user.id,
            appointment_date,
            appointment_time
        ]);

        res.json({ msg: "booked" });

    } catch (err) {
        res.status(500).json({ msg: "error", error: err.message });
    }
};




// PATIENT VIEW
exports.patientView = async (req, res) => {

    try {

        const data = await query(`
            SELECT a.*,
                   d.doctor_name

            FROM jh_appointments a

            JOIN jh_doctors d
            ON a.doctor_id = d.doctor_id

            WHERE a.patient_id=?
        `, [req.user.id]);

        // data is an array of appointments
        res.json(data);

    } catch (err) {
        res.status(500).json({ msg: "error", error: err.message });
    }
};




// DOCTOR VIEW
exports.doctorView = async (req, res) => {

    try {

        const data = await query(`
            SELECT a.*,
                   p.patient_name

            FROM jh_appointments a

            JOIN jh_patients p
            ON a.patient_id = p.patient_id

            WHERE a.doctor_id=?
        `, [req.user.id]);

        // data is an array of appointments
        res.json(data);

    } catch (err) {
        res.status(500).json({ msg: "error", error: err.message });
    }
};




// DOCTOR UPDATE
exports.updateStatus = async (req, res) => {

    const { status } = req.body;

    try {

        await query(`
            UPDATE jh_appointments
            SET status=?
            WHERE appointment_id=?
        `, [status, req.params.id]);

        res.json({ msg: "updated" });

    } catch (err) {
        res.status(500).json({ msg: "error", error: err.message });
    }
};




// ADMIN VIEW ALL
exports.all = async (req, res) => {

    try {

        const data = await query(`
            SELECT a.*,
                   d.doctor_name,
                   p.patient_name

            FROM jh_appointments a

            JOIN jh_doctors d
            ON a.doctor_id = d.doctor_id

            JOIN jh_patients p
            ON a.patient_id = p.patient_id
        `);

        // data is an array of all appointments
        res.json(data);

    } catch (err) {
        res.status(500).json({ msg: "error", error: err.message });
    }
};




// ADMIN DELETE
exports.remove = async (req, res) => {

    try {

        await query(`
            DELETE FROM jh_appointments
            WHERE appointment_id=?
        `, [req.params.id]);

        res.json({ msg: "deleted" });

    } catch (err) {
        res.status(500).json({ msg: "error", error: err.message });
    }
};



exports.cancelByPatient = (req, res) => {

    const appointmentId = req.params.id;

    const patientId = req.user.id;



    const sql = `
        UPDATE jh_appointments
        SET status='cancelled'
        WHERE appointment_id=?
        AND patient_id=?
    `;



    db.query(
        sql,
        [appointmentId, patientId],

        (err, result) => {

            if (err)
                return res.status(500).send(err);



            if (result.affectedRows === 0) {
                return res.status(403).send({
                    msg: "Not Allowed"
                });
            }



            res.send({
                msg: "Cancelled"
            });
        }
    );
};
