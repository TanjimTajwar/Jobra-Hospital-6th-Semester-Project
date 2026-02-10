const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');


// ============== REGISTER ==============

// patient register
router.post('/register/patient', (req, res) => {

    req.body.role = "patient";

    auth.register(req, res);
});


// doctor register
router.post('/register/doctor', (req, res) => {

    req.body.role = "doctor";

    auth.register(req, res);
});


// admin register (optional)
router.post('/register/admin', (req, res) => {

    req.body.role = "admin";

    auth.register(req, res);
});




// ============== LOGIN ==============

router.post('/login', auth.login);



module.exports = router;
