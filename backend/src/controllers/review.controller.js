const pool = require('../config/database');

const submitReview = async (req, res) => {
    const { storeId, rating, comment } = req.body;
    // Auth Middleware se user object milna chahiye
    const userId = req.user?.id || req.user?.userId; 

    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!storeId || !rating) {
        return res.status(400).json({ message: 'Store ID and Rating are required' });
    }

    try {
        // SQL Upsert Logic Insert if new Update if exists
        const query = `
            INSERT INTO reviews (user_id, store_id, rating, comment, updated_at)
            VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
            ON CONFLICT (user_id, store_id) 
            DO UPDATE SET 
                rating = EXCLUDED.rating,
                comment = EXCLUDED.comment,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *;
        `;

        const result = await pool.query(query, [userId, storeId, rating, comment]);

        res.status(200).json({
            message: 'Review processed successfully',
            review: result.rows[0]
        });
    } catch (error) {
        console.error("Review Submit Error:", error);
        res.status(500).json({ 
            message: 'Server error while submitting review',
            error: error.message 
        });
    }
};

module.exports = { submitReview };