const pool = require("../../database.connexion.js")

const taskDatamapper = {
  async getAllTask (req, res) {
    const query = 'SELECT * FROM "task"';
    const result = await pool.query(query);
    return result.rows;
  },
  async getOneTask (taskId) {
    const query = 'SELECT * FROM "task" WHERE id = $1';
    const result = await pool.query(query, [taskId]);
    return result.rows;
  },
  async createOneTask (description, position, listId) {
    const query = `INSERT INTO "task"("description", "position", "listId") VALUES 
                    ($1, $2, $3);`
    const result = await pool.query(query, [description, position, listId]);
    return result.rows;
  },
  async deleteOneTask(taskId) {
    const query = 'DELETE FROM "task" WHERE id = $1';
    const result = await pool.query(query, [taskId]);
    return result.rows;
  },
  async modifyOneTask(description, position, taskId) {
    const query = ` UPDATE task SET
                           description = $1,
                           position = $2,
                           updated_at = now()
                    WHERE id = $3
                    RETURNING *`
  const result = await pool.query(query, [description, position, taskId]);
  return result.rows;
  }, 
  async deleteTaskByListId (listId) {
    const query = 'DELETE FROM "task" WHERE listId = $1';
    const result = await pool.query(query, [listId]);
    return result.rows;
  }
}

module.exports = taskDatamapper