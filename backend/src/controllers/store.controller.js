const pool = require("../config/database");
const getStores = async (req, res) => {
  const { search, sortBy = "name", sortOrder = "ASC" } = req.query;

  const userId = req.user ? req.user.id : null;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized. Please login." });
  }

  try {
    let queryText = `
            SELECT 
                s.id, s.name, s.email, s.address,
                ROUND(COALESCE(AVG(r.rating), 0), 1) as overall_rating,
                COUNT(r.id) as total_ratings,
                (SELECT rating FROM ratings WHERE user_id = $1 AND store_id = s.id) as user_rating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE 1=1
        `;
    const params = [userId];

    if (search) {
      params.push(`%${search}%`);
      queryText += ` AND (s.name ILIKE $${params.length} OR s.address ILIKE $${params.length})`;
    }

    queryText += ` GROUP BY s.id`;

    const allowedSortFields = ["name", "address", "overall_rating"];
    const finalSortBy = allowedSortFields.includes(sortBy) ? sortBy : "s.name";
    const finalSortOrder = sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";

    queryText += ` ORDER BY ${finalSortBy} ${finalSortOrder}`;

    const result = await pool.query(queryText, params);
    res.json(result.rows);
  } catch (error) {
    console.error("Get Stores Error:", error);
    res.status(500).json({ message: "Server error while fetching stores" });
  }
};

// Dashboard Stats
const getStoreStats = async (req, res) => {
  try {
    const query = `
            SELECT s.id, s.name, 
                   ROUND(COALESCE(AVG(r.rating), 0), 1) as average_rating,
                   COUNT(r.id) as total_reviews
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            GROUP BY s.id
            ORDER BY average_rating DESC;
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

//  Get a single store by ID
const getStoreById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid Store ID" });
  }
  try {
    const result = await pool.query(
      `SELECT s.*, ROUND(COALESCE(AVG(r.rating), 0), 1) as average_rating
             FROM stores s
             LEFT JOIN ratings r ON s.id = r.store_id
             WHERE s.id = $1
             GROUP BY s.id`,
      [id],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Store not found" });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching store" });
  }
};

// Create a new store
const createStore = async (req, res) => {
  const { name, email, address } = req.body;
  console.log("--- DEBUG START ---");
  console.log("Full User Object:", req.user);

  // Middleware se req.user.id mil raha hai
  const owner_id = req.user ? req.user.id : null;
  console.log("Extracted Owner ID:", owner_id);

  if (!owner_id) {
    return res
      .status(400)
      .json({ message: "Owner ID missing. Please check token/middleware." });
  }

  try {
    const queryText = `
            INSERT INTO stores (name, email, address, owner_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
    const values = [name, email, address, owner_id];
    const result = await pool.query(queryText, values);

    console.log("Store Created Successfully");
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(400)
        .json({ message: "Email already exists. Try a new one!" });
    }
    console.error(" DATABASE ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getStores, getStoreStats, getStoreById, createStore };
