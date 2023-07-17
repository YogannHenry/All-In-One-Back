const pool = require("../../database.connexion.js");

const listDatamapper = {
  async getAllList (req, res) {
    const query = 'SELECT * FROM "list"';
    const result = await pool.query(query);
    return result.rows;
  },

  async getOneList (listId) {
    const query = 'SELECT * FROM "list" WHERE id = $1';
    const result = await pool.query(query, [listId]);
    return result.rows;
  },

  async createOneList (name, position, userId) {
    const query = `INSERT INTO "list"("name", "position", "userId") VALUES 
                    ($1, $2, $3)`;
    const result = await pool.query(query, [name, position, userId]);
    return result.rows;
  },

  async deleteOneList(listId) {
    const query = 'DELETE FROM "list" WHERE id = $1';
    const result = await pool.query(query, [listId]);
    return result.rows;
  },

  async modifyOneList (name, position, listId) {
    const query = ` UPDATE list SET
                           name = $1,
                           position = $2,
                           updated_at = now()
                    WHERE id = $3
                    RETURNING *`;
  const result = await pool.query(query, [name, position, listId]);
  return result.rows;
    
  },
  async getListByUserId(userId){
    //! il faut retourner un tableau de listId
    const query = `SELECT * FROM "list" WHERE userId = $1`;
    const result = await pool.query(query, [userId]);
  }
}

module.exports = listDatamapper
