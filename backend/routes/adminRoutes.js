const express = require('express');
const router = express.Router();

const a = require('../controllers/adminController');

const auth = require('../middleware/auth');
const role = require('../middleware/roleCheck');


// view all users
router.get('/users',
    auth,
    role(['admin']),
    a.allUsers
);


// get single user by id (for edit screen)
router.get(
  '/user/:id',
  auth,
  role(['admin']),
  a.getUserById
);

// delete user
router.delete('/users/:id',
    auth,
    role(['admin']),
    a.deleteUser
);


// edit user (generic)
router.put('/users/:id',
    auth,
    role(['admin']),
    a.updateUser
);


// EDIT DOCTOR
router.put(
  '/doctor/:id',
  auth,
  role(['admin']),
  a.editDoctor
);

// EDIT PATIENT
router.put(
  '/patient/:id',
  auth,
  role(['admin']),
  a.editPatient
);


module.exports = router;
