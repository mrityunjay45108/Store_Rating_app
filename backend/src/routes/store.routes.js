const express = require('express');
const router = express.Router();

// Controllers import karein
const storeController = require('../controllers/store.controller');
const storeOwnerController = require('../controllers/storeOwner.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');

// Store Controller se functions nikaalein
const { 
    getStores, 
    getStoreStats, 
    getStoreById, 
    createStore 
} = storeController;

// Store Owner Controller se functions nikaalein
const { getStoreOwnerDashboard, getStoreRatings } = storeOwnerController;
// STORE OWNER ROUTES (Priority)
// Store owner ko dashboard aur ratings ka access mile
router.get('/owner/dashboard', authenticateToken, getStoreOwnerDashboard);
router.get('/owner/ratings', authenticateToken, getStoreRatings);

//  GENERAL & ADMIN ROUTES
router.get('/', authenticateToken, getStores);
// Global Stats
router.get('/stats', authenticateToken, getStoreStats);

// Naya store banana (Sirf Admin/System Admin ke liye)
router.post('/create', authenticateToken, authorizeRoles('system_administrator', 'admin'), createStore);
// DYNAMIC ID ROUTES (Hamesha Last Mein)
router.get('/:id', authenticateToken, getStoreById);

module.exports = router;