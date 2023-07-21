const pool = require("../database.connexion.js")

const cartoolDatamapper= {
    
  async getCarById (id) {
    const query = `SELECT * FROM "car" WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows;
  },
  
  async createCar (name, type, current_km, km_per_month, icon ) {
    const query =`INSERT INTO "car"("name", "type", "current_km", "km_per_month", "icon") VALUES 
    ($1, $2, $3, $4, $5);`;
    const result = await pool.query(query, [name, type, current_km, km_per_month, icon]);
    return result.rows;
  },
  
  async deleteOneCar(carId) {
    const query = 'DELETE FROM "car" WHERE id = $1';
    const result = await pool.query(query, [carId]);
    return result.rows;
  },

  async modifyOneCar (name, type, current_km, km_per_month, icon, carId) {
    const query = ` UPDATE "car" SET
                        name = COALESCE($1, name),
                        type = COALESCE($2, type),
                        current_km = COALESCE($3, current_km),
                        km_per_month = COALESCE($4, km_per_month),
                        icon = COALESCE($5, icon)
                    WHERE id = $6
                    RETURNING *`
  const result = await pool.query(query, [name, type, current_km, km_per_month, icon, carId]);
  return result.rows;
    
  }
}

module.exports = cartoolDatamapper