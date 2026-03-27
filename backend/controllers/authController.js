const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const db = require('../config/db');
const authModel = require('../models/authModel');

exports.register = async (req, res) => {
    const { role } = req.body;

    if (!role) {
        return res.status(400).json({ message: 'Role is required' });
    }

    // Decide which table to use
    const table =
        role === 'doctor' ? 'jh_doctors' :
        role === 'patient' ? 'jh_patients' :
        'jh_admins';

    try {
        let data;

        if (role === 'patient') {
            const {
                patient_name,
                patient_email,
                patient_password,
                patient_phone,
                age,
                gender,
                blood_group,
                address
            } = req.body;

            if (!patient_name || !patient_email || !patient_password) {
                return res.status(400).json({ message: 'Name, email and password are required' });
            }

            const hashed = await bcrypt.hash(patient_password, 10);

            data = {
                patient_name,
                patient_email,
                patient_password: hashed,
                patient_phone: patient_phone || null,
                age: typeof age === 'number' ? age : (age ? parseInt(age, 10) : null),
                gender: gender || null,
                blood_group: blood_group || null,
                address: address || null,
                role: 'patient'
            };
        } else if (role === 'doctor') {
            const {
                doctor_name,
                doctor_email,
                doctor_password,
                doctor_phone,
                department,
                qualification,
                experience,
                chamber_time
            } = req.body;

            if (!doctor_name || !doctor_email || !doctor_password) {
                return res.status(400).json({ message: 'Name, email and password are required' });
            }

            const hashed = await bcrypt.hash(doctor_password, 10);

            data = {
                doctor_name,
                doctor_email,
                doctor_password: hashed,
                doctor_phone: doctor_phone || null,
                department: department || null,
                qualification: qualification || null,
                experience: typeof experience === 'number' ? experience : (experience ? parseInt(experience, 10) : null),
                chamber_time: chamber_time || null,
                role: 'doctor'
            };
        } else if (role === 'admin') {
            const {
                admin_name,
                admin_email,
                admin_password,
                admin_phone
            } = req.body;

            if (!admin_name || !admin_email || !admin_password) {
                return res.status(400).json({ message: 'Name, email and password are required' });
            }

            const hashed = await bcrypt.hash(admin_password, 10);

            data = {
                admin_name,
                admin_email,
                admin_password: hashed,
                admin_phone: admin_phone || null,
                role: 'admin'
            };
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        authModel.insertUser(table, data, (err) => {
            if (err) {
                const msg = err.sqlMessage || err.message || 'Database error';
                return res.status(500).json({
                    message: 'Registration failed',
                    error: msg,
                    code: err.code
                });
            }
            res.json({ message: 'Registered Successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

// Login WITHOUT requiring role in the body.
// It will search admin, doctor and patient tables by email.
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const candidates = [
        {
            role: 'admin',
            table: 'jh_admins',
            emailField: 'admin_email',
            passwordField: 'admin_password',
            idField: 'admin_id'
        },
        {
            role: 'doctor',
            table: 'jh_doctors',
            emailField: 'doctor_email',
            passwordField: 'doctor_password',
            idField: 'doctor_id'
        },
        {
            role: 'patient',
            table: 'jh_patients',
            emailField: 'patient_email',
            passwordField: 'patient_password',
            idField: 'patient_id'
        }
    ];

    const tryNext = (index) => {
        if (index >= candidates.length) {
            return res.status(401).json({ message: 'User not found' });
        }

        const c = candidates[index];
        const sql = `SELECT * FROM ${c.table} WHERE ${c.emailField} = ?`;

        db.query(sql, [email], async (err, result) => {
            if (err) return res.status(500).json(err);

            if (!result || result.length === 0) {
                // Try next role
                return tryNext(index + 1);
            }

            const user = result[0];

            try {
                const match = await bcrypt.compare(password, user[c.passwordField]);

                if (!match) {
                    return res.status(401).json({ message: 'Wrong password' });
                }

                const role = c.role;
                const id = user[c.idField];

                const token = generateToken({
                    id,
                    role
                });

                res.json({
                    token,
                    role,
                    id
                });
            } catch (e) {
                res.status(500).json({ message: 'Login failed', error: e.message });
            }
        });
    };

    tryNext(0);
};