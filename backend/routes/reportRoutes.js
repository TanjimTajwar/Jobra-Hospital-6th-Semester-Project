const express = require('express');
const router = express.Router();

const report = require('../controllers/reportController');
const auth = require('../middleware/auth');
const role = require('../middleware/roleCheck');

// doctor add report
router.post(
    '/add',
    auth,
    role(['doctor']),
    report.add
);

// patient view own reports
router.get(
    '/patient',
    auth,
    role(['patient']),
    report.patientView
);

// doctor view his written reports
router.get(
    '/doctor',
    auth,
    role(['doctor']),
    report.doctorView
);

module.exports = router;
