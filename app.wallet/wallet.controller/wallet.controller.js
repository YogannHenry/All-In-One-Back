const walletDatamapper = require ("../../app.wallet/wallet.datamapper/wallet.datamapper.js");
const documentDatamapper = require('../../app.wallet/wallet.datamapper/document.datamapper.js');
const userDatamapper = require("../../app.user/user.datamapper.js");

const walletController = {
  async getAllWallet (req, res) {
        const allWallet = await walletDatamapper.getAllWallet();
        if (allWallet.length === 0){
          res.status(404).json(`message: il n'existe aucun wallet`)
        }
        res.json(allWallet);
    },

  async getOneWallet (req, res) {
        const walletId = req.params.walletId;
        const oneWallet = await walletDatamapper.getOneWallet(walletId);
        if (oneWallet.length === 0){
          res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`)
        }
         res.json(oneWallet);
    },

  async createOneWallet (req, res) {
        const {name, icon, userId} = req.body;
        const existedUser = await userDatamapper.getUserById(userId)
        if(existedUser.length === 0) {
          res.status(404).json(`message: il n'existe aucun user avec l'id ${userId}`)
        }
        const oneWallet = await walletDatamapper.createOneWallet(name, icon, userId);
        res.json(oneWallet);
    },

  async deleteOneWallet (req, res) {
        const walletId = req.params.walletId;
        const walletExisted = await walletDatamapper.getOneWallet(walletId)
        if(walletExisted.length === 0){
          res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`)
        } else {
          const deleteDocumentByWalletId = await documentDatamapper.deleteDocumentByWalletId(walletId);
          const oneWallet = await walletDatamapper.deleteOneWallet(walletId);
          res.json(`message: le wallet ${walletId} a été supprimée avec succès`);
        }
    },
    async modifyOneWallet (req,res) {
        const walletId = req.params.walletId;
        const walletExisted = await walletDatamapper.getOneWallet(walletId)
        if(walletExisted.length === 0){
          res.status(404).json(`message: il n'existe aucun wallet avec l'id ${walletId}`)
        } else {
        const {name, icon} = req.body;
        const updatedWallet = await walletDatamapper.modifyOneWallet (name, icon, walletId);
        res.json(updatedWallet);
        }
    }
}

module.exports = walletController