const express = require('express');
const router = express.Router();

const doctor = require('../controllers/doctorController');

const auth = require('../middleware/auth');
const role = require('../middleware/roleCheck');


// Everyone logged in (patient & admin) can see doctor list
router.get(
    '/list',
    auth,
    role(['patient','admin']),
    doctor.getDoctors
);


// NEW → Doctor can see all patients
router.get(
    '/patients',
    auth,
    role(['doctor']),
    doctor.getPatients
);


module.exports = router;
