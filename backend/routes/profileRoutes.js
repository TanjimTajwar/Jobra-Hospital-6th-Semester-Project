const express = require('express');
const router = express.Router();

const c = require('../controllers/profileController');

const auth = require('../middleware/auth');

router.get('/me', auth, c.myProfile);

module.exports = router;
