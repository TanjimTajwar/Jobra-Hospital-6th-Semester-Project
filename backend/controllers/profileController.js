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
