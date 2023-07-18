const walletDatamapper = require("../wallet.datamapper/wallet.datamapper.js");

const walletController = {
  async getAllWallet (req, res) {
        const allWallet = await walletDatamapper.getAllWallet();
        res.json(allWallet);
    },

  async getOneWallet (req, res) {
        const walletId = req.params.walletId;
        const oneWallet = await walletDatamapper.getOneWallet(walletId);
         res.json(oneWallet);
    },

  async createOneWallet (req, res) {
        const {name, icon, userId} = req.body;
        const oneWallet = await walletDatamapper.createOneWallet(name, icon, userId);
        res.json(oneWallet);
    },

  async deleteOneWallet (req, res) {
        const walletId = req.params.walletId;
        const deleteDocumentByWalletId = await documentDatamapper.deleteDocumentByWalletId(walletId);
        const oneWallet = await walletDatamapper.deleteOneWallet(walletId);
        res.json(oneWallet);
    },
    
    async modifyOneWallet (req,res) {
        const walletId = req.params.walletId;
        const {name, icon} = req.body;
        const updatedWallet = await walletDatamapper.modifyOneWallet (name, icon, walletId);
        res.json(updatedWallet);
    }
}

module.exports = walletController