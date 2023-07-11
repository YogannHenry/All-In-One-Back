const express = require('express');

const walletController = require('../controllers/listController')

const router = express.Router();

// routes récupération wallet
router.get('api/wallet', walletController.getAllWallets)
router.post('api/wallet', walletController.createOneWallet)
router.delete('api/wallet/:walletId', walletController.deleteOneList)
router.put('api/wallet/:walletId', walletController.modifyOneList)

// routes récupération document
router.get('api/wallet/:walletId/document', walletController.getAllDocuments)
router.get('api/wallet/document/:documentId', walletController.getOneDocument)
router.post('api/wallet/:walletId/document', walletController.createOneDocument)
router.delete('api/wallet/document/:documentId', walletController.deleteOneDocument)
router.put('api/wallet/document/:documentId', walletController.modifyOneDocument)




module.exports = router;