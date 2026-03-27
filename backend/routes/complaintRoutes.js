const express = require('express');
const router = express.Router();

const c = require('../controllers/complaintController');

const auth = require('../middleware/auth');
const role = require('../middleware/roleCheck');

// patient add
router.post('/add',
    auth,
    role(['patient']),
    c.add
);

// patient see own
router.get('/my',
    auth,
    role(['patient']),
    c.my
);

// doctor see about him
router.get('/doctor',
    auth,
    role(['doctor']),
    c.forDoctor
);

// admin see all
router.get('/all',
    auth,
    role(['admin']),
    c.all
);

module.exports = router;
