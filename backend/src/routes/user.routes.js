const express = require('express');
const router = express.Router();
const storeOwnerController = require('../controllers/storeOwner.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.get('/my-store-ratings', authenticateToken, storeOwnerController.getStoreRatings); 

module.exports = router;