/* eslint-disable import/extensions */
const pool = require('../../database.connexion.js');

const listDatamapper = {
  async getAllList(userId) {
    const query = 'SELECT * FROM "list" WHERE userId=$1';
    const result = await pool.query(query, userId);
    return result.rows;
  },

  async getOneList(listId) {
    const query = 'SELECT * FROM "list" WHERE id = $1';
    const result = await pool.query(query, [listId]);
    return result.rows;
  },

  async createOneList(name, userId) {
    const query = `INSERT INTO "list"("name", "userId") VALUES 
                    ($1, $2) RETURNING *`;
    const result = await pool.query(query, [name, userId]);
    return result.rows;
  },

  async deleteOneList(listId) {
    const query = 'DELETE FROM "list" WHERE id = $1';
    const result = await pool.query(query, [listId]);
    return result.rows;
  },

  async modifyOneList(name, position, listId) {
    const query = ` UPDATE list SET
                           name = COALESCE($1, name),
                           position = COALESCE($2, position),
                           updated_at = now()
                    WHERE id = $3
                    RETURNING *`;
    const result = await pool.query(query, [name, position, listId]);
    return result.rows;
  },
  async getListByUserId(userId) {
    const query = 'SELECT id FROM "list" WHERE "userId" = $1';
    const result = await pool.query(query, [userId]);
    return result.rows;
  },
};

module.exports = listDatamapper;
