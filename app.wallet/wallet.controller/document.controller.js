const documentDatamapper = require('../../app.wallet/wallet.datamapper/document.datamapper.js')

const documentController = {
  async getAllDocument (req, res) {
        const allDocument = await documentDatamapper.getAllDocument();
        res.json(allDocument);
    },

  async getOneDocument (req, res) {
        const documentId = req.params.documentId;
        const oneDocument = await documentDatamapper.getOneDocument(documentId);
         res.json(oneDocument);
    },

  async createOneDocument (req, res) {
        const walletId = req.params.walletId;
        const {name, information, file, icon} = req.body;
        const oneDocument = await documentDatamapper.createOneDocument(name, information, file, icon, walletId);
        res.json("message: Document créée avec succès");
    },

    async deleteOneDocument (req, res) {
        const documentId = req.params.documentId;
        const oneDocument = await documentDatamapper.deleteOneDocument(documentId);
        res.json("message: Document supprimé avec succès");
    },
    
    async modifyOneDocument (req,res) {
        const documentId = req.params.documentId;
        const {description, position} = req.body;
        const updatedDocument = await documentDatamapper.modifyOneDocument(description, position, documentId);
        res.json("modification réussie");
    }
}

module.exports = documentController