const pool = require("../../database.connexion.js");

const maintenanceDatamapper= {
    
  async getAllMaintenance () {
    const query = `SELECT * FROM "maintenance"`
    const result = await pool.query(query);
    return result.rows;
  },
  async getAllMaintenanceByCarId (carId) {
    const query = `SELECT * FROM "maintenance" WHERE "carId" = $1`
    const result = await pool.query(query, [carId]);
    return result.rows;
  },
  async getOneMaintenance (maintenanceId) {
    const query = 'SELECT * FROM "maintenance" WHERE id = $1';
    const result = await pool.query(query, [maintenanceId]);
    return result.rows;
  },
  async createOneMaintenance (name, last_date_verif, last_km_verif, validity_period, validity_km, icon, carId) {
    const query = `INSERT INTO "maintenance"
                        ("name",
                        "last_date_verif",
                        "last_km_verif",
                        "validity_period",
                        "validity_km", 
                        "icon", 
                        "carId") 
                  VALUES ($1, $2, $3, $4, $5, $6, $7) 
                  RETURNING *`;
    const result = await pool.query(query, [name, last_date_verif, last_km_verif, validity_period, validity_km, icon, carId]);
    return result.rows;
  },
  async deleteOneMaintenance(maintenanceId) {
    const query = 'DELETE FROM "maintenance" WHERE id = $1';
    const result = await pool.query(query, [maintenanceId]);
    return result.rows;
  },
  async modifyOneMaintenance(name, last_date_verif, last_km_verif, validity_period, validity_km, icon, maintenanceId) {
    const query = ` UPDATE "maintenance" SET
                          name = COALESCE($1, name),
                          last_date_verif = COALESCE($2,last_date_verif),
                          last_km_verif = COALESCE($3, last_km_verif),
                          validity_period = COALESCE($4, validity_period),
                          validity_km = COALESCE($5, validity_km),
                          icon = COALESCE($6, icon),
                          updated_at = now()
                    WHERE id = $7
                    RETURNING *`;
  const result = await pool.query(query, [name, last_date_verif, last_km_verif, validity_period, validity_km, icon, maintenanceId]);
  return result.rows;
  }, 
  async deleteMaintenanceByCarId (listId) {
    const query = 'DELETE FROM "maintenance" WHERE "carId" = $1';
    const result = await pool.query(query, [carId]);
    return result.rows;
  }
}

module.exports = maintenanceDatamapper