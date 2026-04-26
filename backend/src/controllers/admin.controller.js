const pool = require('../config/database');
const bcrypt = require('bcryptjs');


//  DASHBOARD STATISTICS
exports.getAdminStats = async (req, res) => {
    try {
        const [totalUsers, totalStores, totalRatings] = await Promise.all([
            pool.query('SELECT COUNT(*) as count FROM users'),
            pool.query('SELECT COUNT(*) as count FROM stores'),
            pool.query('SELECT COUNT(*) as count FROM ratings')
        ]);

        res.json({
            totalUsers: parseInt(totalUsers.rows[0].count),
            totalStores: parseInt(totalStores.rows[0].count),
            totalRatings: parseInt(totalRatings.rows[0].count)
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({ message: 'Server error while fetching stats' });
    }
};

//  CREATE USER (Admin, Store Owner, Normal User)
exports.createNewUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;

    try {

        if (!name || name.length < 3) {
            return res.status(400).json({ message: 'Name must be at least 3 characters' });
        }

        const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash, address, role) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, name, email, address, role`,
            [name, email, passwordHash, address, role || 'user']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create User Error:', error);
        res.status(500).json({ message: 'Server error while creating user' });
    }
};


// GET ALL USERS (With Search & Role Filter)
exports.getAllUsers = async (req, res) => {
    const { search, role, sortBy = 'name', sortOrder = 'ASC' } = req.query;

    try {
        let queryText = `
            SELECT u.id, u.name, u.email, u.address, u.role, u.created_at,
            CASE WHEN u.role = 'store_owner' THEN 
                (SELECT COALESCE(AVG(r.rating), 0) FROM ratings r 
                 JOIN stores s ON s.id = r.store_id 
                 WHERE s.owner_id = u.id)
            ELSE NULL END as rating
            FROM users u
            WHERE 1=1
        `;
        const params = [];

        if (search) {
            params.push(`%${search}%`);
            queryText += ` AND (u.name ILIKE $${params.length} OR u.email ILIKE $${params.length})`;
        }

        if (role && role !== 'all') {
            params.push(role);
            queryText += ` AND u.role = $${params.length}`;
        }

        const allowedSort = ['name', 'email', 'role', 'created_at'];
        const finalSort = allowedSort.includes(sortBy) ? sortBy : 'name';
        queryText += ` ORDER BY ${finalSort} ${sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'}`;

        const result = await pool.query(queryText, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Get Users Error:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

//  GET ALL STORES (With Avg Rating)
exports.getAllStores = async (req, res) => {
    const { search } = req.query;
    try {
        let queryText = `
            SELECT 
                s.id,
                s.name,
                s.email,
                s.address,
                COALESCE(ROUND(AVG(r.rating),1),0) AS avg_rating,
                COUNT(r.id) AS total_reviews
            FROM stores s
            LEFT JOIN reviews r 
                ON s.id = r.store_id
            WHERE 1=1
        `;

        const params = [];
        if (search) {
            params.push(`%${search}%`);
            queryText += `
                AND (
                    s.name ILIKE $${params.length}
                    OR s.email ILIKE $${params.length}
                )
            `;
        }
        queryText += `
            GROUP BY s.id, s.name, s.email, s.address
            ORDER BY s.name ASC
        `;
        const result = await pool.query(queryText, params);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Get Stores Error:", error);
        res.status(500).json({
            message: "Error fetching stores"
        });
    }
};

// 5. GET USER DETAILS
exports.getUserDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT id, name, email, address, role, created_at
            FROM users WHERE id = $1
        `;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};