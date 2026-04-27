const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateToken, authorizeRoles, adminOnly } = require('../middlewares/auth.middleware');
const validators = require('../utils/validators');

const v = {
    name: validators.validateName ? validators.validateName() : [],
    email: validators.validateEmail ? validators.validateEmail() : [],
    pass: validators.validatePassword ? validators.validatePassword() : [],
    addr: validators.validateAddress ? validators.validateAddress() : [],
    errors: validators.handleValidationErrors || ((req, res, next) => next())
};
router.use(authenticateToken);
router.use(authorizeRoles('system_administrator'));
// --- DASHBOARD STATS ---
router.get('/stats', adminController.getAdminStats);
router.get('/dashboard', adminController.getAdminStats);
// --- USER MANAGEMENT ---
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserDetails);
router.post('/users', [
    v.name,
    v.email,
    v.pass,
    v.addr,
    v.errors
], adminController.createNewUser);
// --- STORE MANAGEMENT ---
router.get('/stores', adminController.getAllStores);

module.exports = router;