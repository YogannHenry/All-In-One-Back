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
    const query = 'DELETE FROM post WHERE id = $1';
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

module.exports = listDatamapper


async findByPk(categoryId) {
  const result = await client.query('SELECT * FROM category WHERE id = $1', [categoryId]);

  if (result.rowCount === 0) {
      return undefined;
  }

  return result.rows[0];
},

getOneCard: async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await Card.findByPk(cardId, {
      include: 'tags',
      order: [
        ['position', 'ASC']
      ]
    });
    if (!card) {
      res.status(404).json('Cant find card with id ' + cardId);
    } else {
      res.json(card);
    }
  } catch (error) {
    res.status(500).json(error);
  }
},
