-- 1. FORCE RESET (Security aur Foreign Keys bypass karke delete)
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS user_role; 

-- 2. USERS TABLE 
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL CHECK (LENGTH(name) >= 3),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_role_type CHECK (role IN ('system_administrator', 'user', 'store_owner'))
);
-- 3. STORES TABLE
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 4. RATINGS TABLE
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, store_id)
);
-- 5. INDEXES (Optimization)
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_stores_owner ON stores(owner_id);
CREATE INDEX idx_ratings_store ON ratings(store_id);
-- 6. INSERT FRESH DATA
-- Admin Account
INSERT INTO users (name, email, password_hash, address, role) 
VALUES (
    'Mrityunjay Admin', 
    'admin@test.com', 
    '$2a$10$rQkE8H3xVqY5wL7mN9pK/uJ8sR3tY2wA1bC4dE5fG6hI7jK8lM9nO0pQ', 
    'BEU Patna, Bihar', 
    'system_administrator'
);
-- Store Owner Account
INSERT INTO users (name, email, password_hash, address, role) 
VALUES (
    'Test Store Owner', 
    'owner@example.com', 
    '$2a$10$7R0Z/mGzWf.f.nL3vX/7O.E.yI7G.B.M.v.X.U.L.Z.Y.W.X.V.U.T.', 
    'Boring Road, Patna', 
    'store_owner'
);