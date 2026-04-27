const express = require('express');
const router = express.Router();
const { submitReview } = require('../controllers/review.controller');

const { authenticateToken } = require('../middlewares/auth.middleware'); 
router.post('/submit', authenticateToken, submitReview);

module.exports = router;