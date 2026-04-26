const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Cuando alguien intente entrar a /login, llamamos al cadenero
router.post('/login', login);

module.exports = router;