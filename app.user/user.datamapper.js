const pool = require("../database.connexion.js")

const userDatamapper= {
    
  async getUserByEmail (email) {
    const query = `SELECT * FROM "user" WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async getUserById (id) {
    const query = `SELECT * FROM "user" WHERE id = $1`;
    const result = await pool.query(query, [id]);
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

  async modifyOneUser (pseudo, email, password, userId) {
    const query = ` UPDATE "user" SET
                        pseudo = COALESCE($1, pseudo),
                        email = COALESCE($2, email),
                        password = COALESCE($3, password)
                    WHERE id = $4
                    RETURNING *`
  const result = await pool.query(query, [pseudo, email, password, userId]);
  return result.rows;
    
  }
}

module.exports = userDatamapper