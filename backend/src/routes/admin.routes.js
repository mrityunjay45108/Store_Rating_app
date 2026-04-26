const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateToken, authorizeRoles, adminOnly } = require('../middlewares/auth.middleware');
const validators = require('../utils/validators');

// Validators setup (Safe check ke saath)
const v = {
    name: validators.validateName ? validators.validateName() : [],
    email: validators.validateEmail ? validators.validateEmail() : [],
    pass: validators.validatePassword ? validators.validatePassword() : [],
    addr: validators.validateAddress ? validators.validateAddress() : [],
    errors: validators.handleValidationErrors || ((req, res, next) => next())
};
// Sabse pehle Token check karenge
router.use(authenticateToken);
// Sirf 'system_administrator' ko allow karein
router.use(authorizeRoles('system_administrator'));
// --- DASHBOARD STATS ---
// Requirement: Total Users, Total Stores, Total Ratings
router.get('/stats', adminController.getAdminStats);
router.get('/dashboard', adminController.getAdminStats);
// --- USER MANAGEMENT ---
// Requirement: Can view normal/admin users & details
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserDetails);
// Requirement: Can add new stores, normal users, and admin users
router.post('/users', [
    v.name,
    v.email,
    v.pass,
    v.addr,
    v.errors
], adminController.createNewUser);
// --- STORE MANAGEMENT ---
// Requirement: Can view list of stores (Name, Email, Address, Rating)
router.get('/stores', adminController.getAllStores);

module.exports = router;