const fs = require('fs');
const path = require('path');
const documentDatamapper = require('../wallet.datamapper/document.datamapper');
const walletDatamapper = require('../wallet.datamapper/wallet.datamapper');

const documentController = {
  async getAllDocument(req, res) {
    const allDocument = await documentDatamapper.getAllDocument();
    if (allDocument.length === 0) {
      return res.status(404).json('message: il n\'existe aucun document');
    }
    return res.json(allDocument);
  },

  async getAllDocumentByWalletId(req, res) {
    const { walletId } = req.params;
    const wallet = await walletDatamapper.getOneWallet(walletId);
    if (wallet.length === 0) {
      return res.status(404).json(`message: il n'existe aucun portefeuille avec l'id ${walletId} `);
    }
    const allDocument = await documentDatamapper.getAllDocumentByWalletId(walletId);
    if (allDocument.length === 0) {
      return res.status(404).json(`message: il n'existe aucun document pour le wallet ${walletId}`);
    }
    return res.json(allDocument);
  },

  async getOneDocument(req, res) {
    const { documentId } = req.params;
    const oneDocument = await documentDatamapper.getOneDocument(documentId);
    if (oneDocument.length === 0) {
      return res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`);
    }
    return res.json(oneDocument);
  },
  // eslint-disable-next-line consistent-return
  async downloadOneDocument(req, res) {
    const { documentId } = req.params;
    const existedDocument = await documentDatamapper.getOneDocument(documentId);
    if (existedDocument.length === 0) {
      return res.status(404).json({ error: `il n'existe aucun document avec l'id ${documentId}.` });
    }

    const filePath = path.join(__dirname, '../../../all-in-1.fr/uploads/', existedDocument[0].file);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'Le fichier demandé n\'existe pas.' });
      }
      // eslint-disable-next-line consistent-return
      return res.download(filePath, existedDocument[0].file, (downloadError) => {
        // Gérer les erreurs potentielles liées au téléchargement
        if (downloadError) {
          return res.status(500).json({ error: 'Une erreur s\'est produite lors du téléchargement du fichier.' });
        }
      });
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
      const type = mimetype;
      const file = req.file.filename;
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
      return res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`);
    }
    await documentDatamapper.deleteOneDocument(documentId);
    return res.json(`message: le document ${documentId} a été supprimé avec succès`);
  },

  async modifyOneDocument(req, res) {
    const { documentId } = req.params;
    const existedDocument = await documentDatamapper.getOneDocument(documentId);
    if (existedDocument.length === 0) {
      return res.status(404).json(`message: il n'existe aucun document avec l'id ${documentId}`);
    }
    const {
      name, information, file, icon,
    } = req.body;
    const updatedDocument = await documentDatamapper
      .modifyOneDocument(name, information, file, icon, documentId);
    return res.json(updatedDocument);
  },
};

module.exports = documentController;
