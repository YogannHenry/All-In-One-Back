const pool = require("../../database.connexion.js");

const walletDatamapper = {
  async getAllWallet (req, res) {
    const query = 'SELECT * FROM "wallet"';
    const result = await pool.query(query);
    return result.rows;
  },

  async getOneWallet (walletId) {
    const query = 'SELECT * FROM "wallet" WHERE id = $1';
    const result = await pool.query(query, [walletId]);
    return result.rows;
  },

  async createOneWallet (name, icon, userId) {
    const query = `INSERT INTO "wallet"("name", "icon", "userId") VALUES 
                    ($1, $2, $3)`;
    const result = await pool.query(query, [name, icon, userId]);
    return result.rows;
  },

  async deleteOneWallet(walletId) {
    const query = 'DELETE FROM "wallet" WHERE id = $1';
    const result = await pool.query(query, [walletId]);
    return result.rows;
  },

  async modifyOneWallet (name, icon, userId) {
    const query = ` UPDATE wallet SET
                           name = $1,
                           icon = $2,
                           userId = $3,
                           updated_at = now()
                    WHERE id = $4
                    RETURNING *`;
  const result = await pool.query(query, [name, icon, userId]);
  return result.rows;
    
  },
  async getWalletByUserId(userId){
    const query = `SELECT id FROM "wallet" WHERE "userId" = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}

module.exports = wallet
