/* eslint-disable camelcase */
const pool = require('../../database.connexion');

const carDatamapper = {
  async getAllCar() {
    const query = 'SELECT * FROM "car"';
    const result = await pool.query(query);
    return result.rows;
  },
  async getOneCar(id) {
    const query = 'SELECT * FROM "car" WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows;
  },

  async createOneCar(name, type, current_km, km_per_month, icon, userId) {
    const query = `INSERT INTO "car"("name", "type", "current_km", "km_per_month", "icon", "userId") VALUES 
    ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const result = await pool.query(query, [name, type, current_km, km_per_month, icon, userId]);
    return result.rows;
  },

  async deleteOneCar(carId) {
    const query = 'DELETE FROM "car" WHERE id = $1';
    const result = await pool.query(query, [carId]);
    return result.rows;
  },

  async modifyOneCar(name, type, current_km, km_per_month, icon, carId) {
    const query = ` UPDATE "car" SET
                        name = COALESCE($1, name),
                        type = COALESCE($2, type),
                        current_km = COALESCE($3, current_km),
                        km_per_month = COALESCE($4, km_per_month),
                        icon = COALESCE($5, icon),
                        updated_at = now()
                    WHERE id = $6
                    RETURNING *`;
    const result = await pool.query(query, [name, type, current_km, km_per_month, icon, carId]);
    return result.rows;
  },
  async modifyKmOnCar(current_km, carId) {
    const query = ` UPDATE "car" SET
                        current_km = COALESCE($1, current_km),
                        updated_at = now()
                    WHERE id = $2
                    RETURNING *`;
    const result = await pool.query(query, [current_km, carId]);
    return result.rows;
  },
};

module.exports = carDatamapper;
