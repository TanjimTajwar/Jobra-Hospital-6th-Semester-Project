const db = require('../config/db');

exports.myProfile = (req, res) => {

    const role = req.user.role;
    const id = req.user.id;

    let table = "";

    if (role === 'admin') table = "jh_admins";
    if (role === 'doctor') table = "jh_doctors";
    if (role === 'patient') table = "jh_patients";

    const sql = `SELECT * FROM ${table} WHERE ${role}_id=?`;

    db.query(sql, [id], (err, result) => {

        if (err) return res.status(500).send(err);

        res.send(result[0]);
    });
};

exports.updateProfile = (req, res) => {
    const role = req.user.role;
    const id = req.user.id;

    let table = "";
    let idField = "";

    if (role === 'admin') {
        table = "jh_admins";
        idField = "admin_id";
    } else if (role === 'doctor') {
        table = "jh_doctors";
        idField = "doctor_id";
    } else if (role === 'patient') {
        table = "jh_patients";
        idField = "patient_id";
    }

    // Build update query dynamically based on provided fields
    const updateFields = [];
    const values = [];

    // Only update fields that are provided and not password
    Object.keys(req.body).forEach(key => {
        if (!key.includes('password') && req.body[key] !== undefined && req.body[key] !== null) {
            updateFields.push(`${key} = ?`);
            values.push(req.body[key]);
        }
    });

    if (updateFields.length === 0) {
        return res.status(400).json({ message: 'No valid fields to update' });
    }

    values.push(id); // Add id for WHERE clause

    const sql = `UPDATE ${table} SET ${updateFields.join(', ')} WHERE ${idField} = ?`;

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Update error:', err);
            return res.status(500).json({ message: 'Failed to update profile', error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json({ message: 'Profile updated successfully' });
    });
};
