const express = require('express');
const router = express.Router();
const {logout, login} = require('../controllers/authController');

router.post('/login/login', login);
router.get('/logout/logout', logout);

module.exports = router;