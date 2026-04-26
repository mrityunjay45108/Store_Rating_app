const pool = require('../config/database');


const submitRating = async (req, res) => {
    // 1. Destructure all possible fields from frontend
    const { store_id, storeId, rating, comment } = req.body;
    const finalStoreId = store_id || storeId; 
    const userId = req.user.id;
    
    // Terminal mein check karte hai ki kya data aa raha hai
    console.log(`User ${userId} is rating Store ${finalStoreId} with ${rating} stars`);

    // Strict Validations
    if (!finalStoreId) {
        return res.status(400).json({ 
            message: 'Store ID is missing! Backend cannot link this rating.' 
        });
    }

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ 
            message: 'Please provide a valid rating between 1 and 5.' 
        });
    }

    try {
        // Check if this user has already rated this store
        const existing = await pool.query(
            'SELECT id FROM ratings WHERE user_id = $1 AND store_id = $2',
            [userId, finalStoreId]
        );
        
        let result;
        if (existing.rows.length > 0) {
            // Update existing rating & comment
            result = await pool.query(
                `UPDATE ratings 
                 SET rating = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
                 WHERE user_id = $3 AND store_id = $4
                 RETURNING *`,
                [rating, comment || '', userId, finalStoreId]
            );
        } else {
            // Insert new rating & comment
            result = await pool.query(
                `INSERT INTO ratings (user_id, store_id, rating, comment)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
                [userId, finalStoreId, rating, comment || '']
            );
        }
        
        res.json({ 
            message: 'Rating successfully saved!', 
            rating: result.rows[0] 
        });

    } catch (error) {
        console.error("Submit Rating Error:", error);
        res.status(500).json({ message: 'Server error while saving your review' });
    }
};

const getUserRating = async (req, res) => {
    const { storeId } = req.params;
    const userId = req.user.id;
    
    if (!storeId) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const result = await pool.query(
            'SELECT rating, comment FROM ratings WHERE user_id = $1 AND store_id = $2',
            [userId, storeId]
        );
        // Agar rating nahi milti toh null bhejte hain
        res.json({ 
            rating: result.rows[0]?.rating || null,
            comment: result.rows[0]?.comment || ''
        });
    } catch (error) {
        console.error("Get User Rating Error:", error);
        res.status(500).json({ message: 'Server error fetching user rating' });
    }
};

module.exports = { submitRating, getUserRating };