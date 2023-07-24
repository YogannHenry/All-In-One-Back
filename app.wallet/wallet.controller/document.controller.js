const documentDatamapper = require('../../app.wallet/wallet.datamapper/document.datamapper.js');
const walletDatamapper = require('../../app.wallet/wallet.datamapper/wallet.datamapper.js');

const fs = require('fs');
const path = require('path');



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
        const wallet = await walletDatamapper.getOneWallet(walletId)
        if(wallet.length === 0){
            res.status(404).json(`message: il n'existe aucun portefeuille avec l'id ${listId} `)
        }
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
    async downloadOneDocument (req, res) {
        const documentId = req.params.documentId;
        const fileName = await documentDatamapper.getOneDocument(documentId)
        const filePath = path.join(__dirname, '..', '..', 'uploads', fileName[0].file);
      
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            return res.status(404).json({ error: 'Le fichier demandé n\'existe pas.' });
          }      
          res.download(filePath);
        });

    },

  async createOneDocument (req, res) {
        const walletId = req.params.walletId;
        const walletExisted = await walletDatamapper.getOneWallet(walletId)
        if (walletExisted.length === 0){
          return res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`)
        } else {
        const file = req.file.filename;
        const {name, information, icon} = req.body;
        const oneDocument = await documentDatamapper.createOneDocument(name, information, file, icon, walletId);
        res.json(oneDocument);
        }},




// router.post('/upload', upload.single('ff'), (req, res) => {
//     
    
//     console.log('Nom du champ du formulaire associé au fichier :', fieldName);
//     const formData = req.body;
//     const uploadedFile = req.file;
  
//     console.log("formData", formData)
//     console.log("uploadedFile", uploadedFile)
  
//     res.send('Formulaire multipart reçu avec succès.');
//   });
    // },

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