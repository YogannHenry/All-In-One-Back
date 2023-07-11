const pool = require("../../database.connexion.js")

const listDatamapper = {
  async getAllList (req, res) {
    const query = 'SELECT * FROM "list"';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = listDatamapper