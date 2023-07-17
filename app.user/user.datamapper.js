const pool = require("../../database.connexion.js")

const userDatamapper= {
    
  async getUserByEmail (email) {
    const query = `SELECT * FROM "user" WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows;
  },
  
  async createUser (pseudo, email, passwordHash) {
    const query =`INSERT INTO "user"("pseudo", "email", "password") VALUES 
    ($1, $2, $3);`;
    const result = await pool.query(query, [pseudo, email, passwordHash]);
    return result.rows;
  },
  
  async deleteOneUser(userId) {
    const query = 'DELETE FROM "user" WHERE id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async modifyOneUser (pseudo, email, password) {
    const query = ` UPDATE list SET
                           pseudo = $1,
                           email = $2,
                           password = $3
                           updated_at = now()
                    WHERE id = $4
                    RETURNING *`
  const result = await pool.query(query, [pseudo, email, password]);
  return result.rows;
    
  }
}

module.exports = userDatamapper