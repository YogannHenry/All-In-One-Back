const pool = require('../../database.connexion');

const documentDatamapper = {
  async getAllDocument() {
    const query = 'SELECT * FROM "document"';
    const result = await pool.query(query);
    return result.rows;
  },
  async getAllDocumentByWalletId(walletId) {
    const query = 'SELECT * FROM "document" WHERE "walletId" = $1';
    const result = await pool.query(query, [walletId]);
    return result.rows;
  },
  async getOneDocument(documentId) {
    const query = 'SELECT * FROM "document" WHERE id = $1';
    const result = await pool.query(query, [documentId]);
    return result.rows;
  },
  async createOneDocument(name, information, file, type, icon, walletId) {
    const query = `INSERT INTO "document"("name", "information", "file", "type", "icon", "walletId") VALUES 
                    ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    const result = await pool.query(query, [name, information, file, type, icon, walletId]);
    return result.rows;
  },
  async deleteOneDocument(documentId) {
    const query = 'DELETE FROM "document" WHERE id = $1';
    const result = await pool.query(query, [documentId]);
    return result.rows;
  },
  async modifyOneDocument(name, information, file, type, icon, documentId) {
    const query = ` UPDATE "document" SET
                            name = COALESCE($1, name),
                            information = COALESCE($2, information),
                            file = COALESCE($3, file),
                            type = COALESCE($4, type),
                            icon = COALESCE($5, icon),
                            updated_at = now()
                    WHERE id = $6
                    RETURNING *`;
    const result = await pool.query(query, [name, information, file, type, icon, documentId]);
    return result.rows;
  },
  async deleteDocumentByWalletId(walletId) {
    const query = 'DELETE FROM "document" WHERE "walletId" = $1';
    const result = await pool.query(query, [walletId]);
    return result.rows;
  },
};

module.exports = documentDatamapper;
