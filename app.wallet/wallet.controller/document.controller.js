const fs = require('fs');
const path = require('path');
const documentDatamapper = require('../wallet.datamapper/document.datamapper');
const walletDatamapper = require('../wallet.datamapper/wallet.datamapper');

const documentController = {
  async getAllDocument(req, res) {
    const allDocument = await documentDatamapper.getAllDocument();
    if (allDocument.length === 0) {
      res.status(404).json('message: il n\'existe aucun document');
    }
    res.json(allDocument);
  },

  async getAllDocumentByWalletId(req, res) {
    const { walletId } = req.params;
    const wallet = await walletDatamapper.getOneWallet(walletId);
    if (wallet.length === 0) {
      res.status(404).json(`message: il n'existe aucun portefeuille avec l'id ${walletId} `);
    }
    const allDocument = await documentDatamapper.getAllDocumentByWalletId(walletId);
    if (allDocument.length === 0) {
      res.status(404).json(`message: il n'existe aucun document pour le wallet ${walletId}`);
    }
    res.json(allDocument);
  },

  async getOneDocument(req, res) {
    const { documentId } = req.params;
    const oneDocument = await documentDatamapper.getOneDocument(documentId);
    if (oneDocument.length === 0) {
      res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`);
    }
    res.json(oneDocument);
  },
  // eslint-disable-next-line consistent-return
  async downloadOneDocument(req, res) {
    const { documentId } = req.params;
    const fileName = await documentDatamapper.getOneDocument(documentId);
    console.log(fileName);
    if (fileName.length === 0) {
      return res.status(404).json({ error: `il n'existe aucun document avec l'id ${documentId}.` });
    }

    const filePath = path.join(__dirname, '..', '..', 'uploads', fileName[0].file);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'Le fichier demandé n\'existe pas.' });
      }
      return res.download(filePath);
    });
  },

  async createOneDocument(req, res) {
    const { walletId } = req.params;
    const walletExisted = await walletDatamapper.getOneWallet(walletId);
    if (walletExisted.length === 0) {
      return res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`);
    }
    if (!req.file) {
      return res.status(404).json('messsage: veuillez insérer un document de type image ou pdf');
    }
    const { mimetype } = req.file;
    if (mimetype === 'application/pdf' || mimetype.startsWith('image/')) {
      const file = req.file.filename;
      const type = mimetype;
      const { name, information, icon } = req.body;
      const oneDocument = await documentDatamapper
        .createOneDocument(name, information, file, type, icon, walletId);
      return res.json(oneDocument);
    }
    return res.status(403).json('messsage: le fichier n\'est pas de type image ou pdf');
  },

  async deleteOneDocument(req, res) {
    const { documentId } = req.params;
    const existedDocument = await documentDatamapper.getOneDocument(documentId);
    if (existedDocument.length === 0) {
      res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`);
    } else {
      await documentDatamapper.deleteOneDocument(documentId);
      res.json(`message: le document ${documentId} a été supprimé avec succès`);
    }
  },

  async modifyOneDocument(req, res) {
    const { documentId } = req.params;
    const existedDocument = await documentDatamapper.getOneDocument(documentId);
    if (existedDocument.length === 0) {
      res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`);
    } else {
      const {
        name, information, file, icon,
      } = req.body;
      const updatedDocument = await documentDatamapper
        .modifyOneDocument(name, information, file, icon, documentId);
      res.json(updatedDocument);
    }
  },
};

module.exports = documentController;
