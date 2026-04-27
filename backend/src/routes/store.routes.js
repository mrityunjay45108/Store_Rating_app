const express = require('express');
const router = express.Router();

const storeController = require('../controllers/store.controller');
const storeOwnerController = require('../controllers/storeOwner.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');

const { 
    getStores, 
    getStoreStats, 
    getStoreById, 
    createStore 
} = storeController;
const { getStoreOwnerDashboard, getStoreRatings } = storeOwnerController;
// STORE OWNER ROUTES (Priority)
router.get('/owner/dashboard', authenticateToken, getStoreOwnerDashboard);
router.get('/owner/ratings', authenticateToken, getStoreRatings);
//  GENERAL & ADMIN ROUTES
router.get('/', authenticateToken, getStores);
// Global Stats
router.get('/stats', authenticateToken, getStoreStats);
router.post('/create', authenticateToken, authorizeRoles('system_administrator', 'admin'), createStore);
router.get('/:id', authenticateToken, getStoreById);

module.exports = router;