const express = require('express');
const router = express.Router();
const { submitReview } = require('../controllers/review.controller');

// Pehle  'protect' mang rahe the, lekin file mein 'authenticateToken' hai
const { authenticateToken } = require('../middlewares/auth.middleware'); 
// Ab 'protect' ki jagah 'authenticateToken' use karenge
router.post('/submit', authenticateToken, submitReview);

module.exports = router;