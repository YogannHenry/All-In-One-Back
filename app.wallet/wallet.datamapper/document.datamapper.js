const pool = require("../../database.connexion.js")

const documentDatamapper = {
  async getAllDocument (req, res) {
    const query = 'SELECT * FROM "document"';
    const result = await pool.query(query);
    return result.rows;
  },
  async getOneDocument (documentId) {
    const query = 'SELECT * FROM "document" WHERE id = $1';
    const result = await pool.query(query, [documentId]);
    return result.rows;
  },
  async createOneDocument (name, information, file, icon, walletId) {
    const query = `INSERT INTO "document"("name", "information", "file", "icon", "walletId") VALUES 
                    ($1, $2, $3, $4, $5);`;
    const result = await pool.query(query, [name, information, file, icon, walletId]);
    return result.rows;
  },
  async deleteOneDocument(documentId) {
    const query = 'DELETE FROM "document" WHERE id = $1';
    const result = await pool.query(query, [documentId]);
    return result.rows;
  },
  async modifyOneDocument(name, information, file, icon, documentId) {
    const query = ` UPDATE "document" SET
                            name = $1,
                            information = $2,
                            file = $3,
                            icon = $4,
                           updated_at = now()
                    WHERE id = $5
                    RETURNING *`;
  const result = await pool.query(query, [name, information, file, icon, documentId]);
  return result.rows;
  }, 
  async deleteDocumentByWalletId (walletId) {
    const query = 'DELETE FROM "document" WHERE "walletId" = $1';
    const result = await pool.query(query, [walletId]);
    return result.rows;
  }
}

module.exports = documentDatamapper