const express = require('express');
const router = express.Router();
const storeOwnerController = require('../controllers/storeOwner.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// getProfile ki jagah wo function use karein jo controller mein hai
router.get('/my-store-ratings', authenticateToken, storeOwnerController.getStoreRatings); 

module.exports = router;