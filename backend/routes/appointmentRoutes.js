const express = require('express');
const router = express.Router();

const a = require('../controllers/appointmentController');

const auth = require('../middleware/auth');
const role = require('../middleware/roleCheck');


// patient book
router.post('/book',
    auth,
    role(['patient']),
    a.book
);


// patient view
router.get('/my',
    auth,
    role(['patient']),
    a.patientView
);


// doctor view
router.get('/doctor',
    auth,
    role(['doctor']),
    a.doctorView
);


// doctor update status
router.put('/status/:id',
    auth,
    role(['doctor']),
    a.updateStatus
);


// admin view all
router.get('/all',
    auth,
    role(['admin']),
    a.all
);


// admin delete
router.delete('/:id',
    auth,
    role(['admin']),
    a.remove
);

// patient cancel
router.put(
  '/cancel/:id',
  auth,
  role(['patient']),
  a.cancelByPatient
);

module.exports = router;
