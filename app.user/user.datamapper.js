const pool = require("../../database.connexion.js")

const userDatamapper= {
  async createUser (pseudo, email, passwordHash) {
    const query =`INSERT INTO "user"("pseudo", "email", "password") VALUES 
    ($1, $2, $3);`;
    const result = await pool.query(query, [pseudo, email, passwordHash]);
    return result.rows;
  },
}

module.exports = userDatamapper