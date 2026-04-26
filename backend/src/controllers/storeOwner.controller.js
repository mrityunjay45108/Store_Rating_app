const pool = require("../config/database");


// Owner dashboard
const getStoreOwnerDashboard = async (req,res)=>{
 try{

   const ownerId=req.user?.id || req.user?.userId;

   const storeQuery=`
    SELECT
      s.id,
      s.name,
      COUNT(r.id) as total_reviews,
      COALESCE(ROUND(AVG(r.rating),1),0) as avg_rating
    FROM stores s
    LEFT JOIN reviews r
      ON s.id=r.store_id
    WHERE s.owner_id=$1
    GROUP BY s.id,s.name
   `;

   const storeStats=await pool.query(
      storeQuery,
      [ownerId]
   );

   if(storeStats.rows.length===0){
      return res.status(404).json({
        message:"No store found"
      });
   }

   const storeId=storeStats.rows[0].id;

   const recentReviews=await pool.query(
   `
   SELECT
      u.id,
      u.name as user_name,
      u.email,
      r.rating,
      r.comment,
      r.created_at as date
   FROM reviews r
   JOIN users u
      ON r.user_id=u.id
   WHERE r.store_id=$1
   ORDER BY r.created_at DESC
   LIMIT 10
   `,
   [storeId]
   );

   res.json({
      storeName:storeStats.rows[0].name,

      stats:{
         totalRatings:Number(
           storeStats.rows[0].total_reviews
         ),
         averageRating:
           storeStats.rows[0].avg_rating
      },

      reviews:recentReviews.rows
   });

 }
 catch(error){
   console.error(error);
   res.status(500).json({
      message:"Server error"
   });
 }
};



// full ratings page (optional)
const getStoreRatings = async(req,res)=>{
 try{

   const ownerId=req.user?.id || req.user?.userId;

   const storeResult=await pool.query(
   `
   SELECT id,name
   FROM stores
   WHERE owner_id=$1
   `,
   [ownerId]
   );

   if(!storeResult.rows.length){
     return res.status(404).json({
       message:"Store not found"
     });
   }

   const store=storeResult.rows[0];

   const ratingsResult=await pool.query(
   `
   SELECT
      u.name,
      u.email,
      r.rating,
      r.comment,
      r.created_at
   FROM reviews r
   JOIN users u
     ON r.user_id=u.id
   WHERE r.store_id=$1
   ORDER BY r.created_at DESC
   `,
   [store.id]
   );

   res.json(ratingsResult.rows);

 }
 catch(error){
   console.error(error);
   res.status(500).json({
      message:"Server error"
   });
 }
};

module.exports={
 getStoreOwnerDashboard,
 getStoreRatings
};