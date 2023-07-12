const pool = require("../../database.connexion.js")

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
                    ($1, $2, $3);`
    const result = await pool.query(query, [name, position, userId]);
    return result.rows;
  },

  async deleteOneList(listId) {
<<<<<<< HEAD
    const query = 'DELETE FROM list WHERE id = $1';
=======
    const query = 'DELETE FROM "list" WHERE id = $1';
>>>>>>> 2575f191ea35c6aefd042ebd11a874b5f0fa68db
    const result = await pool.query(query, [listId]);
    return result.rows;
  },

  async modifyOneList (name, position, listId) {
    const query = ` UPDATE list SET
                           name = $1,
                           position = $2,
                           updated_at = now()
                    WHERE id = $3
                    RETURNING *`
  const result = await pool.query(query, [name, position, listId]);
  return result.rows;
    
  }

}

<<<<<<< HEAD
module.exports = listDatamapper
=======
module.exports = listDatamapper
>>>>>>> 2575f191ea35c6aefd042ebd11a874b5f0fa68db
