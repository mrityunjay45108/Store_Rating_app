const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let poolConfig;

if (process.env.DATABASE_URL) {
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_SSL === 'false' 
            ? false 
            : { rejectUnauthorized: false },
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    };
} else {
    poolConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'store_rating_db',
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    };
}

const pool = new Pool(poolConfig);

// Handle idle connection errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err.message);
});

// Test database connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
    } else {
        console.log('Successfully connected to database');
        release();
    }
});

module.exports = pool;