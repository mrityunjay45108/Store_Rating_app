
const getStoreStats = async (req, res) => {
    try {
        const query = `
            SELECT 
                s.id, 
                s.name, 
                s.address,
                ROUND(COALESCE(AVG(r.rating), 0), 1) as average_rating,
                COUNT(r.id) as total_reviews
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            GROUP BY s.id, s.name, s.address
            ORDER BY average_rating DESC;
        `;
        const result = await pool.query(query);
        res.json(result.rows); 
        
    } catch (error) {
        console.error(" SQL ERROR:", error.message); 
        res.status(500).json({ 
            message: 'Server error while fetching store details',
            error: error.message
        });
    }
};