const walletDatamapper = require('../wallet.datamapper/wallet.datamapper');
const documentDatamapper = require('../wallet.datamapper/document.datamapper');
const userDatamapper = require('../../app.user/user.datamapper');

const walletController = {
  async getAllWallet(req, res) {
    const { userId } = req.user;
    const allWallet = await walletDatamapper.getAllWallet(userId);
    if (allWallet.length === 0) {
      return res.status(404).json('message: il n\'existe aucun wallet');
    }
    return res.json(allWallet);
  },

  async getOneWallet(req, res) {
    const { walletId } = req.params;
    const oneWallet = await walletDatamapper.getOneWallet(walletId);
    if (oneWallet.length === 0) {
      return res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`);
    }
    return res.json(oneWallet);
  },

  async createOneWallet(req, res) {
    const { name, icon, userId } = req.body;
    const existedUser = await userDatamapper.getUserById(userId);
    if (existedUser.length === 0) {
      return res.status(404).json(`message: il n'existe aucun user avec l'id ${userId}`);
    }
    const oneWallet = await walletDatamapper.createOneWallet(name, icon, userId);
    return res.json(oneWallet);
  },

  async deleteOneWallet(req, res) {
    const { walletId } = req.params;
    const walletExisted = await walletDatamapper.getOneWallet(walletId);
    if (walletExisted.length === 0) {
      return res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`);
    }
    await documentDatamapper.deleteDocumentByWalletId(walletId);
    await walletDatamapper.deleteOneWallet(walletId);
    return res.json(`message: le wallet ${walletId} a été supprimée avec succès`);
  },
  async modifyOneWallet(req, res) {
    const { walletId } = req.params;
    const walletExisted = await walletDatamapper.getOneWallet(walletId);
    if (walletExisted.length === 0) {
      return res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`);
    }
    const { name, icon } = req.body;
    const updatedWallet = await walletDatamapper.modifyOneWallet(name, icon, walletId);
    return res.json(updatedWallet);
  },
};

module.exports = walletController;
