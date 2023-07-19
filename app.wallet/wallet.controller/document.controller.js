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
        res.json(oneDocument);
    },

    async deleteOneDocument (req, res) {
        const documentId = req.params.documentId;
        const existedDocument = await documentDatamapper.getOneDocument(documentId);
        if(existedDocument.length === 0){
            res.status(404).json("message: le document n'existe pas")
        } else {
            const oneDocument = await documentDatamapper.deleteOneDocument(documentId);
            res.json("message: Document supprimé avec succès");
        }
    },
    
    async modifyOneDocument (req,res) {
        const documentId = req.params.documentId;
        const existedDocument = await documentDatamapper.getOneDocument(documentId);
        if(existedDocument.length === 0){
            res.status(404).json("message: le document n'existe pas")
        } else {
        const {description, position} = req.body;
        const updatedDocument = await documentDatamapper.modifyOneDocument(name, information, file, icon, documentId);
        res.json("message: Document modifié avec succès");
        }
    }
}

module.exports = documentController