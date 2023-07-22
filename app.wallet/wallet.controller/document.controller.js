const documentDatamapper = require('../../app.wallet/wallet.datamapper/document.datamapper.js');
const walletDatamapper = require('../../app.wallet/wallet.datamapper/wallet.datamapper.js');


const documentController = {
    async getAllDocument (req, res) {
        const allDocument = await documentDatamapper.getAllDocument();
        if (allDocument.length === 0) {
            res.status(404).json(`message: il n'existe aucun document`)
          }
        res.json(allDocument);
    },

    async getAllDocumentByWalletId (req, res) {
        const walletId = req.params.walletId
        const allWallet = await documentDatamapper.getAllDocumentByWalletId(walletId);
        if (allWallet.length === 0) {
          res.status(404).json(`message: il n'existe aucun document pour le wallet ${walletId}`)
        }
        res.json(allTask);
    },

  async getOneDocument (req, res) {
        const documentId = req.params.documentId;
        const oneDocument = await documentDatamapper.getOneDocument(documentId);
        if (oneDocument.length === 0) {
            res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`)
          }
         res.json(oneDocument);
    },

  async createOneDocument (req, res) {
        const walletId = req.params.walletId;
        const {name, information, file, icon} = req.body;
        const walletExisted = await walletDatamapper.getOneWallet(walletId)
        if (walletExisted.length === 0){
          return res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`)
        } else {
        const oneDocument = await documentDatamapper.createOneDocument(name, information, file, icon, walletId);
        res.json(oneDocument);
        }
    },

    async deleteOneDocument (req, res) {
        const documentId = req.params.documentId;
        const existedDocument = await documentDatamapper.getOneDocument(documentId);
        if(existedDocument.length === 0){
            res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`)
        } else {
            const oneDocument = await documentDatamapper.deleteOneDocument(documentId);
            res.json(`message: le document ${documentId} a été supprimé avec succès`);
        }
    },
    
    async modifyOneDocument (req,res) {
        const documentId = req.params.documentId;
        const existedDocument = await documentDatamapper.getOneDocument(documentId);
        if(existedDocument.length === 0){
            res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`)
        } else {
        const {name, information, file, icon} = req.body;
        const updatedDocument = await documentDatamapper.modifyOneDocument(name, information, file, icon, documentId);
        console.log(updatedDocument)
        res.json(updatedDocument);
        }
    }
}

module.exports = documentController