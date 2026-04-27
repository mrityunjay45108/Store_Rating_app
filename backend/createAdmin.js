const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'store_rating_db',
    password: process.env.DB_PASSWORD || 'password', 
    port: process.env.DB_PORT || 5432,
});

async function createAdmin() {
    try {
        const name = 'Mrityunjay Admin';
        const email = 'admin@test.com';
        const plainPassword = 'Admin@123';
        const address = 'BEU Patna, Bihar';
        const role = 'system_administrator';
        // Password hash karna zaroori hai login ke liye
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);

        const query = `
            INSERT INTO users (name, email, password_hash, address, role)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) 
            DO UPDATE SET role = 'system_administrator';
        `;

        await pool.query(query, [name, email, hashedPassword, address, role]);
        
        console.log('------------------------------------');
        console.log('Success: Admin account created!');
        console.log(`Email: ${email}`);
        console.log(`Password: ${plainPassword}`);
        console.log('------------------------------------');

    } catch (err) {
        console.error('Error creating admin:', err.message);
    } finally {
        await pool.end();
    }
}

createAdmin();