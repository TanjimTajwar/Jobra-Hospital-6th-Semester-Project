const express = require('express');
const router = express.Router();

const p = require('../controllers/patientController');

const auth = require('../middleware/auth');
const role = require('../middleware/roleCheck');

// only admin
router.get('/all',
    auth,
    role(['admin']),
    p.all
);

module.exports = router;
