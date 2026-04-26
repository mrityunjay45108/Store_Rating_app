const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
// Initialize 'app' first
const app = express(); 
//  Middlewares import
const { errorHandler, notFound } = require('./middlewares/error.middleware');
// Routes import
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const storeRoutes = require('./routes/store.routes');
const ratingRoutes = require('./routes/rating.routes');
const adminRoutes = require('./routes/admin.routes');
const reviewRoutes = require('./routes/review.routes'); // New review routes
// --- Standard Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes setup ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running perfectly!' });
});
// 404 handler
app.use(notFound);
// Error handler
app.use(errorHandler);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` API available at http://localhost:${PORT}/api`);
});
