const express = require('express');
const router = express.Router();
const { register, login, changePassword } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const validators = require('../utils/validators');

// Validators setup
const v = {
    name: validators.validateName ? validators.validateName() : [],
    email: validators.validateEmail ? validators.validateEmail() : [],
    pass: validators.validatePassword ? validators.validatePassword() : [],
    addr: validators.validateAddress ? validators.validateAddress() : [],
    errors: validators.handleValidationErrors || ((req, res, next) => next())
};
// Register
router.post('/register', [
    v.name,
    v.email,
    v.pass,
    v.addr,
    v.errors
], register);
// Login 
router.post('/login', [
    v.email,
    v.errors
], login);
// Change Password
router.put('/change-password', 
    authenticateToken, 
    v.pass, 
    v.errors, 
    changePassword
);
module.exports = router;