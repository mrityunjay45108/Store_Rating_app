const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password, address, role } = req.body;

    try {
        let finalRole = role || 'user';

        if (role === 'owner' || role === 'store_owner') {
            finalRole = 'store_owner';
        } 
        else if (role === 'admin' || role === 'system_administrator') {
            finalRole = 'system_administrator';
        }

        // User Existence Check
        const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //  Password Hashing
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Database Insertion
        const result = await pool.query(
            `INSERT INTO users (name, email, password_hash, address, role) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, name, email, address, role`,
            [name, email, passwordHash, address, finalRole]
        );

        const user = result.rows[0];

        // Generate JWT Token (Role yahan v 'system_administrator' hi jayega)
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_fallback_secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            user,
            token
        });

    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT id, name, email, password_hash, address, role FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_fallback_secret',
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// Change Password
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    // Make sure your auth middleware sets req.user
    const userId = req.user ? req.user.userId || req.user.id : null;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const result = await pool.query('SELECT password_hash FROM users WHERE id = $1', [userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(currentPassword, user.password_hash);
        
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        const newPasswordHash = await bcrypt.hash(newPassword, salt);

        await pool.query(
            'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', 
            [newPasswordHash, userId]
        );

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error("Change Password Error:", error);
        res.status(500).json({ message: 'Server error while updating password' });
    }
};

module.exports = { register, login, changePassword };