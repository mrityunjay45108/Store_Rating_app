const express = require('express');
const router = express.Router();
const { submitRating, getUserRating } = require('../controllers/rating.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const validators = require('../utils/validators');

// Agar validator nahi mila toh empty array pass karega crash hone ke bajaye
const vRating = validators.validateRating ? validators.validateRating() : [];
const hErrors = validators.handleValidationErrors || ((req, res, next) => next());
router.post('/', 
    authenticateToken, 
    vRating, 
    hErrors, 
    submitRating
);
router.post('/add', authenticateToken, vRating, hErrors, submitRating);
router.get('/user/:storeId', 
    authenticateToken, 
    getUserRating
);
module.exports = router;