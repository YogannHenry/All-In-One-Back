const pool = require("../../database.connexion.js")

const taskDatamapper = {
  async getAllTask (listId) {
    const query = `SELECT * FROM "task" WHERE "listId" = $1`
    const result = await pool.query(query, [listId]);
    return result.rows;
  },
  async getOneTask (taskId) {
    const query = 'SELECT * FROM "task" WHERE id = $1';
    const result = await pool.query(query, [taskId]);
    return result.rows;
  },
  async createOneTask (name, listId) {
    const query = `INSERT INTO "task"("name", "listId") VALUES 
                    ($1, $2) RETURNING *`;
    const result = await pool.query(query, [name, listId]);
    return result.rows;
  },
  async deleteOneTask(taskId) {
    const query = 'DELETE FROM "task" WHERE id = $1';
    const result = await pool.query(query, [taskId]);
    return result.rows;
  },
  async modifyOneTask(name, position, taskId) {
    const query = ` UPDATE "task" SET
                          name = COALESCE($1, name),
                          position = COALESCE($2, position),
                          updated_at = now()
                    WHERE id = $3
                    RETURNING *`;
  const result = await pool.query(query, [name, position, taskId]);
  return result.rows;
  }, 
  async deleteTaskByListId (listId) {
    const query = 'DELETE FROM "task" WHERE "listId" = $1';
    const result = await pool.query(query, [listId]);
    return result.rows;
  }
}

module.exports = taskDatamapper